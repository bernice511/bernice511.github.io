"use client";

import { useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

/** Ruled entries that expand in place. The first bullet always shows, so a
 *  collapsed row still says something; the rest unfolds on click. */
export default function Experience() {
  const [open, setOpen] = useState<string | null>(experience[0]?.org ?? null);

  return (
    <Section id="experience" index="02" title="Experience" kicker="4+ years shipping">
      <div className="divide-y divide-border border-t border-border">
        {experience.map((job) => {
          const expanded = open === job.org;
          const hidden = job.bullets.length - 1;

          return (
            <Reveal key={job.org}>
              <article className="group grid gap-x-8 gap-y-3 py-8 md:grid-cols-[13rem_1fr]">
                <div>
                  <h3 className="text-lg font-medium leading-snug motion-safe:transition-transform motion-safe:duration-300 md:group-hover:translate-x-1">
                    {job.org}
                  </h3>
                  <p className="display-italic mt-0.5 text-[1.0625rem] text-accent">{job.role}</p>
                  <p className="meta mt-1.5">{job.dates}</p>
                  <p className="meta">{job.location}</p>
                </div>

                <div>
                  <ul className="space-y-3 text-[0.9375rem] leading-[1.6] text-muted">
                    {job.bullets.map((b, bi) => {
                      const visible = expanded || bi === 0;
                      return (
                        <li
                          key={bi}
                          hidden={!visible}
                          className="pl-5 -indent-5 motion-safe:transition-opacity motion-safe:duration-300"
                        >
                          <span aria-hidden="true" className="text-border-strong">—&nbsp;&nbsp;</span>
                          {b.heading && (
                            <span className="font-medium text-foreground">{b.heading}. </span>
                          )}
                          {b.text}
                        </li>
                      );
                    })}
                  </ul>

                  {hidden > 0 && (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpen(expanded ? null : job.org)}
                      className="eyebrow mt-4 inline-flex items-center gap-2 transition-colors hover:text-accent"
                    >
                      {expanded ? "Show less" : `${hidden} more ${hidden === 1 ? "note" : "notes"}`}
                      <span
                        aria-hidden="true"
                        className="inline-block motion-safe:transition-transform motion-safe:duration-300"
                        style={{ transform: expanded ? "rotate(180deg)" : "none" }}
                      >
                        ↓
                      </span>
                    </button>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
