import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <Reveal>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {kicker && <p className="font-mono text-xs text-muted">{kicker}</p>}
        </div>
        <div className="hairline mt-5" />
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}
