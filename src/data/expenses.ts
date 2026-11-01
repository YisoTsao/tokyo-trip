/**
 * Per-person expense sheet, in yen.
 * fixed = a fare already stated on the itinerary pages; est = planning estimate (a single amount for
 * transport and lockers, a low–high range for food and optional entry fees);
 * Stays booked in NT$ keep that price in `twd`, with low/high converted to yen at the planning rate.
 * blank = not given yet (flights, shopping), filled in by the traveller on the page or as 實付 in Notion.
 * The rows live in the Notion 旅費 table; scripts/sync-notion.mjs copies it to notion/expenses.json at build time.
 * Row ids (編號) are localStorage keys for the traveller's own amounts: never rename them.
 */
import { toYen } from "../hooks/useExpenses";
import expenseRows from "./notion/expenses.json";

export type ExpenseStatus = "fixed" | "est" | "blank";

/** Four main categories, each split into the subcategories travellers think in. */
export const CATEGORIES = {
  交通: ["飛機", "新幹線", "電車", "巴士", "觀光交通", "計程車"],
  住宿: ["住宿"],
  飲食: ["正餐", "點心", "飲料"],
  其他: ["門票", "雜支", "購物", "通訊保險"],
} as const;
export type ExpenseCat = keyof typeof CATEGORIES;
export type ExpenseSub = (typeof CATEGORIES)[ExpenseCat][number];
export const CATEGORY_ORDER = Object.keys(CATEGORIES) as ExpenseCat[];
const CAT_OF = Object.fromEntries(
  CATEGORY_ORDER.flatMap((c) => CATEGORIES[c].map((s) => [s, c])),
) as Record<ExpenseSub, ExpenseCat>;

export interface ExpenseRow {
  id: string;
  cat: ExpenseCat;
  sub: ExpenseSub;
  item: string;
  note?: string;
  low?: number;
  high?: number;
  /** the price as booked, in NT$, when it was paid in NT$ */
  twd?: number;
  status: ExpenseStatus;
}

export interface ExpenseGroup {
  id: string;
  date: string;
  title: string;
  rows: ExpenseRow[];
}

export interface NotionExpense {
  id: string;
  group: string;
  date: string;
  item: string;
  cat: string;
  sub: string;
  status: string;
  low?: number;
  high?: number;
  twd?: number;
  /** what was actually paid, entered in Notion */
  paid?: number;
  paidCur?: string;
  note?: string;
}

const STATUSES: ExpenseStatus[] = ["fixed", "est", "blank"];
const asSub = (s: string): ExpenseSub => (s in CAT_OF ? (s as ExpenseSub) : "雜支");

const notionRows = expenseRows as NotionExpense[];

/** Rows come from the Notion 旅費 table (synced at build time), grouped in table order. */
export const expenseGroups: ExpenseGroup[] = [];
for (const n of notionRows) {
  let g = expenseGroups.find((x) => x.title === n.group);
  if (!g) expenseGroups.push((g = { id: `g${expenseGroups.length}`, date: n.date, title: n.group, rows: [] }));
  const sub = asSub(n.sub);
  const low = n.low ?? (n.twd !== undefined ? toYen(n.twd) : undefined);
  g.rows.push({
    id: n.id,
    cat: CAT_OF[sub],
    sub,
    item: n.item,
    note: n.note,
    low,
    high: n.high ?? low,
    twd: n.twd,
    status: STATUSES.includes(n.status as ExpenseStatus) ? (n.status as ExpenseStatus) : low === undefined ? "blank" : "est",
  });
}

export const STATUS_LABEL: Record<ExpenseStatus, string> = {
  fixed: "確定",
  est: "預估",
  blank: "未填",
};
