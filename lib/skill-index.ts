import { featured, projects, skills, type Project } from "./data";

/**
 * Skills are written for a reader ("RAG Pipelines"), project tags are written
 * for a machine ("ChromaDB"). This maps the conceptual skills onto the concrete
 * tags so that clicking one actually selects something. Anything without an
 * entry falls back to a case-insensitive match on its own name.
 */
const ALIASES: Record<string, string[]> = {
  LLMs: ["Claude", "Llama 3.2", "RoBERTa", "GPT-4o", "Claude 3.5 Sonnet"],
  "RAG Pipelines": ["ChromaDB", "LangChain", "LangGraph", "Amazon OpenSearch", "bge-reranker-large"],
  "Agentic AI": ["LangGraph", "LangChain", "Claude"],
  "Multi-agent Systems": ["LangGraph"],
  "React / Next.js": ["React", "Vite"],
  SQL: ["AWS Athena"],
  Athena: ["AWS Athena"],
  OpenSearch: ["Amazon OpenSearch"],
};

const norm = (s: string) => s.toLowerCase().trim();

function tagsFor(skill: string): string[] {
  return (ALIASES[skill] ?? [skill]).map(norm);
}

function matches(skill: string, tech: string[]): boolean {
  const wanted = tagsFor(skill);
  return tech.some((t) => wanted.includes(norm(t)));
}

export function projectsFor(skill: string): Project[] {
  return projects.filter((p) => matches(skill, p.tech));
}

/** The flagship case study carries its own stack, listed separately. */
export function princeUses(skill: string): boolean {
  return matches(skill, featured.stack);
}

export type SkillHit = { skill: string; projectCount: number; inPrince: boolean };

/** Precomputed once — used to decide which skills are worth making clickable. */
export const SKILL_HITS: Record<string, SkillHit> = {};
for (const list of Object.values(skills)) {
  for (const skill of list) {
    SKILL_HITS[skill] = {
      skill,
      projectCount: projectsFor(skill).length,
      inPrince: princeUses(skill),
    };
  }
}

export const isFilterable = (skill: string) => {
  const hit = SKILL_HITS[skill];
  return Boolean(hit && (hit.projectCount > 0 || hit.inPrince));
};
