// Original hand-drawn SVG illustrations, migrated as-is from index.html.
// Kept separate from itinerary data so they can be swapped without touching content.

export const HeroArt = () => (
  <svg
    viewBox="0 0 800 260"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* sky stars */}
    <g className="m-twinkle" fill="var(--ginkgo)">
      <path d="M110 46l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" />
      <path d="M690 38l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1z" />
    </g>
    <g className="m-twinkle2" fill="var(--card)">
      <circle cx="210" cy="40" r="3" />
      <circle cx="560" cy="30" r="3" />
      <circle cx="430" cy="60" r="2.5" />
      <circle cx="620" cy="80" r="2" />
    </g>
    {/* back mountains (Tateyama) */}
    <path
      d="M0 200 L120 110 L170 140 L260 60 L340 130 L400 95 L500 170 L560 120 L640 70 L720 130 L800 100 L800 260 L0 260Z"
      fill="var(--card)"
      stroke="var(--sakura)"
      strokeWidth="3"
    />
    <path
      d="M232 86 L260 60 L290 92 L276 86 L262 98 L248 86Z M612 96 L640 70 L668 98 L652 92 L640 102 L626 92Z M104 124 L120 110 L136 124 L124 120Z"
      fill="var(--blush)"
      stroke="var(--sakura)"
      strokeWidth="2.5"
    />
    {/* hills */}
    <path
      d="M0 215 C120 180 220 200 330 190 C450 178 560 205 800 185 L800 260 L0 260Z"
      fill="var(--mint-soft)"
      stroke="var(--mint)"
      strokeWidth="3"
    />
    {/* Toyama bay waves */}
    <path
      d="M0 240 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0"
      stroke="var(--mint)"
      strokeWidth="3"
    />
    {/* train */}
    <g transform="translate(360 186)">
      <path
        d="M0 26 H250"
        stroke="var(--ink-soft)"
        strokeWidth="2.5"
        strokeDasharray="6 6"
      />
      <g className="m-train">
        <rect
          x="10"
          y="0"
          width="70"
          height="24"
          rx="10"
          fill="var(--card)"
          stroke="var(--sakura)"
          strokeWidth="3"
        />
        <rect
          x="84"
          y="0"
          width="70"
          height="24"
          rx="8"
          fill="var(--card)"
          stroke="var(--sakura)"
          strokeWidth="3"
        />
        <path
          d="M158 24 V6 a6 6 0 0 1 6 -6 h20 c18 0 30 14 30 24Z"
          fill="var(--blush)"
          stroke="var(--sakura)"
          strokeWidth="3"
        />
        <g fill="var(--mint)">
          <rect x="20" y="6" width="14" height="9" rx="3" />
          <rect x="42" y="6" width="14" height="9" rx="3" />
          <rect x="94" y="6" width="14" height="9" rx="3" />
          <rect x="116" y="6" width="14" height="9" rx="3" />
          <rect x="166" y="6" width="14" height="9" rx="3" />
        </g>
      </g>
    </g>
    {/* onsen steam */}
    <g className="m-steam" stroke="var(--sakura)" strokeWidth="3">
      <path d="M90 196 c-8 -10 8 -16 0 -28" />
      <path d="M106 196 c-8 -10 8 -16 0 -28" />
    </g>
    <path
      d="M76 200 h44 a4 4 0 0 1 0 8 h-44 a4 4 0 0 1 0 -8Z"
      fill="var(--card)"
      stroke="var(--sakura)"
      strokeWidth="3"
    />
    {/* little person with scarf & beanie */}
    <g transform="translate(250 150)">
      <g className="m-bob">
        <circle
          cx="20"
          cy="18"
          r="14"
          fill="var(--card)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        <path
          d="M6 16 a14 14 0 0 1 28 0Z"
          fill="var(--maple)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        <circle
          cx="20"
          cy="2"
          r="4"
          fill="var(--card)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        <circle cx="15" cy="21" r="1.6" fill="var(--ink)" />
        <circle cx="25" cy="21" r="1.6" fill="var(--ink)" />
        <circle cx="12" cy="25" r="2.5" fill="var(--sakura)" />
        <circle cx="28" cy="25" r="2.5" fill="var(--sakura)" />
        <path
          d="M8 46 C8 34 32 34 32 46 L32 52 L8 52Z"
          fill="var(--blush)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        <path
          d="M9 33 h22 v6 h-22Z M24 39 v10"
          fill="var(--ginkgo)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
      </g>
    </g>
    {/* deer */}
    <g transform="translate(150 158)" stroke="var(--ink)" strokeWidth="2.5">
      <path
        d="M6 30 h30 v14 M10 44 v-14 M30 44 v-14 M6 30 c0 -8 6 -10 14 -10 h12 c6 0 8 4 8 10"
        fill="var(--ginkgo)"
      />
      <path
        d="M34 20 c2 -8 10 -10 14 -6 c2 4 -2 8 -8 8Z"
        fill="var(--ginkgo)"
      />
      <path d="M44 12 l-2 -8 M44 8 l4 -3 M40 12 l-6 -6" />
      <circle cx="44" cy="17" r="1.3" fill="var(--ink)" />
    </g>
    {/* maple leaves */}
    <g
      className="m-sway"
      fill="var(--maple)"
      stroke="var(--maple)"
      strokeWidth="1.5"
    >
      <path
        d="M720 170 l6 -12 2 8 8 -4 -4 8 8 2 -10 6 2 8 -8 -4 -4 8 -2 -8 -8 2 6 -8z"
        transform="rotate(12 726 172)"
      />
      <path d="M60 80 l5 -10 2 7 7 -3 -3 7 7 2 -9 5 2 7 -7 -3 -3 7 -2 -7 -7 2 5 -7z" />
    </g>
    {/* ginkgo leaves */}
    <g
      className="m-sway2"
      fill="var(--ginkgo)"
      stroke="var(--ginkgo)"
      strokeWidth="2"
    >
      <path d="M760 210 c-14 -4 -18 -18 -12 -26 c6 4 14 4 20 0 c4 10 0 22 -8 26Z M760 210 l4 12" />
      <path d="M520 52 c-12 -3 -15 -15 -10 -22 c5 3 12 3 17 0 c3 8 0 19 -7 22Z M520 52 l3 10" />
    </g>
  </svg>
);

