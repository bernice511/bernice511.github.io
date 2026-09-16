import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6">
      <div className="rule-ink" />
      <p className="eyebrow mt-3">Error 404</p>
      <h1 className="display mt-6 text-[3rem] sm:text-[4rem]">
        Page <em className="display-italic text-accent">not found.</em>
      </h1>
      <p className="mt-4 text-[1.0625rem] leading-[1.65] text-muted">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-7 w-fit border-b-2 border-foreground pb-0.5 font-medium transition-colors hover:border-accent hover:text-accent"
      >
        Back home →
      </Link>
    </main>
  );
}
