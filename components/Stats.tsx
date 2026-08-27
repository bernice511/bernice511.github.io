import { stats } from "@/lib/data";
import StatCounter from "./StatCounter";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-6">
      <div className="grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100} className="text-center">
            <p className="text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
              <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-xs leading-snug text-muted sm:text-sm">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
