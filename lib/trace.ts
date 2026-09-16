/**
 * A recorded PRINCE trace, replayed client-side so the page stays a static
 * export — no API keys, no backend. Timings and payloads are representative of
 * the pipeline described in the case study above.
 */

export type TraceStep = {
  stage: string;
  model?: string;
  /** wall-clock cost of this stage, in milliseconds */
  ms: number;
  output: string;
};

export const TRACE_QUESTION =
  "Which compounds showed hepatotoxicity in 28-day rat studies at doses below 50 mg/kg?";

export const TRACE: TraceStep[] = [
  {
    stage: "Metadata filter",
    model: "GPT-4o",
    ms: 310,
    output: "species=rat · study_type=28-day repeat dose · endpoint=hepatotoxicity · dose_mg_kg<50",
  },
  {
    stage: "Query expansion ×5",
    model: "GPT-4o mini",
    ms: 240,
    output:
      "\"liver toxicity rat 28 day\" · \"hepatocellular necrosis repeat dose\" · \"ALT AST elevation rodent\" · \"liver weight increase subchronic\" · \"hepatic findings low dose\"",
  },
  {
    stage: "Keyword generation",
    model: "GPT-4o",
    ms: 180,
    output: "hepatotoxicity, ALT, AST, hepatocellular, liver weight, centrilobular",
  },
  {
    stage: "Embedding",
    model: "text-embedding-3-large",
    ms: 90,
    output: "5 query vectors · 3072-dim",
  },
  {
    stage: "Weighted hybrid search",
    model: "Amazon OpenSearch",
    ms: 140,
    output: "20 candidate chunks · 0.7 vector / 0.3 keyword · filtered to 1,284 matching studies",
  },
  {
    stage: "Re-ranking",
    model: "bge-reranker-large",
    ms: 210,
    output: "20 → 6 chunks · top score 0.94 · lowest kept 0.71",
  },
  {
    stage: "SQL generation",
    model: "Claude 3.5 Sonnet",
    ms: 620,
    output:
      "SELECT compound, dose_mg_kg, finding FROM tox_findings WHERE species='rat' AND duration_days=28 AND dose_mg_kg < 50 AND organ='liver'",
  },
  {
    stage: "Athena execution",
    ms: 410,
    output: "14 rows returned · 0 retries",
  },
  {
    stage: "Answer composed",
    ms: 880,
    output: "4 compounds · every claim citation-linked to its source paragraph",
  },
];

export const TRACE_TOTAL_MS = TRACE.reduce((sum, s) => sum + s.ms, 0);
