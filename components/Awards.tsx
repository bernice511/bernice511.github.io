import Section from "./Section";
import Reveal from "./Reveal";
import { awards, type Award } from "@/lib/data";

const KIND_LABEL: Record<Award["kind"], string> = {
  award: "Award",
  publication: "Publication",
  talk: "Talk",
  workshop: "Workshop",
};

export default function Awards() {
  return (
    <Section id="awards" index="05" title="Awards & Talks" kicker="recognition + speaking">
      <div className="divide-y divide-border border-t border-border">
        {awards.map((award) => (
          <Reveal key={award.title}>
            <article className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[13rem_1fr]">
              <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
                <p className={`eyebrow ${award.highlight ? "text-accent-3" : ""}`}>
                  {KIND_LABEL[award.kind]}
                </p>
                <p className="meta">{award.date}</p>
              </div>
              <div>
                <h3
                  className={
                    award.highlight
                      ? "display text-2xl text-accent-3 sm:text-3xl"
                      : "text-lg font-medium leading-snug"
                  }
                >
                  {award.title}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-[1.6] text-muted">
                  {award.description}
                </p>
                {award.href && (
                  <a
                    href={award.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-rule mt-2 inline-flex text-sm text-muted"
                  >
                    Read the paper ↗
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
