import { useEffect, useRef } from "react";

type Props = { value: string; label: string };

/**
 * AnimatedStat — counts up to numeric portion of `value` on scroll-in.
 * Pure rAF. Preserves prefix/suffix (e.g. "12.4B", "99.99%", "<40ms", "200+").
 */
export function AnimatedStat({ value, label }: Props) {
  const numRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const node = numRef.current;
    if (!wrap || !node) return;

    const match = value.match(/([^\d.]*)([\d.]+)(.*)/);
    if (!match) {
      node.textContent = value;
      return;
    }
    const [, prefix, raw, suffix] = match;
    const target = parseFloat(raw);
    const decimals = (raw.split(".")[1] || "").length;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.textContent = value;
      return;
    }

    node.textContent = `${prefix}0${suffix}`;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const dur = 1100;
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              const v = (target * eased).toFixed(decimals);
              node.textContent = `${prefix}${v}${suffix}`;
              if (p < 1) requestAnimationFrame(tick);
              else node.textContent = value;
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={wrapRef} className="text-center">
      <div className="text-display text-4xl text-accent sm:text-5xl">
        <span ref={numRef}>{value}</span>
      </div>
      <div className="mt-1 text-sm text-ink-dim">{label}</div>
    </div>
  );
}
