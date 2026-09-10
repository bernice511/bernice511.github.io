import { stats } from "@/lib/data";
import StatCounter from "./StatCounter";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section aria-label="Impact at a glance" className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} className="bg-background">
            <div className="h-full bg-surface/60 px-5 py-7 text-center">
              <p className="text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs leading-snug text-muted">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
