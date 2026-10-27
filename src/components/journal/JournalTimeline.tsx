import type { TimelineItem, TimelinePart } from "../../data/types";
import { Icon, type IconName } from "../../illustrations/journal/icons";
import { useMapDialog } from "../MapDialogs";
import { RichText } from "../RichText";
import { StatusBadge } from "./ui";

function Links({ part }: { part: Extract<TimelinePart, { k: "links" }> }) {
  const openMap = useMapDialog();
  return (
    <div className="j-chips">
      {part.items.map((it) =>
        it.kind === "link" ? (
          <a
            key={it.href}
            className="j-chip"
            href={it.href}
            target="_blank"
            rel="noopener"
          >
            <Icon name="external" size={13} />
            {it.label}
          </a>
        ) : (
          <button
            key={it.label}
            type="button"
            className="j-chip"
            onClick={() => openMap(it.dialog)}
          >
            <Icon name="map" size={13} />
            {it.label.replace(/^🗺\s*/, "")}
          </button>
        ),
      )}
    </div>
  );
}

function Entry({ item }: { item: TimelineItem }) {
  const transport = !!item.status;
  const cls = [
    "j-tl__item",
    transport ? "j-tl__item--transport" : "j-tl__item--activity",
    item.flags.includes("key") && "j-tl__item--key",
    item.flags.includes("sug") && "j-tl__item--sug",
  ]
    .filter(Boolean)
    .join(" ");
  const icon = (item.mode === "wait" ? "clock" : (item.mode ?? (transport ? "train" : "clock"))) as IconName;
  const texts = item.parts.filter((p) => p.k === "text");
  const rest = item.parts.filter((p) => p.k !== "text");

  return (
    <li className={cls}>
      <div className="j-tl__timecol">
        <time className="j-tl__time">{item.time}</time>
      </div>
      <div className="j-tl__node">
        <Icon name={icon} size={19} />
      </div>
      <div className="j-tl__body">
        <div
          className={`j-tl__head${item.status || item.flags.includes("sug") ? "" : " j-tl__head--bare"}`}
        >
          <time className="j-tl__time">{item.time}</time>
          {item.status && <StatusBadge status={item.status} />}
          {item.flags.includes("sug") && (
            <span className="j-tl__badge-sug">空檔建議</span>
          )}
        </div>
        <p className="j-tl__title">
          {texts.map((t, i) => (
            <span
              key={i}
              style={
                i
                  ? {
                      display: "block",
                      fontWeight: 400,
                      fontSize: "var(--fs-sm)",
                    }
                  : undefined
              }
            >
              <RichText value={t.rich} />
            </span>
          ))}
        </p>
        {rest.map((p, i) => {
          if (p.k === "em")
            return (
              <p key={i} className="j-tl__note">
                <RichText value={p.rich} />
              </p>
            );
          if (p.k === "xfer")
            return (
              <div key={i} className="j-transfer">
                <b>
                  <Icon name="warning" size={15} />
                  {p.title.replace(/^⚠\s*/, "")}
                </b>
                {p.steps.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            );
          if (p.k === "links") return <Links key={i} part={p} />;
          return null;
        })}
      </div>
    </li>
  );
}

export function JournalTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="j-tl">
      {items.map((it, i) => (
        <Entry key={i} item={it} />
      ))}
    </ol>
  );
}
