// Priority for each checklist item, keyed by checkbox id (the ids are also the storage keys).
export type Priority = "must" | "rec" | "opt";

/** Mountain transport and operating checks: shown first, before everything else. */
export const highPriority = ["c11", "c12", "c13", "c7", "c8", "c65", "c69"];

const must = [
  // transport and stays that cannot be fixed on the day
  "c1", "c3", "c7", "c8", "c11", "c12", "c13", "c14", "c16", "c18", "c65", "c69", "c70",
  "c23", "c24", "c26", "c28", "c68",
  "c29", "c32", "c33",
  // packing
  "k1", "k2", "k3", "k4", "k8", "k11", "k12", "k14", "k15", "k17", "k19", "k20", "k21", "k22", "k31", "k47",
];

const opt = [
  "k6", "k9", "k10", "k13", "k16", "k18", "k24", "k30", "k32", "k36", "k39", "k44", "k51", "k57", "k58", "k59",
  "k60", "k61", "k62", "k64",
];

export function priorityOf(id: string): Priority {
  if (must.includes(id)) return "must";
  if (opt.includes(id)) return "opt";
  return "rec";
}

export const PRIORITY_LABEL: Record<Priority, string> = { must: "必要", rec: "建議", opt: "選配" };
