import type { TimelineItem, TimelinePart } from "../data/types";
import { useMapDialog } from "./MapDialogs";
import { RichText } from "./RichText";

function Part({ part }: { part: TimelinePart }) {
  const openMap = useMapDialog();
  switch (part.k) {
    case "text":
      return (
        <span>
          <RichText value={part.rich} />
        </span>
      );
    case "em":
      return (
        <em>
          <RichText value={part.rich} />
        </em>
      );
    case "xfer":
      return (
        <div className="xfer">
          <b>{part.title}</b>
          {part.steps.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      );
    case "links":
      return (
        <span className="tts">
          {part.items.map((it) =>
            it.kind === "link" ? (
              <a
                key={it.href}
                className="tt"
                href={it.href}
                target="_blank"
                rel="noopener"
              >
                {it.label}
              </a>
            ) : (
              <button
                key={it.label}
                type="button"
                className="tt map-open"
                onClick={() => openMap(it.dialog)}
              >
                {it.label}
              </button>
            ),
          )}
        </span>
      );
  }
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="tl">
      {items.map((it, i) => (
        <li key={i} className={it.flags.join(" ") || undefined}>
          <time>{it.time}</time>
          <div className="what">
            {it.parts.map((p, j) => (
              <Part key={j} part={p} />
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
