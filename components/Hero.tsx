import Image from "next/image";
import { profile, trustBar } from "@/lib/data";
import Reveal from "./Reveal";
import Rule from "./Rule";
import WordReveal from "./WordReveal";

const socials = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "GitHub", href: profile.github, external: true },
];

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-10 pb-4 sm:pt-16">
      <Reveal>
        <Rule />
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <p className="eyebrow">01 — Introduction</p>
          <p className="eyebrow">{profile.location}</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          {/* h1 is the name for SEO and screen readers; the headline below is
              what actually dominates the spread. */}
          <Reveal>
            <h1 className="meta not-italic">{profile.name}</h1>

            <p className="display mt-4 text-[2.9rem] sm:text-[4.15rem]">
              <WordReveal text={profile.headlineLead} delay={120} />
              <WordReveal
                text={profile.headlineEmphasis}
                className="display-italic text-accent"
                delay={120 + profile.headlineLead.split(" ").length * 45}
              />
            </p>

            <Rule className="rule mt-7" />
            <p className="eyebrow mt-3">
              {profile.title} · {profile.availability}
            </p>

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.65] text-muted">
              {profile.subhead}
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.9375rem]">
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noreferrer"
                className="border-b-2 border-foreground pb-0.5 font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Read the CV →
              </a>
              <a href="#prince" className="link-rule text-muted">
                See the flagship build
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  {...(social.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="link-rule"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Portrait as a plate with a printed caption underneath. */}
        <Reveal className="order-first lg:order-none">
          <figure className="w-[clamp(10rem,40vw,17rem)] lg:w-full">
            <Image
              src={profile.photo}
              alt={`${profile.name}, ${profile.title}`}
              width={1015}
              height={1100}
              preload
              sizes="(min-width: 1024px) 17rem, 60vw"
              className="aspect-[5/6] w-full border border-border object-cover object-top"
            />
            <figcaption className="meta mt-2 border-t border-border pt-2">
              {profile.name.split(" ")[0]} · {profile.location}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Credibility row, set as a print table rather than logo pills. */}
      <Reveal>
        <dl className="mt-12 grid grid-cols-1 border-t border-border-strong sm:grid-cols-3">
          {trustBar.map((item) => (
            <div key={item.name} className="border-b border-border py-4 sm:border-b-0 sm:pr-6">
              <dt className="text-[0.9375rem] font-medium">{item.name}</dt>
              <dd className="meta mt-0.5">{item.note}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
