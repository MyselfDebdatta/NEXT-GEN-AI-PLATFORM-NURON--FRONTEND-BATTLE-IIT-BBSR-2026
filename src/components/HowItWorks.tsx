import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    tag: "Connect",
    title: "Wire any source in 60s",
    desc: "Drop in a Postgres URL, an S3 bucket, a webhook or a Kafka stream. Schemas auto-introspect on first contact.",
    icon: (
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none" aria-hidden>
        <rect x="10" y="14" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <rect x="34" y="36" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M30 21h6c4 0 6 3 6 7v8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="20" cy="21" r="2" fill="currentColor" />
        <circle cx="44" cy="43" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: "02",
    tag: "Compose",
    title: "Describe the outcome",
    desc: "Skip the boilerplate. Sketch the agent's goal in plain English and Nuron compiles a typed, traceable pipeline.",
    icon: (
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none" aria-hidden>
        <path
          d="M12 18h40M12 30h28M12 42h34"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="48" cy="42" r="6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M52 46l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: "03",
    tag: "Deploy",
    title: "Ship to prod, then watch",
    desc: "One command rolls the agent to edge or your VPC. Every run is captured — token-by-token replay, auto-rollback.",
    icon: (
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none" aria-hidden>
        <path
          d="M14 38l8-22 14 14-22 8z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M14 38l-4 10 10-4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="34" cy="26" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-h"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <Reveal as="header" className="mb-14 max-w-2xl">
        <p className="section-rule">
          <span className="num">01</span> / How it works
        </p>
        <h2 id="how-h" className="text-display mt-4 text-4xl sm:text-6xl">
          From cold start to <em className="not-italic text-accent">production agent</em> in three
          moves.
        </h2>
      </Reveal>

      <ol className="relative grid gap-6 md:grid-cols-3">
        {/* connector line on desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[12%] right-[12%] top-[88px] hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent md:block"
        />
        {STEPS.map((s, i) => (
          <Reveal key={s.n} as="li" delay={i * 90} className="relative">
            <div className="card relative flex h-full flex-col p-7">
              <div className="flex items-center justify-between">
                <span className="text-display text-xs text-ink-mute">STEP {s.n}</span>
                <span className="text-[10px] uppercase tracking-wider text-accent">{s.tag}</span>
              </div>
              <div className="mt-6 text-accent">{s.icon}</div>
              <h3 className="text-display mt-5 text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-dim">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
