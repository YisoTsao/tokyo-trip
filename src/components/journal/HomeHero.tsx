import { trip } from "../../data/trip";
import { HeroScene } from "../../illustrations/journal/HeroScene";
import { Stamp, WashiTape } from "./ui";

export function HomeHero() {
  return (
    <section className="j-hero" aria-labelledby="hero-title">
      <div className="j-hero__art">
        <HeroScene />
        <WashiTape tone="sakura" />
        <Stamp top="TOYAMA · HOKURIKU · " date="11.26" />
      </div>
      <div className="j-hero__text">
        <span className="j-hero__kicker" aria-hidden="true">
          Hokuriku · Shinshu · Tokyo
        </span>
        <h1 className="j-hero__title" id="hero-title">
          {trip.titleBefore}
          <em>{trip.titleEm}</em>
          {trip.titleAfter}
        </h1>
        <p className="j-hero__date">
          <b className="j-num">2026.11.26（四）– 12.2（三）</b>
          <span>7 天 6 夜</span>
        </p>
        <ol className="j-route-line" aria-label="路線">
          {trip.route.map((stop) => (
            <li key={stop}>{stop}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
