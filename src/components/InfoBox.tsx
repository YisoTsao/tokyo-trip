import type { BoxBlock, InfoBox as InfoBoxData } from "../data/types";
import { RichText } from "./RichText";

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
        <p className="src">
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
        <div className="cost-wrap">
          <table className="cost">
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

export function InfoBox({ box }: { box: InfoBoxData }) {
  return (
    <div className={`box ${box.kind}`}>
      <h3>{box.title}</h3>
      {box.blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}
