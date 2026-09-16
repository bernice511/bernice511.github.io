/**
 * Geometry and content for the PRINCE architecture figure.
 * Faithful (condensed) redraw of Figure 1 of the PRINCE paper:
 * Vieira-Vieira et al. (2025), Front. Artif. Intell. 8:1636809.
 * Tier 1 is the supervisor/agent orchestration; tier 2 is the Researcher agent's
 * two retrieval pipelines. Model names are the ones named in the paper.
 */

export type Tone = "neutral" | "core" | "tool" | "human";

export type GNode = {
  id: string;
  label: string;
  /** model or service that runs this step, printed under the label */
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: Tone;
  /** which pass of the scroll-driven build this node appears in */
  step: number;
  /** shown in the detail panel when the node is hovered or focused */
  detail: string;
  metric?: string;
};

export type GEdge = {
  d: string;
  from: string;
  to: string;
  /** dashed — used for the feedback and retry paths */
  dashed?: boolean;
  label?: string;
  lx?: number;
  ly?: number;
};

export const NODES: GNode[] = [
  // ---- tier 1: orchestration ----
  {
    id: "user",
    label: "User",
    x: 20, y: 88, w: 88, h: 44, tone: "neutral", step: 0,
    detail: "A toxicologist asks a question in plain language — no SQL, no filter syntax, no ad-hoc data request.",
  },
  {
    id: "supervisor",
    label: "Supervisor", sub: "LangGraph",
    x: 330, y: 80, w: 150, h: 58, tone: "core", step: 0,
    detail: "Routes each request: decides which specialists to call and in what order, and holds conversation state across the exchange.",
  },
  {
    id: "human",
    label: "Human in the loop",
    x: 306, y: 0, w: 180, h: 42, tone: "human", step: 1,
    detail: "Nothing reaches a regulatory document unreviewed. A reviewer approves or returns feedback before the writer runs.",
  },
  {
    id: "writer",
    label: "Writer agent",
    x: 620, y: 0, w: 168, h: 42, tone: "tool", step: 1,
    detail: "Drafts regulatory prose — IND report sections — from the evidence the researcher gathered, never from its own memory.",
  },
  {
    id: "reflection",
    label: "Reflection agent",
    x: 620, y: 88, w: 168, h: 42, tone: "tool", step: 1,
    detail: "Judges whether enough evidence was gathered to answer, and asks follow-up questions when it wasn't.",
  },
  {
    id: "planner",
    label: "Document planner",
    x: 620, y: 176, w: 168, h: 42, tone: "tool", step: 1,
    detail: "Lays out the section structure for long regulatory drafts before the writer starts filling it in.",
  },
  {
    id: "researcher",
    label: "Researcher agent",
    x: 330, y: 176, w: 150, h: 44, tone: "core", step: 2,
    detail: "Gathers evidence by running two retrieval pipelines, then citation-links every claim back to its source paragraph.",
  },

  // ---- tier 2a: retrieval-augmented generation ----
  {
    id: "rag_request",
    label: "Researcher request",
    x: 130, y: 292, w: 200, h: 34, tone: "neutral", step: 3,
    detail: "The researcher's question, dispatched into the unstructured half of the corpus — PDF study reports.",
  },
  {
    id: "rag_meta",
    label: "Metadata filter", sub: "GPT-4o",
    x: 40, y: 352, w: 180, h: 46, tone: "tool", step: 4,
    detail: "Derives structured filters from the question — species, compound, study type — so retrieval searches the right slice.",
  },
  {
    id: "rag_expand",
    label: "Query expansion ×5", sub: "GPT-4o mini",
    x: 240, y: 352, w: 180, h: 46, tone: "tool", step: 4,
    detail: "Rewrites the question five ways in parallel, so a single phrasing never decides what gets recalled.",
  },
  {
    id: "rag_keyword",
    label: "Keyword generation", sub: "GPT-4o",
    x: 40, y: 418, w: 180, h: 46, tone: "tool", step: 4,
    detail: "Generates the lexical terms for the keyword half of the hybrid search.",
  },
  {
    id: "rag_embed",
    label: "Embedding", sub: "text-embedding-3-large",
    x: 240, y: 418, w: 180, h: 46, tone: "tool", step: 4,
    detail: "Embeds all five expanded queries for the vector half of the hybrid search.",
  },
  {
    id: "rag_search",
    label: "Weighted hybrid search", sub: "Amazon OpenSearch",
    x: 90, y: 486, w: 280, h: 48, tone: "core", step: 5,
    metric: "0.7 vector / 0.3 keyword",
    detail: "Vector and keyword results merged on a fixed weighting — dense recall for paraphrase, lexical precision for compound names and study IDs.",
  },
  {
    id: "rag_rerank",
    label: "Re-ranking", sub: "bge-reranker-large",
    x: 90, y: 556, w: 280, h: 46, tone: "tool", step: 5,
    detail: "Cuts ~20 candidate chunks down to the handful that actually answer the question, before any of it reaches a model.",
  },
  {
    id: "rag_chunks",
    label: "Context chunks",
    x: 130, y: 624, w: 200, h: 34, tone: "neutral", step: 6,
    detail: "Evidence passages, each one citation-linked back to the source paragraph it came from.",
  },

  // ---- tier 2b: text-to-SQL ----
  {
    id: "sql_request",
    label: "Researcher request",
    x: 575, y: 292, w: 200, h: 34, tone: "neutral", step: 3,
    detail: "The same question, dispatched into the structured half — the warehouse tables behind the study catalogue.",
  },
  {
    id: "sql_embed",
    label: "Embedding", sub: "text-embedding-3-large",
    x: 585, y: 352, w: 180, h: 46, tone: "tool", step: 4,
    detail: "Embeds the question so the nearest curated query examples can be found.",
  },
  {
    id: "sql_examples",
    label: "Curated SQL examples", sub: "Amazon OpenSearch",
    x: 545, y: 418, w: 260, h: 46, tone: "tool", step: 4,
    detail: "A hand-curated library of question/query pairs supplies dynamic few-shot prompts — the nearest examples, not a fixed prompt.",
  },
  {
    id: "sql_gen",
    label: "SQL generation", sub: "Claude 3.5 Sonnet",
    x: 545, y: 486, w: 260, h: 48, tone: "core", step: 5,
    metric: "90%+ accuracy vs. Athena",
    detail: "Writes the query against the warehouse schema, grounded in the retrieved examples.",
  },
  {
    id: "sql_athena",
    label: "AWS Athena",
    x: 585, y: 556, w: 180, h: 46, tone: "tool", step: 5,
    detail: "Executes the query. On failure it retries up to three times, feeding the failed query and its error back as context.",
  },
  {
    id: "sql_data",
    label: "Structured data",
    x: 575, y: 624, w: 200, h: 34, tone: "neutral", step: 6,
    detail: "Rows from the warehouse, merged with the RAG evidence into a single cited answer.",
  },
];

