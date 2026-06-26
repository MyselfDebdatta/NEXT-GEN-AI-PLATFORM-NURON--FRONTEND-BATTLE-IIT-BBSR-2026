import { useEffect, useRef, type ReactNode, type ElementType } from "react";

type Props = {
  as?: ElementType;
  delay?: number;
  y?: number;
  className?: string;
  children: ReactNode;
  once?: boolean;
};

/**
 * Reveal — IntersectionObserver + WAAPI. No animation library.
 * Plays a single 360ms ease-out transform/opacity animation on enter.
 * Hardware-accelerated (transform/opacity only). Honors prefers-reduced-motion.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  y = 18,
  className,
  children,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.opacity = "1";
      return;
    }

    el.style.opacity = "0";
    el.style.willChange = "transform, opacity";

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).animate(
              [
                { opacity: 0, transform: `translate3d(0, ${y}px, 0)` },
                { opacity: 1, transform: "translate3d(0,0,0)" },
              ],
              { duration: 380, delay, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" },
            );
            if (once) io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, y, once]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
