import { useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

export function MagneticButton({ children, className = "", href, onClick }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Dampen the movement (20% of the distance)
    setPosition({ x: x * 0.2, y: y * 0.2 });
    setIsHovered(true);
  };

  const handleLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Combine our magnetic translation with a slight scale effect
  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.02 : 1})`,
    // Snappy return when leaving, immediate follow when moving
    transition: isHovered
      ? "transform 50ms linear"
      : "transform 350ms cubic-bezier(0.2, 0.7, 0.2, 1)",
  };

  if (href) {
    return (
      <a
        href={href}
        ref={ref as any}
        className={`inline-block ${className.replace(/transition-transform|hover:scale-\[1\.02\]/g, "")}`}
        style={style}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as any}
      onClick={onClick}
      className={`inline-block ${className.replace(/transition-transform|hover:scale-\[1\.02\]/g, "")}`}
      style={style}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}
