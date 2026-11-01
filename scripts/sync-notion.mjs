// Pull the trip's Notion tables into src/data/notion/*.json before the site is built.
// This snapshot is what the page shows first; it then asks api/trip.js on Vercel for the live tables.
// Needs NOTION_TOKEN; without it the committed snapshot is left alone, so local builds still work.
import { writeFile } from "node:fs/promises";
import { BOOKINGS_DB, EXPENSES_DB, dbId, fetchTripData } from "./notion-normalize.mjs";

const token = process.env.NOTION_TOKEN;
const OUT = new URL("../src/data/notion/", import.meta.url);

if (!token) {
  console.log("sync-notion: NOTION_TOKEN not set, keeping the committed snapshot.");
  process.exit(0);
}

const { expenses, bookings } = await fetchTripData(
  token,
  dbId(process.env.NOTION_EXPENSES_DB) || EXPENSES_DB,
  dbId(process.env.NOTION_BOOKINGS_DB) || BOOKINGS_DB,
);
if (!expenses.length || !bookings.length) throw new Error("sync-notion: a Notion table came back empty, not overwriting the snapshot.");

await writeFile(new URL("expenses.json", OUT), JSON.stringify(expenses, null, 2) + "\n");
await writeFile(new URL("bookings.json", OUT), JSON.stringify(bookings, null, 2) + "\n");
console.log(`sync-notion: ${expenses.length} expense rows, ${bookings.length} bookings.`);