export const FlightOutIcon = () => (
  <svg
    className="ico"
    viewBox="0 0 40 40"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18" fill="var(--blush)" />
    <path
      d="M9 23 l22 -8 c2 -1 3 1 1 2 l-8 5 -2 9 -3 1 0 -8 -6 3 -2 3 -2 0 1 -5Z"
      fill="var(--card)"
      stroke="var(--maple)"
      strokeWidth="2"
    />
  </svg>
);

export const FlightBackIcon = () => (
  <svg
    className="ico"
    viewBox="0 0 40 40"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18" fill="var(--mint-soft)" />
    <path
      d="M31 23 l-22 -8 c-2 -1 -3 1 -1 2 l8 5 2 9 3 1 0 -8 6 3 2 3 2 0 -1 -5Z"
      fill="var(--card)"
      stroke="var(--mint)"
      strokeWidth="2"
    />
  </svg>
);

export const DayMini1 = () => (
  <svg
    className="mini"
    viewBox="0 0 64 64"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="30" fill="var(--card)" />
    <path
      d="M10 40 H54"
      stroke="var(--ink-soft)"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
    <path
      d="M12 38 V26 a6 6 0 0 1 6 -6 h18 c12 0 18 10 18 18Z"
      fill="var(--blush)"
      stroke="var(--sakura)"
      strokeWidth="2.5"
    />
    <rect x="18" y="25" width="8" height="6" rx="2" fill="var(--mint)" />
    <rect x="30" y="25" width="8" height="6" rx="2" fill="var(--mint)" />
    <path
      d="M48 14 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1z"
      fill="var(--ginkgo)"
    />
  </svg>
);

