import { featured } from "@/lib/data";
import Reveal from "./Reveal";
import AgentGraph from "./AgentGraph";

const NARRATIVE = [
  { label: "Problem", key: "problem" },
  { label: "Approach", key: "approach" },
  { label: "Impact", key: "impact" },
] as const;

/** The case study, set as a feature spread: standfirst, plate with figure
 *  caption, then the narrative in three columns. */
export default function Featured() {
  return (
    <section id="prince" className="border-y border-border-strong bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <Reveal>
          <div className="rule-ink" />
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <p className="eyebrow">03 — {featured.eyebrow}</p>
            <p className="meta">{featured.dates}</p>
          </div>

          <h2 className="display mt-8 text-[3.25rem] sm:text-[4.5rem]">{featured.title}</h2>

          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.6] text-muted">
            {featured.subtitle}
          </p>

          <p className="eyebrow mt-5 text-accent-3">★ {featured.award}</p>
        </Reveal>

        {/* Citation, set like a footnote block. */}
        <Reveal>
          <a
            href={featured.paper.href}
            target="_blank"
            rel="noreferrer"
            className="panel panel-link mt-8 block max-w-2xl border-l-2 border-l-accent p-5"
          >
            <p className="eyebrow">{featured.paper.label}</p>
            <p className="mt-2 text-sm leading-[1.6] text-muted">{featured.paper.citation}</p>
            <p className="mt-2 text-sm font-medium">{featured.paper.note} Read the paper ↗</p>
          </a>
        </Reveal>

        {/* Plate. The diagram has a minimum legible width; narrow screens pan it. */}
        <Reveal>
          <figure className="mt-12">
            <div className="panel overflow-x-auto bg-background p-5 sm:p-8">
              <AgentGraph className="min-w-[52rem]" />
            </div>
            <figcaption className="meta mt-2.5 border-t border-border pt-2">
              Fig. 1 — Architecture after Figure 1 of the paper, condensed, with the models it
              names.
            </figcaption>
          </figure>
        </Reveal>

        {/* Narrative in three columns, as a feature well. */}
        <div className="mt-14 grid gap-8 border-t border-border-strong pt-7 md:grid-cols-3">
          {NARRATIVE.map((item, i) => (
            <Reveal key={item.key}>
              <h3 className="eyebrow">
                {String(i + 1).padStart(2, "0")} — {item.label}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted">{featured[item.key]}</p>
            </Reveal>
          ))}
        </div>

        {/* Pillars as a ruled table of claims and their numbers. */}
        <div className="mt-12 divide-y divide-border border-t border-border">
          {featured.pillars.map((pillar) => (
            <Reveal key={pillar.name}>
              <div className="grid gap-x-8 gap-y-1.5 py-5 md:grid-cols-[13rem_1fr]">
                <div>
                  <h3 className="font-medium">{pillar.name}</h3>
                  <p className="meta mt-0.5 text-accent">{pillar.metric}</p>
                </div>
                <p className="text-[0.9375rem] leading-[1.6] text-muted">{pillar.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="meta mt-8 border-t border-border pt-4 leading-[1.8]">
            {featured.stack.join("  /  ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
