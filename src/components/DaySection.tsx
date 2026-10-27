import type { Day } from "../data/types";
import { dayMinis } from "../illustrations/legacy";
import { InfoBox } from "./InfoBox";
import { NotePad } from "./NotePad";
import { Timeline } from "./Timeline";

export function DaySection({ day }: { day: Day }) {
  const Mini = dayMinis[day.n - 1];
  return (
    <section className="day" id={day.id}>
      <div className="day-head">
        <div className="badge">
          <small>DAY</small>
          <b>{day.n}</b>
        </div>
        <div className="t">
          <p className="date">{day.date}</p>
          <h2>{day.title}</h2>
          <div className="tags">
            {day.tags.map((t) => (
              <span key={t.label} className={t.kind ? `tag ${t.kind}` : "tag"}>
                {t.label}
              </span>
            ))}
          </div>
        </div>
        {Mini && <Mini />}
      </div>
      <div className="day-body">
        <p className="lead">{day.lead}</p>
        <Timeline items={day.timeline} />
        {day.boxes.map((b, i) => (
          <InfoBox key={i} box={b} />
        ))}
        <NotePad id={day.id} n={day.n} />
      </div>
    </section>
  );
}
