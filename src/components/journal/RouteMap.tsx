import { routeLegs, routeStops, type RouteStop } from "../../data/route";

const byId = Object.fromEntries(routeStops.map((s) => [s.id, s])) as Record<
  string,
  RouteStop
>;

function curve(a: RouteStop, b: RouteStop, bend = 0) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  // label sits on the curve's midpoint (t = 0.5 of the quadratic)
  return {
    d: `M${a.x} ${a.y}Q${cx} ${cy} ${b.x} ${b.y}`,
    lx: (a.x + 2 * cx + b.x) / 4,
    ly: (a.y + 2 * cy + b.y) / 4,
  };
}

const LABEL_OFFSET = {
  left: [-13, 7, "end"],
  right: [13, 7, "start"],
  above: [0, -14, "middle"],
  below: [0, 27, "middle"],
} as const;

export function RouteMap() {
  return (
    <figure className="j-card j-routemap">
      <svg viewBox="0 0 640 360" role="img" aria-labelledby="routemap-t">
        <title id="routemap-t">
          路線簡圖：富山為據點，Day 2 黑部峽谷、Day 3 立山黑部、Day 4
          白川郷後到輕井澤，Day 5 草津，Day 6 回輕井澤轉往東京
        </title>
        {/* sea and land, loosely painted */}
        <g filter="url(#j-wash)">
          <path
            fill="var(--c-sky)"
            opacity={0.55}
            d="M0 0h360c-30 20-80 30-120 40-50 12-70 50-110 60-40 10-80 4-130 20z"
          />
          <path
            fill="var(--c-sage-soft)"
            d="M30 140c40-20 80-14 120-34 50-24 90-60 150-64 80-6 150 14 220 44 60 26 90 80 100 140 8 50-10 100-60 116-90 26-200 10-300 4-90-6-180-6-220-50-30-34-36-120-10-156z"
          />
        </g>
        <text
          x="64"
          y="44"
          fontFamily="var(--f-hand)"
          fontSize="17"
          fill="var(--c-ink-soft)"
        >
          日本海
        </text>

        {/* flights in and out */}
        <g
          filter="url(#j-pencil-sm)"
          fill="none"
          stroke="var(--c-ink-soft)"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeDasharray="2 6"
        >
          <path d="M18 120C60 110 110 120 146 146" />
          <path d="M566 306c26 14 44 24 66 30" />
        </g>
        <text
          x="20"
          y="108"
          fontFamily="var(--f-script)"
          fontSize="18"
          fill="var(--c-rose-ink)"
        >
          from Taipei · Day 1
        </text>
        <text
          x="520"
          y="350"
          fontFamily="var(--f-script)"
          fontSize="18"
          fill="var(--c-rose-ink)"
        >
          home · Day 7
        </text>

        {/* legs */}
        <g
          filter="url(#j-pencil-sm)"
          fill="none"
          stroke="var(--c-rose)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeDasharray="7 6"
        >
          {routeLegs.map((l) => (
            <path
              key={l.from + l.to}
              d={curve(byId[l.from], byId[l.to], l.bend).d}
            />
          ))}
        </g>
        {routeLegs.map((l) => {
          const c = curve(byId[l.from], byId[l.to], l.bend);
          return (
            <g key={"n" + l.from + l.to}>
              <circle
                cx={c.lx}
                cy={c.ly}
                r={l.days.length > 1 ? 17 : 13}
                fill="var(--c-card)"
                stroke="var(--c-sakura)"
                strokeWidth={1.5}
              />
              <text
                x={c.lx}
                y={c.ly + 5}
                textAnchor="middle"
                fontFamily="var(--f-script)"
                fontSize="18"
                fill="var(--c-rose-ink)"
              >
                {l.days}
              </text>
            </g>
          );
        })}

        {/* stops */}
        {routeStops.map((s) => {
          const [dx, dy, anchor] = LABEL_OFFSET[s.label ?? "right"];
          const base = s.id === "toyama";
          return (
            <g key={s.id}>
              <circle
                cx={s.x}
                cy={s.y}
                r={base ? 8 : 6}
                fill={base ? "var(--c-maple)" : "var(--c-card)"}
                stroke="var(--c-maple-ink)"
                strokeWidth={1.8}
              />
              <text
                x={s.x + dx}
                y={s.y + dy}
                textAnchor={anchor}
                fontFamily="var(--f-hand)"
                fontWeight={700}
                fontSize="21"
                fill="var(--c-ink)"
              >
                {s.name}
              </text>
            </g>
          );
        })}

        {/* compass doodle */}
        <g
          transform="translate(596 52)"
          filter="url(#j-pencil-sm)"
          stroke="var(--c-ink-soft)"
          strokeWidth={1.3}
          fill="none"
          strokeLinecap="round"
        >
          <path d="M0 -22v44M-6 -14l6 -8 6 8" />
        </g>
        <text
          x="596"
          y="88"
          textAnchor="middle"
          fontFamily="var(--f-script)"
          fontSize="14"
          fill="var(--c-ink-soft)"
        >
          N
        </text>
      </svg>
      <ul className="j-routemap__legend">
        <li>
          <b>●</b>富山連住 3 晚當據點
        </li>
        <li>
          <b>2</b>圓圈數字是第幾天
        </li>
        <li>簡圖不依比例</li>
      </ul>
    </figure>
  );
}
