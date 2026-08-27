"use client";

import { useEffect, useRef } from "react";

export default function HeroBackdrop() {
  const glowRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const glow = glowRef.current;
      const parent = glow?.parentElement;
      if (!glow || !parent) return;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.background = `radial-gradient(500px circle at ${x}px ${y}px, var(--accent-soft), transparent 70%)`;
    };

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (blobRef.current) {
          blobRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.15}px, 0)`;
        }
        ticking = false;
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={blobRef}
        className="absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div ref={glowRef} className="absolute inset-0 opacity-70 transition-[background] duration-150" />
    </div>
  );
}
