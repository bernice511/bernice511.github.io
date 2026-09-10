import { featured } from "@/lib/data";
import Reveal from "./Reveal";
import AgentGraph from "./AgentGraph";

const NARRATIVE = [
  { label: "Problem", key: "problem" },
  { label: "Approach", key: "approach" },
  { label: "Impact", key: "impact" },
] as const;

export default function Featured() {
  return (
    <section id="prince" className="relative overflow-hidden border-y border-border">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow">{featured.eyebrow}</p>
          <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{featured.title}</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-3/40 bg-accent-3/10 px-3 py-1 text-xs font-medium text-accent-3">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <path d="M6 0l1.6 3.5L11.4 4 8.6 6.6l.7 3.8L6 8.6 2.7 10.4l.7-3.8L.6 4l3.8-.5L6 0z" />
              </svg>
              {featured.award}
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-lg text-muted">{featured.subtitle}</p>
          <p className="mt-1 font-mono text-xs text-muted">{featured.dates}</p>
        </Reveal>

        <Reveal delay={120}>
          {/* the diagram has a minimum legible width; let narrow screens pan it */}
          <div className="card mt-10 overflow-x-auto p-5 sm:p-8">
            <AgentGraph className="min-w-[34rem]" />
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            One question, routed to the right tool, answered with its sources attached.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {NARRATIVE.map((item, i) => (
            <Reveal key={item.key} delay={i * 100}>
              <h3 className="eyebrow">{item.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{featured[item.key]}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {featured.pillars.map((pillar, i) => (
            <Reveal key={pillar.name} delay={i * 80}>
              <div className="card card-glow h-full p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold">{pillar.name}</h3>
                  <span className="shrink-0 font-mono text-xs text-accent">{pillar.metric}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap gap-2">
            {featured.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
