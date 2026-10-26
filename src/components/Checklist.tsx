import { useRef } from "react";
import type {
  CheckItem,
  ChecklistLeg,
  ChecklistSheet as Sheet,
} from "../data/types";

export type Checked = Record<string, 1>;

export function CheckBox({
  item,
  checked,
  onChange,
}: {
  item: CheckItem;
  checked: boolean;
  onChange: (id: string, on: boolean) => void;
}) {
  return (
    <label className="ck" htmlFor={item.id}>
      <input
        type="checkbox"
        id={item.id}
        checked={checked}
        onChange={(e) => onChange(item.id, e.target.checked)}
      />
      <span>
        {item.label}
        {item.note && <small>{item.note}</small>}
      </span>
    </label>
  );
}

/** All checkbox items in a sheet, in display order. */
export function sheetItems(sheet: Sheet): CheckItem[] {
  if (sheet.layout === "legs")
    return (sheet.rows ?? []).flatMap((r) => ("checks" in r ? r.checks : []));
  return (sheet.groups ?? []).flatMap((g) => g.items);
}

const COLORS = [
  "var(--sakura)",
  "var(--maple)",
  "var(--ginkgo)",
  "var(--mint)",
];

function burst(el: HTMLElement) {
  let reduce = false;
  try {
    reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    /* matchMedia unavailable */
  }
  if (reduce) return;
  const r = el.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + 24;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("i");
    p.className = "petal";
    const a = Math.random() * Math.PI * 2;
    const d = 60 + Math.random() * 90;
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.background = COLORS[i % COLORS.length];
    p.style.setProperty("--dx", Math.cos(a) * d + "px");
    p.style.setProperty("--dy", Math.sin(a) * d + 40 + "px");
    p.style.setProperty("--r", Math.random() * 540 - 270 + "deg");
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

function Leg({
  leg,
  checked,
  onChange,
}: {
  leg: ChecklistLeg;
  checked: Checked;
  onChange: (id: string, on: boolean) => void;
}) {
  return (
    <div className="leg">
      <div className="when">
        {leg.when}
        <small>{leg.whenNote}</small>
      </div>
      <div className="info">
        <b>
          <span className={leg.kindClass ? `kind ${leg.kindClass}` : "kind"}>
            {leg.kind}
          </span>
          {leg.title}
        </b>
        <em>{leg.note}</em>
      </div>
      <div className="checks">
        {leg.free && <span className="free">免預約</span>}
        {leg.checks.map((c) => (
          <CheckBox
            key={c.id}
            item={c}
            checked={!!checked[c.id]}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

export function ChecklistSheet({
  sheet,
  checked,
  onChange,
}: {
  sheet: Sheet;
  checked: Checked;
  onChange: (id: string, on: boolean) => void;
}) {
  const meterRef = useRef<HTMLDivElement>(null);
  const items = sheetItems(sheet);
  const done = items.filter((i) => checked[i.id]).length;
  const full = items.length > 0 && done === items.length;

  // Petals only when a click completes the sheet, not on load or reset.
  function change(id: string, on: boolean) {
    onChange(id, on);
    if (on && done + 1 === items.length && meterRef.current)
      burst(meterRef.current);
  }

  return (
    <section className={`sheet${full ? " done" : ""}`} data-meter={sheet.id}>
      <div className="sheet-head">
        <h2>{sheet.title}</h2>
        <div className="meter" aria-live="polite" ref={meterRef}>
          <span className="bar">
            <i
              style={{
                width: (items.length ? (done / items.length) * 100 : 0) + "%",
              }}
            ></i>
          </span>
          <span className="count">{`${done} / ${items.length}`}</span>
        </div>
      </div>
      {sheet.layout === "legs" ? (
        <div className="sheet-body">
          {(sheet.rows ?? []).map((r, i) =>
            "group" in r ? (
              <div className="grp" key={i}>
                {r.group}
              </div>
            ) : (
              <Leg key={i} leg={r} checked={checked} onChange={change} />
            ),
          )}
        </div>
      ) : (
        <div className="pack">
          {(sheet.groups ?? []).map((g) => (
            <section key={g.title} className={g.wide ? "wide" : undefined}>
              <h3>{g.title}</h3>
              {g.items.map((c) => (
                <CheckBox
                  key={c.id}
                  item={c}
                  checked={!!checked[c.id]}
                  onChange={change}
                />
              ))}
            </section>
          ))}
          {sheet.tip && (
            <aside className="packtip">
              <h3>{sheet.tip.title}</h3>
              <ul>
                {sheet.tip.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      )}
    </section>
  );
}
