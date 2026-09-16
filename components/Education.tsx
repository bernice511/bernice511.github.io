import Section from "./Section";
import Reveal from "./Reveal";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <Section id="education" index="06" title="Education">
      <div className="divide-y divide-border border-t border-border">
        {education.map((item) => (
          <Reveal key={item.school}>
            <div className="grid gap-x-8 gap-y-1 py-6 md:grid-cols-[13rem_1fr]">
              <p className="meta pt-1">{item.dates}</p>
              <div>
                <h3 className="text-lg font-medium leading-snug">{item.school}</h3>
                <p className="display-italic mt-0.5 text-[1.0625rem] text-accent">{item.degree}</p>
                <p className="meta mt-1">{item.location}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
