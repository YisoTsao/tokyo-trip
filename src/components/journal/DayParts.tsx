import { useState } from "react";
import { Link } from "react-router-dom";
import { days } from "../../data/days";
import { timetables } from "../../data/timetables";
import { dayStrip } from "../../data/trip";
import type { Day, DayJournal } from "../../data/types";
import { Icon } from "../../illustrations/journal/icons";
import { daySpots } from "../../illustrations/journal/spots";
import { useNote } from "../../hooks/useNotes";
import { weekday } from "./DayCards";
import { SectionHeading, Stamp, Sticker, WashiTape } from "./ui";

export function DayTabs({ current }: { current: number }) {
  return (
    <nav aria-label="每日行程">
      <ul className="j-daytabs">
        {days.map((d, i) => (
          <li key={d.id}>
            <Link
              to={`/day/${d.n}`}
              aria-current={d.n === current ? "page" : undefined}
            >
              <b>{d.n}</b>
              <span className="j-num">{dayStrip[i].date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function DayHeader({ day, journal }: { day: Day; journal: DayJournal }) {
  const Spot = daySpots[day.n - 1];
  const md = dayStrip[day.n - 1].date.replace("/", ".");
  const hot = day.tags.filter((t) => t.kind === "hot");
  const other = day.tags.filter((t) => !t.kind);
  return (
    <header className="j-dayhead">
      <div className="j-dayhead__text">
        <p className="j-dayhead__kicker">
          <span className="j-script">Day {day.n}</span>
          <span>{day.date}</span>
        </p>
        <h1 className="j-dayhead__title">{journal.theme}</h1>
        <p className="j-dayhead__sub">{day.title}</p>
        <dl className="j-facts">
          <div>
            <Icon name="clock" size={17} />
            <dt>日期</dt>
            <dd className="j-num">2026 年 {day.date}</dd>
          </div>
          <div>
            <Icon name="pin" size={17} />
            <dt>地點</dt>
            <dd>{journal.place}</dd>
          </div>
          <div>
            <Icon name="hotel" size={17} />
            <dt>住宿</dt>
            <dd>{journal.stay}</dd>
          </div>
        </dl>
        {(hot.length > 0 || other.length > 0) && (
          <div className="j-dayhead__tags">
            {hot.map((t) => (
              <Sticker key={t.label} tone="maple" icon="warning">
                {t.label}
              </Sticker>
            ))}
            {other.map((t) => (
              <Sticker key={t.label} tone="sage">
                {t.label}
              </Sticker>
            ))}
          </div>
        )}
      </div>
      <figure className="j-dayhead__art j-card j-card--polaroid j-tilt-r">
        <Spot />
        <figcaption>
          {md}（{weekday(day.date)}）· {journal.place.split(" ⇄ ").slice(-1)[0]}
        </figcaption>
        <WashiTape tone="sage" />
        <Stamp top={journal.stamp ?? "HOKURIKU · SHINSHU · "} date={md} />
      </figure>
    </header>
  );
}

export function BookingCard({ booking }: { booking: DayJournal["booking"] }) {
  return (
    <section className="j-card j-card--ticket" aria-labelledby="booking-t">
      <h3
        className="j-callout__title"
        id="booking-t"
        style={{ marginBottom: 4 }}
      >
        <Icon name="ticket" size={19} style={{ color: "var(--c-rose-ink)" }} />
        預約與票價
      </h3>
      <ul className="j-booking">
        {booking.map((b) => (
          <li key={b.item}>
            <span className="j-booking__item">{b.item}</span>
            <span className="j-booking__price">{b.price}</span>
            <span className="j-booking__how">
              {b.reserve ? (
                <Sticker tone="maple">要預約</Sticker>
              ) : (
                <Sticker tone="sage">現場</Sticker>
              )}
              <span>{b.how}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="j-callout__src" style={{ marginTop: 6 }}>
        單人參考價，以官方公告為準。
      </p>
    </section>
  );
}

export function TimetableList({ n }: { n: number }) {
  const list = timetables.filter((t) => t.days?.includes(n));
  if (!list.length) return null;
  return (
    <section className="j-card j-card--plain" aria-labelledby="tt-t">
      <h3 className="j-callout__title" id="tt-t" style={{ marginBottom: 6 }}>
        <Icon
          name="external"
          size={18}
          style={{ color: "var(--c-rose-ink)" }}
        />
        官方時刻表
      </h3>
      <ul className="j-links">
        {list.map((t) => (
          <li key={t.href}>
            <a href={t.href} target="_blank" rel="noopener">
              <b>{t.title}</b>
              <small>{t.desc}</small>
              <Icon name="arrow" size={18} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function JournalNotePad({ day }: { day: Day }) {
  const { text, state, update, initiallyFilled } = useNote(day.id);
  const [open, setOpen] = useState(initiallyFilled);
  return (
    <details
      className="j-card j-card--note j-notepad"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary>
        <Icon name="pencil" size={18} />
        我的筆記
        {text.trim() && !open && (
          <span className="j-notepad__has">・有內容</span>
        )}
        <span className="j-notepad__state" aria-live="polite">
          {state}
        </span>
      </summary>
      <label className="j-sr" htmlFor={`note-${day.id}`}>
        Day {day.n} 筆記
      </label>
      <textarea
        id={`note-${day.id}`}
        placeholder="臨時想到的事記在這裡，例如：要買的伴手禮、店家營業時間、集合地點…"
        value={text}
        onChange={(e) => update(e.target.value)}
      />
      <p className="j-notepad__hint">
        自動儲存在這台裝置的瀏覽器裡，換裝置不會同步。
      </p>
    </details>
  );
}

export function DayPager({ n }: { n: number }) {
  const prev = days[n - 2];
  const next = days[n];
  return (
    <nav className="j-pager" aria-label="前後一天">
      {prev ? (
        <Link to={`/day/${prev.n}`}>
          <small>
            <Icon name="back" size={14} />
            Day {prev.n}
          </small>
          <b>{dayStrip[prev.n - 1].place}</b>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={`/day/${next.n}`} className="j-pager__next">
          <small>
            Day {next.n}
            <Icon name="arrow" size={14} />
          </small>
          <b>{dayStrip[next.n - 1].place}</b>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

export { SectionHeading };
