import { profile } from "@/lib/data";
import CopyButton from "./CopyButton";
import Reveal from "./Reveal";

const links = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "Resume (PDF)", href: profile.resumeHref },
];

/** Closing spread plus a colophon line, as a printed piece would end. */
export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border-strong">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <Reveal>
          <div className="rule-ink" />
          <p className="eyebrow mt-3">08 — Contact</p>

          <h2 className="display mt-8 max-w-2xl text-[2.75rem] sm:text-[3.75rem]">
            Let’s build something that{" "}
            <em className="display-italic text-accent">ships.</em>
          </h2>

          <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.65] text-muted">
            Happy to talk about agentic systems, RAG that survives contact with real data, or how to
            evaluate an LLM pipeline you can actually trust.
          </p>

          <p className="eyebrow mt-6">{profile.availability}</p>
        </Reveal>

        <Reveal>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="display border-b-2 border-foreground pb-1 text-2xl transition-colors hover:border-accent hover:text-accent sm:text-3xl"
            >
              {profile.email}
            </a>
            <CopyButton value={profile.email} />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-border pt-5">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-rule text-sm text-muted"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="meta">
              © {new Date().getFullYear()} {profile.name} · Set in Instrument Serif &amp; Inter Tight
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
