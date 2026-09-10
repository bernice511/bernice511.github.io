import { profile } from "@/lib/data";
import CopyButton from "./CopyButton";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

const links = [
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "GitHub", href: profile.github, external: true },
  { label: "Resume (PDF)", href: profile.resumeHref, download: true },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1.5 text-xs font-medium text-accent">
            <span className="status-dot" />
            {profile.availability}
          </p>
          <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build something that ships.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Happy to talk about agentic systems, RAG that survives contact with real data, or how to
            evaluate an LLM pipeline you can actually trust.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-background shadow-[0_10px_30px_-12px_var(--accent)] transition-colors hover:bg-accent/90"
              >
                Email me
              </a>
            </Magnetic>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2.5 text-sm">
              <span className="font-mono text-muted">{profile.email}</span>
              <CopyButton value={profile.email} />
            </span>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-border pt-6 text-sm">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  {...(link.download ? { download: true } : {})}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} {profile.name}
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
