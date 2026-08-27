"use client";

import { useEffect, useRef, useState } from "react";

export default function DrawLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute left-0 top-0 bottom-0 w-px origin-top bg-accent motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
      style={{ transform: visible ? "scaleY(1)" : "scaleY(0)" }}
    />
  );
}
