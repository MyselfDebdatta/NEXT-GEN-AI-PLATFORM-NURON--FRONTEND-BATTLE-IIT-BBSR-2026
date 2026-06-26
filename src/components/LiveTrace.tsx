import { useEffect, useRef } from "react";

const LINES = [
  "▸ agent.plan(steps=4)",
  "▸ fetch(stripe.charges, since=24h) → 12,408",
  "▸ join(ledger.entries) → diff: 14",
  "▸ classify(diff) → [refund×9, fee×3, fx×2]",
  "▸ propose.actions() ✓ awaiting approval",
];

/**
 * LiveTrace — cycling typewriter using rAF only. Mutates one text node.
 * No re-renders, no library, GPU-friendly (text-only mutation).
 */
export function LiveTrace() {
  const preRef = useRef<HTMLPreElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      pre.textContent = LINES.join("\n");
      return;
    }

    let line = 0;
    let ch = 0;
    let acc = "";
    let raf = 0;
    let last = performance.now();
    let pause = 0;

    const tick = (t: number) => {
      const dt = t - last;
      if (pause > 0) {
        pause -= dt;
      } else if (dt > 22) {
        last = t;
        const current = LINES[line];
        if (ch < current.length) {
          acc += current[ch++];
          pre.textContent = acc;
        } else {
          if (line < LINES.length - 1) {
            acc += "\n";
            line++;
            ch = 0;
            pause = 160;
          } else {
            // Restart cycle
            pause = 2800;
            line = 0;
            ch = 0;
            acc = "";
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <pre
      ref={preRef}
      className="mt-3 min-h-[140px] overflow-x-auto whitespace-pre-wrap text-[12px] leading-relaxed text-ink-dim"
      aria-label="Live agent trace"
    >
      <code />
      <span ref={caretRef} className="caret">
        ▍
      </span>
    </pre>
  );
}
