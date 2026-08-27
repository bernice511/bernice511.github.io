import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}
