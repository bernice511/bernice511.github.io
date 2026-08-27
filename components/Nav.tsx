"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/lib/data";

const links = [
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#education", id: "education", label: "Education" },
  { href: "#awards", id: "awards", label: "Awards" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("");

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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="#top" className="font-semibold tracking-tight">
          Bernice Malaiarasu
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                active === link.id ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.resumeHref}
          download
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent/90"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
