// The Notion tables, live. The page starts from the snapshot baked in at build time
// (notion/*.json, written by scripts/sync-notion.mjs), then asks api/trip.js on Vercel for the
// current tables: on load, whenever the tab comes back into view, and every 30 s while it is open.
import { useEffect, useSyncExternalStore } from "react";
import { buildChecklist, doneOf, type NotionBooking } from "./checklist";
import { buildExpenseGroups, type ExpenseGroup, type NotionExpense } from "./expenses";
import snapshotBookings from "./notion/bookings.json";
import snapshotExpenses from "./notion/expenses.json";
import type { ChecklistSheet } from "./types";

/** The Vercel function that serves the live tables; empty means "show the build snapshot only". */
export const TRIP_API: string = import.meta.env.VITE_TRIP_API ?? "";
const POLL_MS = 30_000;

export interface Trip {
  expenses: NotionExpense[];
  expenseGroups: ExpenseGroup[];
  checklist: ChecklistSheet[];
  /** checklist ids ticked in Notion */
  doneInNotion: Record<string, 1>;
  /** when the live tables were last read; undefined while showing the build snapshot */
  fetchedAt?: string;
}

function make(expenses: NotionExpense[], bookings: NotionBooking[], fetchedAt?: string): Trip {
  return { expenses, expenseGroups: buildExpenseGroups(expenses), checklist: buildChecklist(bookings), doneInNotion: doneOf(bookings), fetchedAt };
}

let trip = make(snapshotExpenses as NotionExpense[], snapshotBookings as NotionBooking[]);
let lastBody = "";
const listeners = new Set<() => void>();

export const currentTrip = () => trip;

let inflight: Promise<void> | null = null;
export function refreshTrip(): Promise<void> {
  if (!TRIP_API) return Promise.resolve();
  inflight ??= (async () => {
    try {
      const res = await fetch(TRIP_API, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (!Array.isArray(data.expenses) || !Array.isArray(data.bookings) || !data.expenses.length || !data.bookings.length) return;
      const body = JSON.stringify([data.expenses, data.bookings]);
      if (body === lastBody) {
        trip = { ...trip, fetchedAt: data.fetchedAt };
      } else {
        lastBody = body;
        trip = make(data.expenses, data.bookings, data.fetchedAt);
      }
      listeners.forEach((l) => l());
    } catch {
      // Offline or the API is down: keep showing what we have.
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

let watching = 0;
/** Re-read Notion while at least one component that shows its data is on screen. */
function useWatch() {
  useEffect(() => {
    if (watching++ === 0) startWatching();
    return () => {
      if (--watching === 0) stopWatching();
    };
  }, []);
}

let timer: ReturnType<typeof setInterval> | undefined;
const onVisible = () => {
  if (document.visibilityState === "visible") void refreshTrip();
};
function startWatching() {
  void refreshTrip();
  document.addEventListener("visibilitychange", onVisible);
  timer = setInterval(() => {
    if (document.visibilityState === "visible") void refreshTrip();
  }, POLL_MS);
}
function stopWatching() {
  document.removeEventListener("visibilitychange", onVisible);
  clearInterval(timer);
}

/** The trip's Notion data, re-rendering when a newer copy arrives. */
export function useTrip(): Trip {
  useWatch();
  return useSyncExternalStore(subscribe, currentTrip, currentTrip);
}
