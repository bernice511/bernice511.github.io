"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="flex h-full flex-col p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <span className="text-xs text-muted">{project.dates}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
          >
            {tech}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        {open ? "Hide details" : "Show details"}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M1.5 3L5 6.5L8.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="mt-3 space-y-2 pb-1 text-sm leading-relaxed text-muted">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted/60" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          View code ↗
        </a>
      )}
    </article>
  );
}
