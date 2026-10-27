import { Fragment } from "react";
import { flights, lodges, trip } from "../data/trip";
import {
  FlightBackIcon,
  FlightOutIcon,
  HeroArt,
} from "../illustrations/legacy";

const SNOW = ["", "", "leaf", "", "", "", "leaf g", "", "", "leaf", "", ""];

export function Hero() {
  return (
    <header className="hero">
      <span className="tape" aria-hidden="true"></span>
      <span className="tape r" aria-hidden="true"></span>
      <div className="hero-art" aria-hidden="true">
        <HeroArt />
        <div className="m-snow" aria-hidden="true">
          {SNOW.map((c, i) => (
            <i key={i} className={c || undefined}></i>
          ))}
        </div>
      </div>
      <div className="hero-body">
        <p className="eyebrow">{trip.eyebrow}</p>
        <h1>
          {trip.titleBefore}
          <em>{trip.titleEm}</em>
          {trip.titleAfter}
        </h1>
        <div className="route" aria-label="路線">
          {trip.route.map((stop, i) => (
            <Fragment key={stop}>
              {i > 0 && <span className="arr">›</span>}
              <span className="stop">{stop}</span>
            </Fragment>
          ))}
        </div>
        <div className="flights">
          {flights.map((f) => (
            <div className="flight" key={f.label}>
              {f.dir === "out" ? <FlightOutIcon /> : <FlightBackIcon />}
              <div>
                <small>{f.label}</small>
                <b>{f.route}</b>
              </div>
            </div>
          ))}
        </div>
        <div className="lodges" aria-label="住宿">
          {lodges.map((l) => (
            <div className="lodge" key={l.name}>
              <small>{l.when}</small>
              <b>{l.name}</b>
            </div>
          ))}
        </div>
        <p className="notice">{trip.notice}</p>
      </div>
    </header>
  );
}
