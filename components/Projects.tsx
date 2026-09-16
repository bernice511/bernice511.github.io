"use client";

import { useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";
import { princeUses, projectsFor } from "@/lib/skill-index";
import { useFilter } from "./FilterProvider";

export default function Projects() {
  const { activeSkill, clear } = useFilter();
  const [open, setOpen] = useState<string | null>(null);

  const matching = activeSkill ? new Set(projectsFor(activeSkill).map((p) => p.slug)) : null;
  const count = matching?.size ?? projects.length;

  return (
    <Section id="projects" index="04" title="Projects" kicker={`${projects.length} builds`}>
      {/* Filter bar, announced so the change isn't silent for screen readers. */}
      <div aria-live="polite" className="min-h-[2.5rem]">
        {activeSkill && (
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-y border-border-strong py-3">
            <p className="text-[0.9375rem]">
              Filtering by <span className="display-italic text-accent">{activeSkill}</span>
              <span className="meta ml-3">
                {count} of {projects.length} projects
                {princeUses(activeSkill) && " · also in PRINCE"}
              </span>
            </p>
            <button type="button" onClick={clear} className="eyebrow transition-colors hover:text-accent">
              Clear ×
            </button>
          </div>
        )}
      </div>

      <div className="divide-y divide-border border-t border-border">
        {projects.map((project) => {
          const dimmed = matching ? !matching.has(project.slug) : false;
          return (
            <Reveal key={project.slug}>
              <div
                className="motion-safe:transition-opacity motion-safe:duration-500"
                style={{ opacity: dimmed ? 0.25 : 1 }}
              >
                <ProjectCard
                  project={project}
                  expanded={open === project.slug}
                  onToggle={() => setOpen(open === project.slug ? null : project.slug)}
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
