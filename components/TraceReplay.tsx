"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TRACE, TRACE_QUESTION, TRACE_TOTAL_MS } from "@/lib/trace";

/** Replays a recorded trace a stage at a time. Set as a printed ledger:
 *  ruled rows, tabular timings, no chrome. */
export default function TraceReplay() {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    if (!playing || cursor >= TRACE.length - 1) return;
    // Replay at a readable fraction of real time, floored so fast stages still register.
    const next = cursor + 1;
    const delay = Math.max(320, TRACE[next].ms * 0.9);
    timer.current = setTimeout(() => {
      setCursor(next);
      if (next >= TRACE.length - 1) setPlaying(false);
    }, delay);
    return clear;
  }, [playing, cursor]);

  useEffect(() => clear, []);

  const toggle = useCallback(() => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (cursor >= TRACE.length - 1) setCursor(-1);
    setPlaying(true);
  }, [playing, cursor]);

  const stepOnce = () => {
    setPlaying(false);
    setCursor((c) => Math.min(c + 1, TRACE.length - 1));
  };

  const reset = () => {
    setPlaying(false);
    setCursor(-1);
  };

  const elapsed = TRACE.slice(0, cursor + 1).reduce((sum, s) => sum + s.ms, 0);
  const done = cursor >= TRACE.length - 1;

  // Closed, this costs a single line — the depth is here for whoever wants it,
  // but it never stands between a scanning reader and the work below.
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        className="panel panel-link flex w-full flex-wrap items-baseline justify-between gap-x-6 gap-y-1 bg-background px-5 py-4 text-left"
      >
        <span className="eyebrow">Trace replay — recorded run</span>
        <span className="text-[0.9375rem] font-medium">
          Watch one question move through the pipeline{" "}
          <span aria-hidden="true">↓</span>
        </span>
      </button>
    );
  }

  return (
    <div className="panel bg-background p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="eyebrow">Trace replay — recorded run</p>
        <div className="flex items-baseline gap-4">
          <p className="meta tabular-nums">
            {elapsed.toLocaleString()} / {TRACE_TOTAL_MS.toLocaleString()} ms
          </p>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setOpen(false);
            }}
            aria-expanded
            className="eyebrow transition-colors hover:text-accent"
          >
            Close ×
          </button>
        </div>
      </div>

      <p className="display mt-3 max-w-2xl text-[1.5rem] leading-[1.2] sm:text-[1.75rem]">
        “{TRACE_QUESTION}”
      </p>

      {/* progress hairline */}
      <div className="mt-5 h-px w-full bg-border">
        <div
          className="h-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${((cursor + 1) / TRACE.length) * 100}%` }}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <button
          type="button"
          onClick={toggle}
          className="border-b-2 border-foreground pb-0.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          {playing ? "Pause" : done ? "Replay ↻" : cursor < 0 ? "Run the trace →" : "Resume →"}
        </button>
        <button
          type="button"
          onClick={stepOnce}
          disabled={done}
          className="eyebrow transition-colors hover:text-foreground disabled:opacity-40"
        >
          Step
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={cursor < 0}
          className="eyebrow transition-colors hover:text-foreground disabled:opacity-40"
        >
          Reset
        </button>
      </div>

      <ol className="mt-6 divide-y divide-border border-t border-border">
        {TRACE.map((s, i) => {
          const revealed = i <= cursor;
          const current = i === cursor;
          return (
            <li
              key={s.stage}
              aria-current={current || undefined}
              className={`grid gap-x-5 gap-y-1 py-3 transition-opacity duration-300 md:grid-cols-[11rem_4.5rem_1fr] ${
                revealed ? "opacity-100" : "opacity-25"
              }`}
            >
              <div className="flex items-baseline gap-2">
                <span className="meta tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`text-[0.9375rem] font-medium ${current ? "text-accent" : ""}`}
                >
                  {s.stage}
                </span>
              </div>
              <span className="meta tabular-nums">{revealed ? `${s.ms} ms` : "—"}</span>
              <div>
                {s.model && <p className="meta text-accent-2">{s.model}</p>}
                <p className="mt-0.5 break-words font-mono text-[0.75rem] leading-[1.6] text-muted">
                  {revealed ? s.output : "…"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