export const EDGES: GEdge[] = [
  // orchestration
  { d: "M108 100 H330", from: "user", to: "supervisor", label: "Request", lx: 219, ly: 92 },
  { d: "M330 124 H108", from: "supervisor", to: "user", label: "Final response", lx: 219, ly: 140 },
  { d: "M306 21 C200 21 64 30 64 88", from: "human", to: "user", dashed: true, label: "User feedback", lx: 176, ly: 58 },
  { d: "M405 80 V42", from: "supervisor", to: "human" },
  { d: "M480 100 C560 100 560 21 620 21", from: "supervisor", to: "writer" },
  { d: "M480 109 H620", from: "supervisor", to: "reflection" },
  { d: "M480 120 C560 120 560 197 620 197", from: "supervisor", to: "planner" },
  { d: "M405 138 V176", from: "supervisor", to: "researcher" },
  { d: "M370 220 C370 260 250 250 230 292", from: "researcher", to: "rag_request" },
  { d: "M440 220 C440 260 660 250 675 292", from: "researcher", to: "sql_request" },

  // RAG
  { d: "M200 326 C160 326 130 330 130 352", from: "rag_request", to: "rag_meta" },
  { d: "M260 326 C300 326 330 330 330 352", from: "rag_request", to: "rag_expand" },
  { d: "M130 398 V418", from: "rag_meta", to: "rag_keyword" },
  { d: "M330 398 V418", from: "rag_expand", to: "rag_embed" },
  { d: "M130 464 C130 480 170 470 190 486", from: "rag_keyword", to: "rag_search", label: "0.3", lx: 128, ly: 480 },
  { d: "M330 464 C330 480 290 470 270 486", from: "rag_embed", to: "rag_search", label: "0.7", lx: 332, ly: 480 },
  { d: "M230 534 V556", from: "rag_search", to: "rag_rerank" },
  { d: "M230 602 V624", from: "rag_rerank", to: "rag_chunks" },

  // Text-to-SQL
  { d: "M675 326 V352", from: "sql_request", to: "sql_embed" },
  { d: "M675 398 V418", from: "sql_embed", to: "sql_examples" },
  { d: "M675 464 V486", from: "sql_examples", to: "sql_gen", label: "few-shot", lx: 722, ly: 478 },
  { d: "M675 534 V556", from: "sql_gen", to: "sql_athena" },
  { d: "M675 602 V624", from: "sql_athena", to: "sql_data" },
  { d: "M765 579 C830 579 830 510 805 510", from: "sql_athena", to: "sql_gen", dashed: true, label: "retry ×3", lx: 838, ly: 545 },
];

export const LANES = [
  { title: "Retrieval-augmented generation", x: 20, y: 266, w: 420, h: 406, step: 3 },
  { title: "Text-to-SQL", x: 470, y: 266, w: 410, h: 406, step: 3 },
];

export const MAX_STEP = 6;

export const FIGURE_DESCRIPTION =
  "PRINCE architecture. A user request goes to a LangGraph supervisor agent, which coordinates a writer agent, a reflection agent, a document planner, a researcher agent, and a human-in-the-loop node that returns user feedback. The researcher agent runs two retrieval pipelines: retrieval-augmented generation, where GPT-4o generates metadata filters and keywords while GPT-4o mini expands the query five ways, embeddings from text-embedding-3-large drive a weighted hybrid search over Amazon OpenSearch at 0.7 vector to 0.3 keyword, and bge-reranker-large re-ranks the result into context chunks; and Text-to-SQL, where a curated example library in OpenSearch supplies dynamic few-shot prompts, Claude 3.5 Sonnet generates the query, and AWS Athena returns structured data with retries on error.";
