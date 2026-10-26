import { Link } from "react-router-dom";
import { checklist } from "../../data/checklist";
import { reminders } from "../../data/reminders";
import { useChecklist } from "../../hooks/useChecklist";
import { sheetItems } from "../Checklist";
import { SectionHeading } from "./ui";

const DAY = 86_400_000;
/** Midnight today in Japan, so countdowns don't flip at the wrong hour for the trip. */
function todayJST() {
  const now = new Date(Date.now() + 9 * 3_600_000);
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

function Ring({ pct }: { pct: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true">
      <circle
        cx="38"
        cy="38"
        r={r}
        fill="none"
        stroke="var(--c-paper-2)"
        strokeWidth="9"
      />
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

export function PrepProgress() {
  const { checked } = useChecklist();
  const sheets = checklist.map((s) => {
    const items = sheetItems(s);
    return {
      id: s.id,
      title: s.title,
      total: items.length,
      done: items.filter((i) => checked[i.id]).length,
    };
  });
  const total = sheets.reduce((a, s) => a + s.total, 0);
  const done = sheets.reduce((a, s) => a + s.done, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;

  const today = todayJST();
  const upcoming = reminders
    .map((r) => ({
      ...r,
      left: Math.round((Date.parse(r.date) - today) / DAY),
    }))
    .filter(
      (r) =>
        r.left >= 0 && !(r.doneWhen && r.doneWhen.every((id) => checked[id])),
    )
    .slice(0, 4);

  return (
    <section aria-labelledby="prep-title">
      <SectionHeading
        kicker="Before we go"
        title="行前準備"
        id="prep-title"
        sub="勾選記錄來自行前清單，存在這台裝置。"
      />
      <div className="j-prep">
        <div className="j-card">
          <div className="j-ring" style={{ marginBottom: 16 }}>
            <Ring pct={pct} />
            <div>
              <div className="j-ring__pct j-num">{pct}%</div>
              <div
                className="j-num"
                style={{ fontSize: 13, color: "var(--c-ink-soft)" }}
              >
                已完成 {done} / {total} 項
              </div>
            </div>
          </div>
          <div className="j-meters">
            {sheets.map((s) => (
              <div
                key={s.id}
                className={`j-meter${s.total && s.done === s.total ? " j-meter--done" : ""}`}
              >
                <div className="j-meter__row">
                  <b>{s.title}</b>
                  <span className="j-num">
                    {s.done} / {s.total}
                  </span>
                </div>
                <div
                  className="j-meter__track"
                  role="progressbar"
                  aria-label={s.title}
                  aria-valuemin={0}
                  aria-valuemax={s.total}
                  aria-valuenow={s.done}
                >
                  <div
                    className="j-meter__fill"
                    style={{
                      width: `${s.total ? (s.done / s.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 18 }}>
            <Link className="j-btn" to="/checklist">
              打開行前清單
            </Link>
          </p>
        </div>
        <div className="j-card j-card--sticky j-tone-ginkgo">
          <h3 style={{ fontSize: 18, marginBottom: 12 }}>接下來的期限</h3>
          {upcoming.length ? (
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
          ) : (
            <p>沒有待辦的期限了，旅途愉快。</p>
          )}
        </div>
      </div>
    </section>
  );
}
