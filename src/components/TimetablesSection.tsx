import type { TimetableLink } from "../data/types";
import {
  StarIcon,
  TimetableAlpenIcon,
  TimetableChitetsuIcon,
  TimetableHanedaIcon,
  TimetableKurotetuIcon,
  TimetableKusakaruIcon,
  TimetableNouhiIcon,
} from "../illustrations/legacy";

const ICONS: Record<string, () => React.JSX.Element> = {
  alpen: TimetableAlpenIcon,
  kurotetu: TimetableKurotetuIcon,
  nouhi: TimetableNouhiIcon,
  chitetsu: TimetableChitetsuIcon,
  kusakaru: TimetableKusakaruIcon,
  haneda: TimetableHanedaIcon,
};

export function TimetablesSection({ links }: { links: TimetableLink[] }) {
  return (
    <section
      id="timetables"
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <h2 className="sec-title">
        <StarIcon />
        最需要收藏的官方時刻表
      </h2>
      <div className="links">
        {links.map((l) => {
          const Icon = ICONS[l.icon];
          return (
            <a
              key={l.href}
              className="lk"
              href={l.href}
              target="_blank"
              rel="noopener"
            >
              <div className="row">
                <Icon />
                <h3>{l.title}</h3>
              </div>
              <p>{l.desc}</p>
              <span className="go">{l.go}</span>
              {l.alt && <span className="alt">{l.alt}</span>}
            </a>
          );
        })}
      </div>
    </section>
  );
}
