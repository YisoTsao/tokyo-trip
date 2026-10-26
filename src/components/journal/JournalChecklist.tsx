import { useRef } from "react";
import { PRIORITY_LABEL, priorityOf } from "../../data/checklistMeta";
import type { CheckItem, ChecklistLeg, ChecklistSheet } from "../../data/types";
import type { Checked } from "../../hooks/useChecklist";
import { Icon, type IconName } from "../../illustrations/journal/icons";
import { burst, sheetItems } from "../Checklist";
import { Meter } from "./Progress";
import { WashiTape, type Tone } from "./ui";

export interface Filter {
  undoneOnly: boolean;
  mustOnly: boolean;
}

type OnChange = (id: string, on: boolean) => void;

const KIND_ICON: Record<string, IconName> = {
  航班: "plane",
  巴士: "bus",
  新幹線: "shinkansen",
  鐵道: "train",
  山岳交通: "ropeway",
  住宿: "hotel",
};

export function PriorityTag({ id }: { id: string }) {
  const p = priorityOf(id);
  return <span className={`j-prio j-prio--${p}`}>{PRIORITY_LABEL[p]}</span>;
}

/** idPrefix keeps DOM ids unique when the same item shows twice (priority list + its section). */
export function CheckRow({ item, checked, onChange, idPrefix = "" }: { item: CheckItem; checked: Checked; onChange: OnChange; idPrefix?: string }) {
  const domId = idPrefix + item.id;
  const on = !!checked[item.id];
  return (
    <label className={`j-check${on ? " j-check--on" : ""}`} htmlFor={domId}>
      <input type="checkbox" id={domId} checked={on} onChange={(e) => onChange(item.id, e.target.checked)} />
      <span className="j-check__text">
        {item.label}
        {item.note && <small>{item.note}</small>}
      </span>
      <PriorityTag id={item.id} />
    </label>
  );
}

const visible = (item: CheckItem, checked: Checked, f: Filter) =>
  !(f.undoneOnly && checked[item.id]) && !(f.mustOnly && priorityOf(item.id) !== "must");

function Leg({ leg, checked, onChange, filter }: { leg: ChecklistLeg; checked: Checked; onChange: OnChange; filter: Filter }) {
  const checks = leg.checks.filter((c) => visible(c, checked, filter));
  const filtering = filter.undoneOnly || filter.mustOnly;
  if (filtering && !checks.length) return null;
  return (
    <div className="j-leg">
      <div className="j-leg__when j-num">
        <b>{leg.when}</b>
        <small>{leg.whenNote}</small>
      </div>
      <div className="j-leg__info">
        <p className="j-leg__title">
          <span className="j-leg__kind">
            <Icon name={KIND_ICON[leg.kind] ?? "ticket"} size={15} />
            {leg.kind}
          </span>
          {leg.title}
        </p>
        <p className="j-leg__note">{leg.note}</p>
        <div className="j-leg__checks">
          {leg.free && <span className="j-free">免預約</span>}
          {checks.map((c) => (
            <CheckRow key={c.id} item={c} checked={checked} onChange={onChange} />
          ))}
        </div>
      </div>
    </div>
  );
}

const SHEET_LOOK: Record<string, { tone: Tone; icon: IconName }> = {
  trans: { tone: "sakura", icon: "ticket" },
  stay: { tone: "sage", icon: "hotel" },
  before: { tone: "ginkgo", icon: "pencil" },
  pack: { tone: "maple", icon: "bag" },
};

export function SheetCard({ sheet, checked, onChange, filter }: { sheet: ChecklistSheet; checked: Checked; onChange: OnChange; filter: Filter }) {
  const meterRef = useRef<HTMLDivElement>(null);
  const items = sheetItems(sheet);
  const done = items.filter((i) => checked[i.id]).length;
  const look = SHEET_LOOK[sheet.id] ?? SHEET_LOOK.trans;

  // Petals only when a click completes the sheet, not on load or reset.
  function change(id: string, on: boolean) {
    onChange(id, on);
    if (on && done + 1 === items.length && meterRef.current) burst(meterRef.current);
  }

  const groups = (sheet.groups ?? [])
    .map((g) => ({ ...g, items: g.items.filter((i) => visible(i, checked, filter)) }))
    .filter((g) => g.items.length);

  return (
    <section className={`j-card j-sheet${items.length && done === items.length ? " j-sheet--done" : ""}`} aria-labelledby={`sheet-${sheet.id}`}>
      <WashiTape tone={look.tone} style={{ top: -11, left: 22, transform: "rotate(-4deg)", width: 76 }} />
      <div className="j-sheet__head">
        <h2 id={`sheet-${sheet.id}`}>
          <Icon name={look.icon} size={20} />
          {sheet.title}
        </h2>
        <div ref={meterRef} className="j-sheet__meter" aria-live="polite">
          <Meter label="完成" done={done} total={items.length} />
        </div>
      </div>
      {sheet.layout === "legs" ? (
        <div className="j-sheet__legs">
          {(sheet.rows ?? []).map((r, i) =>
            "group" in r ? (
              <h3 className="j-sheet__group" key={i}>
                {r.group}
              </h3>
            ) : (
              <Leg key={i} leg={r} checked={checked} onChange={change} filter={filter} />
            ),
          )}
        </div>
      ) : (
        <div className="j-pack">
          {groups.map((g) => (
            <section key={g.title} className={`j-pack__group${g.wide ? " j-pack__group--wide" : ""}`}>
              <h3>{g.title}</h3>
              {g.items.map((c) => (
                <CheckRow key={c.id} item={c} checked={checked} onChange={change} />
              ))}
            </section>
          ))}
          {!groups.length && <p className="j-sheet__empty">這一類都完成了。</p>}
          {sheet.tip && !filter.undoneOnly && !filter.mustOnly && (
            <aside className="j-card j-card--sticky j-tone-sakura j-pack__tip">
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
