import { checklist } from "../../data/checklist";
import { reminders } from "../../data/reminders";
import type { Checked } from "../../hooks/useChecklist";
import { sheetItems } from "../Checklist";

const DAY = 86_400_000;
/** Midnight today in Japan, so countdowns don't flip at the wrong hour for the trip. */
function todayJST() {
  const now = new Date(Date.now() + 9 * 3_600_000);
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

export function progressOf(checked: Checked) {
  const sheets = checklist.map((s) => {
    const items = sheetItems(s);
    return { id: s.id, title: s.title, total: items.length, done: items.filter((i) => checked[i.id]).length };
  });
  const total = sheets.reduce((a, s) => a + s.total, 0);
  const done = sheets.reduce((a, s) => a + s.done, 0);
  return { sheets, total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function Ring({ pct }: { pct: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true">
      <circle cx="38" cy="38" r={r} fill="none" stroke="var(--c-paper-2)" strokeWidth="9" />
      <circle
        cx="38"
        cy="38"
        r={r}
        fill="none"
        stroke="var(--c-rose)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${(c * pct) / 100} ${c}`}
        transform="rotate(-90 38 38)"
        filter="url(#j-pencil-sm)"
      />
    </svg>
  );
}

export function Meter({ label, done, total }: { label: string; done: number; total: number }) {
  return (
    <div className={`j-meter${total && done === total ? " j-meter--done" : ""}`}>
      <div className="j-meter__row">
        <b>{label}</b>
        <span className="j-num">{`${done} / ${total}`}</span>
      </div>
      <div className="j-meter__track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
        <div className="j-meter__fill" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
      </div>
    </div>
  );
}

/** Upcoming dated to-dos, hiding ones whose checklist items are already ticked. */
export function ReminderList({ checked, limit = 4 }: { checked: Checked; limit?: number }) {
  const today = todayJST();
  const upcoming = reminders
    .map((r) => ({ ...r, left: Math.round((Date.parse(r.date) - today) / DAY) }))
    .filter((r) => r.left >= 0 && !(r.doneWhen && r.doneWhen.every((id) => checked[id])))
    .slice(0, limit);
  if (!upcoming.length) return <p>沒有待辦的期限了，旅途愉快。</p>;
  return (
    <ul className="j-reminders">
      {upcoming.map((r) => (
        <li key={r.date + r.what}>
          <span className="j-reminders__date">
            <b className="j-num">{r.date.slice(5).replace("-", "/")}</b>
            <small>{r.left === 0 ? "今天" : `還有 ${r.left} 天`}</small>
          </span>
          <span className="j-reminders__what">
            {r.what}
            {r.note && <small>{r.note}</small>}
          </span>
        </li>
      ))}
    </ul>
  );
}
