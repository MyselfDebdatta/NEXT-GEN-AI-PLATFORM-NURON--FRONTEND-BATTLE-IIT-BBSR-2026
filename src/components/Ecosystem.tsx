import { Reveal } from "@/components/Reveal";

export function Ecosystem() {
  return (
    <section
      aria-label="Ecosystem"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 overflow-hidden border-t border-line/50 mt-12 bg-[radial-gradient(ellipse_at_top,_var(--surface-2),_transparent_70%)]"
    >
      <Reveal as="header" className="mb-20 text-center">
        <p className="section-rule justify-center">
          <span className="num">05</span> / Ecosystem
        </p>
        <h2 className="text-display mt-4 text-4xl sm:text-6xl">
          Connects to <em className="not-italic text-accent">everything</em>.
        </h2>
        <p className="mt-4 text-ink-dim mx-auto max-w-lg">
          Nuron seamlessly integrates with your existing stack. No migrations. No vendor lock-in.
          Just plug in and ship.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl sm:aspect-[2/1]">
          {/* SVG Connecting Lines - Uses percentages for perfect responsiveness */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              id="p1"
              d="M15,25 Q35,50 50,50"
              fill="none"
              stroke="currentColor"
              className="text-line"
              strokeWidth="0.2"
              strokeDasharray="1 1"
            />
            <path
              id="p2"
              d="M85,20 Q65,50 50,50"
              fill="none"
              stroke="currentColor"
              className="text-line"
              strokeWidth="0.2"
              strokeDasharray="1 1"
            />
            <path
              id="p3"
              d="M20,80 Q40,50 50,50"
              fill="none"
              stroke="currentColor"
              className="text-line"
              strokeWidth="0.2"
              strokeDasharray="1 1"
            />
            <path
              id="p4"
              d="M80,85 Q60,50 50,50"
              fill="none"
              stroke="currentColor"
              className="text-line"
              strokeWidth="0.2"
              strokeDasharray="1 1"
            />

            {/* Animated Packets */}
            <circle r="0.6" className="fill-accent">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M15,25 Q35,50 50,50" />
            </circle>
            <circle r="0.6" className="fill-accent-2">
              <animateMotion dur="3.1s" repeatCount="indefinite" path="M85,20 Q65,50 50,50" />
            </circle>
            <circle r="0.6" className="fill-accent">
              <animateMotion dur="2.1s" repeatCount="indefinite" path="M20,80 Q40,50 50,50" />
            </circle>
            <circle r="0.6" className="fill-accent-2">
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M80,85 Q60,50 50,50" />
            </circle>
          </svg>

          {/* Center Node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-2xl border border-accent/40 bg-surface shadow-[0_0_60px_rgba(214,255,61,0.15)]">
              <span className="text-display text-xl sm:text-3xl text-accent">Nuron</span>
              {/* Pulsing ring */}
              <div
                className="absolute inset-0 rounded-2xl border border-accent"
                style={{ animation: "hf-node-pulse 2.6s ease-in-out infinite" }}
              />
            </div>
          </div>

          {/* Orbiting nodes */}
          <div className="absolute left-[15%] top-[25%] z-10 flex h-10 w-10 sm:h-14 sm:w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-line bg-surface text-[10px] sm:text-xs font-medium text-ink shadow-lg">
            Stripe
          </div>
          <div className="absolute left-[85%] top-[20%] z-10 flex h-10 w-10 sm:h-14 sm:w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-line bg-surface text-[10px] sm:text-xs font-medium text-ink shadow-lg">
            Slack
          </div>
          <div className="absolute left-[20%] top-[80%] z-10 flex h-10 w-10 sm:h-14 sm:w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-line bg-surface text-[10px] sm:text-xs font-medium text-ink shadow-lg">
            Postgres
          </div>
          <div className="absolute left-[80%] top-[85%] z-10 flex h-10 w-10 sm:h-14 sm:w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-line bg-surface text-[10px] sm:text-xs font-medium text-ink shadow-lg">
            GitHub
          </div>
        </div>
      </Reveal>
    </section>
  );
}
