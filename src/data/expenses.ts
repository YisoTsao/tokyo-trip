/**
 * Per-person expense sheet, in yen. Shared bookings (flights, stays) hold the whole price in Notion
 * and are divided by 分攤人數 here.
 * fixed = a fare already stated on the itinerary pages; est = planning estimate (a single amount for
 * transport and lockers, a low–high range for food and optional entry fees);
 * Stays booked in NT$ keep that price in `twd`, with low/high converted to yen at the planning rate.
 * blank = not given yet (flights, shopping), filled in by the traveller on the page or as 實付 in Notion.
 * The rows live in the Notion 旅費 table (see data/live.ts).
 * Row ids (編號) are localStorage keys for the traveller's own amounts: never rename them.
 */
import { toYen } from "../lib/currency";

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
  /** the price as booked, in NT$, when it was paid in NT$ (the whole booking, before splitting) */
  twd?: number;
  /** the booking's whole price in yen, when it is shared (split > 1) */
  total?: number;
  /** how many travellers share this price: low/high are already divided by it */
  split: number;
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
  /** 分攤人數: how many travellers share the price */
  split?: number;
  note?: string;
}

// Flights and rooms are booked and paid for both travellers at once: the table holds the whole price.
const SHARED = new Set(["飛機", "住宿"]);
/** How many travellers share a row's price (分攤人數 in Notion, else 2 for flights and stays). */
export const splitOf = (n: Pick<NotionExpense, "split" | "sub">): number =>
  n.split && n.split >= 1 ? Math.round(n.split) : SHARED.has(n.sub) ? 2 : 1;

const STATUSES: ExpenseStatus[] = ["fixed", "est", "blank"];
const asSub = (s: string): ExpenseSub => (s in CAT_OF ? (s as ExpenseSub) : "雜支");

/** Notion 旅費 rows, grouped in table order. */
export function buildExpenseGroups(notionRows: NotionExpense[]): ExpenseGroup[] {
  const groups: ExpenseGroup[] = [];
  for (const n of notionRows) {
    let g = groups.find((x) => x.title === n.group);
    if (!g) groups.push((g = { id: `g${groups.length}`, date: n.date, title: n.group, rows: [] }));
    const sub = asSub(n.sub);
    const split = splitOf(n);
    const total = n.low ?? (n.twd !== undefined ? toYen(n.twd) : undefined);
    let low = total === undefined ? undefined : Math.round(total / split);
    let high = n.high === undefined ? low : Math.round(n.high / split);
    // Food is budgeted at its top figure: no ranges for meals, snacks and drinks.
    if (CAT_OF[sub] === "飲食" && high !== undefined) low = high;
    g.rows.push({
      id: n.id,
      cat: CAT_OF[sub],
      sub,
      item: n.item,
      note: n.note,
      low,
      high,
      twd: n.twd,
      total: split > 1 ? total : undefined,
      split,
      status: STATUSES.includes(n.status as ExpenseStatus) ? (n.status as ExpenseStatus) : low === undefined ? "blank" : "est",
    });
  }
  return groups;
}

export const STATUS_LABEL: Record<ExpenseStatus, string> = {
  fixed: "確定",
  est: "預估",
  blank: "未填",
};
