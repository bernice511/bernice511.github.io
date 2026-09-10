import Section from "./Section";
import Reveal from "./Reveal";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.school} delay={i * 100}>
            <div className="card card-glow h-full p-6">
              <p className="font-mono text-xs text-muted">{item.dates}</p>
              <h3 className="mt-2 font-semibold leading-snug">{item.school}</h3>
              <p className="mt-2 text-sm text-accent">{item.degree}</p>
              <p className="mt-1 text-sm text-muted">{item.location}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
