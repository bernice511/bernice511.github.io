"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type FilterState = {
  activeSkill: string | null;
  toggleSkill: (skill: string) => void;
  clear: () => void;
  /** slug of the project whose detail panel is open, if any */
  openProject: string | null;
  setOpenProject: (slug: string | null) => void;
};

const Ctx = createContext<FilterState>({
  activeSkill: null,
  toggleSkill: () => {},
  clear: () => {},
  openProject: null,
  setOpenProject: () => {},
});

export const useFilter = () => useContext(Ctx);

/** Selecting a skill filters the project catalogue. Lives above both sections
 *  so Skills can drive Projects without prop-drilling through the page. */
export default function FilterProvider({ children }: { children: ReactNode }) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [openProject, setOpenProject] = useState<string | null>(null);

  const toggleSkill = useCallback((skill: string) => {
    setActiveSkill((current) => {
      const next = current === skill ? null : skill;
      if (next) {
        // Bring the catalogue into view so the filter is visibly doing something.
        requestAnimationFrame(() => {
          document.getElementById("projects")?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
            block: "start",
          });
        });
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => setActiveSkill(null), []);

  return (
    <Ctx.Provider value={{ activeSkill, toggleSkill, clear, openProject, setOpenProject }}>
      {children}
    </Ctx.Provider>
  );
}
