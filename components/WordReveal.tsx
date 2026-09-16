"use client";

import { useEffect, useState } from "react";

/** Per-word stagger for display type. Words rise into place rather than the
 *  whole block fading — the one piece of showy motion on the page. */
export default function WordReveal({
  text,
  className = "",
  delay = 0,
  step = 45,
}: {
  text: string;
  className?: string;
  /** ms before the first word moves */
  delay?: number;
  /** ms between consecutive words */
  step?: number;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Under prefers-reduced-motion the transition classes are inert, so this
    // simply lands on the final state a frame later.
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block will-change-transform motion-safe:transition-[transform,opacity] motion-safe:duration-[700ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: shown ? "translateY(0)" : "translateY(0.9em)",
              opacity: shown ? 1 : 0,
              transitionDelay: `${delay + i * step}ms`,
            }}
          >
            {word}
          </span>
          {" "}
        </span>
      ))}
    </span>
  );
}
