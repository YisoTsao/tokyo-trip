// Vercel function: the live Notion tables for the GitHub Pages site.
// Holds NOTION_TOKEN server-side; the page fetches this on load and when it comes back into view.
import { BOOKINGS_DB, EXPENSES_DB, fetchTripData } from "../scripts/notion-normalize.mjs";

const ALLOWED = ["https://yisotsao.github.io", "http://localhost:5173", "http://localhost:4173"];

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  if (req.method === "OPTIONS") return res.status(204).end();

  const token = process.env.NOTION_TOKEN;
  if (!token) return res.status(500).json({ error: "NOTION_TOKEN is not set on this Vercel project." });

  try {
    const data = await fetchTripData(token, EXPENSES_DB, BOOKINGS_DB);
    // A few seconds of edge cache keeps Notion's rate limit safe while edits still show up almost at once.
    res.setHeader("Cache-Control", "public, s-maxage=5, stale-while-revalidate=10");
    return res.status(200).json({ ...data, fetchedAt: new Date().toISOString() });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "Could not read Notion." });
  }
}
