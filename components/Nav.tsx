"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/lib/data";
import ScrollProgress from "./ScrollProgress";

const links = [
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#prince", id: "prince", label: "PRINCE" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#awards", id: "awards", label: "Awards" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#contact", id: "contact", label: "Contact" },
];

/** Masthead: name set in small caps on the left, sections as a running head. */
export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border-strong bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-3.5">
        <Link
          href="#top"
          className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em]"
        >
          {profile.shortName}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`eyebrow transition-colors hover:text-foreground ${
                active === link.id ? "text-accent" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noreferrer"
            className="border-b-2 border-foreground pb-0.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            CV
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-8 w-8 items-center justify-center border border-border-strong md:hidden"
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M1 4.5H17M1 9H17M1 13.5H17" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <ScrollProgress />
      {open && (
        <nav id="mobile-menu" className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3.5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`eyebrow ${active === link.id ? "text-accent" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
