// Vercel function: the live Notion tables for the GitHub Pages site.
// Holds NOTION_TOKEN server-side.
//   GET  -> both tables, read by the page on load, on refocus and every 30 s.
//   POST -> one edit made on the page, written back to Notion:
//           { type: "expense", id: "e-fl-out", paid: 12000 | null, cur: "JPY" | "TWD" }
//           { type: "check", id: "c1", done: true }
import { BOOKINGS_DB, EXPENSES_DB, fetchTripData, updateCheck, updateExpense } from "../scripts/notion-normalize.mjs";

const ALLOWED = ["https://yisotsao.github.io", "http://localhost:5173", "http://localhost:4173"];
const ID = /^[a-z0-9-]{1,40}$/i;

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Vary", "Origin");
  }
  if (req.method === "OPTIONS") return res.status(204).end();

  const token = process.env.NOTION_TOKEN;
  if (!token) return res.status(500).json({ error: "NOTION_TOKEN is not set on this Vercel project." });

  if (req.method === "POST") {
    // Writes only from the trip site (a browser elsewhere cannot send this Origin).
    if (!ALLOWED.includes(origin)) return res.status(403).json({ error: "origin not allowed" });
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
    try {
      if (body.type === "expense" && ID.test(body.id ?? "")) {
        const paid = body.paid === null ? null : Number(body.paid);
        if (paid !== null && !(Number.isFinite(paid) && paid >= 0 && paid < 1e8)) return res.status(400).json({ error: "bad amount" });
        await updateExpense(token, EXPENSES_DB, body.id, paid, body.cur === "TWD" ? "TWD" : "JPY");
      } else if (body.type === "check" && ID.test(body.id ?? "") && typeof body.done === "boolean") {
        await updateCheck(token, BOOKINGS_DB, body.id, body.done);
      } else {
        return res.status(400).json({ error: "bad request" });
      }
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      return res.status(502).json({ error: "Could not write to Notion." });
    }
  }

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
