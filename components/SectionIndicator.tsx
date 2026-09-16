"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", index: "01" },
  { id: "experience", index: "02" },
  { id: "prince", index: "03" },
  { id: "projects", index: "04" },
  { id: "awards", index: "05" },
  { id: "education", index: "06" },
  { id: "skills", index: "07" },
  { id: "contact", index: "08" },
];

/** Running section marks down the left margin, as a printed thumb index.
 *  Hidden on anything narrower than the layout's own margin. */
export default function SectionIndicator() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
    >
      {SECTIONS.map((s) => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={on ? "true" : undefined}
            className="group flex items-center gap-2"
          >
            <span
              aria-hidden="true"
              className="block h-px origin-left bg-current transition-all duration-300"
              style={{
                width: on ? "1.75rem" : "0.75rem",
                color: on ? "var(--accent)" : "var(--border-strong)",
              }}
            />
            <span
              className="font-mono text-[0.625rem] tracking-[0.14em] transition-opacity duration-300"
              style={{ color: on ? "var(--accent)" : "var(--muted)", opacity: on ? 1 : 0 }}
            >
              {s.index}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
