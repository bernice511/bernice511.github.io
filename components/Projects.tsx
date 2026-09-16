import Section from "./Section";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <Section id="projects" index="04" title="Projects" kicker={`${projects.length} builds`}>
      <div className="divide-y divide-border border-t border-border">
        {projects.map((project) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
