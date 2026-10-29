import { useLocalStorage } from "./useLocalStorage";

/** The traveller's own amounts by expense row id, in yen. */
export type MyAmounts = Record<string, number>;

export const EXPENSES_KEY = "tokyo-trip-expenses-v1";

export function useExpenses() {
  const [stored, save] = useLocalStorage<MyAmounts>(EXPENSES_KEY);
  const mine = stored as MyAmounts;

  function setAmount(id: string, yen: number | null) {
    const next = { ...mine };
    if (yen === null) delete next[id];
    else next[id] = yen;
    save(next);
  }

  return { mine, setAmount, reset: () => save({}) };
}
