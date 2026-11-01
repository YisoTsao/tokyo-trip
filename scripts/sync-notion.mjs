// Pull the trip's Notion tables into src/data/notion/*.json before the site is built.
// Needs NOTION_TOKEN plus NOTION_EXPENSES_DB and NOTION_BOOKINGS_DB (database ids or URLs).
// Without them it leaves the committed snapshot alone, so local builds still work.
import { writeFile } from "node:fs/promises";

const token = process.env.NOTION_TOKEN;
const expensesDb = dbId(process.env.NOTION_EXPENSES_DB);
const bookingsDb = dbId(process.env.NOTION_BOOKINGS_DB);
const OUT = new URL("../src/data/notion/", import.meta.url);

if (!token || !expensesDb || !bookingsDb) {
  console.log("sync-notion: NOTION_TOKEN / NOTION_EXPENSES_DB / NOTION_BOOKINGS_DB not set, keeping the committed snapshot.");
  process.exit(0);
}

/** Accepts a bare id, a dashed id or a notion.so URL. */
function dbId(v) {
  if (!v) return "";
  const m = v.replace(/-/g, "").match(/[0-9a-f]{32}/i);
  return m ? m[0] : "";
}

async function queryAll(id) {
  const rows = [];
  let cursor;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${id}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 100, start_cursor: cursor, sorts: [{ property: "排序", direction: "ascending" }] }),
    });
    if (!res.ok) throw new Error(`Notion ${id}: ${res.status} ${await res.text()}`);
    const data = await res.json();
    rows.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return rows.map((r) => r.properties);
}

/** Plain value of one property, or undefined when empty. */
function val(props, name) {
  const p = props[name];
  if (!p) return undefined;
  switch (p.type) {
    case "title":
    case "rich_text": {
      const s = p[p.type].map((t) => t.plain_text).join("").trim();
      return s || undefined;
    }
    case "number":
      return p.number ?? undefined;
    case "select":
      return p.select?.name;
    case "checkbox":
      return p.checkbox;
    default:
      return undefined;
  }
}

const STATUS = { 確定: "fixed", 預估: "est", 未填: "blank" };
const SHEET = { 車票與交通預訂: "trans", 住宿預訂: "stay" };
const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined));

const expenses = (await queryAll(expensesDb))
  .filter((p) => val(p, "編號") && val(p, "項目"))
  .map((p) =>
    clean({
      id: val(p, "編號"),
      group: val(p, "分組") ?? "其他",
      date: val(p, "日期") ?? "",
      item: val(p, "項目"),
      cat: val(p, "大類") ?? "其他",
      sub: val(p, "小類") ?? "雜支",
      status: STATUS[val(p, "狀態")] ?? (val(p, "最低(¥)") === undefined ? "blank" : "est"),
      low: val(p, "最低(¥)"),
      high: val(p, "最高(¥)") ?? val(p, "最低(¥)"),
      twd: val(p, "台幣價"),
      paid: val(p, "實付"),
      paidCur: val(p, "實付幣別"),
      note: val(p, "備註"),
    }),
  );

const bookings = (await queryAll(bookingsDb))
  .filter((p) => val(p, "項目") && SHEET[val(p, "清單")])
  .map((p) =>
    clean({
      sheet: SHEET[val(p, "清單")],
      group: val(p, "分組"),
      when: val(p, "日期") ?? "",
      whenNote: val(p, "時間") ?? "",
      kind: val(p, "類型") ?? "",
      kindClass: val(p, "樣式"),
      title: val(p, "項目"),
      note: val(p, "說明") ?? "",
      free: val(p, "現場購票") || undefined,
      checks: [1, 2]
        .filter((n) => val(p, `待辦${n}`) && val(p, `待辦${n}編號`))
        .map((n) =>
          clean({
            id: val(p, `待辦${n}編號`),
            label: val(p, `待辦${n}`),
            note: val(p, `待辦${n}備註`),
            done: val(p, `待辦${n}完成`) || undefined,
          }),
        ),
    }),
  );

if (!expenses.length || !bookings.length) throw new Error("sync-notion: a Notion table came back empty, not overwriting the snapshot.");

await writeFile(new URL("expenses.json", OUT), JSON.stringify(expenses, null, 2) + "\n");
await writeFile(new URL("bookings.json", OUT), JSON.stringify(bookings, null, 2) + "\n");
console.log(`sync-notion: ${expenses.length} expense rows, ${bookings.length} bookings.`);
