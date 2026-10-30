import type { ExpenseRow } from "../data/expenses";
import { useLocalStorage } from "./useLocalStorage";

/** The traveller's own amounts by expense row id, in yen (NT$ entries are stored converted). */
export type MyAmounts = Record<string, number>;
export type Currency = "JPY" | "TWD";

export const EXPENSES_KEY = "tokyo-trip-expenses-v1";
const CURRENCY_KEY = "tokyo-trip-expenses-currency-v1";
const TWD_KEY = "tokyo-trip-expenses-twd-v1";

/** Fixed planning rate: NT$ per ¥1. */
export const TWD_PER_JPY = 0.21;
export const toYen = (twd: number) => Math.round(twd / TWD_PER_JPY);
export const toTwd = (jpy: number) => Math.round(jpy * TWD_PER_JPY);

// Flights, stays and insurance are usually paid from Taiwan, so they start in NT$.
const TWD_FIRST = new Set<ExpenseRow["sub"]>(["飛機", "住宿", "通訊保險"]);
export const defaultCurrency = (row: ExpenseRow): Currency => (TWD_FIRST.has(row.sub) ? "TWD" : "JPY");

export function useExpenses() {
  const [stored, save] = useLocalStorage<MyAmounts>(EXPENSES_KEY);
  const [currencies, saveCurrencies] = useLocalStorage<Record<string, Currency>>(CURRENCY_KEY);
  const [twdStored, saveTwd] = useLocalStorage<Record<string, number>>(TWD_KEY);
  const mine = stored as MyAmounts;
  const twd = twdStored as Record<string, number>;

  const currencyOf = (row: ExpenseRow): Currency => currencies[row.id] ?? defaultCurrency(row);

  /** The number as the traveller typed it, in the row's currency. */
  const entered = (row: ExpenseRow): number | undefined =>
    currencyOf(row) === "TWD" ? (twd[row.id] ?? (mine[row.id] !== undefined ? toTwd(mine[row.id]) : undefined)) : mine[row.id];

  function write(id: string, value: number | null, cur: Currency) {
    const nextYen = { ...mine };
    const nextTwd = { ...twd };
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
