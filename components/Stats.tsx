import { stats } from "@/lib/data";
import Reveal from "./Reveal";
import StatCounter from "./StatCounter";

/** Figures set as a ruled table — the numbers are static, no count-up. */
export default function Stats() {
  return (
    <section aria-label="Impact at a glance" className="mx-auto max-w-5xl px-6 py-6">
      <Reveal>
        <dl className="grid grid-cols-2 border-t border-border-strong sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-border px-0 py-5 sm:border-b-0 sm:pr-5"
            >
              <dt className="display text-[2.25rem] text-accent sm:text-[2.6rem]">
                <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dt>
              <dd className="mt-1.5 text-[0.8125rem] leading-snug text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
