import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";

type Tier = {
  id: string;
  name: string;
  base: number;
  desc: string;
  features: string[];
  popular?: boolean;
};

const PRICING_MATRIX = {
  tiers: [
    {
      id: "starter",
      name: "Starter",
      base: 19,
      desc: "For solo builders shipping their first AI workflows.",
      features: [
        "5 active automations",
        "10k events / month",
        "Community support",
        "Standard models",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      base: 79,
      popular: true,
      desc: "For teams scaling autonomous data pipelines.",
      features: [
        "Unlimited automations",
        "1M events / month",
        "Priority support",
        "Advanced reasoning models",
        "Custom connectors",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      base: 249,
      desc: "For organisations with compliance & scale needs.",
      features: [
        "Dedicated compute",
        "SSO / SAML / SCIM",
        "24/7 SLA",
        "On-prem deployment",
        "Custom model training",
      ],
    },
  ] as Tier[],
  billing: {
    monthly: { mult: 1, label: "Monthly", suffix: "/mo" },
    annual: { mult: 0.8, label: "Annual", suffix: "/mo · billed yearly" }, // 20% off
  },
  currency: {
    USD: { symbol: "$", tariff: 1.0, locale: "en-US" },
    INR: { symbol: "₹", tariff: 83.5, locale: "en-IN" },
    EUR: { symbol: "€", tariff: 0.93, locale: "de-DE" },
  },
} as const;

type BillingKey = keyof typeof PRICING_MATRIX.billing;
type CurrencyKey = keyof typeof PRICING_MATRIX.currency;

function computePrice(base: number, billing: BillingKey, currency: CurrencyKey) {
  const b = PRICING_MATRIX.billing[billing];
  const c = PRICING_MATRIX.currency[currency];
  const value = base * b.mult * c.tariff;
  const rounded = value >= 100 ? Math.round(value) : Math.round(value * 100) / 100;
  return `${c.symbol}${rounded.toLocaleString(c.locale, { maximumFractionDigits: value >= 100 ? 0 : 2 })}`;
}

/**
 * PricingMatrix — performance-isolated.
 * - billing & currency live in refs (no React state)
 * - click handlers mutate ONLY the targeted DOM text nodes + active button class
 * - parent component and surrounding sections never re-render
 */
export function PricingMatrix() {
  const billingRef = useRef<BillingKey>("monthly");
  const currencyRef = useRef<CurrencyKey>("USD");
  const priceNodesRef = useRef<HTMLSpanElement[]>([]);
  const suffixNodesRef = useRef<HTMLSpanElement[]>([]);
  const billBtnsRef = useRef<HTMLButtonElement[]>([]);
  const currBtnsRef = useRef<HTMLButtonElement[]>([]);

  const repaintPrices = () => {
    const b = billingRef.current;
    const c = currencyRef.current;
    PRICING_MATRIX.tiers.forEach((tier, i) => {
      const node = priceNodesRef.current[i];
      if (node) node.textContent = computePrice(tier.base, b, c);
    });
    const suf = PRICING_MATRIX.billing[b].suffix;
    suffixNodesRef.current.forEach((n) => {
      if (n) n.textContent = suf;
    });
  };

  const setBilling = (key: BillingKey) => {
    billingRef.current = key;
    billBtnsRef.current.forEach((btn) => {
      const active = btn.dataset.key === key;
      btn.setAttribute("aria-pressed", String(active));
      btn.dataset.active = String(active);
    });
    repaintPrices();
  };

  const setCurrency = (key: CurrencyKey) => {
    currencyRef.current = key;
    currBtnsRef.current.forEach((btn) => {
      const active = btn.dataset.key === key;
      btn.setAttribute("aria-pressed", String(active));
      btn.dataset.active = String(active);
    });
    repaintPrices();
  };

  useEffect(() => {
    repaintPrices();
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
      id="pricing"
      aria-labelledby="pricing-h"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <Reveal
        as="header"
        className="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-xl">
          <p className="section-rule">
            <span className="num">04</span> / Pricing
          </p>
          <h2 id="pricing-h" className="text-display mt-4 text-4xl sm:text-6xl">
            Pay for outcomes, <em className="text-accent not-italic">not seats</em>.
          </h2>
          <p className="mt-4 text-ink-dim">
            Switch currency or billing — only the price text repaints. Zero parent re-renders.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          {/* Billing toggle */}
          <div
            role="group"
            aria-label="Billing cycle"
            className="inline-flex rounded-full border border-line bg-surface p-1"
          >
            {(Object.keys(PRICING_MATRIX.billing) as BillingKey[]).map((k, i) => (
              <button
                key={k}
                ref={(el) => {
                  if (el) billBtnsRef.current[i] = el;
                }}
                data-key={k}
                data-active={k === "monthly"}
                aria-pressed={k === "monthly"}
                onClick={() => setBilling(k)}
                className="rounded-full px-4 py-1.5 text-sm text-ink-dim transition-colors duration-150 ease-out data-[active=true]:bg-accent data-[active=true]:text-[#0a0a0b]"
              >
                {PRICING_MATRIX.billing[k].label}
                {k === "annual" && (
                  <span className="ml-1.5 text-[10px] uppercase tracking-wider opacity-70">
                    −20%
                  </span>
                )}
              </button>
            ))}
          </div>
          {/* Currency toggle */}
          <div
            role="group"
            aria-label="Currency"
            className="inline-flex rounded-full border border-line bg-surface p-1"
          >
            {(Object.keys(PRICING_MATRIX.currency) as CurrencyKey[]).map((k, i) => (
              <button
                key={k}
                ref={(el) => {
                  if (el) currBtnsRef.current[i] = el;
                }}
                data-key={k}
                data-active={k === "USD"}
                aria-pressed={k === "USD"}
                onClick={() => setCurrency(k)}
                className="rounded-full px-4 py-1.5 text-sm text-ink-dim transition-colors duration-150 ease-out data-[active=true]:bg-ink data-[active=true]:text-[#0a0a0b]"
              >
                {PRICING_MATRIX.currency[k].symbol} {k}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {PRICING_MATRIX.tiers.map((tier, i) => (
          <Reveal as="div" key={tier.id} delay={i * 100}>
            <article
              onMouseMove={handleMouseMove}
              className={`card h-full relative flex flex-col p-7 ${tier.popular ? "bg-surface-2" : ""}`}
              style={tier.popular ? { borderColor: "rgba(214,255,61,.45)" } : undefined}
            >
              {tier.popular && (
                <span className="absolute -top-2.5 left-7 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#0a0a0b]">
                  Most popular
                </span>
              )}
              <h3 className="text-display text-3xl">{tier.name}</h3>
              <p className="mt-2 text-sm text-ink-dim">{tier.desc}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span
                  ref={(el) => {
                    if (el) priceNodesRef.current[i] = el;
                  }}
                  className="text-display text-5xl tracking-tight"
                  aria-live="polite"
                >
                  {computePrice(tier.base, "monthly", "USD")}
                </span>
                <span
                  ref={(el) => {
                    if (el) suffixNodesRef.current[i] = el;
                  }}
                  className="text-xs text-ink-mute"
                >
                  {PRICING_MATRIX.billing.monthly.suffix}
                </span>
              </div>

              <ul className="mt-7 flex-1 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-ink-dim">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      className="mt-0.5 shrink-0 text-accent"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M3 8.5L6.5 12L13 4.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`btn-shine mt-8 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-150 ease-out ${
                  tier.popular
                    ? "bg-accent text-[#0a0a0b] hover:bg-accent/90"
                    : "border border-line bg-transparent text-ink hover:bg-surface-2"
                }`}
              >
                Start with {tier.name}
              </button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
