import type { MouseEvent } from "react";
import type { DayStripItem } from "../data/types";

/** HashRouter owns the URL hash, so in-page jumps scroll directly instead of using #anchors. */
export function scrollToSection(e: MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView();
}

export function DayStrip({ items }: { items: DayStripItem[] }) {
  return (
    <nav className="strip" aria-label="每日行程">
      {items.map((it) => (
        <a
          key={it.target}
          href={`#${it.target}`}
          onClick={(e) => scrollToSection(e, it.target)}
        >
          <span className="d">{it.date}</span>
          <span className="p">{it.place}</span>
          <span className="s">{it.stay}</span>
        </a>
      ))}
    </nav>
  );
}
