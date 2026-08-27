import Section from "./Section";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 90}>
            <TiltCard className="rounded-2xl border bg-surface shadow-sm hover:border-accent/50 hover:shadow-[0_20px_45px_-24px_rgba(45,212,191,0.45)]">
              <ProjectCard project={project} />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
