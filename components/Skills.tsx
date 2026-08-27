import Section from "./Section";
import Reveal from "./Reveal";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-6 sm:grid-cols-3">
        {Object.entries(skills).map(([category, items], i) => (
          <Reveal key={category} delay={i * 100}>
            <h3 className="text-sm font-semibold text-muted">{category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-sm transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
