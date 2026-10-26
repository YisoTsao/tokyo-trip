import { DaySection } from "../components/DaySection";
import { DayStrip } from "../components/DayStrip";
import { Hero } from "../components/Hero";
import { HotelsSection } from "../components/HotelsSection";
import { MapDialogProvider } from "../components/MapDialogs";
import { PageNav } from "../components/PageNav";
import { TimetablesSection } from "../components/TimetablesSection";
import { days } from "../data/days";
import { hotels } from "../data/hotels";
import { timetables } from "../data/timetables";
import { dayStrip, trip } from "../data/trip";

export function ItineraryPage() {
  return (
    <MapDialogProvider>
      <div className="scroll-bar" aria-hidden="true"></div>
      <div className="trip">
        <div className="wrap">
          <PageNav />
          <Hero />
          <DayStrip items={dayStrip} />
          {days.map((d) => (
            <DaySection key={d.id} day={d} />
          ))}
          <HotelsSection hotels={hotels} />
          <TimetablesSection links={timetables} />
          <p className="foot">{trip.foot}</p>
        </div>
      </div>
    </MapDialogProvider>
  );
}
