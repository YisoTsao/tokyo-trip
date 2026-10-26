import { useId, type CSSProperties, type ReactNode } from "react";
import type { Rich, TimeStatus } from "../../data/types";
import { Icon, type IconName } from "../../illustrations/journal/icons";

export type Tone = "sakura" | "sage" | "maple" | "ginkgo";

export function WashiTape({
  tone = "sakura",
  style,
}: {
  tone?: Tone;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`j-tape j-tape--${tone}`}
      style={style}
      aria-hidden="true"
    />
  );
}

/** Postmark: double ring, place name around the edge, date in the middle. */
export function Stamp({
  top,
  date,
  style,
}: {
  top: string;
  date: string;
  style?: CSSProperties;
}) {
  const id = useId();
  return (
    <svg
      className="j-stamp"
      viewBox="0 0 100 100"
      style={style}
      aria-hidden="true"
    >
      <defs>
        <path id={id} d="M50 50m-34 0a34 34 0 1 1 68 0a34 34 0 1 1-68 0" />
      </defs>
      <g filter="url(#j-pencil-sm)" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="45" strokeWidth="2.2" />
        <circle cx="50" cy="50" r="26" strokeWidth="1.4" />
        <path d="M30 50h40" strokeWidth="1" strokeDasharray="2 3" />
      </g>
      <text
        fill="currentColor"
        fontSize="10.5"
        fontFamily="var(--f-script)"
        letterSpacing="1.5"
      >
        <textPath href={`#${id}`} startOffset="2%">
          {top}
        </textPath>
      </text>
      <text
        x="50"
        y="46"
        textAnchor="middle"
        fill="currentColor"
        fontSize="15"
        fontFamily="var(--f-script)"
      >
        {date}
      </text>
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fill="currentColor"
        fontSize="9"
        fontFamily="var(--f-script)"
      >
        2026
      </text>
    </svg>
  );
}

export function Sticker({
  tone = "rose",
  icon,
  children,
}: {
  tone?: "rose" | "maple" | "sage";
  icon?: IconName;
  children: ReactNode;
}) {
  return (
    <span className={`j-sticker j-sticker--${tone}`}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}

const STATUS: Record<
  TimeStatus,
  { label: string; icon: IconName; hint: string }
> = {
  confirmed: {
    label: "已確認班次",
    icon: "check",
    hint: "已在營運單位的現行時刻表核對過的班次",
  },
  reference: {
    label: "參考時段",
    icon: "clock",
    hint: "規劃用時段或轉乘查詢結果，當天請再看時刻表",
  },
  tbc: {
    label: "待查證",
    icon: "question",
    hint: "官方表示班次可能變動，出發前必須再確認",
  },
};

export function StatusBadge({ status }: { status: TimeStatus }) {
  const s = STATUS[status];
  return (
    <span className={`j-status j-status--${status}`} title={s.hint}>
      <Icon name={s.icon} size={13} strokeWidth={2} />
      {s.label}
    </span>
  );
}

export function StatusLegend() {
  return (
    <div className="j-legend" aria-label="時間標示說明">
      {(Object.keys(STATUS) as TimeStatus[]).map((k) => (
        <div key={k}>
          <StatusBadge status={k} />
          <span>{STATUS[k].hint}</span>
        </div>
      ))}
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  sub,
  id,
}: {
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  id?: string;
}) {
  return (
    <div className="j-heading">
      {kicker && (
        <span className="j-heading__kicker" aria-hidden="true">
          {kicker}
        </span>
      )}
      <h2 className="j-heading__title" id={id}>
        {title}
      </h2>
      {sub && <p className="j-heading__sub">{sub}</p>}
    </div>
  );
}

export function Divider() {
  return <hr className="j-divider" />;
}

/** Plain text of a rich value, for places where markup is not wanted (titles, aria labels). */
export function richToText(r: Rich): string {
  return r
    .map((p) =>
      typeof p === "string"
        ? p
        : p.tag === "br"
          ? " "
          : richToText(p.children ?? []),
    )
    .join("");
}
