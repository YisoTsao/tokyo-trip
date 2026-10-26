import { Link } from "react-router-dom";
import { days } from "../../data/days";
import { dayStrip } from "../../data/trip";
import { Icon } from "../../illustrations/journal/icons";
import { daySpots } from "../../illustrations/journal/spots";
import { WashiTape, type Tone } from "./ui";

// Hand-picked per card so the grid reads like pasted-in photos, not a template.
const LOOK: { card: string; tilt?: string; tape?: Tone }[] = [
  { card: "j-card--polaroid", tilt: "j-tilt-l", tape: "sakura" },
  { card: "", tilt: "j-tilt-r" },
  { card: "j-card--polaroid", tape: "sage" },
  { card: "j-card--polaroid", tilt: "j-tilt-r", tape: "maple" },
  { card: "", tilt: "j-tilt-l" },
  { card: "j-card--polaroid", tape: "ginkgo" },
  { card: "j-card--polaroid", tilt: "j-tilt-l" },
];

export const weekday = (date: string) => date.match(/（(.)）/)?.[1] ?? "";

export function DayCards() {
  return (
    <ol className="j-daygrid">
      {days.map((d, i) => {
        const Spot = daySpots[i];
        const strip = dayStrip[i];
        const look = LOOK[i];
        return (
          <li key={d.id}>
            <Link
              to={`/day/${d.n}`}
              className={`j-card j-daycard ${look.card} ${look.tilt ?? ""}`}
            >
              {look.tape && <WashiTape tone={look.tape} />}
              <Spot className="j-daycard__art" />
              <span className="j-daycard__body">
                <span className="j-daycard__day">
                  <span className="j-script">Day {d.n}</span>
                  <span className="j-num">
                    {strip.date}（{weekday(d.date)}）
                  </span>
                </span>
                <span className="j-daycard__place">{strip.place}</span>
                <span className="j-daycard__stay">
                  <Icon name={d.n === 7 ? "plane" : "hotel"} size={14} />
                  {strip.stay}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
