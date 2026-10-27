import { useLocalStorage } from "./useLocalStorage";

export type Checked = Record<string, 1>;

// Same key and shape as the original page ({ c1: 1, k3: 1, ... }), so existing ticks keep loading.
export const CHECKLIST_KEY = "tokyo-trip-checklist-v1";

export function useChecklist() {
  const [stored, save] = useLocalStorage<Checked>(CHECKLIST_KEY);
  const checked = stored as Checked;

  function toggle(id: string, on: boolean) {
    const next = { ...checked };
    if (on) next[id] = 1;
    else delete next[id];
    save(next);
  }

  return { checked, toggle, reset: () => save({}) };
}
