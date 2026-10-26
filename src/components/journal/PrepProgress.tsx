import { Link } from "react-router-dom";
import { useChecklist } from "../../hooks/useChecklist";
import { Meter, ReminderList, Ring, progressOf } from "./Progress";
import { SectionHeading } from "./ui";

export function PrepProgress() {
  const { checked } = useChecklist();
  const { sheets, total, done, pct } = progressOf(checked);

  return (
    <section aria-labelledby="prep-title">
      <SectionHeading kicker="Before we go" title="行前準備" id="prep-title" sub="勾選記錄來自行前清單，存在這台裝置。" />
      <div className="j-prep">
        <div className="j-card">
          <div className="j-ring" style={{ marginBottom: 16 }}>
            <Ring pct={pct} />
            <div>
              <div className="j-ring__pct j-num">{pct}%</div>
              <div className="j-num" style={{ fontSize: 13, color: "var(--c-ink-soft)" }}>
                已完成 {done} / {total} 項
              </div>
            </div>
          </div>
          <div className="j-meters">
            {sheets.map((s) => (
              <Meter key={s.id} label={s.title} done={s.done} total={s.total} />
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
          <ReminderList checked={checked} />
        </div>
      </div>
    </section>
  );
}
