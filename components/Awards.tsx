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
    <Section id="awards" title="Awards & Talks" kicker="recognition + speaking">
      <div className="grid gap-4 sm:grid-cols-2">
        {awards.map((award, i) => (
          <Reveal
            key={award.title}
            delay={i * 70}
            className={award.highlight ? "sm:col-span-2" : undefined}
          >
            <div
              className={`card card-glow flex h-full flex-col p-5 ${
                award.highlight ? "border-accent-3/40 bg-accent-3/[0.04]" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`font-mono text-[0.65rem] uppercase tracking-[0.14em] ${
                    award.highlight ? "text-accent-3" : "text-muted"
                  }`}
                >
                  {KIND_LABEL[award.kind]}
                </span>
                <span className="font-mono text-xs text-muted">{award.date}</span>
              </div>
              <h3
                className={`mt-2 font-semibold ${
                  award.highlight ? "text-xl text-accent-3 sm:text-2xl" : ""
                }`}
              >
                {award.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{award.description}</p>
              {award.href && (
                <a
                  href={award.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex w-fit text-sm font-medium text-accent hover:underline"
                >
                  Read the paper ↗
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
