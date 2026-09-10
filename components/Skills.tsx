import Section from "./Section";
import Reveal from "./Reveal";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-5 md:grid-cols-3">
        {Object.entries(skills).map(([category, items], i) => (
          <Reveal key={category} delay={i * 100} className="h-full">
            <div className="card h-full p-5">
              <h3 className="eyebrow">{category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1 text-sm transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
