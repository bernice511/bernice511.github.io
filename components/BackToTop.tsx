"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 border border-border-strong bg-background px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted transition-colors hover:border-foreground hover:text-foreground"
    >
      ↑ Top
    </a>
  );
}
