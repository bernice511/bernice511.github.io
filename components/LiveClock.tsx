"use client";

import { useEffect, useState } from "react";

/** Local time in Boston, so the page has a pulse and a recruiter can see
 *  whether it's a reasonable hour to expect a reply. */
export default function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/New_York",
      }).format(new Date());

    // First paint is deferred a frame so the effect body stays side-effect free.
    const first = requestAnimationFrame(() => setTime(format()));
    const id = setInterval(() => setTime(format()), 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  // Renders nothing until mounted, so the server and client markup agree.
  if (!time) return null;

  return (
    <span className="meta tabular-nums">
      Boston <span className="text-accent">{time}</span>
    </span>
  );
}
