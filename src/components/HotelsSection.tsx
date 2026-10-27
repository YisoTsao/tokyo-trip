import { Fragment } from "react";
import type { Hotel } from "../data/types";
import { RichText } from "./RichText";

export function HotelsSection({ hotels }: { hotels: Hotel[] }) {
  return (
    <section
      id="hotels"
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <h2 className="sec-title">住宿資訊</h2>
      <div className="hotels">
        {hotels.map((h) => (
          <article className="hotel" key={h.name}>
            <p className="date">{h.date}</p>
            <h3>{h.name}</h3>
            {h.jp && <p className="jp">{h.jp}</p>}
            <dl>
              {h.rows.map((r) => (
                <Fragment key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>
                    <RichText value={r.value} />
                  </dd>
                </Fragment>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
