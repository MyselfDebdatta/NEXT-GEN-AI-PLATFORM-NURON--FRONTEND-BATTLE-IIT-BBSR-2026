import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

type Feature = {
  id: string;
  title: string;
  tag: string;
  desc: string;
  span: string;
  icon: React.ReactNode;
  visual: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "ingest",
    tag: "Ingest",
    title: "Stream from anywhere",
    desc: "200+ native connectors. Postgres, Kafka, Snowflake, webhooks, browser events — pipe them into one reasoning layer.",
    span: "md:col-span-2 md:row-span-2",
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden>
        <path
          d="M8 24h12m8 0h12M24 8v12m0 8v12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    visual: (
      <svg viewBox="0 0 320 180" className="bento-visual" aria-hidden>
        <defs>
          <radialGradient id="bv-r" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#d6ff3d" stopOpacity=".5" />
            <stop offset="1" stopColor="#d6ff3d" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="160" cy="90" r="60" fill="url(#bv-r)" />
        <circle cx="160" cy="90" r="6" fill="#d6ff3d" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2;
          const x = 160 + Math.cos(a) * 70;
          const y = 90 + Math.sin(a) * 40;
          return (
            <g key={i}>
              <line
                x1="160"
                y1="90"
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeOpacity=".25"
                strokeWidth="1"
              />
              <circle
                cx={x}
                cy={y}
                r="3"
                fill="currentColor"
                className="bv-pulse"
                style={{ animationDelay: `${i * 180}ms` }}
              />
            </g>
          );
        })}
      </svg>
    ),
  },
  {
    id: "reason",
    tag: "Reason",
    title: "Agentic reasoning",
    desc: "Multi-step agents plan, call tools, and verify with citations.",
    span: "md:col-span-2",
    icon: (
      <svg viewBox="0 0 48 48" width="32" height="32" fill="none" aria-hidden>
        <path
          d="M12 32V16l12-6 12 6v16l-12 6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M24 22v16M12 16l12 6 12-6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    visual: (
      <svg viewBox="0 0 265 80" className="bento-visual" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${10 + i * 65}, 20)`}>
            <rect
              width="50"
              height="40"
              rx="6"
              fill="currentColor"
              fillOpacity=".08"
              stroke="currentColor"
              strokeOpacity=".25"
            />
            <circle
              cx="10"
              cy="20"
              r="2"
              fill="#d6ff3d"
              className="bv-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
            <rect
              x="18"
              y="14"
              width="26"
              height="3"
              rx="1.5"
              fill="currentColor"
              fillOpacity=".35"
            />
            <rect
              x="18"
              y="22"
              width="18"
              height="3"
              rx="1.5"
              fill="currentColor"
              fillOpacity=".2"
            />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: "deploy",
    tag: "Deploy",
    title: "Ship in minutes",
    desc: "One-click rollout to edge, k8s or your VPC.",
    span: "",
    icon: (
      <svg viewBox="0 0 48 48" width="32" height="32" fill="none" aria-hidden>
        <path
          d="M14 30l8-20 12 12-20 8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M14 30l-4 8 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    visual: (
      <svg viewBox="0 0 160 60" className="bento-visual" aria-hidden>
        <path
          d="M10 50 Q 50 10 80 30 T 150 12"
          fill="none"
          stroke="#d6ff3d"
          strokeWidth="1.6"
          className="bv-stroke"
        />
        <circle r="3" fill="#d6ff3d" className="bv-trace">
          <animateMotion dur="3.5s" repeatCount="indefinite" path="M10 50 Q 50 10 80 30 T 150 12" />
        </circle>
      </svg>
    ),
  },
  {
    id: "observe",
    tag: "Observe",
    title: "Traceable by default",
    desc: "Every token, tool call and decision — replayable.",
    span: "",
    icon: (
      <svg viewBox="0 0 48 48" width="32" height="32" fill="none" aria-hidden>
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 16v8l6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    visual: (
      <svg viewBox="0 0 160 60" className="bento-visual" aria-hidden>
        {[8, 22, 14, 30, 18, 36, 24, 42, 28, 48, 34, 26, 38, 30].map((h, i) => (
          <rect
            key={i}
            x={6 + i * 11}
            y={56 - h}
            width="6"
            height={h}
            rx="1.5"
            fill="currentColor"
            fillOpacity={0.25 + h / 80}
            className="bv-bar"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </svg>
    ),
  },
  {
    id: "secure",
    tag: "Secure",
    title: "SOC2 · HIPAA · ISO 27001",
    desc: "Enterprise-grade isolation, BYOK encryption, granular RBAC.",
    span: "md:col-span-2",
    icon: (
      <svg viewBox="0 0 48 48" width="32" height="32" fill="none" aria-hidden>
        <path
          d="M24 6l14 6v10c0 10-7 17-14 20-7-3-14-10-14-20V12z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M18 24l4 4 8-9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    visual: (
      <svg viewBox="0 0 220 60" className="bento-visual" aria-hidden>
        {["SOC 2", "HIPAA", "ISO 27001", "GDPR"].map((label, i) => (
          <g key={label} transform={`translate(${i * 55 + 4}, 14)`}>
            <rect
              width="48"
              height="30"
              rx="15"
              fill="currentColor"
              fillOpacity=".06"
              stroke="currentColor"
              strokeOpacity=".3"
            />
            <text
              x="24"
              y="19"
              textAnchor="middle"
              fontSize="9"
              fill="currentColor"
              fillOpacity=".75"
              fontFamily="ui-monospace,monospace"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    ),
  },
];

const MOBILE_MAX = 767;

/**
 * BentoAccordion — desktop bento, mobile accordion.
 * Active index is the single source of truth and survives the layout switch:
 * if a user hovers a bento card then resizes into mobile, the matching
 * accordion panel is already open. Zero external animation libraries.
 */
export function BentoAccordion() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const sync = (m: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(m.matches);
    };
    sync(mq);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="features"
      aria-labelledby="features-h"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <header className="mb-12 max-w-2xl">
        <p className="section-rule">
          <span className="num">02</span> / Features
        </p>
        <h2 id="features-h" className="text-display mt-4 text-4xl sm:text-6xl">
          One platform. <em className="text-accent not-italic">Every workflow.</em>
        </h2>
        <p className="mt-4 text-ink-dim">
          A reasoning layer that ingests, decides and acts — built for teams that ship every day.
        </p>
      </header>

      {isMobile ? (
        <ul className="flex flex-col gap-3" role="list">
          {FEATURES.map((f, i) => {
            const open = activeIdx === i;
            return (
              <Reveal as="li" key={f.id} delay={i * 60} className="card overflow-hidden">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`panel-${f.id}`}
                  onClick={() => setActiveIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-accent">{f.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-wider text-ink-mute">
                        {f.tag}
                      </span>
                      <span className="block text-base">{f.title}</span>
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`acc-chev shrink-0 text-2xl text-accent ${open ? "open" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`panel-${f.id}`}
                  role="region"
                  className={`acc-panel ${open ? "open" : ""}`}
                >
                  <div>
                    <p className="px-5 pb-5 text-sm text-ink-dim">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      ) : (
        <div className="grid auto-rows-[240px] grid-cols-1 gap-5 md:grid-cols-5">
          {FEATURES.map((f, i) => (
            <Reveal as="div" key={f.id} delay={i * 80} className={f.span}>
              <article
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx((prev) => (prev === i ? null : prev))}
                onMouseMove={handleMouseMove}
                onFocus={() => setActiveIdx(i)}
                tabIndex={0}
                className={`bento-card group relative flex h-full flex-col justify-between overflow-hidden p-6 outline-none focus-visible:border-accent ${activeIdx === i ? "is-active" : ""}`}
              >
                <div className="relative z-10 flex items-start justify-between">
                  <div className="text-accent transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-3">
                    {f.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                    {f.tag}
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-20 pt-4 text-ink-dim/60 transition-opacity duration-200 group-hover:text-accent/90 [&>svg]:!w-[55%]">
                  {f.visual}
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="text-display text-2xl">{f.title}</h3>
                  <p className="mt-2 max-w-md text-sm text-ink-dim">{f.desc}</p>
                </div>

                <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100" />
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
