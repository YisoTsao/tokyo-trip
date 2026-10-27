import { Navigate, useParams } from "react-router-dom";
import { DaySection } from "../components/DaySection";
import { BackupPlan, Callout } from "../components/journal/Callout";
import {
  BookingCard,
  DayHeader,
  DayPager,
  DayTabs,
  JournalNotePad,
  TimetableList,
} from "../components/journal/DayParts";
import { JournalLayout } from "../components/journal/JournalLayout";
import { JournalTimeline } from "../components/journal/JournalTimeline";
import { SectionHeading, StatusLegend } from "../components/journal/ui";
import { MapDialogProvider } from "../components/MapDialogs";
import { days } from "../data/days";

export function DayPage() {
  const n = Number(useParams().n);
  const day = days.find((d) => d.n === n);
  if (!day) return <Navigate to="/" replace />;
  const j = day.journal;

  return (
    <MapDialogProvider journal={!!j}>
      <JournalLayout belowNav={<DayTabs current={n} />}>
        {j ? (
          <>
            <DayHeader day={day} journal={j} />
            <p className="j-lead">{day.lead}</p>
            <div className="j-daygrid-layout">
              <section className="j-card" aria-labelledby="tl-title">
                <SectionHeading
                  kicker="Timeline"
                  title="當日行程"
                  id="tl-title"
                />
                <div style={{ marginBottom: 12 }}>
                  <StatusLegend />
                </div>
                <JournalTimeline items={day.timeline} />
              </section>
              <aside className="j-aside" aria-label="當日資訊">
                <BookingCard booking={j.booking} />
                {day.boxes.map((b, i) => (
                  <Callout key={i} box={b} />
                ))}
                <BackupPlan backup={j.backup} />
                <TimetableList n={day.n} />
              </aside>
            </div>
            <JournalNotePad day={day} />
          </>
        ) : (
          // Not redesigned yet: show the original layout for this day.
          <div className="trip" style={{ background: "transparent" }}>
            <div className="wrap" style={{ padding: 0 }}>
              <DaySection day={day} />
            </div>
          </div>
        )}
        <DayPager n={n} />
      </JournalLayout>
    </MapDialogProvider>
  );
}
