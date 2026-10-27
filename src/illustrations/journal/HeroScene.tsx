// Home page hero: early snow on the Tateyama range, autumn hills, the Kurobe trolley on its bridge,
// a Toyama tram, Kusatsu's steaming yubatake and a faint Tokyo skyline. Coordinates are hand placed;
// nothing is mirrored or repeated on a grid.
const W = "url(#j-wash)";
const PEN = "url(#j-pencil)";

const SNOW: [number, number, number][] = [
  [64, 70, 3],
  [142, 38, 2.2],
  [231, 92, 2.6],
  [318, 30, 1.8],
  [402, 66, 3.2],
  [488, 22, 2],
  [566, 84, 2.4],
  [652, 46, 1.9],
  [707, 98, 2.8],
  [786, 30, 2.2],
  [873, 72, 2.6],
  [948, 26, 1.7],
  [1022, 88, 3],
  [1097, 48, 2.1],
  [1163, 104, 2.5],
  [182, 140, 1.8],
  [604, 132, 2],
  [1006, 150, 1.6],
  [42, 186, 2.2],
  [1140, 230, 1.9],
];

export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 640"
      role="img"
      aria-labelledby="hero-art-t"
      preserveAspectRatio="xMidYMid slice"
    >
      <title id="hero-art-t">
        手繪水彩：初雪的立山連峰、楓葉與銀杏、黑部峽谷小火車、富山電車、草津湯畑蒸氣與遠方的東京
      </title>

      <defs>
        <mask
          id="hero-edge"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1200"
          height="640"
        >
          <g filter="url(#j-edge)">
            <path
              fill="#fff"
              d="M62 92C200 60 420 56 620 52c240-6 420 0 516 34 24 94 20 214 24 334 2 100-6 170-50 186-230 18-780 20-1018 6-44-12-54-52-52-142 2-120-10-270 22-378z"
            />
          </g>
        </mask>
      </defs>
      <g mask="url(#hero-edge)">
        <g transform="translate(600 0) scale(1.08 1) translate(-600 0)">
          {/* sky wash, left unfinished at the edges like a real page */}
          <g filter={W} opacity={0.55}>
            <path
              fill="var(--c-sky)"
              d="M38 214C26 150 70 92 150 70c90-26 180 6 268-12 96-20 168-44 262-30 88 14 150 40 240 30 84-10 150-28 214 4 52 26 50 92 38 150-10 52-40 96-120 104-170 16-360-8-540 6-150 12-300 16-420-4-58-10-80-48-92-104z"
            />
          </g>
          <g filter={W} opacity={0.35}>
            <path
              fill="var(--c-sakura)"
              d="M760 64c40-24 120-30 170-12 44 16 40 52-6 62-62 14-130 10-170-6-24-10-20-30 6-44z"
            />
          </g>

          {/* far range: Tateyama, with Oyama the tallest and a sharp Tsurugi-like peak to the right */}
          <g filter={W}>
            <path
              fill="#ada6c9"
              d="M0 344V286c30-16 70-46 108-72 18-12 32-22 44-24 14 2 30 16 48 24 28-18 62-48 92-64 14-6 24-2 38 10 22 16 38 10 56-10 28-30 58-54 80-62 12-4 20 0 32 10 28 24 54 58 80 72 14 6 26 2 40-10 32-26 72-40 96-48 8-2 14 2 20 10 22 28 52 48 82 54 26 4 46-4 64-8 30-6 60-8 90-12 30-6 54-10 74-6 36 10 76 32 116 40 20 4 32 6 40 8v146z"
            />
          </g>
          <g filter="url(#j-wash-sm)" fill="var(--c-snow)">
            <path d="M410 120c20-16 42-28 56-32 12-4 20 0 32 10 12 10 24 22 34 34-10-2-18 6-28 0-8 10-18 2-26 8-8-8-16 0-26-6-10 8-20-2-28 2-4-8-10-10-14-16z" />
            <path d="M690 126c10-6 18-12 24-14 8-2 14 2 20 10 8 10 16 18 24 26-8-2-14 4-20-2-6 8-14 0-20 4-6-8-14-4-20-10-2-6-6-10-8-14z" />
            <path d="M270 164c12-10 24-16 34-16s18 6 28 14c-6 2-12 6-18 2-6 6-14 2-20 6-6-6-14-2-24-6z" />
            <path d="M128 202c10-6 18-12 24-12 10 1 20 8 30 16-6 0-12 4-18 0-6 6-14 0-20 4-6-6-10-4-16-8z" />
            <path d="M1004 152c14-4 28-6 40-2 14 4 26 10 36 16-8 0-14 4-20 0-8 6-14 0-22 4-8-6-16-2-22-8-6-2-10-6-12-10z" />
          </g>
          <g filter="url(#j-wash-sm)" fill="#d6d2e6">
            <path d="M466 90c14 6 30 22 44 38l22 4c-10-2-18 6-28 0-8 10-18 2-26 8z" />
            <path d="M716 114c8 8 18 20 26 30l16 4c-8-2-14 4-20-2-6 8-14 0-20 4z" />
          </g>
          <g
            filter={PEN}
            stroke="#6f6380"
            strokeWidth={1.4}
            fill="none"
            strokeLinecap="round"
            opacity={0.5}
          >
            <path d="M386 150c28-30 58-54 80-62 12-4 20 0 32 10 28 24 54 58 80 72" />
            <path d="M618 160c32-26 72-40 96-48 8-2 14 2 20 10 22 28 52 48 82 54M108 214c18-12 32-22 44-24 14 2 30 16 48 24" />
          </g>

          {/* nearer ridge */}
          <g filter={W}>
            <path
              fill="#91a8aa"
              d="M0 384c60-30 120-62 196-72 70-10 120 22 190 16 80-8 120-50 200-54 70-4 120 34 196 34 74 0 128-40 210-44 84-4 150 26 208 46V540H0z"
            />
          </g>

          {/* autumn hills, two greens so they do not read as one flat band */}
          <g filter={W}>
            <path
              fill="#a3b69d"
              d="M0 446c70-40 150-58 236-50 76 8 128 34 210 30 90-6 150-46 240-44 54 2 80 18 104 30V640H0z"
            />
          </g>
          <g filter={W}>
            <path
              fill="#8ea486"
              d="M520 560c80-16 150-50 220-86 40-20 70-46 120-48 60-2 110 22 170 26 70 4 130-20 180-22V600c-120 10-260 16-420 12-90-2-190 0-270 48z"
              opacity={0.9}
            />
          </g>
          <g
            filter={PEN}
            stroke="#6f8468"
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
            opacity={0.55}
          >
            <path d="M232 508l4-9M240 510l2-10M520 492l3-8M527 494l2-9M1012 500l3-8M1020 502l2-9M150 530l3-8M158 531l2-9M1110 520l3-7" />
            <path d="M470 470c40-8 90-12 130-8" opacity={0.6} />
          </g>
          {/* Kurobe gorge cut into the hills */}
          <g filter={W}>
            <path
              fill="#c3d3d6"
              d="M792 640c10-30 22-58 40-78 10-10 18-18 30-18s22 6 32 16c18 20 32 48 42 80z"
            />
          </g>
          <g
            filter={PEN}
            stroke="#5f6f5a"
            strokeWidth={1.3}
            fill="none"
            strokeLinecap="round"
            opacity={0.6}
          >
            <path d="M800 560c4-20 12-40 22-54M812 586c2-12 6-24 10-32M948 560c-4-20-10-40-20-54M934 588c-2-12-4-22-8-30" />
          </g>

          {/* maple and ginkgo trees: loose blobs, each one different */}
          <g filter={W}>
            <path
              fill="var(--c-maple)"
              d="M612 400c-8-20 8-40 26-38 16-14 40-4 40 14 18 6 16 32-2 36-10 14-34 14-44 2-14 2-24-4-20-14z"
            />
            <path
              fill="var(--c-maple)"
              opacity={0.85}
              d="M96 432c-6-16 8-30 22-28 10-12 30-6 32 8 14 6 10 26-4 28-8 10-26 10-34 0-12 0-20-2-16-8z"
            />
            <path
              fill="var(--c-ginkgo)"
              d="M676 414c-4-18 10-30 24-26 10-10 28-2 28 12 12 8 6 26-8 26-8 8-24 8-30-2-10 0-16-4-14-10z"
            />
            <path
              fill="var(--c-ginkgo)"
              opacity={0.9}
              d="M1046 404c-6-14 6-28 20-26 12-10 28-2 28 12 12 6 8 24-6 26-10 8-24 6-30-2-10-2-14-6-12-10z"
            />
            <path
              fill="var(--c-maple)"
              opacity={0.75}
              d="M1110 420c-4-12 6-22 16-20 8-8 22-2 22 8 10 4 6 18-4 20-6 6-18 6-22-2-8 0-14-2-12-6z"
            />
            <path
              fill="#c97a6b"
              d="M186 452c-4-12 6-22 16-20 8-8 22-2 22 8 10 4 6 18-4 20-6 6-18 6-22-2-8 0-14-2-12-6z"
            />
          </g>
          <g
            filter={PEN}
            stroke="#7d5d4f"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          >
            <path d="M646 428c1 10 0 20-2 30M700 434c0 10 2 18 0 26M1068 428c-1 8 0 16 2 24M120 454c0 8-1 14 0 22M204 470c1 6 0 12-1 18M1128 438c0 8 1 12 0 18" />
          </g>

          {/* red arch bridge over the gorge, the trolley crossing it */}
          <g filter="url(#j-wash-sm)">
            <path
              fill="#c96f55"
              d="M770 478c56-3 120-3 182 0v7c-62-3-126-3-182 0z"
            />
          </g>
          <g
            filter={PEN}
            stroke="#a6492f"
            strokeWidth={2.4}
            fill="none"
            strokeLinecap="round"
          >
            <path d="M790 548c26-50 54-66 72-66s48 16 74 66" />
            <path
              d="M812 516v-32M836 494v-10M862 484v-1M888 494v-10M912 516v-32"
              strokeWidth={1.6}
            />
          </g>
          <g transform="translate(796 446) rotate(-0.6)">
            <g filter="url(#j-wash-sm)">
              <path
                fill="var(--c-maple)"
                d="M2 28V10c0-4 2-6 6-6h18c4 0 6 3 6 7v17z"
              />
              <path
                fill="var(--c-ginkgo-soft)"
                d="M38 28V14h26v14zM70 28V14h26v14zM102 28V14h24v14z"
              />
            </g>
            <g
              filter="url(#j-pencil-sm)"
              stroke="var(--c-ink)"
              strokeWidth={1.3}
              fill="none"
              strokeLinecap="round"
            >
              <path d="M36 13h30M68 13h30M100 13h28M38 14v14M64 14v14M70 14v14M96 14v14M102 14v14M126 14v14M8 12h10v7H8z" />
              <path d="M8 31a3 3 0 1 0 .1 0M26 31a3 3 0 1 0 .1 0M44 31a3 3 0 1 0 .1 0M60 31a3 3 0 1 0 .1 0M78 31a3 3 0 1 0 .1 0M92 31a3 3 0 1 0 .1 0M110 31a3 3 0 1 0 .1 0M122 31a3 3 0 1 0 .1 0" />
            </g>
            <g fill="var(--c-ink-soft)">
              <circle cx="46" cy="19" r="2.4" />
              <circle cx="56" cy="20" r="2.2" />
              <circle cx="80" cy="19" r="2.4" />
              <circle cx="112" cy="20" r="2.3" />
            </g>
          </g>

          {/* Tokyo, far and faint */}
          <g filter="url(#j-wash-sm)" opacity={0.5}>
            <path
              fill="var(--c-rose)"
              d="M1086 372v-34h14v-12h12v46zM1120 372v-50h10v50zM1138 372v-26h16v26zM1160 372v-40h12v40z"
            />
          </g>
          <g
            filter={PEN}
            stroke="var(--c-maple)"
            strokeWidth={1.6}
            fill="none"
            opacity={0.75}
          >
            <path d="M1062 374l10-58 2-18 2 18 10 58M1066 350h18M1069 332h12M1074 298v-12" />
          </g>

          {/* ground and tram track */}
          <g filter={W} opacity={0.6}>
            <path
              fill="var(--c-sage-soft)"
              d="M0 520c120-14 260-20 400-16 150 4 260 18 400 16 120-2 260-14 400-10V640H0z"
            />
          </g>
          <g
            filter={PEN}
            stroke="var(--c-ink-soft)"
            strokeWidth={1.6}
            fill="none"
            strokeLinecap="round"
          >
            <path d="M268 566c90-4 190-6 300-4 70 2 120 4 186 2" />
            <path
              d="M290 572l6-8M332 571l6-8M376 570l6-8M420 570l6-8M466 570l6-8M512 571l6-8M560 571l6-8M606 571l6-8M652 572l6-8M700 572l6-8"
              opacity={0.6}
            />
          </g>

          {/* Toyama tram */}
          <g className="j-anim-sway" transform="translate(360 476)">
            <g filter="url(#j-wash-sm)">
              <path
                fill="var(--c-sakura)"
                d="M8 84V30c0-12 8-20 22-22h196c14 2 22 10 22 22v54z"
              />
              <path fill="var(--c-card)" d="M8 60h240v14H8z" />
            </g>
            <g filter="url(#j-wash-sm)" fill="#bcd0d6">
              <path d="M28 24h40v26H28zM80 24h38v26H80zM130 24h40v26h-40zM182 24h44v26h-44z" />
            </g>
            <g
              filter="url(#j-pencil-sm)"
              stroke="var(--c-ink)"
              strokeWidth={1.6}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 84V30c0-12 8-20 22-22h196c14 2 22 10 22 22v54zM8 60h240" />
              <path d="M28 24h40v26H28zM80 24h38v26H80zM130 24h40v26h-40zM182 24h44v26h-44z" />
              <path d="M116 8l12-16 14 16M104-10h52" />
              <path d="M36 88a6 6 0 1 0 .1 0M70 88a6 6 0 1 0 .1 0M188 88a6 6 0 1 0 .1 0M222 88a6 6 0 1 0 .1 0" />
            </g>
            <text
              x="128"
              y="72"
              textAnchor="middle"
              fontFamily="var(--f-script)"
              fontSize="13"
              fill="var(--c-rose-ink)"
            >
              TOYAMA
            </text>
          </g>

          {/* Kusatsu yubatake: wooden troughs and rising steam */}
          <g transform="translate(46 492)">
            <g filter="url(#j-wash-sm)">
              <path fill="#c9a98c" d="M0 30l150-14v16L0 48z" />
              <path fill="#b8957a" d="M10 52l150-14v14L10 66z" />
              <path
                fill="var(--c-sky)"
                opacity={0.8}
                d="M2 76c40-8 100-12 170-10v16c-60-2-120 2-170 10z"
              />
            </g>
            <g
              filter="url(#j-pencil-sm)"
              stroke="#7d5d4f"
              strokeWidth={1.4}
              fill="none"
            >
              <path d="M0 30l150-14M0 48l150-16M10 52l150-14M10 66l150-14M30 46v14M70 42v14M110 38v14M150 32v16" />
            </g>
            <g
              className="j-anim-steam"
              filter={PEN}
              stroke="var(--c-ink-soft)"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              opacity={0.55}
            >
              <path d="M30 24c-12-14 10-22 0-38s8-26 2-40" />
              <path d="M74 18c-10-12 12-22 2-36s6-24 0-36" />
              <path d="M118 14c-12-14 8-20 0-34s8-22 2-34" />
            </g>
          </g>

          {/* deer by the ginkgo */}
          <g transform="translate(980 426)">
            <g filter="url(#j-wash-sm)">
              <path
                fill="#c99d72"
                d="M8 30c0-10 10-14 24-14h20c8 0 12 6 10 14l-2 4H10z"
              />
              <path fill="#c99d72" d="M56 18c2-8 10-14 18-10 4 4 0 10-6 12z" />
            </g>
            <g
              filter="url(#j-pencil-sm)"
              stroke="var(--c-ink)"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
            >
              <path d="M8 30c0-10 10-14 24-14h20c8 0 12 6 10 14M12 32l-2 22M22 34l1 20M50 34l-1 20M58 32l2 22M56 18c2-8 10-14 18-10 4 4 0 10-6 12" />
              <path d="M70 8l-2-10M70 4l5-5M66 8l-6-8" />
            </g>
            <circle cx="70" cy="12" r="1.4" fill="var(--c-ink)" />
            <g fill="var(--c-card)" opacity={0.85}>
              <circle cx="24" cy="22" r="1.6" />
              <circle cx="34" cy="24" r="1.4" />
              <circle cx="44" cy="21" r="1.5" />
            </g>
          </g>

          {/* traveller in a beanie and scarf, waving */}
          <g transform="translate(640 470)" className="j-anim-bob">
            <g filter="url(#j-wash-sm)">
              <path
                fill="var(--c-sage)"
                d="M14 92c-2-20 2-40 18-44h10c16 4 20 24 18 44z"
              />
              <path
                fill="var(--c-card)"
                d="M24 22a14 14 0 1 0 .1 0"
                transform="translate(13 2)"
              />
              <path
                fill="var(--c-maple)"
                d="M22 22c0-10 6-16 15-16s15 6 15 16z"
              />
              <path fill="var(--c-sakura)" d="M22 44h30v8H22zM42 52h8v20h-8z" />
            </g>
            <g
              filter="url(#j-pencil-sm)"
              stroke="var(--c-ink)"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M37 10a14 14 0 1 0 .1 0M22 22c0-10 6-16 15-16s15 6 15 16M37 2a3 3 0 1 0 .1 0" />
              <path d="M14 92c-2-20 2-40 18-44h10c16 4 20 24 18 44M22 44h30v8H22zM42 52v20h8V52" />
              <path d="M58 56c8-6 12-14 14-24" />
              <path d="M26 92v12M46 92v12" />
            </g>
            <circle cx="32" cy="26" r="1.5" fill="var(--c-ink)" />
            <circle cx="42" cy="26" r="1.5" fill="var(--c-ink)" />
            <circle
              cx="28"
              cy="31"
              r="2.6"
              fill="var(--c-sakura)"
              opacity={0.8}
            />
            <circle
              cx="46"
              cy="31"
              r="2.6"
              fill="var(--c-sakura)"
              opacity={0.8}
            />
          </g>

          {/* stars and drifting snow */}
          <g fill="var(--c-ginkgo)" filter="url(#j-wash-sm)">
            <path d="M96 118l4 9 10 1-7 6 2 10-9-5-8 5 2-10-7-6 9-1z" />
            <path d="M1054 132l3 7 7 1-5 4 1 7-6-3-6 3 1-7-5-4 7-1z" />
          </g>
          <g
            className="j-anim-snow"
            fill="var(--c-snow)"
            stroke="var(--c-line-strong)"
            strokeWidth={0.8}
          >
            {SNOW.map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} />
            ))}
          </g>
          <g filter="url(#j-wash-sm)">
            <path
              fill="var(--c-maple)"
              className="j-anim-leaf"
              d="M560 216l6-12 2 8 8-4-4 8 8 2-10 6 2 8-8-4-4 8-2-8-8 2 6-8z"
            />
            <path
              fill="var(--c-ginkgo)"
              className="j-anim-leaf2"
              d="M286 250c-12-3-16-15-10-22 5 3 12 3 17 0 3 8 0 19-7 22zm0 0l3 9"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
