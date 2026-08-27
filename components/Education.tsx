import Section from "./Section";
import Reveal from "./Reveal";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-6">
        {education.map((item, i) => (
          <Reveal key={item.school} delay={i * 100}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-6 last:border-0 last:pb-0">
              <div>
                <h3 className="font-semibold">{item.school}</h3>
                <p className="text-sm text-muted">{item.degree}</p>
                <p className="text-sm text-muted">{item.location}</p>
              </div>
              <span className="text-sm text-muted">{item.dates}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
