import type { ExpenseRow } from "../data/expenses";
import { useEffect, useMemo, useRef } from "react";
import { TRIP_API, saveExpense, useTrip } from "../data/live";
import { splitOf, type NotionExpense } from "../data/expenses";
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

// 實付 in the Notion 旅費 table is the whole amount paid, in the currency it was paid in, shared by
// everyone. What the traveller types on the page is written there too (data/live.ts saveExpense);
// this browser keeps the number only until Notion has it, or while the page is offline.
function paidInNotion(rows: NotionExpense[]) {
  const paid = rows.filter((r) => r.paid !== undefined);
  const isTwd = (r: NotionExpense) => r.paidCur === "TWD";
  return {
    yen: Object.fromEntries(paid.map((r) => [r.id, isTwd(r) ? toYen(r.paid!) : r.paid!])) as MyAmounts,
    twd: Object.fromEntries(paid.filter(isTwd).map((r) => [r.id, r.paid!])) as Record<string, number>,
    cur: Object.fromEntries(paid.map((r) => [r.id, isTwd(r) ? "TWD" : "JPY"])) as Record<string, Currency>,
    split: Object.fromEntries(rows.map((r) => [r.id, splitOf(r)])) as Record<string, number>,
  };
}

const without = <T extends object>(o: Partial<T>, id: string): Partial<T> => {
  const next = { ...o };
  delete (next as Record<string, unknown>)[id];
  return next;
};

export function useExpenses() {
  const { expenses } = useTrip();
  const notion = useMemo(() => paidInNotion(expenses), [expenses]);
  const [stored, save] = useLocalStorage<MyAmounts>(EXPENSES_KEY);
  const [currencies, saveCurrencies] = useLocalStorage<Record<string, Currency>>(CURRENCY_KEY);
  const [twdStored, saveTwd] = useLocalStorage<Record<string, number>>(TWD_KEY);
  const ownYen = stored as MyAmounts;
  const ownTwd = twdStored as Record<string, number>;
  /** whole amounts paid, in yen */
  const paidYen: MyAmounts = { ...notion.yen, ...ownYen };
  const twd: Record<string, number> = { ...notion.twd, ...ownTwd };
  /** each traveller's share, in yen: flights and stays are paid for two, so their amount is halved */
  const mine: MyAmounts = Object.fromEntries(
    Object.entries(paidYen).map(([id, v]) => [id, Math.round(v / (notion.split[id] ?? 1))]),
  );

  const currencyOf = (row: ExpenseRow): Currency => currencies[row.id] ?? notion.cur[row.id] ?? defaultCurrency(row);

  /** The number as the traveller typed it (the whole amount paid), in the row's currency. */
  const entered = (row: ExpenseRow): number | undefined =>
    currencyOf(row) === "TWD"
      ? (twd[row.id] ?? (paidYen[row.id] !== undefined ? toTwd(paidYen[row.id]) : undefined))
      : paidYen[row.id];

  /** Send one row to Notion; once it is there, this browser's copy is no longer needed. */
  function push(id: string, value: number | null, cur: Currency) {
    const yenValue = value === null ? undefined : cur === "TWD" ? toYen(value) : value;
    void saveExpense(id, value, cur).then((ok) => {
      if (!ok) return;
      save((prev) => (prev[id] === yenValue ? without(prev, id) : prev));
      saveTwd((prev) => (prev[id] === (cur === "TWD" && value !== null ? value : undefined) ? without(prev, id) : prev));
    });
  }

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
    push(id, value, cur);
  }

  // Numbers typed before the page wrote to Notion, or while it was offline: send them once.
  const sentOnLoad = useRef(false);
  useEffect(() => {
    if (sentOnLoad.current || !TRIP_API) return;
    sentOnLoad.current = true;
    for (const [id, v] of Object.entries(ownYen)) {
      if (notion.split[id] === undefined || notion.yen[id] === v) continue;
      const cur: Currency = ownTwd[id] !== undefined ? "TWD" : "JPY";
      push(id, cur === "TWD" ? ownTwd[id] : v, cur);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAmount = (row: ExpenseRow, value: number | null) => write(row.id, value, currencyOf(row));

  /** Switching keeps the typed number and reads it in the new currency. */
  function setCurrency(row: ExpenseRow, cur: Currency) {
    const value = entered(row);
    saveCurrencies({ ...currencies, [row.id]: cur });
    if (value !== undefined) write(row.id, value, cur);
  }

  return {
    mine,
    /** how many travellers share a row's price */
    splitOf: (row: ExpenseRow) => notion.split[row.id] ?? row.split,
    currencyOf,
    entered,
    setAmount,
    setCurrency,
    /** Forget the numbers this browser is still holding (what is already in Notion stays). */
    reset: () => {
      save({});
      saveTwd({});
    },
  };
}
