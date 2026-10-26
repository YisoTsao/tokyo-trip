import { hotels } from "../../data/hotels";
import { flights, lodges } from "../../data/trip";
import { Icon } from "../../illustrations/journal/icons";
import { SectionHeading, WashiTape, richToText } from "./ui";

/** "華航 CI370" → "CI370" */
const flightNo = (label: string) => label.match(/[A-Z]{2}\d+/)?.[0] ?? "";

export function TripSummary() {
  return (
    <section className="j-split" aria-label="航班與住宿">
      <div>
        <SectionHeading kicker="Flights" title="航班" />
        <div className="j-tickets">
          {flights.map((f) => (
            <div key={f.label} className="j-card j-card--ticket j-ticket">
              <div className="j-ticket__main">
                <span className="j-ticket__label">{f.label}</span>
                <span className="j-ticket__route j-num">{f.route}</span>
              </div>
              <div className="j-ticket__stub">
                <Icon
                  name="plane"
                  size={18}
                  style={
                    f.dir === "back" ? { transform: "scaleX(-1)" } : undefined
                  }
                />
                <b>{flightNo(f.label)}</b>
                <small>{f.dir === "out" ? "去程" : "回程"}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SectionHeading kicker="Stays" title="住宿" />
        <div className="j-card j-card--note">
          <WashiTape
            tone="sage"
            style={{ top: -10, right: 24, transform: "rotate(4deg)" }}
          />
          <ul className="j-stays">
            {lodges.map((l, i) => {
              const h = hotels[i];
              const cancel = h?.rows.find((r) => r.label === "免費取消");
              const nights = l.when.match(/(\d+) 晚/)?.[1];
              return (
                <li key={l.name}>
                  <span className="j-stays__nights" aria-label={`${nights} 晚`}>
                    <b>{nights}</b>
                    <small>晚</small>
                  </span>
                  <span className="j-stays__name">{l.name}</span>
                  <span className="j-stays__meta">
                    <span className="j-num">{l.when.split(" · ")[0]}</span>
                    {cancel && (
                      <>
                        {" · 免費取消至 "}
                        <mark className="j-num">
                          {richToText(cancel.value).replace(/ 前.*$/, "")}
                        </mark>
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
