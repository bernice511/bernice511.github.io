import Section from "./Section";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <Section id="projects" title="Projects" kicker={`${projects.length} builds`}>
      <div className="grid items-start gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={i * 80}
            className={`h-full ${project.featured ? "lg:col-span-2" : ""}`}
          >
            <TiltCard
              className={`card card-glow h-full shadow-sm hover:shadow-[0_24px_50px_-28px_var(--accent)] ${
                project.featured ? "border-accent/30" : ""
              }`}
            >
              <ProjectCard project={project} />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
