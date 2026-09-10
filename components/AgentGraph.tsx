type Node = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: "neutral" | "accent" | "accent2";
};

/** Left-to-right: a question enters, the agent routes it to a tool, the answer is synthesized. */
const NODES: Node[] = [
  { id: "q", label: "Question", x: 8, y: 138, w: 96, h: 44, tone: "neutral" },
  { id: "agent", label: "ReAct agent", sub: "LangGraph", x: 150, y: 130, w: 118, h: 60, tone: "accent" },
  { id: "rag", label: "Hybrid RAG", sub: "OpenSearch", x: 322, y: 30, w: 140, h: 52, tone: "accent2" },
  { id: "sql", label: "Text-to-SQL", sub: "Athena", x: 322, y: 134, w: 140, h: 52, tone: "accent2" },
  { id: "ner", label: "NER", sub: "40+ fields", x: 322, y: 238, w: 140, h: 52, tone: "accent2" },
  { id: "out", label: "Answer", sub: "citation-linked", x: 508, y: 130, w: 124, h: 60, tone: "accent" },
];

/** [path, animation-delay in seconds] */
const EDGES: [string, number][] = [
  ["M104 160 H150", 0],
  ["M268 160 C292 160 296 56 322 56", 0.15],
  ["M268 160 H322", 0.5],
  ["M268 160 C292 160 296 264 322 264", 0.85],
  ["M462 56 C490 56 492 160 508 160", 1.6],
  ["M462 160 H508", 1.95],
  ["M462 264 C490 264 492 160 508 160", 2.3],
];

const TONE = {
  neutral: { fill: "var(--surface-2)", stroke: "var(--border-strong)", text: "var(--muted)" },
  accent: { fill: "var(--surface)", stroke: "var(--accent)", text: "var(--foreground)" },
  accent2: { fill: "var(--surface)", stroke: "color-mix(in oklab, var(--accent-2) 60%, transparent)", text: "var(--foreground)" },
} as const;

export default function AgentGraph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 320"
      role="img"
      aria-label="PRINCE architecture: a question is routed by a LangGraph ReAct agent to hybrid RAG over OpenSearch, Text-to-SQL over Athena, or a named-entity-recognition pipeline, then synthesized into a citation-linked answer."
      className={`w-full ${className}`}
    >
      {EDGES.map(([d, delay]) => (
        <g key={d}>
          <path d={d} className="graph-edge" />
          <path d={d} pathLength={100} className="graph-pulse" style={{ animationDelay: `${delay}s` }} />
        </g>
      ))}

      {NODES.map((node, i) => {
        const tone = TONE[node.tone];
        const cx = node.x + node.w / 2;
        return (
          <g key={node.id} className="graph-node" style={{ animationDelay: `${i * 0.3}s` }}>
            {node.tone !== "neutral" && (
              <rect
                x={node.x - 5}
                y={node.y - 5}
                width={node.w + 10}
                height={node.h + 10}
                rx={16}
                fill="none"
                stroke={tone.stroke}
                strokeWidth={1}
                className="graph-halo"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            )}
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx={12}
              fill={tone.fill}
              stroke={tone.stroke}
              strokeWidth={1.25}
            />
            <text
              x={cx}
              y={node.sub ? node.y + node.h / 2 - 3 : node.y + node.h / 2 + 4}
              textAnchor="middle"
              fill={tone.text}
              fontSize={14}
              fontWeight={600}
              fontFamily="var(--font-sans), sans-serif"
            >
              {node.label}
            </text>
            {node.sub && (
              <text
                x={cx}
                y={node.y + node.h / 2 + 15}
                textAnchor="middle"
                fill="var(--muted)"
                fontSize={11}
                fontFamily="var(--font-mono), monospace"
              >
                {node.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
