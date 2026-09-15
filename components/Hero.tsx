import Image from "next/image";
import { profile, trustBar } from "@/lib/data";
import Reveal from "./Reveal";
import HeroBackdrop from "./HeroBackdrop";
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";
import ConfettiButton from "./ConfettiButton";

const socials = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "GitHub", href: profile.github, external: true },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <HeroBackdrop />
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pt-24 lg:pb-24">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1.5 text-xs font-medium text-accent">
              <span className="status-dot" />
              {profile.availability}
            </p>
          </Reveal>

          {/* h1 is the name for SEO and screen readers; the value proposition below it
              is what actually dominates visually. */}
          <Reveal delay={80}>
            <h1 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
              <ScrambleText text={profile.name} />
            </h1>
            <p className="mt-1 font-mono text-sm text-accent">{profile.title}</p>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-gradient mt-5 text-[2.35rem] font-semibold leading-[1.05] tracking-tight sm:text-[3.4rem]">
              {profile.headline}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.subhead}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              <Magnetic>
                <ConfettiButton
                  href={profile.resumeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-semibold text-background shadow-[0_10px_30px_-12px_var(--accent)] transition-colors hover:bg-accent/90"
                >
                  View Resume
                </ConfettiButton>
              </Magnetic>
              <Magnetic>
                <a
                  href="#prince"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  See the flagship build
                  <span aria-hidden="true">↓</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  {...(social.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="transition-colors hover:text-accent"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={440}>
            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6">
              {trustBar.map((item) => (
                <div key={item.name}>
                  <dt className="text-sm font-semibold tracking-tight">{item.name}</dt>
                  <dd className="text-xs text-muted">{item.note}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal
          delay={200}
          className="order-first justify-self-start lg:order-none lg:justify-self-end"
        >
          <div className="relative w-[clamp(9.5rem,38vw,20rem)]">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,var(--accent-soft),transparent_65%)] blur-xl"
            />
            <div className="card card-glow relative overflow-hidden rounded-[1.75rem] p-2">
              <Image
                src={profile.photo}
                alt={`${profile.name}, ${profile.title}`}
                width={1015}
                height={1100}
                preload
                sizes="(min-width: 1024px) 20rem, 60vw"
                className="aspect-[5/6] w-full rounded-[1.35rem] object-cover object-top"
              />
            </div>
            {/* redundant on phones, where the name sits directly beneath the photo */}
            <p className="absolute -bottom-3 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-border-strong bg-surface px-4 py-1.5 text-xs font-medium shadow-lg lg:block">
              {profile.name.split(" ")[0]} · {profile.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
