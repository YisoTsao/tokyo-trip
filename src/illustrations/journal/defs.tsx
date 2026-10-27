/**
 * Shared SVG filters that give the journal art its watercolour and pencil texture.
 * Mounted once per page; every illustration references them by id.
 * - j-wash / j-wash-sm: wobbly edges, pigment pooling at the rim, paper granulation
 * - j-pencil / j-pencil-sm: shaky graphite line with gaps in the grain
 * - j-edge: torn, unfinished outline for masking a whole painting
 */
export function JournalDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute" }}
    >
      <defs>
        {wash("j-wash", 10, 2, 2.4, 0.022)}
        {wash("j-wash-sm", 3.5, 0.8, 1, 0.06)}
        {pencil("j-pencil", 2.4, 0.9)}
        <filter id="j-edge-sm" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.09}
            numOctaves={3}
            seed={5}
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale={7}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="j-edge" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.018}
            numOctaves={4}
            seed={9}
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale={26}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        {pencil("j-pencil-sm", 0.9, 1.6)}
      </defs>
    </svg>
  );
}

function wash(
  id: string,
  warp: number,
  erode: number,
  soften: number,
  freq: number,
) {
  return (
    <filter
      id={id}
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      colorInterpolationFilters="sRGB"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency={freq}
        numOctaves={3}
        seed={4}
        result="warp"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="warp"
        scale={warp}
        xChannelSelector="R"
        yChannelSelector="G"
        result="shape"
      />
      <feMorphology in="shape" operator="erode" radius={erode} result="inner" />
      <feGaussianBlur in="inner" stdDeviation={soften} result="innerSoft" />
      <feComposite in="shape" in2="innerSoft" operator="out" result="rim" />
      <feComponentTransfer in="shape" result="body">
        <feFuncA type="linear" slope={0.72} />
      </feComponentTransfer>
      <feMerge result="paint">
        <feMergeNode in="body" />
        <feMergeNode in="rim" />
      </feMerge>
      <feTurbulence
        type="fractalNoise"
        baseFrequency={0.8}
        numOctaves={2}
        seed={11}
        result="grain"
      />
      <feColorMatrix
        in="grain"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.55 1.12"
        result="grainMask"
      />
      <feComposite in="paint" in2="grainMask" operator="in" />
    </filter>
  );
}

function pencil(id: string, warp: number, grainFreq: number) {
  return (
    <filter
      id={id}
      x="-5%"
      y="-5%"
      width="110%"
      height="110%"
      colorInterpolationFilters="sRGB"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency={0.9}
        numOctaves={2}
        seed={2}
        result="warp"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="warp"
        scale={warp}
        xChannelSelector="R"
        yChannelSelector="G"
        result="line"
      />
      <feTurbulence
        type="fractalNoise"
        baseFrequency={grainFreq}
        numOctaves={1}
        seed={7}
        result="grain"
      />
      <feColorMatrix
        in="grain"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.35"
        result="grainMask"
      />
      <feComposite in="line" in2="grainMask" operator="in" />
    </filter>
  );
}
