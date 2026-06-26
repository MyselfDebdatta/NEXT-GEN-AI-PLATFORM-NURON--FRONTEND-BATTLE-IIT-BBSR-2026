import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BentoAccordion } from "@/components/BentoAccordion";
import { PricingMatrix } from "@/components/PricingMatrix";
import { Navbar } from "@/components/Navbar";
import { LogoMarquee } from "@/components/LogoMarquee";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { AnimatedStat } from "@/components/AnimatedStat";
import { LiveTrace } from "@/components/LiveTrace";
import { HeroFlow } from "@/components/HeroFlow";
import { MagneticButton } from "@/components/MagneticButton";
import { AgentTerminal } from "@/components/AgentTerminal";
import { Ecosystem } from "@/components/Ecosystem";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nuron — Agentic Data Automation Platform" },
      {
        name: "description",
        content:
          "Nuron is the AI operating system for autonomous data workflows — ingest from anywhere, reason with agents, and ship to production in minutes.",
      },
      { property: "og:title", content: "Nuron — Agentic Data Automation Platform" },
      {
        property: "og:description",
        content:
          "Autonomous AI workflows. Real-time data reasoning. Built for teams that refuse to wait.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Nuron",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "19", priceCurrency: "USD" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "284" },
        }),
      },
    ],
  }),
  component: Landing,
});

const TESTIMONIALS = [
  {
    q: "Nuron replaced six internal scripts and a Zapier mess in one weekend.",
    a: "Priya Shah",
    r: "Head of Data, Lumen",
    i: "PS",
  },
  {
    q: "The agentic layer alone justifies the price. It just… works.",
    a: "Marcus Reed",
    r: "CTO, Vector Health",
    i: "MR",
  },
  {
    q: "We shipped autonomous billing reconciliation in 3 days. Unreal.",
    a: "Sofia Vargas",
    r: "VP Engineering, Drift",
    i: "SV",
  },
];

const STATS = [
  { k: "12.4B", v: "events processed / day" },
  { k: "99.99%", v: "uptime SLA" },
  { k: "<40ms", v: "median agent latency" },
  { k: "200+", v: "native connectors" },
];

