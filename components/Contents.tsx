"use client";

import Reveal from "./Reveal";
import Rule from "./Rule";
import { awards, education, experience, featured, projects } from "@/lib/data";
import { useFilter } from "./FilterProvider";

const highlight = awards.find((a) => a.highlight);

const ENTRIES: { index: string; href: string; title: string; note: string }[] = [
  {
    index: "02",
    href: "#experience",
    title: "Experience",
    note: experience.map((j) => j.org).join(" · "),
  },
  { index: "03", href: "#prince", title: featured.title, note: featured.eyebrow },
  { index: "05", href: "#awards", title: "Awards & Talks", note: highlight?.title ?? "" },
  {
    index: "06",
    href: "#education",
    title: "Education",
    // Degrees read shorter than the full school names, which wrap at this width.
    note: education.map((e) => e.degree.split(",")[0]).join(" · "),
  },
  { index: "07", href: "#skills", title: "Skills", note: "click any to filter the work" },
  { index: "08", href: "#contact", title: "Contact", note: "" },
];

/** A contents page, as a printed piece would have. Every project is named this
 *  high up, so nothing worth seeing is more than one click away. */
export default function Contents() {
  const { setOpenProject } = useFilter();

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

  const row = "grid gap-x-6 gap-y-1 py-3 md:grid-cols-[3rem_14rem_1fr]";

  return (
    <section aria-label="Contents" className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
      <Reveal>
        <Rule />
        <p className="eyebrow mt-3">Contents</p>

        <div className="mt-6 divide-y divide-border border-t border-border">
          {ENTRIES.slice(0, 2).map((e) => (
            <a key={e.href} href={e.href} className={`${row} group`}>
              <span className="eyebrow pt-1.5">{e.index}</span>
              <span className="display text-xl motion-safe:transition-transform motion-safe:duration-300 md:group-hover:translate-x-1 group-hover:text-accent">
                {e.title}
              </span>
              <span className="meta pt-1.5">{e.note}</span>
            </a>
          ))}

          {/* Projects expands inline — every title listed by name. */}
          <div className={row}>
            <a href="#projects" className="eyebrow pt-1.5 hover:text-accent">
              04
            </a>
            <a
              href="#projects"
              className="display text-xl transition-colors hover:text-accent"
            >
              Projects
            </a>
            <ul className="space-y-1.5 pt-1">
              {projects.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => jumpToProject(p.slug)}
                    className="link-rule text-left text-[0.9375rem] text-muted transition-colors hover:text-accent"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {ENTRIES.slice(2).map((e) => (
            <a key={e.href} href={e.href} className={`${row} group`}>
              <span className="eyebrow pt-1.5">{e.index}</span>
              <span className="display text-xl motion-safe:transition-transform motion-safe:duration-300 md:group-hover:translate-x-1 group-hover:text-accent">
                {e.title}
              </span>
              <span className="meta pt-1.5">{e.note}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
