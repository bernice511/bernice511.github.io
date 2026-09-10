/**
 * Faithful (condensed) redraw of Figure 1 of the PRINCE paper:
 * Vieira-Vieira et al. (2025), Front. Artif. Intell. 8:1636809.
 * Tier 1 is the supervisor/agent orchestration; tier 2 is the Researcher agent's
 * two retrieval pipelines. Model names are the ones named in the paper.
 */

type Tone = "neutral" | "core" | "tool" | "human";

type GNode = {
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: Tone;
};

type GEdge = {
  d: string;
  delay: number;
  /** dashed, no travelling pulse — used for the feedback path */
  dashed?: boolean;
  label?: string;
  lx?: number;
  ly?: number;
};

const TONE: Record<Tone, { fill: string; stroke: string; text: string }> = {
  neutral: { fill: "var(--surface-2)", stroke: "var(--border-strong)", text: "var(--muted)" },
  core: { fill: "var(--surface)", stroke: "var(--accent)", text: "var(--foreground)" },
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

const ORCHESTRATION: GNode[] = [
  { label: "User", x: 20, y: 88, w: 88, h: 44, tone: "neutral" },
  { label: "Supervisor", sub: "LangGraph", x: 330, y: 80, w: 150, h: 58, tone: "core" },
  { label: "Human in the loop", x: 306, y: 0, w: 180, h: 42, tone: "human" },
  { label: "Writer agent", x: 620, y: 0, w: 168, h: 42, tone: "tool" },
  { label: "Reflection agent", x: 620, y: 88, w: 168, h: 42, tone: "tool" },
  { label: "Document planner", x: 620, y: 176, w: 168, h: 42, tone: "tool" },
  { label: "Researcher agent", x: 330, y: 176, w: 150, h: 44, tone: "core" },
];

const ORCHESTRATION_EDGES: GEdge[] = [
  { d: "M108 100 H330", delay: 0, label: "Request", lx: 219, ly: 92 },
  { d: "M330 124 H108", delay: 2.2, label: "Final response", lx: 219, ly: 140 },
  { d: "M306 21 C200 21 64 30 64 88", delay: 0, dashed: true, label: "User feedback", lx: 176, ly: 58 },
  { d: "M405 80 V42", delay: 0.5 },
  { d: "M480 100 C560 100 560 21 620 21", delay: 1.5 },
  { d: "M480 109 H620", delay: 1.2 },
  { d: "M480 120 C560 120 560 197 620 197", delay: 1.8 },
  { d: "M405 138 V176", delay: 0.3 },
  { d: "M370 220 C370 260 250 250 230 292", delay: 0.6 },
  { d: "M440 220 C440 260 660 250 675 292", delay: 0.6 },
];

const RAG: GNode[] = [
  { label: "Researcher request", x: 130, y: 292, w: 200, h: 34, tone: "neutral" },
  { label: "Metadata filter", sub: "GPT-4o", x: 40, y: 352, w: 180, h: 46, tone: "tool" },
  { label: "Query expansion ×5", sub: "GPT-4o mini", x: 240, y: 352, w: 180, h: 46, tone: "tool" },
  { label: "Keyword generation", sub: "GPT-4o", x: 40, y: 418, w: 180, h: 46, tone: "tool" },
  { label: "Embedding", sub: "text-embedding-3-large", x: 240, y: 418, w: 180, h: 46, tone: "tool" },
  { label: "Weighted hybrid search", sub: "Amazon OpenSearch", x: 90, y: 486, w: 280, h: 48, tone: "core" },
  { label: "Re-ranking", sub: "bge-reranker-large", x: 90, y: 556, w: 280, h: 46, tone: "tool" },
  { label: "Context chunks", x: 130, y: 624, w: 200, h: 34, tone: "neutral" },
];

const RAG_EDGES: GEdge[] = [
  { d: "M200 326 C160 326 130 330 130 352", delay: 0 },
  { d: "M260 326 C300 326 330 330 330 352", delay: 0.2 },
  { d: "M130 398 V418", delay: 0.4 },
  { d: "M330 398 V418", delay: 0.6 },
  { d: "M130 464 C130 480 170 470 190 486", delay: 0.8, label: "0.3", lx: 128, ly: 480 },
  { d: "M330 464 C330 480 290 470 270 486", delay: 1.0, label: "0.7", lx: 332, ly: 480 },
  { d: "M230 534 V556", delay: 1.4 },
  { d: "M230 602 V624", delay: 1.7 },
];

const SQL: GNode[] = [
  { label: "Researcher request", x: 575, y: 292, w: 200, h: 34, tone: "neutral" },
  { label: "Embedding", sub: "text-embedding-3-large", x: 585, y: 352, w: 180, h: 46, tone: "tool" },
  { label: "Curated SQL examples", sub: "Amazon OpenSearch", x: 545, y: 418, w: 260, h: 46, tone: "tool" },
  { label: "SQL generation", sub: "Claude 3.5 Sonnet", x: 545, y: 486, w: 260, h: 48, tone: "core" },
  { label: "AWS Athena", x: 585, y: 556, w: 180, h: 46, tone: "tool" },
  { label: "Structured data", x: 575, y: 624, w: 200, h: 34, tone: "neutral" },
];

const SQL_EDGES: GEdge[] = [
  { d: "M675 326 V352", delay: 0.1 },
  { d: "M675 398 V418", delay: 0.4 },
  { d: "M675 464 V486", delay: 0.9, label: "few-shot", lx: 722, ly: 478 },
  { d: "M675 534 V556", delay: 1.3 },
  { d: "M675 602 V624", delay: 1.8 },
  { d: "M765 579 C830 579 830 510 805 510", delay: 2.0, label: "retry ×3", lx: 838, ly: 545 },
];

const LANES = [
  { title: "Retrieval-augmented generation", x: 20, y: 266, w: 420, h: 406 },
  { title: "Text-to-SQL", x: 470, y: 266, w: 410, h: 406 },
];

function Edges({ edges }: { edges: GEdge[] }) {
  return (
    <>
      {edges.map((edge) => (
        <g key={edge.d}>
          <path
            d={edge.d}
            className="graph-edge"
            strokeDasharray={edge.dashed ? "4 4" : undefined}
          />
          {!edge.dashed && (
            <path
              d={edge.d}
              pathLength={100}
              className="graph-pulse"
              style={{ animationDelay: `${edge.delay}s` }}
            />
          )}
          {edge.label && (
            <text
              x={edge.lx}
              y={edge.ly}
              textAnchor="middle"
              fill="var(--muted)"
              fontSize={10.5}
              fontFamily="var(--font-mono), monospace"
            >
              {edge.label}
            </text>
          )}
        </g>
      ))}
    </>
  );
}

function Nodes({ nodes, offset = 0 }: { nodes: GNode[]; offset?: number }) {
  return (
    <>
      {nodes.map((node, i) => {
        const tone = TONE[node.tone];
        const cx = node.x + node.w / 2;
        return (
          <g key={node.label + node.x} className="graph-node" style={{ animationDelay: `${(i + offset) * 0.2}s` }}>
            {node.tone === "core" && (
              <rect
                x={node.x - 5}
                y={node.y - 5}
                width={node.w + 10}
                height={node.h + 10}
                rx={15}
                fill="none"
                stroke={tone.stroke}
                strokeWidth={1}
                className="graph-halo"
                style={{ animationDelay: `${(i + offset) * 0.2}s` }}
              />
            )}
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx={11}
              fill={tone.fill}
              stroke={tone.stroke}
              strokeWidth={1.25}
            />
            <text
              x={cx}
              y={node.sub ? node.y + node.h / 2 - 2 : node.y + node.h / 2 + 4}
              textAnchor="middle"
              fill={tone.text}
              fontSize={13}
              fontWeight={600}
              fontFamily="var(--font-sans), sans-serif"
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
              >
                {node.sub}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}

export default function AgentGraph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 690"
      role="img"
      aria-label="PRINCE architecture. A user request goes to a LangGraph supervisor agent, which coordinates a writer agent, a reflection agent, a document planner, a researcher agent, and a human-in-the-loop node that returns user feedback. The researcher agent runs two retrieval pipelines: retrieval-augmented generation, where GPT-4o generates metadata filters and keywords while GPT-4o mini expands the query five ways, embeddings from text-embedding-3-large drive a weighted hybrid search over Amazon OpenSearch at 0.7 vector to 0.3 keyword, and bge-reranker-large re-ranks the result into context chunks; and Text-to-SQL, where a curated example library in OpenSearch supplies dynamic few-shot prompts, Claude 3.5 Sonnet generates the query, and AWS Athena returns structured data with retries on error."
      className={`w-full ${className}`}
    >
      {LANES.map((lane) => (
        <g key={lane.title}>
          <rect
            x={lane.x}
            y={lane.y}
            width={lane.w}
            height={lane.h}
            rx={18}
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

      <Edges edges={ORCHESTRATION_EDGES} />
      <Edges edges={RAG_EDGES} />
      <Edges edges={SQL_EDGES} />

      <Nodes nodes={ORCHESTRATION} />
      <Nodes nodes={RAG} offset={7} />
      <Nodes nodes={SQL} offset={7} />
    </svg>
  );
}