export const DayMini2 = () => (
  <svg
    className="mini"
    viewBox="0 0 64 64"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="30" fill="var(--card)" />
    <path
      d="M6 44 L22 22 L32 34 L42 18 L58 44Z"
      fill="var(--mint-soft)"
      stroke="var(--mint)"
      strokeWidth="2.5"
    />
    <path d="M8 50 H56" stroke="var(--maple)" strokeWidth="3" />
    <path
      d="M14 50 V56 M50 50 V56 M26 50 c0 -8 12 -8 12 0"
      stroke="var(--maple)"
      strokeWidth="2.5"
    />
    <path
      d="M46 14 l4 -7 1 5 5 -2 -2 5 5 1 -6 4 1 5 -5 -3 -3 5 -1 -5 -5 1 4 -5z"
      fill="var(--maple)"
    />
  </svg>
);

export const DayMini3 = () => (
  <svg
    className="mini"
    viewBox="0 0 64 64"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="30" fill="var(--card)" />
    <path
      d="M4 48 L24 16 L34 30 L42 20 L60 48Z"
      fill="var(--card)"
      stroke="var(--sakura)"
      strokeWidth="2.5"
    />
    <path
      d="M18 26 L24 16 L30 25 L26 23 L22 27Z"
      fill="var(--blush)"
      stroke="var(--sakura)"
      strokeWidth="2"
    />
    <path d="M14 12 L52 30" stroke="var(--ink-soft)" strokeWidth="1.8" />
    <rect
      x="34"
      y="22"
      width="10"
      height="8"
      rx="2"
      fill="var(--ginkgo)"
      stroke="var(--ink-soft)"
      strokeWidth="1.8"
    />
  </svg>
);

export const DayMini4 = () => (
  <svg
    className="mini"
    viewBox="0 0 64 64"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="30" fill="var(--card)" />
    <path
      d="M12 44 L32 14 L52 44Z"
      fill="var(--blush)"
      stroke="var(--maple)"
      strokeWidth="2.5"
    />
    <path
      d="M18 44 V50 H46 V44"
      fill="var(--card)"
      stroke="var(--maple)"
      strokeWidth="2.5"
    />
    <path
      d="M28 34 h8 v6 h-8Z"
      fill="var(--ginkgo)"
      stroke="var(--maple)"
      strokeWidth="2"
    />
    <path d="M26 22 h12" stroke="var(--card)" strokeWidth="2" />
    <path d="M8 52 H56" stroke="var(--mint)" strokeWidth="2.5" />
  </svg>
);

export const DayMini5 = () => (
  <svg
    className="mini"
    viewBox="0 0 64 64"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="30" fill="var(--card)" />
    <path
      d="M18 24 h28 l-3 26 h-22Z"
      fill="var(--blush)"
      stroke="var(--sakura)"
      strokeWidth="2.5"
    />
    <path
      d="M25 24 v-4 a7 7 0 0 1 14 0 v4"
      stroke="var(--sakura)"
      strokeWidth="2.5"
    />
    <path
      d="M32 36 c-4 -4 -8 0 -4 4 l4 4 4 -4 c4 -4 0 -8 -4 -4Z"
      fill="var(--maple)"
    />
  </svg>
);

export const DayMini6 = () => (
  <svg
    className="mini"
    viewBox="0 0 64 64"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="30" fill="var(--card)" />
    <path
      d="M14 50 V28 h10 v22 M26 50 V16 h12 v34 M40 50 V24 h10 v26"
      fill="var(--mint-soft)"
      stroke="var(--mint)"
      strokeWidth="2.5"
    />
    <path d="M10 50 H54" stroke="var(--ink-soft)" strokeWidth="2.5" />
    <path
      d="M32 8 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1z"
      fill="var(--ginkgo)"
    />
  </svg>
);

