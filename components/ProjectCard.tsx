import type { Project } from "@/lib/data";

/** One catalogue entry: title and dates on a baseline, metric set large in
 *  display type, specs as a definition table. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid gap-x-8 gap-y-4 py-8 md:grid-cols-[13rem_1fr]">
      <div>
        {project.featured && <p className="eyebrow text-accent">Featured</p>}
        <h3 className={`mt-1 leading-snug ${project.featured ? "display text-2xl" : "text-lg font-medium"}`}>
          {project.title}
        </h3>
        <p className="meta mt-1">{project.dates}</p>

        {project.metric && (
          <div className="mt-3 border-t border-border pt-3">
            <p className="display text-[2rem] text-accent">{project.metric.value}</p>
            <p className="text-xs leading-snug text-muted">{project.metric.label}</p>
          </div>
        )}
      </div>

      <div>
        <p className="text-[0.9375rem] leading-[1.65] text-muted">{project.summary}</p>

        <dl className="mt-5 space-y-2.5 border-t border-border pt-4">
          {project.specs.map((spec) => (
            <div key={spec.label} className="grid grid-cols-[5.5rem_1fr] gap-4">
              <dt className="eyebrow pt-[0.2rem]">{spec.label}</dt>
              <dd className="text-[0.9375rem] leading-[1.55] text-muted">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <p className="meta mt-4">{project.tech.join("  /  ")}</p>

        {(project.repo || project.demo) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="link-rule font-medium">
                Live demo ↗
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" className="link-rule text-muted">
                View code ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
