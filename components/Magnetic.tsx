"use client";

import { useRef, type ReactNode } from "react";

/** Small magnetic pull toward the cursor. Deliberately understated — a few
 *  pixels of give, not a springy toy. Disabled under reduced motion and on
 *  touch, where there is no cursor to follow. */
export default function Magnetic({
  children,
  strength = 0.18,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className={`inline-block will-change-transform motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out ${className}`}
    >
      {children}
    </span>
  );
}
