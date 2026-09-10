import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col p-6">
      {project.featured && <p className="eyebrow mb-2">Featured</p>}
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3
          className={`font-semibold leading-snug ${
            project.featured ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>
        <span className="font-mono text-xs text-muted">{project.dates}</span>
      </div>

      {project.metric && (
        <div className="mt-4 flex items-baseline gap-2.5 border-l-2 border-accent pl-3">
          <span className="text-2xl font-semibold tracking-tight text-accent">
            {project.metric.value}
          </span>
          <span className="text-xs leading-snug text-muted">{project.metric.label}</span>
        </div>
      )}

      <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>

      <dl className="mt-5 space-y-2.5 border-t border-border pt-4 text-sm">
        {project.specs.map((spec) => (
          <div key={spec.label} className="grid grid-cols-[5.25rem_1fr] gap-3">
            <dt className="pt-px font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent/80">
              {spec.label}
            </dt>
            <dd className="leading-relaxed text-muted">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-accent-soft/70 px-2.5 py-1 font-mono text-[0.7rem] text-accent"
          >
            {tech}
          </span>
        ))}
      </div>

      {(project.repo || project.demo) && (
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm font-medium">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              Live demo ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
            >
              View code ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}
