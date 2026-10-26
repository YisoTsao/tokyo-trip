import { DayCards } from "../components/journal/DayCards";
import { HomeHero } from "../components/journal/HomeHero";
import { JournalLayout } from "../components/journal/JournalLayout";
import { PrepProgress } from "../components/journal/PrepProgress";
import { RouteMap } from "../components/journal/RouteMap";
import { TripSummary } from "../components/journal/TripSummary";
import { SectionHeading, StatusLegend } from "../components/journal/ui";
import { trip } from "../data/trip";

export function HomePage() {
  return (
    <JournalLayout>
      <HomeHero />

      <section aria-labelledby="days-title">
        <SectionHeading
          kicker="Seven days"
          title="七日行程"
          id="days-title"
          sub="點一天打開當日的時間軸、票價與備案。"
        />
        <DayCards />
      </section>

      <TripSummary />

      <section aria-labelledby="route-title">
        <SectionHeading kicker="The route" title="旅遊路線" id="route-title" />
        <RouteMap />
      </section>

      <PrepProgress />

      <section className="j-card j-card--plain" aria-labelledby="legend-title">
        <h2
          className="j-callout__title"
          id="legend-title"
          style={{ marginBottom: 10 }}
        >
          時間怎麼看
        </h2>
        <StatusLegend />
        <p
          style={{ marginTop: 12, fontSize: 13.5, color: "var(--c-ink-soft)" }}
        >
          {trip.notice}
        </p>
      </section>
    </JournalLayout>
  );
}
