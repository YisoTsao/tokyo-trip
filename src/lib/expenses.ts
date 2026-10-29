import type { ExpenseGroup, ExpenseRow } from "../data/expenses";
import type { MyAmounts } from "../hooks/useExpenses";

export interface Range {
  low: number;
  high: number;
  /** Rows with no amount yet: blank and not filled in by the traveller. */
  open: number;
}

/** A filled-in amount replaces the estimate; blank rows add nothing until filled. */
export function counted(row: ExpenseRow, mine: MyAmounts): { low: number; high: number } | null {
  const own = mine[row.id];
  if (own !== undefined) return { low: own, high: own };
  if (row.low === undefined || row.high === undefined) return null;
  return { low: row.low, high: row.high };
}

export function sum(rows: ExpenseRow[], mine: MyAmounts): Range {
  return rows.reduce<Range>(
    (acc, r) => {
      const c = counted(r, mine);
      if (!c) return { ...acc, open: acc.open + 1 };
      return { low: acc.low + c.low, high: acc.high + c.high, open: acc.open };
    },
    { low: 0, high: 0, open: 0 },
  );
}

export const allRows = (groups: ExpenseGroup[]) => groups.flatMap((g) => g.rows);

export const yen = (n: number) => "¥" + n.toLocaleString("en-US");

export function yenRange(low: number, high: number) {
  return low === high ? yen(low) : `${yen(low)}–${high.toLocaleString("en-US")}`;
}
