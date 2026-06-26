import { useEffect, useRef } from "react";

const LOGOS = [
  {
    name: "Vercel",
    svg: (
      <>
        <path d="M12 3l10 17H2z" fill="currentColor" />
      </>
    ),
  },
  {
    name: "Linear",
    svg: (
      <>
        <path
          d="M3.5 14.5L9.5 20.5M3 11l10 10M3.5 7.5l13 13M5 4l15 15M9 3l12 12M14 3l7 7M19 4l1 1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    name: "Stripe",
    svg: (
      <>
        <path
          d="M13.5 8.2c0-.7.6-1 1.5-1 1.4 0 3.2.4 4.6 1.2V4.1A12 12 0 0015 3.3c-3.7 0-6.2 2-6.2 5.2 0 5.1 7 4.3 7 6.5 0 .8-.7 1.1-1.7 1.1-1.5 0-3.5-.6-5.1-1.5v4.3c1.8.8 3.6 1.1 5.1 1.1 3.8 0 6.4-1.9 6.4-5.2 0-5.5-7-4.5-7-6.6z"
          fill="currentColor"
        />
      </>
    ),
  },
  {
    name: "Notion",
    svg: (
      <>
        <path
          d="M4 4v16h16V4H4zm12 12.5c0 .5-.3.7-.7.6l-2.6-.2v-7l-3.2 7.4c-.2.4-.5.5-1 .4l-1.3-.1V8.1c0-.4.2-.6.6-.6l2.4.2 2.9 6.4V7.8l-1.4-.2c-.4 0-.5-.3-.5-.7l2.6-.2c.5 0 .7.2.7.7v8.6z"
          fill="currentColor"
        />
      </>
    ),
  },
  {
    name: "Ramp",
    svg: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path
          d="M8 8h5a3 3 0 010 6H8V8zm0 6v4M13 14l3 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
  },
  {
    name: "Figma",
    svg: (
      <>
        <path
          d="M8 3h4v6H8a3 3 0 010-6zm4 0h4a3 3 0 010 6h-4V3zm4 6a3 3 0 010 6 3 3 0 010-6zM8 9h4v6H8a3 3 0 010-6zm0 6h4v3a3 3 0 11-4-3z"
          fill="currentColor"
        />
      </>
    ),
  },
  {
    name: "Loom",
    svg: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path
          d="M12 3v18M3 12h18M5.5 5.5l13 13M5.5 18.5l13-13"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </>
    ),
  },
  {
    name: "Cursor",
    svg: (
      <>
        <path d="M5 3l14 8-6 2-2 6z" fill="currentColor" />
      </>
    ),
  },
  {
    name: "Arc",
    svg: (
      <>
        <path
          d="M4 19l8-14 8 14M8 16h8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
  },
  {
    name: "Replit",
    svg: (
      <>
        <rect x="4" y="4" width="7" height="7" fill="currentColor" />
        <rect x="11" y="11" width="7" height="7" fill="currentColor" />
        <rect x="4" y="11" width="7" height="7" fill="currentColor" opacity=".6" />
      </>
    ),
  },
];

export function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Pause on hover via WAAPI — no library
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const anim = el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
      duration: 32000,
      iterations: Infinity,
      easing: "linear",
    });
    const onEnter = () => anim.pause();
    const onLeave = () => anim.play();
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      anim.cancel();
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const all = [...LOGOS, ...LOGOS];
  return (
    <div
      className="relative"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div ref={trackRef} className="flex w-max items-center gap-14">
        {all.map((l, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 text-ink-dim transition-colors duration-150 ease-out hover:text-ink"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
              {l.svg}
            </svg>
            <span className="text-display text-2xl tracking-tight">{l.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
