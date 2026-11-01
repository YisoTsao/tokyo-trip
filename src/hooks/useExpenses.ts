import type { ExpenseRow } from "../data/expenses";
import { useMemo } from "react";
import { useTrip } from "../data/live";
import type { NotionExpense } from "../data/expenses";
import { toTwd, toYen } from "../lib/currency";
import { useLocalStorage } from "./useLocalStorage";

export { TWD_PER_JPY, toTwd, toYen } from "../lib/currency";

/** The traveller's own amounts by expense row id, in yen (NT$ entries are stored converted). */
export type MyAmounts = Record<string, number>;
export type Currency = "JPY" | "TWD";

export const EXPENSES_KEY = "tokyo-trip-expenses-v1";
const CURRENCY_KEY = "tokyo-trip-expenses-currency-v1";
const TWD_KEY = "tokyo-trip-expenses-twd-v1";


// Flights, stays and insurance are usually paid from Taiwan, so they start in NT$.
const TWD_FIRST = new Set<ExpenseRow["sub"]>(["飛機", "住宿", "通訊保險"]);
export const defaultCurrency = (row: ExpenseRow): Currency => (TWD_FIRST.has(row.sub) ? "TWD" : "JPY");

// 實付 entered in the Notion 旅費 table: shared by everyone, and the starting point for this device.
// What the traveller types on the page is kept in this browser and wins over the Notion amount.
function paidInNotion(rows: NotionExpense[]) {
  const paid = rows.filter((r) => r.paid !== undefined);
  const isTwd = (r: NotionExpense) => r.paidCur === "TWD";
  return {
    yen: Object.fromEntries(paid.map((r) => [r.id, isTwd(r) ? toYen(r.paid!) : r.paid!])) as MyAmounts,
    twd: Object.fromEntries(paid.filter(isTwd).map((r) => [r.id, r.paid!])) as Record<string, number>,
    cur: Object.fromEntries(paid.map((r) => [r.id, isTwd(r) ? "TWD" : "JPY"])) as Record<string, Currency>,
  };
}

export function useExpenses() {
  const { expenses } = useTrip();
  const notion = useMemo(() => paidInNotion(expenses), [expenses]);
  const [stored, save] = useLocalStorage<MyAmounts>(EXPENSES_KEY);
  const [currencies, saveCurrencies] = useLocalStorage<Record<string, Currency>>(CURRENCY_KEY);
  const [twdStored, saveTwd] = useLocalStorage<Record<string, number>>(TWD_KEY);
  const ownYen = stored as MyAmounts;
  const ownTwd = twdStored as Record<string, number>;
  const mine: MyAmounts = { ...notion.yen, ...ownYen };
  const twd: Record<string, number> = { ...notion.twd, ...ownTwd };

  const currencyOf = (row: ExpenseRow): Currency => currencies[row.id] ?? notion.cur[row.id] ?? defaultCurrency(row);

  /** The number as the traveller typed it, in the row's currency. */
  const entered = (row: ExpenseRow): number | undefined =>
    currencyOf(row) === "TWD" ? (twd[row.id] ?? (mine[row.id] !== undefined ? toTwd(mine[row.id]) : undefined)) : mine[row.id];

  function write(id: string, value: number | null, cur: Currency) {
    const nextYen = { ...ownYen };
    const nextTwd = { ...ownTwd };
    delete nextTwd[id];
    if (value === null) delete nextYen[id];
    else if (cur === "TWD") {
      nextTwd[id] = value;
      nextYen[id] = toYen(value);
    } else nextYen[id] = value;
    save(nextYen);
    saveTwd(nextTwd);
  }

  const setAmount = (row: ExpenseRow, value: number | null) => write(row.id, value, currencyOf(row));

  /** Switching keeps the typed number and reads it in the new currency. */
  function setCurrency(row: ExpenseRow, cur: Currency) {
    const value = entered(row);
    saveCurrencies({ ...currencies, [row.id]: cur });
    if (value !== undefined) write(row.id, value, cur);
  }

  return {
    mine,
    currencyOf,
    entered,
    setAmount,
    setCurrency,
    reset: () => {
      save({});
      saveTwd({});
    },
  };
}
