import { useState } from "react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Do I need to rip-and-replace my current stack?",
    a: "No. Nuron sits next to your warehouse, queues, and apps. Most teams point one connector at us in week one and migrate workflows as they age out.",
  },
  {
    q: "How do you handle hallucinations in production?",
    a: "Every agent step is typed, tool-grounded, and verified against your source-of-truth. Outputs that drift outside the schema or confidence bound are auto-quarantined and routed to a human approver.",
  },
  {
    q: "Where does my data live, and who can see it?",
    a: "By default, in-region multi-tenant with end-to-end encryption. Scale and Enterprise tiers ship single-tenant or full VPC-deploy with BYOK. No data is used to train shared models — ever.",
  },
  {
    q: "Can I bring my own model?",
    a: "Yes. OpenAI, Anthropic, Mistral, Llama, and any OpenAI-compatible endpoint plug in via a single config block. Route per-step, per-tier, or per-tenant.",
  },
  {
    q: "What does pricing actually scale on?",
    a: "Successful agent runs. Plans bundle a monthly event quota with overage at a flat rate — no per-seat tax, no surprise tokens, no minimums on Starter.",
  },
];

export function FAQ() {
  // Single open index. Pure local state, no library.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-h"
      className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32"
    >
      <Reveal as="header" className="mb-12 max-w-2xl">
        <p className="section-rule">
          <span className="num">07</span> / FAQ
        </p>
        <h2 id="faq-h" className="text-display mt-4 text-4xl sm:text-6xl">
          Questions, before <em className="not-italic text-accent">you ship</em>.
        </h2>
      </Reveal>

      <ul className="flex flex-col gap-3" role="list">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal as="li" key={f.q} delay={i * 60} className="card overflow-hidden">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors duration-150 ease-out hover:bg-surface-2"
              >
                <span className="text-display text-lg sm:text-xl">{f.q}</span>
                <span
                  aria-hidden
                  className={`acc-chev shrink-0 text-2xl text-accent ${isOpen ? "open" : ""}`}
                >
                  +
                </span>
              </button>
              <div id={`faq-${i}`} role="region" className={`acc-panel ${isOpen ? "open" : ""}`}>
                <div>
                  <p className="px-6 pb-6 text-sm leading-relaxed text-ink-dim">{f.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
