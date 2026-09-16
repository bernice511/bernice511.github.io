import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Rule from "./Rule";

/** Numbered section head: rule, number + title on one line, kicker right-aligned.
 *  The running number is what gives the page its editorial spine. */
export default function Section({
  id,
  index,
  title,
  kicker,
  children,
}: {
  id: string;
  index: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-8 sm:py-12">
      <Reveal>
        <Rule />
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 className="flex items-baseline gap-4">
            <span className="eyebrow">{index}</span>
            <span className="display text-4xl sm:text-5xl">{title}</span>
          </h2>
          {kicker && <p className="meta">{kicker}</p>}
        </div>
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}
