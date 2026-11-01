import { useTrip } from "../data/live";
import { useLocalStorage } from "./useLocalStorage";

/** 1 = ticked; 0 = a ticked-by-default item the traveller unticked. */
export type Checked = Record<string, 0 | 1>;

// Same key and shape as the original page ({ c1: 1, k3: 1, ... }), so existing ticks keep loading.
export const CHECKLIST_KEY = "tokyo-trip-checklist-v1";

export function useChecklist() {
  // Ticked in the Notion 交通與住宿預訂 table (e.g. the Shirakawa-go buses, already booked).
  const TICKED_BY_DEFAULT: Checked = useTrip().doneInNotion;
  const [stored, save] = useLocalStorage<Checked>(CHECKLIST_KEY);
  const own = stored as Checked;
  const checked: Checked = { ...TICKED_BY_DEFAULT, ...own };

  function toggle(id: string, on: boolean) {
    const next = { ...own };
    if (on) next[id] = 1;
    else if (id in TICKED_BY_DEFAULT) next[id] = 0;
    else delete next[id];
    save(next);
  }

  return { checked, toggle, reset: () => save({}) };
}