function Landing() {
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      document.body.style.setProperty("--px", px.toString());
      document.body.style.setProperty("--py", py.toString());
    };
    window.addEventListener("mousemove", handleGlobalMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleGlobalMove);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-[#0a0a0b]"
      >
        Skip to content
      </a>

      <div aria-hidden className="aurora" />
      <div aria-hidden className="noise" />

      <Navbar />

      <main id="main" className="relative z-10 pt-24">
        {/* HERO */}
        <section aria-labelledby="hero-h" className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 grid-bg opacity-50" />
          <div
            aria-hidden
            className="orb pointer-events-none absolute left-1/2 top-[-12%] h-[520px] w-[520px] -translate-x-1/2 opacity-60"
          />
          <HeroFlow />

          <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
            <div className="rise rise-1 flex justify-center">
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Nuron 2.0 · Agentic Reasoning is live
              </span>
            </div>

            <h1
              id="hero-h"
              className="text-display rise rise-2 mx-auto mt-7 max-w-5xl text-center text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02]"
            >
              The operating system for <em className="not-italic text-accent">autonomous</em> data
              workflows.
            </h1>

            <p className="rise rise-3 mx-auto mt-6 max-w-2xl text-center text-lg text-ink-dim">
              Ingest from anywhere. Reason with agents. Ship to production in minutes — not
              quarters. Nuron is the AI platform for teams who refuse to wait on the data team.
            </p>

            <div className="rise rise-4 mt-9 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                href="#pricing"
                className="btn-shine rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#0a0a0b]"
              >
                Start free → 14-day trial
              </MagneticButton>
              <a
                href="#how"
                className="rounded-full border border-line bg-surface px-6 py-3 text-sm text-ink transition-colors duration-150 ease-out hover:bg-surface-2"
              >
                See how it works
              </a>
            </div>

            <div className="rise rise-5 mx-auto mt-16 max-w-5xl">
              <div className="card overflow-hidden p-2">
                <div className="rounded-xl border border-line bg-surface-2 p-4 sm:p-6">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 truncate text-xs text-ink-mute">
                      nuron.app/agents/reconciliation
                    </span>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1.4fr]">
                    <div className="rounded-lg border border-line bg-bg/60 p-4">
                      <div className="text-xs uppercase tracking-wider text-ink-mute">Pipeline</div>
                      {[
                        "Ingest · Stripe",
                        "Normalize",
                        "Reason · GPT-Agent",
                        "Reconcile · Postgres",
                        "Notify · Slack",
                      ].map((s, i) => (
                        <div key={s} className="mt-3 flex items-center gap-2 text-sm">
                          <span
                            className={`h-2 w-2 rounded-full ${i < 3 ? "bg-accent" : "bg-ink-mute"}`}
                          />
                          {s}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg border border-line bg-bg/60 p-4">
                      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-ink-mute">
                        <span>Live trace</span>
                        <span className="text-accent">● running</span>
                      </div>
                      <LiveTrace />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGOS */}
        <section
          aria-label="Trusted by"
          className="relative border-y border-line/60 bg-surface/40 backdrop-blur-sm"
        >
          <div className="mx-auto max-w-7xl px-6 py-10">
            <p className="mb-6 flex items-center justify-center gap-3 text-center text-[11px] uppercase tracking-[0.22em] text-ink-mute">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-line" />
              Trusted by teams shipping in production
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-line" />
            </p>
            <LogoMarquee />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <HowItWorks />

        {/* BENTO ↔ ACCORDION */}
        <BentoAccordion />

        {/* STATS — count-up on scroll */}
        <section aria-label="Platform metrics" className="border-y border-line/60 bg-surface/30">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-14 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.v} delay={i * 80}>
                <AnimatedStat value={s.k} label={s.v} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* DEVELOPER TERMINAL */}
        <AgentTerminal />

        {/* PRICING */}
        <PricingMatrix />

        {/* ECOSYSTEM */}
        <Ecosystem />

        {/* TESTIMONIALS */}
        <section
          id="customers"
          aria-labelledby="cust-h"
          className="mx-auto max-w-7xl px-6 py-24 sm:py-32"
        >
          <Reveal as="header" className="mb-12 max-w-2xl">
            <p className="section-rule">
              <span className="num">06</span> / Customers
            </p>
            <h2 id="cust-h" className="text-display mt-4 text-4xl sm:text-6xl">
              Built for the teams shipping the <em className="not-italic text-accent">future</em>.
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal
                as="figure"
                key={t.a}
                delay={i * 100}
                className="card flex flex-col gap-6 p-7"
              >
                <svg
                  width="28"
                  height="22"
                  viewBox="0 0 28 22"
                  fill="none"
                  className="text-accent"
                  aria-hidden
                >
                  <path
                    d="M0 22V12C0 5.4 4.4.6 11 0v4.4c-3.6.6-5.4 2.6-5.4 6h5.4V22H0zm16.6 0V12c0-6.6 4.4-11.4 11-12v4.4c-3.6.6-5.4 2.6-5.4 6H28V22H16.6z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote className="text-display text-2xl leading-snug">{t.q}</blockquote>
                <figcaption className="flex items-center gap-3 text-sm text-ink-dim">
                  <span className="avatar" aria-hidden>
                    {t.i}
                  </span>
                  <span>
                    <span className="block text-ink">{t.a}</span>
                    {t.r}
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* CTA */}
        <section aria-labelledby="cta-h" className="relative mx-auto max-w-7xl px-6 pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-8 py-16 text-center sm:px-16 sm:py-24">
              <div
                aria-hidden
                className="orb pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-40"
              />
              <div className="relative">
                <h2 id="cta-h" className="text-display mx-auto max-w-3xl text-4xl sm:text-6xl">
                  Stop wiring. <em className="not-italic text-accent">Start shipping.</em>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-ink-dim">
                  Spin up your first autonomous workflow in under 5 minutes. No credit card
                  required.
                </p>
                <MagneticButton
                  href="#pricing"
                  className="btn-shine mt-8 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-[#0a0a0b]"
                >
                  Launch Nuron free
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer id="docs" className="relative z-10 border-t border-line/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden>
                <path
                  d="M5 26V6l22 20V6"
                  stroke="#d6ff3d"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span className="text-display text-lg">Nuron</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-dim">
              The operating system for autonomous data workflows.
            </p>
            <form
              className="mt-5 flex max-w-sm overflow-hidden rounded-full border border-line bg-surface focus-within:border-accent/60"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Subscribe to changelog"
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                aria-label="Email"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-ink placeholder:text-ink-mute focus:outline-none"
              />
              <button
                type="submit"
                className="btn-shine bg-accent px-4 text-sm font-medium text-[#0a0a0b] transition-colors duration-150 ease-out hover:bg-accent/90"
              >
                Subscribe
              </button>
            </form>
          </div>
          {[
            { h: "Product", l: ["Features", "Pricing", "Changelog", "Roadmap"] },
            { h: "Developers", l: ["Docs", "API", "SDKs", "Status"] },
            { h: "Company", l: ["About", "Customers", "Careers", "Contact"] },
          ].map((col) => (
            <div key={col.h}>
              <h3 className="text-xs uppercase tracking-wider text-ink-mute">{col.h}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.l.map((x) => (
                  <li key={x}>
                    <a
                      href="#"
                      className="text-ink-dim transition-colors duration-150 ease-out hover:text-ink"
                    >
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-line/60">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-ink-mute sm:flex-row">
            <span>© 2026 Nuron Labs. All rights reserved.</span>
            <span>Crafted with semantic HTML, native CSS &amp; WAAPI.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
