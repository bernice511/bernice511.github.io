import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import HeroBackdrop from "./HeroBackdrop";
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";
import ConfettiButton from "./ConfettiButton";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <HeroBackdrop />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
      <Reveal>
        <p className="font-mono text-sm text-accent">Hi, I&apos;m</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          <ScrambleText text={profile.name} />
        </h1>
        <h2 className="mt-2 text-xl font-medium text-muted sm:text-2xl">{profile.title}</h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.tagline}
        </p>
      </Reveal>
      <Reveal delay={300}>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Magnetic>
          <ConfettiButton
            href={profile.resumeHref}
            download
            className="rounded-full bg-accent px-5 py-2.5 font-medium text-background transition-colors hover:bg-accent/90"
          >
            Download Resume
          </ConfettiButton>
        </Magnetic>
        <Magnetic>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-border px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Email Me
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
        </Magnetic>
      </div>
      </Reveal>
      </div>
    </section>
  );
}
