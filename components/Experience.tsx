import Section from "./Section";
import Reveal from "./Reveal";
import DrawLine from "./DrawLine";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <Section id="experience" title="Experience" kicker="4+ years shipping">
      <div className="space-y-8">
        {experience.map((job, i) => (
          <Reveal key={job.org} delay={i * 100}>
            <div className="card card-glow relative p-6 sm:p-7">
              <div className="relative border-l border-border pl-6">
                <DrawLine />
                <div
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_var(--accent-soft)]"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{job.org}</h3>
                  <span className="font-mono text-xs text-muted">{job.dates}</span>
                </div>
                <p className="mt-0.5 text-sm text-accent">
                  {job.role} <span className="text-muted">· {job.location}</span>
                </p>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                      />
                      <span>
                        {b.heading && (
                          <span className="font-medium text-foreground">{b.heading}: </span>
                        )}
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
