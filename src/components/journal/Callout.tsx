import type { BoxBlock, DayJournal, InfoBox } from "../../data/types";
import { Icon, type IconName } from "../../illustrations/journal/icons";
import { RichText } from "../RichText";
import { Sticker, WashiTape } from "./ui";

// Each kind of note is a different piece of paper: memo for facts, sticky for tips, edged card for risks.
const KIND: Record<string, { card: string; icon: IconName }> = {
  note: { card: "j-card--note", icon: "pencil" },
  tip: { card: "j-card--sticky j-tone-sage", icon: "pin" },
  warn: { card: "", icon: "warning" },
};

function Block({ block }: { block: BoxBlock }) {
  switch (block.k) {
    case "p":
      return (
        <p>
          <RichText value={block.rich} />
        </p>
      );
    case "src":
      return (
        <p className="j-callout__src">
          <RichText value={block.rich} />
        </p>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((li, i) => (
            <li key={i}>
              <RichText value={li} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="j-cost">
          <table>
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th
                    key={i}
                    style={h.align ? { textAlign: "right" } : undefined}
                  >
                    <RichText value={h.rich} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i} className={r.sum ? "sum" : undefined}>
                  {r.cells.map((c, j) => (
                    <td key={j} className={c.className}>
                      <RichText value={c.rich} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function Callout({ box }: { box: InfoBox }) {
  const k = KIND[box.kind] ?? KIND.note;
  return (
    <section className={`j-card j-callout j-callout--${box.kind} ${k.card}`}>
      <h3 className="j-callout__title">
        <Icon name={k.icon} size={19} />
        {box.title}
      </h3>
      {box.blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </section>
  );
}

export function BackupPlan({ backup }: { backup: DayJournal["backup"] }) {
  return (
    <section className="j-card j-callout j-card--sticky j-tone-sakura j-tilt-r">
      <WashiTape
        tone="ginkgo"
        style={{ top: -11, left: "38%", transform: "rotate(-3deg)", width: 70 }}
      />
      <h3 className="j-callout__title">
        <Icon name="umbrella" size={19} />
        {backup.title}
      </h3>
      {backup.draft && (
        <span className="j-callout__draft">
          <Sticker tone="maple">新增建議・請確認</Sticker>
        </span>
      )}
      <ul>
        {backup.items.map((it, i) => (
          <li key={i}>
            <RichText value={it} />
          </li>
        ))}
      </ul>
    </section>
  );
}
