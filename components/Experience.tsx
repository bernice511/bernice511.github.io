import Section from "./Section";
import Reveal from "./Reveal";
import DrawLine from "./DrawLine";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-10">
        {experience.map((job, i) => (
          <Reveal key={job.org} delay={i * 100}>
          <div className="relative border-l border-border pl-6">
            <DrawLine />
            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">{job.org}</h3>
              <span className="text-sm text-muted">{job.dates}</span>
            </div>
            <p className="text-sm text-muted">
              {job.role} · {job.location}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
              {job.bullets.map((b, bi) => (
                <li key={bi} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted/60" />
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
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
