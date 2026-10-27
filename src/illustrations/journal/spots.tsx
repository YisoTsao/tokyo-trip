// Small watercolour vignettes, one per day. Each is composed separately (no shared template),
// so the day cards don't look stamped out of one mould.
import { useId, type ReactNode } from "react";

const W = "url(#j-wash-sm)";
const PEN = "url(#j-pencil-sm)";
const ink = {
  stroke: "var(--c-ink)",
  strokeWidth: 1.3,
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Spot({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const mask = useId();
  return (
    <svg
      className={className}
      viewBox="0 0 160 120"
      role="img"
      aria-label={label}
    >
      <defs>
        <mask
          id={mask}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="160"
          height="120"
        >
          <path
            filter="url(#j-edge-sm)"
            fill="#fff"
            d="M10 12c40-6 96-8 138-2 6 30 6 66 4 98-46 6-100 6-142 2-6-30-6-70 0-98z"
          />
        </mask>
      </defs>
      <g mask={`url(#${mask})`}>{children}</g>
    </svg>
  );
}

/** Day 1: landing over Toyama Bay at dusk */
export const SpotArrival = ({ className }: { className?: string }) => (
  <Spot className={className} label="插畫：傍晚降落富山灣上空的飛機">
    <g filter={W}>
      <path
        fill="var(--c-maple-soft)"
        d="M10 52c30-14 90-18 142-6 6 10 4 20-4 26-46 6-100 6-136-2-8-6-8-12-2-18z"
      />
      <path
        fill="var(--c-sky)"
        d="M4 88c26-8 60-12 96-10 22 2 40 4 56 8v26H4z"
      />
      <path
        fill="var(--c-sakura)"
        opacity={0.7}
        d="M112 40a12 12 0 1 0 .1 0z"
      />
    </g>
    <g filter={PEN} {...ink}>
      <path
        d="M30 60l38-12 18-16c3-3 8-2 8 1 1 3-1 6-4 8l-14 13 4 22-5 3-10-18-15 6-2 8-4 1-2-11-10-4z"
        fill="var(--c-card)"
      />
      <path
        d="M14 96c8-3 14-3 22 0s14 3 22 0M70 104c8-3 14-3 22 0s14 3 22 0M108 92c6-2 12-2 18 0"
        stroke="var(--c-ink-soft)"
      />
    </g>
    <circle cx="132" cy="26" r="2" fill="var(--c-ginkgo)" />
  </Spot>
);

/** Day 2: Kurobe Gorge trolley on a red bridge */
export const SpotGorge = ({ className }: { className?: string }) => (
  <Spot className={className} label="插畫：黑部峽谷紅色鐵橋上的小火車">
    <g filter={W}>
      <path fill="var(--c-sage)" d="M0 40c14-8 30-6 40 6l12 74H0z" />
      <path fill="#93a78d" d="M160 30c-16-4-32 4-40 18l-10 72h50z" />
      <path fill="#c3d3d6" d="M46 120c4-22 12-40 30-44 18 2 30 18 36 44z" />
      <path
        fill="var(--c-maple)"
        d="M10 34c-4-10 4-18 12-16 6-8 18-4 18 4 8 4 4 14-4 14-6 6-16 6-20 0-6 2-10 0-6-2z"
      />
      <path
        fill="var(--c-ginkgo)"
        d="M128 26c-2-8 4-14 10-12 6-6 14-2 14 4 6 4 2 12-4 12-4 4-12 4-14-2-6 0-8-2-6-2z"
      />
      <path fill="#c96f55" d="M30 62h102v4H30z" />
    </g>
    <g
      filter={PEN}
      stroke="#a6492f"
      strokeWidth={1.4}
      fill="none"
      strokeLinecap="round"
    >
      <path d="M40 92c14-20 28-26 40-26s28 6 42 26M56 76v-10M80 66v0M104 76v-10" />
    </g>
    <g filter={PEN} {...ink}>
      <path d="M38 60V50c0-2 2-4 4-4h10c2 0 4 2 4 4v10M60 60v-9h18v9M82 60v-9h18v9M104 60v-9h16v9M58 50h22M80 50h22M102 50h20" />
    </g>
  </Spot>
);

/** Day 3: Tateyama snow, the Kurobe dam and a ropeway cabin */
export const SpotAlpine = ({ className }: { className?: string }) => (
  <Spot className={className} label="插畫：立山初雪、黑部水壩與空中纜車">
    <g filter={W}>
      <path
        fill="#ada6c9"
        d="M0 84l30-34c8-8 14-8 20-2l12 12 22-28c6-6 12-6 18 0l30 30c8 8 16 8 28 4v38H0z"
      />
      <path
        fill="var(--c-snow)"
        d="M72 46l12-14c6-6 12-6 18 0l14 14c-6-2-10 2-16-2-4 4-10 0-14 4-4-4-8-2-14-2z"
      />
      <path
        fill="var(--c-snow)"
        d="M22 60l8-10c8-8 14-8 20-2l6 6c-6 0-8 4-14 0-4 4-8 0-12 4-2-2-6 0-8 2z"
      />
      <path fill="#c3d3d6" d="M0 98h160v22H0z" />
      <path fill="var(--c-paper-2)" d="M96 120V92h40v28z" />
    </g>
    <g filter={PEN} {...ink}>
      <path
        d="M96 92h40M98 100h36M100 108h32M102 116h28"
        stroke="var(--c-ink-soft)"
      />
      <path d="M10 18c40 6 90 14 146 26" />
      <path d="M78 27v8M70 35h16v12H70z" fill="var(--c-sakura)" />
    </g>
    <g fill="var(--c-snow)" stroke="var(--c-line-strong)" strokeWidth={0.6}>
      <circle cx="24" cy="30" r="1.8" />
      <circle cx="128" cy="20" r="1.5" />
      <circle cx="146" cy="60" r="1.8" />
      <circle cx="52" cy="14" r="1.3" />
    </g>
  </Spot>
);

/** Day 4: a thatched gassho house in Shirakawa-go */
export const SpotGassho = ({ className }: { className?: string }) => (
  <Spot className={className} label="插畫：白川郷的合掌屋">
    <g filter={W}>
      <path fill="var(--c-sage-soft)" d="M0 96c40-8 100-10 160-4v28H0z" />
      <path fill="#c9a98c" d="M44 92l34-62c2-4 6-4 8 0l36 62z" />
      <path fill="var(--c-paper-2)" d="M56 92h56v20H56z" />
      <path
        fill="var(--c-maple)"
        d="M12 82c-4-10 4-18 12-16 6-8 18-4 18 4 8 4 4 14-4 14-6 6-16 6-20 0-4 0-8 0-6-2z"
      />
      <path fill="#93a78d" d="M134 92l10-30 12 30z" />
    </g>
    <g filter={PEN} {...ink}>
      <path d="M44 92l34-62c2-4 6-4 8 0l36 62M56 92v20h56V92M70 98h10v14H70zM90 98h12v8H90zM72 50l20 0M66 62h32M60 74h44" />
      <path d="M26 84v14" stroke="#7d5d4f" />
    </g>
  </Spot>
);

/** Day 5: Kusatsu yubatake steaming at dusk, with a paper lantern */
export const SpotOnsen = ({ className }: { className?: string }) => (
  <Spot className={className} label="插畫：草津溫泉湯畑的蒸氣與燈籠">
    <g filter={W}>
      <path fill="#c3d3d6" d="M8 104c40-8 100-10 146-4v12c-50-4-100-2-146 4z" />
      <path fill="#c9a98c" d="M14 84l120-16v10L14 94z" />
      <path fill="#b8957a" d="M22 96l120-16v8L22 104z" />
      <path
        fill="var(--c-sakura)"
        d="M128 24h14c4 6 4 18 0 24h-14c-4-6-4-18 0-24z"
      />
    </g>
    <g filter={PEN} {...ink}>
      <path d="M135 18v6M135 48v6M126 36h18" />
      <path
        d="M30 76c-8-10 6-14 0-26s6-16 0-26M60 72c-8-10 6-14 0-24s6-14 0-24M90 68c-8-10 6-14 0-22s6-12 0-20"
        stroke="var(--c-ink-soft)"
        strokeWidth={1.5}
      />
    </g>
  </Spot>
);

/** Day 6: Shinkansen leaving Karuizawa past golden larches */
export const SpotShinkansen = ({ className }: { className?: string }) => (
  <Spot className={className} label="插畫：穿過輕井澤落葉松的新幹線">
    <g filter={W}>
      <path fill="var(--c-ginkgo)" d="M18 72l10-36 10 36z" />
      <path fill="var(--c-ginkgo)" opacity={0.8} d="M38 72l8-26 8 26z" />
      <path fill="var(--c-maple)" opacity={0.8} d="M128 72l9-30 9 30z" />
      <path
        fill="var(--c-card)"
        d="M6 96h100c22 0 38-8 44-20-6-8-22-14-48-14H14c-6 0-8 4-8 8z"
      />
      <path
        fill="#bcd0d6"
        d="M20 70h12v8H20zM38 70h12v8H38zM56 70h12v8H56zM74 70h12v8H74z"
      />
      <path fill="var(--c-sakura)" d="M6 88h120c-6 4-14 6-24 8H6z" />
    </g>
    <g filter={PEN} {...ink}>
      <path d="M6 96h100c22 0 38-8 44-20-6-8-22-14-48-14H14c-6 0-8 4-8 8zM4 108c50 2 100 2 152-2" />
      <path d="M28 72v12M46 72v10M137 72v10" stroke="#7d5d4f" />
    </g>
  </Spot>
);

/** Day 7: Tokyo Tower and the flight home */
export const SpotTokyo = ({ className }: { className?: string }) => (
  <Spot className={className} label="插畫：東京鐵塔與回程的飛機">
    <g filter={W}>
      <path
        fill="var(--c-sakura-soft)"
        d="M8 100c20-4 40-6 60-4V64h12v-8h12v44c20 0 40 2 60 6v14H8z"
      />
      <path
        fill="var(--c-rose)"
        opacity={0.5}
        d="M100 100V74h14v26zM120 100V82h10v18zM20 100V84h12v16z"
      />
    </g>
    <g
      filter={PEN}
      stroke="var(--c-maple)"
      strokeWidth={1.6}
      fill="none"
      strokeLinecap="round"
    >
      <path d="M44 104l10-60 2-18 2 18 10 60M48 84h16M51 62h10M56 26v-8M50 104l6-20 6 20" />
    </g>
    <g filter={PEN} {...ink}>
      <path
        d="M96 40l26-8 12-10c2-2 6-2 6 0 1 2-1 4-3 6l-9 9 2 15-3 2-7-12-10 4-1 6-3 1-1-8-7-3z"
        fill="var(--c-card)"
      />
      <path
        d="M84 50c-10 4-20 6-30 6"
        strokeDasharray="2 4"
        stroke="var(--c-ink-soft)"
      />
    </g>
  </Spot>
);

export const daySpots = [
  SpotArrival,
  SpotGorge,
  SpotAlpine,
  SpotGassho,
  SpotOnsen,
  SpotShinkansen,
  SpotTokyo,
];
