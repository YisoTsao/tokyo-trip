// The Notion tables, live. The page starts from the snapshot baked in at build time
// (notion/*.json, written by scripts/sync-notion.mjs), then asks api/trip.js on Vercel for the
// current tables: on load, whenever the tab comes back into view, and every 30 s while it is open.
// Edits made on the page (實付 amounts, booking ticks) are POSTed back to Notion through the same function.
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
  /** checklist ids that live in Notion (and so are written back there) */
  checkIds: Set<string>;
  /** when the live tables were last read; undefined while showing the build snapshot */
  fetchedAt?: string;
}

// Writes this page just made. Laid over what Notion returns for a little while, because the API's
// few seconds of edge cache can still hand back the table from before the write.
const PATCH_MS = 20_000;
const expensePatches = new Map<string, { paid: number | null; cur: string; at: number }>();
const checkPatches = new Map<string, { done: boolean; at: number }>();

function withPatches(expenses: NotionExpense[], bookings: NotionBooking[]) {
  const now = Date.now();
  for (const [id, p] of expensePatches) if (now - p.at > PATCH_MS) expensePatches.delete(id);
  for (const [id, p] of checkPatches) if (now - p.at > PATCH_MS) checkPatches.delete(id);
  if (!expensePatches.size && !checkPatches.size) return { expenses, bookings };
  return {
    expenses: expenses.map((e) => {
      const p = expensePatches.get(e.id);
      return p ? { ...e, paid: p.paid ?? undefined, paidCur: p.paid === null ? undefined : p.cur } : e;
    }),
    bookings: bookings.map((b) =>
      b.checks.some((c) => checkPatches.has(c.id))
        ? { ...b, checks: b.checks.map((c) => (checkPatches.has(c.id) ? { ...c, done: checkPatches.get(c.id)!.done || undefined } : c)) }
        : b,
    ),
  };
}

function make(rawExpenses: NotionExpense[], rawBookings: NotionBooking[], fetchedAt?: string): Trip {
  const { expenses, bookings } = withPatches(rawExpenses, rawBookings);
  return {
    expenses,
    expenseGroups: buildExpenseGroups(expenses),
    checklist: buildChecklist(bookings),
    doneInNotion: doneOf(bookings),
    checkIds: new Set(bookings.flatMap((b) => b.checks.map((c) => c.id))),
    fetchedAt,
  };
}

let raw = { expenses: snapshotExpenses as NotionExpense[], bookings: snapshotBookings as NotionBooking[] };
let trip = make(raw.expenses, raw.bookings);
let lastBody = "";
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

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
      if (body === lastBody && !expensePatches.size && !checkPatches.size) {
        trip = { ...trip, fetchedAt: data.fetchedAt };
      } else {
        lastBody = body;
        raw = { expenses: data.expenses, bookings: data.bookings };
        trip = make(raw.expenses, raw.bookings, data.fetchedAt);
      }
      notify();
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

// ---- Writing back to Notion ----

export type SyncState = "idle" | "saving" | "saved" | "error";
let sync: { state: SyncState; at?: number } = { state: "idle" };
const syncListeners = new Set<() => void>();
function setSync(state: SyncState) {
  sync = { state, at: Date.now() };
  syncListeners.forEach((l) => l());
}
let pending = 0;
const subscribeSync = (l: () => void) => {
  syncListeners.add(l);
  return () => syncListeners.delete(l);
};
/** Whether the page's last edits reached Notion. */
export const useSyncState = () => useSyncExternalStore(subscribeSync, () => sync, () => sync);

async function post(body: object): Promise<boolean> {
  pending++;
  setSync("saving");
  try {
    const res = await fetch(TRIP_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (--pending === 0) setSync(res.ok ? "saved" : "error");
    return res.ok;
  } catch {
    if (--pending === 0) setSync("error");
    return false;
  }
}

/** Lay a just-written value over the current tables so every view shows it at once. */
function relayer() {
  trip = make(raw.expenses, raw.bookings, trip.fetchedAt);
  notify();
}

const expenseTimers = new Map<string, { timer: ReturnType<typeof setTimeout>; resolve: (ok: boolean) => void }>();
/**
 * Write 實付 (the whole amount paid, in its currency) for one 旅費 row. Typing is debounced so only the
 * finished number is sent. Resolves true once Notion has it; false offline, without the API, or on error.
 */
export function saveExpense(id: string, paid: number | null, cur: "JPY" | "TWD"): Promise<boolean> {
  if (!TRIP_API || !trip.expenses.some((e) => e.id === id)) return Promise.resolve(false);
  const before = expenseTimers.get(id);
  if (before) {
    clearTimeout(before.timer);
    before.resolve(false); // replaced by this newer number
  }
  return new Promise((resolve) => {
    expenseTimers.set(id, {
      resolve,
      timer: setTimeout(async () => {
        expenseTimers.delete(id);
        const ok = await post({ type: "expense", id, paid, cur });
        if (ok) {
          expensePatches.set(id, { paid, cur, at: Date.now() });
          relayer();
        }
        resolve(ok);
      }, 800),
    });
  });
}

/** Tick or untick a booking 待辦 in Notion. Resolves true once Notion has it. */
export async function saveCheck(id: string, done: boolean): Promise<boolean> {
  if (!TRIP_API || !trip.checkIds.has(id)) return false;
  const ok = await post({ type: "check", id, done });
  if (ok) {
    checkPatches.set(id, { done, at: Date.now() });
    relayer();
  }
  return ok;
}