export const DayMini7 = () => (
  <svg
    className="mini"
    viewBox="0 0 64 64"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="30" fill="var(--card)" />
    <rect
      x="20"
      y="22"
      width="24"
      height="28"
      rx="5"
      fill="var(--blush)"
      stroke="var(--sakura)"
      strokeWidth="2.5"
    />
    <path
      d="M27 22 v-5 h10 v5 M26 30 h12 M26 37 h12"
      stroke="var(--sakura)"
      strokeWidth="2.5"
    />
    <circle cx="25" cy="53" r="2.5" fill="var(--ink-soft)" />
    <circle cx="39" cy="53" r="2.5" fill="var(--ink-soft)" />
  </svg>
);

export const dayMinis = [
  DayMini1,
  DayMini2,
  DayMini3,
  DayMini4,
  DayMini5,
  DayMini6,
  DayMini7,
];

export const StarIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path
      d="M17 3 l4 9 10 1 -8 7 3 10 -9 -5 -9 5 3 -10 -8 -7 10 -1z"
      fill="var(--ginkgo)"
      stroke="var(--ink)"
      strokeWidth="2"
    />
  </svg>
);

export const TimetableAlpenIcon = () => (
  <svg
    className="ico"
    viewBox="0 0 40 40"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18" fill="var(--blush)" />
    <path
      d="M6 30 L16 14 L22 22 L27 16 L35 30Z"
      fill="var(--card)"
      stroke="var(--sakura)"
      strokeWidth="2"
    />
  </svg>
);

export const TimetableKurotetuIcon = () => (
  <svg
    className="ico"
    viewBox="0 0 40 40"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18" fill="var(--mint-soft)" />
    <rect
      x="9"
      y="15"
      width="22"
      height="11"
      rx="4"
      fill="var(--card)"
      stroke="var(--maple)"
      strokeWidth="2"
    />
    <path
      d="M8 30 H32"
      stroke="var(--ink-soft)"
      strokeWidth="2"
      strokeDasharray="3 3"
    />
  </svg>
);

export const TimetableNouhiIcon = () => (
  <svg
    className="ico"
    viewBox="0 0 40 40"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18" fill="var(--blush)" />
    <path
      d="M9 28 L20 11 L31 28Z"
      fill="var(--card)"
      stroke="var(--maple)"
      strokeWidth="2"
    />
    <path d="M13 28 V31 H27 V28" stroke="var(--maple)" strokeWidth="2" />
  </svg>
);

export const TimetableChitetsuIcon = () => (
  <svg
    className="ico"
    viewBox="0 0 40 40"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18" fill="var(--mint-soft)" />
    <rect
      x="9"
      y="12"
      width="22"
      height="16"
      rx="4"
      fill="var(--card)"
      stroke="var(--mint)"
      strokeWidth="2"
    />
    <path d="M9 20 H31" stroke="var(--mint)" strokeWidth="2" />
    <circle cx="14" cy="29" r="2" fill="var(--ink-soft)" />
    <circle cx="26" cy="29" r="2" fill="var(--ink-soft)" />
  </svg>
);

export const TimetableKusakaruIcon = () => (
  <svg
    className="ico"
    viewBox="0 0 40 40"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18" fill="var(--blush)" />
    <rect
      x="9"
      y="12"
      width="22"
      height="16"
      rx="4"
      fill="var(--card)"
      stroke="var(--maple)"
      strokeWidth="2"
    />
    <path d="M9 20 H31" stroke="var(--maple)" strokeWidth="2" />
    <circle cx="14" cy="29" r="2" fill="var(--ink-soft)" />
    <circle cx="26" cy="29" r="2" fill="var(--ink-soft)" />
  </svg>
);

export const TimetableHanedaIcon = () => (
  <svg
    className="ico"
    viewBox="0 0 40 40"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18" fill="var(--mint-soft)" />
    <path
      d="M9 23 l22 -8 c2 -1 3 1 1 2 l-8 5 -2 9 -3 1 0 -8 -6 3 -2 3 -2 0 1 -5Z"
      fill="var(--card)"
      stroke="var(--mint)"
      strokeWidth="2"
    />
  </svg>
);
