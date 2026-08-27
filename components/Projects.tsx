import Section from "./Section";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 90}>
          <TiltCard>
          <article
            className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-[0_20px_45px_-24px_rgba(45,212,191,0.45)]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <span className="text-xs text-muted">{project.dates}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-muted">
              {project.bullets.map((bullet, bi) => (
                <li key={bi} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted/60" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                View code ↗
              </a>
            )}
          </article>
          </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
