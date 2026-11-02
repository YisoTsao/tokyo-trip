// Read the trip's two Notion tables and turn them into the shapes the site uses.
// Shared by scripts/sync-notion.mjs (build-time snapshot) and api/trip.js (live data on Vercel).

/** Accepts a bare id, a dashed id or a notion.so URL. */
export function dbId(v) {
  if (!v) return "";
  const m = v.replace(/-/g, "").match(/[0-9a-f]{32}/i);
  return m ? m[0] : "";
}

export const EXPENSES_DB = "a5519c6c8ce64876bb0ddf787af29c7a";
export const BOOKINGS_DB = "4941eadff10b4cecb15563aebcd69d02";

async function queryAll(token, id) {
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
      const s = p[p.type]
        .map((t) => t.plain_text)
        .join("")
        .trim();
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

export async function fetchTripData(token, expensesDb, bookingsDb) {
  const [expenseRows, bookingRows] = await Promise.all([queryAll(token, expensesDb), queryAll(token, bookingsDb)]);
  const expenses = expenseRows
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
        split: val(p, "分攤人數"),
        note: val(p, "備註"),
      }),
    );

  const bookings = bookingRows
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
  return { expenses, bookings };
}

// ---- Writes from the page (api/trip.js POST) ----

async function notion(token, path, method, body) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Notion ${method} ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

const textIs = (property, value) => ({ property, rich_text: { equals: value } });

/** Set 實付 / 實付幣別 on the 旅費 row whose 編號 is `id`; paid null clears it. */
export async function updateExpense(token, db, id, paid, cur) {
  const { results } = await notion(token, `databases/${db}/query`, "POST", { filter: textIs("編號", id), page_size: 1 });
  if (!results.length) throw new Error(`no 旅費 row with 編號 ${id}`);
  await notion(token, `pages/${results[0].id}`, "PATCH", {
    properties: {
      實付: { number: paid },
      實付幣別: paid === null ? { select: null } : { select: { name: cur } },
    },
  });
}

/** Tick or untick the 待辦 whose 編號 is `id` in 交通與住宿預訂. */
export async function updateCheck(token, db, id, done) {
  const { results } = await notion(token, `databases/${db}/query`, "POST", {
    filter: { or: [textIs("待辦1編號", id), textIs("待辦2編號", id)] },
    page_size: 1,
  });
  if (!results.length) throw new Error(`no 預訂 row with 待辦編號 ${id}`);
  const page = results[0];
  const slot = [1, 2].find((n) => page.properties[`待辦${n}編號`]?.rich_text?.map((t) => t.plain_text).join("") === id);
  await notion(token, `pages/${page.id}`, "PATCH", { properties: { [`待辦${slot}完成`]: { checkbox: done } } });
}
