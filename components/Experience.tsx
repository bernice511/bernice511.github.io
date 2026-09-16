import Section from "./Section";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

/** Ruled entries rather than cards: org and dates on a shared baseline, role
 *  in italic display, bullets as a hanging-indent list. */
export default function Experience() {
  return (
    <Section id="experience" index="02" title="Experience" kicker="4+ years shipping">
      <div className="divide-y divide-border border-t border-border">
        {experience.map((job) => (
          <Reveal key={job.org}>
            <article className="grid gap-x-8 gap-y-3 py-8 md:grid-cols-[13rem_1fr]">
              <div>
                <h3 className="text-lg font-medium leading-snug">{job.org}</h3>
                <p className="display-italic mt-0.5 text-[1.0625rem] text-accent">{job.role}</p>
                <p className="meta mt-1.5">{job.dates}</p>
                <p className="meta">{job.location}</p>
              </div>

              <ul className="space-y-3 text-[0.9375rem] leading-[1.6] text-muted">
                {job.bullets.map((b, bi) => (
                  <li key={bi} className="pl-5 -indent-5">
                    <span aria-hidden="true" className="text-border-strong">—&nbsp;&nbsp;</span>
                    {b.heading && (
                      <span className="font-medium text-foreground">{b.heading}. </span>
                    )}
                    {b.text}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
