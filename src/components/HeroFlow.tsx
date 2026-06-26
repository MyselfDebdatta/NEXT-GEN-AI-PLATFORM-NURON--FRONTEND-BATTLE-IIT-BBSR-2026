/**
 * HeroFlow — animated SVG data-flow ribbon for the hero.
 * Pure CSS animation via stroke-dashoffset; no JS, no libs.
 */
export function HeroFlow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 320"
      className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-[320px] w-full max-w-5xl opacity-50"
    >
      <defs>
        <linearGradient id="hf-g1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d6ff3d" stopOpacity="0" />
          <stop offset=".4" stopColor="#d6ff3d" stopOpacity=".9" />
          <stop offset="1" stopColor="#6f5cff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hf-g2" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#6f5cff" stopOpacity="0" />
          <stop offset=".5" stopColor="#6f5cff" stopOpacity=".8" />
          <stop offset="1" stopColor="#d6ff3d" stopOpacity="0" />
        </linearGradient>
        <filter id="hf-blur">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {[
        {
          d: "M-20 120 C 200 60, 400 220, 820 90",
          g: "url(#hf-g1)",
          w: 1.4,
          dur: "9s",
          delay: "0s",
        },
        {
          d: "M-20 180 C 220 260, 460 80, 820 200",
          g: "url(#hf-g2)",
          w: 1.2,
          dur: "11s",
          delay: ".4s",
        },
        {
          d: "M-20 240 C 240 180, 480 320, 820 240",
          g: "url(#hf-g1)",
          w: 1,
          dur: "13s",
          delay: ".8s",
        },
      ].map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={p.g}
          strokeWidth={p.w}
          strokeLinecap="round"
          filter="url(#hf-blur)"
          className="hf-path"
          style={{ animationDuration: p.dur, animationDelay: p.delay }}
        />
      ))}

      {/* Node markers */}
      {[120, 250, 400, 550, 680].map((x, i) => (
        <g key={i} className="hf-node" style={{ animationDelay: `${i * 220}ms` }}>
          <circle cx={x} cy={150 + (i % 2 === 0 ? -30 : 30)} r="3" fill="#d6ff3d" />
          <circle
            cx={x}
            cy={150 + (i % 2 === 0 ? -30 : 30)}
            r="8"
            fill="none"
            stroke="#d6ff3d"
            strokeOpacity=".4"
          />
        </g>
      ))}
    </svg>
  );
}
