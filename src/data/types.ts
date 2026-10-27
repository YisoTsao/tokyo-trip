/** Inline rich text: plain strings mixed with a few inline elements. */
export type Rich = Array<string | RichNode>;
export interface RichNode {
  tag: "a" | "em" | "b" | "small" | "br" | "span";
  href?: string;
  className?: string;
  children?: Rich;
}

export type MapId = "shiramap" | "busmap";

export type TimetableItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "map"; label: string; dialog: MapId };

/** One child of a timeline entry's `.what` column, in source order. */
export type TimelinePart =
  | { k: "text"; rich: Rich }
  | { k: "em"; rich: Rich }
  | { k: "xfer"; title: string; steps: string[] }
  | { k: "links"; items: TimetableItem[] };

/**
 * How sure a transport time is. Never show an estimate as `confirmed`.
 * - confirmed: a specific flight / train / bus run checked against the operator's current timetable
 * - reference: a planning slot, a time with 約, or one read off a route planner
 * - tbc: the operator says the run may change or must be checked again before the day
 */
export type TimeStatus = "confirmed" | "reference" | "tbc";

export type TransportMode =
  | "plane"
  | "shinkansen"
  | "train"
  | "tram"
  | "trolley"
  | "cablecar"
  | "ropeway"
  | "bus"
  | "walk"
  | "taxi";

export type ActivityMode =
  | "sunrise"
  | "hotel"
  | "bag"
  | "wait"
  | "meal"
  | "sight"
  | "onsen"
  | "shop";

export interface TimelineItem {
  time: string;
  /** key = highlight, ref = reference schedule, sug = optional suggestion */
  flags: string[];
  parts: TimelinePart[];
  /** journal layout only: icon for the entry */
  mode?: TransportMode | ActivityMode;
  /** journal layout only: set on every transport entry */
  status?: TimeStatus;
}

export interface BookingInfo {
  item: string;
  price?: string;
  how: string;
  /** true when booking ahead is needed */
  reserve?: boolean;
  /** already covered by another ticket on the same day */
  included?: boolean;
}

/** Extra content for the journal day page. */
export interface DayJournal {
  theme: string;
  place: string;
  stay: string;
  /** text around the postmark on the day illustration */
  stamp?: string;
  booking: BookingInfo[];
  /** what to do if weather or transport breaks the plan */
  backup: { title: string; items: Rich[]; draft?: boolean };
}

export interface TableCell {
  rich: Rich;
  className?: string;
  align?: string;
}

export type BoxBlock =
  | { k: "p"; rich: Rich }
  | { k: "src"; rich: Rich }
  | { k: "ul"; items: Rich[] }
  | {
      k: "table";
      head: TableCell[];
      rows: { sum?: boolean; cells: TableCell[] }[];
    };

export interface InfoBox {
  kind: string;
  title: string;
  blocks: BoxBlock[];
}

export interface Day {
  id: string;
  n: number;
  date: string;
  title: string;
  tags: { label: string; kind?: string }[];
  lead: string;
  timeline: TimelineItem[];
  boxes: InfoBox[];
  journal?: DayJournal;
}

export interface Flight {
  label: string;
  route: string;
  dir: "out" | "back";
}

export interface Lodge {
  when: string;
  name: string;
}

export interface DayStripItem {
  target: string;
  date: string;
  place: string;
  stay: string;
}

export interface Hotel {
  date: string;
  name: string;
  jp?: string;
  rows: { label: string; value: Rich }[];
}

export interface TimetableLink {
  href: string;
  /** day numbers this timetable matters for */
  days?: number[];
  icon: string;
  title: string;
  desc: string;
  go: string;
  alt?: string;
}

export interface MapDialogData {
  id: MapId;
  title: string;
  pins: { icon: string; rich: Rich }[];
  images: { src: string; alt: string; width: number; height: number }[];
  /** true: images sit side by side in a two-column grid */
  pair?: boolean;
}

export interface CheckItem {
  id: string;
  label: string;
  note?: string;
}

export interface ChecklistLeg {
  when: string;
  whenNote: string;
  kind: string;
  kindClass?: string;
  title: string;
  note: string;
  free?: boolean;
  checks: CheckItem[];
}

export type ChecklistRow = { group: string } | ChecklistLeg;

export interface ChecklistSheet {
  id: string;
  title: string;
  layout: "legs" | "pack";
  rows?: ChecklistRow[];
  groups?: { title: string; wide?: boolean; items: CheckItem[] }[];
  tip?: { title: string; items: string[] };
}
