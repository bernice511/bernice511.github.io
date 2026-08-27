import Section from "./Section";
import Reveal from "./Reveal";
import { awards } from "@/lib/data";

export default function Awards() {
  return (
    <Section id="awards" title="Awards & Talks">
      <div className="space-y-5">
        {awards.map((award, i) => (
          <Reveal key={award.title} delay={i * 70}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p>
                <span className="font-medium">{award.title}</span>
                <span className="text-muted"> — {award.description}</span>
              </p>
              <span className="shrink-0 text-sm text-muted">{award.date}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
