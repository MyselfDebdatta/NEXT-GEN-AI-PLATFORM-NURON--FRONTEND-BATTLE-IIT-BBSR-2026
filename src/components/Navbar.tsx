import { useEffect, useRef, useState } from "react";

const NAV = [
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "customers", label: "Customers" },
  { id: "docs", label: "Docs" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("features");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // Scroll shrink — single rAF-throttled handler, no parent reflow
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Active-section observer
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Slide the highlight pill behind the active link
  useEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    const btn = list.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`);
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const p = list.getBoundingClientRect();
    pill.animate(
      [
        {
          transform: pill.style.transform || "translateX(0) scaleX(1)",
          width: pill.style.width || "0px",
        },
      ],
      { duration: 0 },
    );
    pill.style.transform = `translateX(${r.left - p.left}px)`;
    pill.style.width = `${r.width}px`;
    pill.style.opacity = "1";
  }, [active]);

  return (
    <header
      data-scrolled={scrolled}
      className="fade fixed inset-x-0 top-0 z-40 transition-[padding,background,border-color] duration-200 ease-out data-[scrolled=true]:py-1"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div
        data-scrolled={scrolled}
        className="mx-auto mt-3 flex max-w-7xl items-center justify-between gap-6 rounded-full border border-line bg-bg/60 px-4 py-2.5 backdrop-blur-xl transition-all duration-200 ease-out data-[scrolled=true]:max-w-5xl data-[scrolled=true]:border-line/80 data-[scrolled=true]:bg-bg/85 data-[scrolled=true]:shadow-[0_8px_40px_-12px_rgba(214,255,61,0.15)]"
      >
        <a href="/" className="group flex items-center gap-2 pl-2">
          <svg
            width="26"
            height="26"
            viewBox="0 0 32 32"
            aria-hidden
            className="transition-transform duration-200 ease-out group-hover:rotate-12"
          >
            <defs>
              <linearGradient id="lg-nav" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#d6ff3d" />
                <stop offset="1" stopColor="#6f5cff" />
              </linearGradient>
            </defs>
            <path
              d="M5 26V6l22 20V6"
              stroke="url(#lg-nav)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="text-display text-xl">Nuron</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul ref={listRef} className="relative flex items-center gap-1 text-sm">
            <span
              ref={pillRef}
              aria-hidden
              className="absolute left-0 top-1/2 h-8 -translate-y-1/2 rounded-full bg-surface-2 opacity-0 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(.5,0,.2,1)]"
              style={{ width: 0 }}
            />
            {NAV.map((n) => (
              <li key={n.id} className="relative z-10">
                <a
                  href={`#${n.id}`}
                  data-id={n.id}
                  aria-current={active === n.id ? "page" : undefined}
                  className="inline-block rounded-full px-4 py-1.5 text-ink-dim transition-colors duration-150 ease-out hover:text-ink aria-[current=page]:text-ink"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden rounded-full px-4 py-1.5 text-sm text-ink-dim transition-colors duration-150 ease-out hover:text-ink sm:inline-block"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="btn-shine rounded-full bg-accent px-4 py-2 text-sm font-medium text-[#0a0a0b] transition-transform duration-150 ease-out hover:scale-[1.03]"
          >
            Start free →
          </a>
          <button
            className="md:hidden ml-1 flex h-8 w-8 flex-col items-center justify-center gap-1 rounded-full p-1 transition-colors hover:bg-surface-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block h-0.5 w-4 rounded-full bg-ink transition-all duration-300 ${isMobileMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-4 rounded-full bg-ink transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-4 rounded-full bg-ink transition-all duration-300 ${isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-2xl border border-line bg-bg/95 p-4 backdrop-blur-xl transition-all duration-200 ease-out md:hidden shadow-[0_8px_40px_-12px_rgba(214,255,61,0.15)] origin-top ${
          isMobileMenuOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-2">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-ink-dim transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-2 sm:hidden">
              <a
                href="#"
                className="block rounded-lg px-4 py-3 text-sm font-medium text-ink-dim transition-colors hover:bg-surface-2 hover:text-ink"
              >
                Sign in
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
