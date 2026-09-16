"use client";

import Section from "./Section";
import Reveal from "./Reveal";
import { skills } from "@/lib/data";
import { SKILL_HITS, isFilterable } from "@/lib/skill-index";
import { useFilter } from "./FilterProvider";

/** Set as an index. Anything that actually appears in the work below is a
 *  button that filters the catalogue; the rest stays plain text, so no click
 *  ever leads nowhere. */
export default function Skills() {
  const { activeSkill, toggleSkill } = useFilter();

  return (
    <Section id="skills" index="07" title="Skills" kicker="click to filter the work">
      <div className="divide-y divide-border border-t border-border">
        {Object.entries(skills).map(([category, items]) => (
          <Reveal key={category}>
            <div className="grid gap-x-8 gap-y-2 py-5 md:grid-cols-[13rem_1fr]">
              <h3 className="eyebrow pt-1">{category}</h3>
              <p className="text-[0.9375rem] leading-[1.9]">
                {items.map((item, i) => {
                  const live = isFilterable(item);
                  const active = activeSkill === item;
                  const hit = SKILL_HITS[item];

                  return (
                    <span key={item}>
                      {i > 0 && <span className="text-border-strong"> · </span>}
                      {live ? (
                        <button
                          type="button"
                          onClick={() => toggleSkill(item)}
                          aria-pressed={active}
                          title={`${hit.projectCount} project${hit.projectCount === 1 ? "" : "s"}${
                            hit.inPrince ? " + PRINCE" : ""
                          }`}
                          className={`link-rule transition-colors ${
                            active ? "font-medium text-accent" : "text-foreground hover:text-accent"
                          }`}
                        >
                          {item}
                        </button>
                      ) : (
                        <span className="text-muted">{item}</span>
                      )}
                    </span>
                  );
                })}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
