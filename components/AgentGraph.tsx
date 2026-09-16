"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  EDGES,
  FIGURE_DESCRIPTION,
  LANES,
  MAX_STEP,
  NODES,
  type GNode,
  type Tone,
} from "@/lib/prince-graph";

const TONE: Record<Tone, { fill: string; stroke: string; text: string }> = {
  neutral: { fill: "var(--surface-2)", stroke: "var(--border-strong)", text: "var(--muted)" },
  core: { fill: "var(--accent-soft)", stroke: "var(--accent)", text: "var(--foreground)" },
  tool: {
    fill: "var(--surface)",
    stroke: "color-mix(in oklab, var(--accent-2) 60%, transparent)",
    text: "var(--foreground)",
  },
  human: {
    fill: "var(--surface)",
    stroke: "color-mix(in oklab, var(--accent-3) 60%, transparent)",
    text: "var(--accent-3)",
  },
};

const BY_ID = new Map(NODES.map((n) => [n.id, n]));

/** Scroll-linked build: 0 until the figure enters, 1 once it is fully read.
 *  Ratchets forward so scrolling back up doesn't dismantle the diagram. */
function useBuildStep(ref: React.RefObject<SVGSVGElement | null>) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setStep(MAX_STEP));
      return () => cancelAnimationFrame(id);
    }

    let ticking = false;
    let peak = 0;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      // 0 when the top edge reaches the bottom of the viewport, 1 once the
      // figure has travelled one viewport-height further up.
      const travelled = window.innerHeight - rect.top;
      const progress = Math.max(0, Math.min(travelled / (window.innerHeight * 0.85), 1));
      peak = Math.max(peak, progress);
      setStep(Math.round(peak * MAX_STEP));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return step;
}

export default function AgentGraph({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const step = useBuildStep(svgRef);
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = activeId ? BY_ID.get(activeId) ?? null : null;

  /** Nodes one hop from the active node, so a selection reads as a path. */
  const related = useMemo(() => {
    if (!activeId) return null;
    const set = new Set<string>([activeId]);
    EDGES.forEach((e) => {
      if (e.from === activeId) set.add(e.to);
      if (e.to === activeId) set.add(e.from);
    });
    return set;
  }, [activeId]);

  const nodeOpacity = (node: GNode) => {
    if (node.step > step) return 0;
    if (!related) return 1;
    return related.has(node.id) ? 1 : 0.22;
  };

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox="0 0 900 690"
        aria-label={FIGURE_DESCRIPTION}
        className={`w-full ${className}`}
        onMouseLeave={() => setActiveId(null)}
      >
        {LANES.map((lane) => (
          <g
            key={lane.title}
            style={{ opacity: lane.step > step ? 0 : 1, transition: "opacity 500ms ease-out" }}
          >
            <rect
              x={lane.x}
              y={lane.y}
              width={lane.w}
              height={lane.h}
              fill="color-mix(in oklab, var(--surface) 55%, transparent)"
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={lane.x + lane.w / 2}
              y={lane.y + 26}
              textAnchor="middle"
              fill="var(--muted)"
              fontSize={11}
              fontWeight={600}
              letterSpacing="0.12em"
              fontFamily="var(--font-mono), monospace"
            >
              {lane.title.toUpperCase()}
            </text>
          </g>
        ))}

        {EDGES.map((edge) => {
          const from = BY_ID.get(edge.from);
          const to = BY_ID.get(edge.to);
          const edgeStep = Math.max(from?.step ?? 0, to?.step ?? 0);
          const onPath = activeId === edge.from || activeId === edge.to;
          const visible = edgeStep <= step;
          const opacity = !visible ? 0 : activeId ? (onPath ? 1 : 0.18) : 1;

          return (
            <g key={edge.d} style={{ opacity, transition: "opacity 400ms ease-out" }}>
              <path
                d={edge.d}
                fill="none"
                stroke={onPath ? "var(--accent)" : "var(--border-strong)"}
                strokeWidth={onPath ? 2 : 1.25}
                strokeDasharray={edge.dashed ? "4 4" : undefined}
                style={{ transition: "stroke 200ms ease, stroke-width 200ms ease" }}
              />
              {edge.label && (
                <text
                  x={edge.lx}
                  y={edge.ly}
                  textAnchor="middle"
                  fill={onPath ? "var(--accent)" : "var(--muted)"}
                  fontSize={10.5}
                  fontFamily="var(--font-mono), monospace"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {NODES.map((node) => {
          const tone = TONE[node.tone];
          const cx = node.x + node.w / 2;
          const isActive = activeId === node.id;

          return (
            <g
              key={node.id}
              tabIndex={0}
              role="button"
              aria-label={`${node.label}${node.sub ? `, ${node.sub}` : ""}. ${node.detail}`}
              onMouseEnter={() => setActiveId(node.id)}
              onFocus={() => setActiveId(node.id)}
              onBlur={() => setActiveId(null)}
              onClick={() => setActiveId((id) => (id === node.id ? null : node.id))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveId((id) => (id === node.id ? null : node.id));
                }
              }}
              style={{
                opacity: nodeOpacity(node),
                transition: "opacity 500ms ease-out",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                fill={isActive ? "var(--accent-soft)" : tone.fill}
                stroke={isActive ? "var(--accent)" : tone.stroke}
                strokeWidth={isActive ? 2 : 1.25}
                style={{ transition: "fill 200ms ease, stroke 200ms ease, stroke-width 200ms ease" }}
              />
              <text
                x={cx}
                y={node.sub ? node.y + node.h / 2 - 2 : node.y + node.h / 2 + 4}
                textAnchor="middle"
                fill={isActive ? "var(--accent)" : tone.text}
                fontSize={13}
                fontWeight={600}
                fontFamily="var(--font-sans), sans-serif"
                style={{ pointerEvents: "none" }}
              >
                {node.label}
              </text>
              {node.sub && (
                <text
                  x={cx}
                  y={node.y + node.h / 2 + 14}
                  textAnchor="middle"
                  fill="var(--muted)"
                  fontSize={10.5}
                  fontFamily="var(--font-mono), monospace"
                  style={{ pointerEvents: "none" }}
                >
                  {node.sub}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Reading panel. Fixed height so selecting a node never shifts the page. */}
      <div className="mt-4 min-h-[6.5rem] border-t border-border pt-4">
        {active ? (
          <div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h4 className="display text-2xl">{active.label}</h4>
              {active.sub && <p className="meta text-accent">{active.sub}</p>}
            </div>
            <p className="mt-2 max-w-2xl text-[0.9375rem] leading-[1.6] text-muted">
              {active.detail}
            </p>
            {active.metric && <p className="meta mt-2 text-accent">{active.metric}</p>}
          </div>
        ) : (
          <p className="eyebrow">
            Tap, hover or tab any step to trace its path ↑
          </p>
        )}
      </div>
    </div>
  );
}
