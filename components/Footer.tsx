import { profile } from "@/lib/data";
import CopyButton from "./CopyButton";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get in touch</h2>
        <p className="mt-3 max-w-xl text-muted">
          Looking for a Spring 2027 Agentic AI internship — happy to talk about LLM systems, RAG, or
          anything in between.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <span className="inline-flex items-center gap-2">
            <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
              {profile.email}
            </a>
            <CopyButton value={profile.email} />
          </span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-foreground">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-muted hover:text-foreground">
            GitHub
          </a>
          <a href={profile.resumeHref} download className="text-muted hover:text-foreground">
            Resume (PDF)
          </a>
        </div>
        <p className="mt-10 text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
