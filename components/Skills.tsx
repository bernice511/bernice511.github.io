import Section from "./Section";
import Reveal from "./Reveal";
import { skills } from "@/lib/data";

/** Set as an index: category in caption caps, terms as running text separated
 *  by thin rules. No tag pills. */
export default function Skills() {
  return (
    <Section id="skills" index="07" title="Skills">
      <div className="divide-y divide-border border-t border-border">
        {Object.entries(skills).map(([category, items]) => (
          <Reveal key={category}>
            <div className="grid gap-x-8 gap-y-2 py-5 md:grid-cols-[13rem_1fr]">
              <h3 className="eyebrow pt-1">{category}</h3>
              <p className="text-[0.9375rem] leading-[1.7] text-muted">
                {items.join(" · ")}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
