"use client";

import { useEffect, useState } from "react";
import { projects } from "@/lib/data";
import { useFilter } from "./FilterProvider";

type Entry = { id: string; index: string; label: string };

const ENTRIES: Entry[] = [
  { id: "top", index: "01", label: "Introduction" },
  { id: "experience", index: "02", label: "Experience" },
  { id: "prince", index: "03", label: "PRINCE" },
  { id: "projects", index: "04", label: "Projects" },
  { id: "awards", index: "05", label: "Awards" },
  { id: "education", index: "06", label: "Education" },
  { id: "skills", index: "07", label: "Skills" },
  { id: "contact", index: "08", label: "Contact" },
];

/** Contents as a fixed rail in the left margin. Only mounts where there is
 *  genuinely room for it — below 1440px the in-flow contents block is used
 *  instead, so the two are never both on screen. */
export default function ContentsRail() {
  const { openProject, setOpenProject } = useFilter();
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = ENTRIES.map((e) => document.getElementById(e.id)).filter(
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

  const jumpToProject = (slug: string) => {
    setOpenProject(slug);
    requestAnimationFrame(() => {
      document.getElementById(slug)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  };

  return (
    <nav
      aria-label="Contents"
      /* Hugs the left edge of the 64rem column rather than the viewport, so it
         doesn't drift off on wide screens. Falls back to a 1.25rem gutter. */
      className="fixed top-1/2 left-[max(1.25rem,calc(50%-44rem))] z-30 hidden max-h-[80vh] w-[10.5rem] -translate-y-1/2 overflow-y-auto rail:block"
    >
      <p className="eyebrow border-b border-border-strong pb-2">Contents</p>

      <ul className="mt-3 space-y-[0.4rem]">
        {ENTRIES.map((e) => {
          const on = active === e.id;
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                aria-current={on ? "true" : undefined}
                className="flex items-baseline gap-2 transition-colors"
                style={{ color: on ? "var(--accent)" : "var(--muted)" }}
              >
                <span className="font-mono text-[0.625rem] tabular-nums">{e.index}</span>
                <span className="text-[0.8125rem] leading-tight hover:text-foreground">
                  {e.label}
                </span>
              </a>

              {/* Project titles nest under 04, as they would in a printed index. */}
              {e.id === "projects" && (
                <ul className="mt-1 ml-[1.35rem] space-y-[0.3rem] border-l border-border pl-2.5">
                  {projects.map((p) => (
                    <li key={p.slug}>
                      <button
                        type="button"
                        onClick={() => jumpToProject(p.slug)}
                        className="text-left text-[0.75rem] leading-tight transition-colors hover:text-accent"
                        style={{
                          color:
                            openProject === p.slug ? "var(--accent)" : "var(--muted)",
                        }}
                      >
                        {p.short}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
