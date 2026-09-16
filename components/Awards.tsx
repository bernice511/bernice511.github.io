"use client";

import { useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { awards, type Award } from "@/lib/data";

const KIND_LABEL: Record<Award["kind"], string> = {
  award: "Award",
  publication: "Publication",
  talk: "Talk",
  workshop: "Workshop",
};

/** Titles sit on their own until pointed at, then the description slides open —
 *  the list reads as an index first and an article second. */
export default function Awards() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section id="awards" index="05" title="Awards & Talks" kicker="recognition + speaking">
      <div className="divide-y divide-border border-t border-border">
        {awards.map((award) => {
          const shown = open === award.title || award.highlight;
          return (
            <Reveal key={award.title}>
              <article
                onMouseEnter={() => setOpen(award.title)}
                onMouseLeave={() => setOpen(null)}
                onFocus={() => setOpen(award.title)}
                onBlur={() => setOpen(null)}
                tabIndex={0}
                className="group grid gap-x-8 gap-y-2 py-6 outline-none md:grid-cols-[13rem_1fr]"
              >
                <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
                  <p className={`eyebrow ${award.highlight ? "text-accent-3" : ""}`}>
                    {KIND_LABEL[award.kind]}
                  </p>
                  <p className="meta">{award.date}</p>
                </div>
                <div>
                  <h3
                    className={`motion-safe:transition-transform motion-safe:duration-300 md:group-hover:translate-x-1 md:group-focus:translate-x-1 ${
                      award.highlight
                        ? "display text-2xl text-accent-3 sm:text-3xl"
                        : "text-lg font-medium leading-snug"
                    }`}
                  >
                    {award.title}
                  </h3>

                  <div
                    className="grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300"
                    style={{
                      gridTemplateRows: shown ? "1fr" : "0fr",
                      opacity: shown ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-1.5 text-[0.9375rem] leading-[1.6] text-muted">
                        {award.description}
                      </p>
                      {award.href && (
                        <a
                          href={award.href}
                          target="_blank"
                          rel="noreferrer"
                          className="link-rule mt-2 inline-flex text-sm text-muted"
                        >
                          Read the paper ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
