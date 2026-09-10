const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prefix a /public asset with the configured basePath.
 * next/image does not apply basePath when `images.unoptimized` is set, and plain
 * <a href> never does, so every public asset has to go through this.
 */
export const asset = (path: string) => `${basePath}${path}`;

export const profile = {
  name: "Bernice Mercy Sharon Malaiarasu",
  shortName: "Bernice Malaiarasu",
  title: "Generative AI Engineer",
  location: "Boston, MA",
  photo: asset("/headshot.jpg"),
  availability: "Open to Spring 2027 Agentic AI internships",
  /** One-line hook. This is the only sentence most recruiters will read. */
  headline: "I build production LLM systems that people actually use.",
  /** Two-line supporting proof, shown directly under the headline. */
  subhead:
    "2+ years shipping multi-agent GenAI at Bayer with Thoughtworks — RAG, Text-to-SQL, and NER running against 18,000+ preclinical safety studies. Now an MS in AI student at Northeastern.",
  /** Long-form version, used for meta description and OG cards. */
  tagline:
    "Generative AI engineer with 4+ years of software/data engineering experience, including 2+ years building production LLM systems at Thoughtworks, recipient of the Bayer GenAI Award for Best Technical Implementation. Built PRINCE, a multi-agent platform embedded in Bayer's preclinical research workflow across RAG, Text-to-SQL, and NER at scale. Now pursuing an MS in AI at Northeastern's Khoury College, seeking a Spring 2027 Agentic AI internship.",
  email: "bernicemalaiarasu@gmail.com",
  linkedin: "https://linkedin.com/in/bernice-mercy",
  github: "https://github.com/bernice511",
  resumeHref: asset("/resume.pdf"),
};

/** Logos-as-text row under the hero CTAs — instant credibility scan. */
export const trustBar: { name: string; note: string }[] = [
  { name: "Bayer", note: "GenAI in production" },
  { name: "Thoughtworks", note: "Sr. Consultant" },
  { name: "Northeastern", note: "MS in AI" },
];

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 18000, suffix: "+", label: "Preclinical safety studies (PRINCE in production)" },
  { value: 100, suffix: " GB+", label: "Biomedical data indexed for RAG" },
  { value: 98, suffix: "%+", label: "NER accuracy across 40+ entity fields" },
  { value: 90, suffix: "%+", label: "Text-to-SQL accuracy vs. AWS Athena" },
];

/**
 * The flagship case study, promoted out of the Experience bullets into its own
 * section so it reads as work rather than as a resume line.
 */
export const featured = {
  eyebrow: "Flagship — in production at Bayer",
  title: "PRINCE",
  subtitle:
    "A supervisor-orchestrated multi-agent knowledge engine embedded in preclinical drug-safety research",
  dates: "Jan 2024 – Dec 2025 · Thoughtworks for Bayer",
  award: "Bayer GenAI Award — Best Technical Implementation",
  /** The system is published; the architecture below follows Figure 1 of the paper. */
  paper: {
    label: "Published in Frontiers in Artificial Intelligence",
    citation:
      "Vieira-Vieira CH, Kulkarni SS, Zalewski A, Löffler J, Münch J & Kreuchwig A (2025). From data silos to insights: the PRINCE multi-agent knowledge engine for preclinical drug development. Front. Artif. Intell. 8:1636809.",
    href: "https://doi.org/10.3389/frai.2025.1636809",
    note: "Contributions acknowledged as part of the Thoughtworks team.",
  },
  problem:
    "Toxicologists needed answers that lived across 18,000+ preclinical safety studies — some in unstructured PDF study reports, some in warehouse tables. Getting one answer meant filing an ad-hoc data request and waiting days.",
  approach:
    "A LangGraph supervisor agent analyses intent and coordinates specialists: a researcher agent that retrieves evidence, a reflection agent that judges whether enough was gathered and asks follow-up questions, a document planner for regulatory drafts such as IND reports, a writer agent, and a human-in-the-loop node for review before anything is drafted. Every claim in the answer is citation-linked to its source paragraph.",
  impact:
    "Deployed into the daily research workflow across 18,000+ studies. 30% average improvement in response time for complex queries after the multi-agent rollout, 75% of surveyed users reported spending significantly less time searching, and ad-hoc data requests dropped from days to minutes.",
  pillars: [
    {
      name: "Hybrid retrieval",
      detail:
        "GPT-4o derives metadata filters and keywords while GPT-4o mini expands the query five ways in parallel. Weighted hybrid search over Amazon OpenSearch (0.7 vector / 0.3 keyword), then bge-reranker-large re-ranks ~20 candidate chunks down to the ones that actually answer the question.",
      metric: "0.7 / 0.3 hybrid",
    },
    {
      name: "Text-to-SQL",
      detail:
        "Dynamic few-shot prompting pulls the nearest curated query examples from OpenSearch, Claude 3.5 Sonnet writes the SQL, and AWS Athena executes it — retrying up to three times with the failed query and error as context.",
      metric: "90%+ SQL accuracy",
    },
    {
      name: "Metadata extraction",
      detail:
        "A NER pipeline reads study identifiers, compound names, species, routes of administration, dosage and clinical findings straight out of study reports — fixing the incomplete metadata that retrieval quality depends on, and surfacing entry errors manual review had missed.",
      metric: "98%+ across 40+ fields",
    },
    {
      name: "Eval as a CI gate",
      detail:
        "RAGAS + DeepEval run expert-curated question sets on every code or prompt change across five metrics — faithfulness, answer relevancy, context precision, factual correctness and semantic similarity — with Langfuse tracing and score-drop root-cause analysis before release.",
      metric: "5 metrics, every commit",
    },
  ],
  stack: [
    "LangGraph",
    "LangChain",
    "GPT-4o",
    "Claude 3.5 Sonnet",
    "text-embedding-3-large",
    "bge-reranker-large",
    "Amazon OpenSearch",
    "AWS Athena",
    "RAGAS",
    "DeepEval",
    "Langfuse",
  ],
};

export type Experience = {
  org: string;
  location: string;
  role: string;
  dates: string;
  bullets: { heading?: string; text: string }[];
};

export const experience: Experience[] = [
  {
    org: "AIMES Lab, Northeastern University",
    location: "Boston, MA",
    role: "Research Assistant",
    dates: "Jul 2026 – Present",
    bullets: [
      {
        heading: "NewsroomFeed — AI journalism platform",
        text: "LangGraph pipeline turning six live civic feeds (MassDOT, TomTom, NWS, Boston 311) into hyperlocal AI news, with a journalist approving every item before it publishes.",
      },
      {
        text: "Newsworthiness scored as severity × likelihood per ISO 31000 / FEMA — built, but kept switched off until it is calibrated against real editorial judgment.",
      },
      {
        text: "Shipped as a Next.js PWA: geolocated feed, commute-route push alerts, community reports with crowd verification, and an editorial review queue.",
      },
      {
        heading: "Husky AI",
        text: "Platform enabling students to practice and refine prompt engineering skills through interactive exercises and guided feedback.",
      },
      {
        heading: "Lab WordPress site",
        text: "Maintain and extend the lab's WordPress website, implementing new features and resolving issues.",
      },
    ],
  },
  {
    org: "Thoughtworks",
    location: "Chennai, India",
    role: "Sr. Consultant – Data Engineer",
    dates: "Aug 2022 – Dec 2025",
    bullets: [
      {
        heading: "PRINCE — Generative AI (Jan 2024 – Dec 2025)",
        text: "Led development of the multi-agent system described above — hybrid RAG, Text-to-SQL, metadata extraction, and eval-as-a-CI-gate — in production at Bayer across 18,000+ preclinical safety studies.",
      },
      {
        heading: "PRINCE Data Platform — Data Engineering (Aug 2022 – Dec 2023)",
        text: "Processed 20,000+ preclinical study PDFs — extracting, chunking, and embedding into OpenSearch as the vector store that PRINCE's retrieval runs on.",
      },
      {
        text: "Migrated 56 database tables from Kubernetes to AWS, with Terraform-managed pipelines syncing into Elasticsearch as the query layer for the preclinical research API.",
      },
      {
        text: "Built and maintained daily Spark (Scala) + AWS Glue ETL across 70+ source and 20+ sink tables, ingesting study reports, LIMS data, and lab metadata.",
      },
    ],
  },
];

export type EducationItem = {
  school: string;
  location: string;
  degree: string;
  dates: string;
};

export const education: EducationItem[] = [
  {
    school: "Northeastern University – Khoury College of Computer Sciences",
    location: "Boston, MA",
    degree: "MS in Artificial Intelligence, Specialization in Machine Learning",
    dates: "Jan 2026 – May 2028",
  },
  {
    school: "Loyola ICAM College of Engineering and Technology",
    location: "Chennai, India",
    degree: "BE, Electronics and Communications Engineering",
    dates: "Aug 2018 – May 2022",
  },
];

export type Award = {
  title: string;
  description: string;
  date: string;
  kind: "award" | "publication" | "talk" | "workshop";
  href?: string;
  /** Renders larger, with an amber accent. Reserve for the single best credential. */
  highlight?: boolean;
};

export const awards: Award[] = [
  {
    title: "Bayer GenAI Award",
    description: "Best Technical Implementation for multi-agent GenAI system at Bayer",
    date: "2025",
    kind: "award",
    highlight: true,
  },
  {
    title: "Frontiers in Artificial Intelligence",
    description:
      "Named in the acknowledgements of \"From data silos to insights: the PRINCE multi-agent knowledge engine for preclinical drug development\" (Front. Artif. Intell. 8:1636809)",
    date: "Aug 2025",
    kind: "publication",
    href: "https://doi.org/10.3389/frai.2025.1636809",
  },
  {
    title: "Speaker, XConf",
    description:
      "Multi-agent architecture of PRINCE and LLM evaluation strategies, Thoughtworks Bangalore",
    date: "Aug 2025",
    kind: "talk",
  },
  {
    title: "GenAI Workshop Facilitator",
    description: "Designed and delivered workshop on LLMs and RAG to 50+ developers",
    date: "Mar 2025",
    kind: "workshop",
  },
  {
    title: "Speaker, Geeknight",
    description:
      "Talk on improving Text-to-SQL accuracy using dynamic few-shot prompting, 80+ engineers",
    date: "Dec 2024",
    kind: "talk",
  },
];

export const skills = {
  "AI/ML": [
    "LLMs",
    "RAG Pipelines",
    "Agentic AI",
    "Multi-agent Systems",
    "LangChain",
    "LangGraph",
    "Langfuse",
    "RAGAS",
    "DeepEval",
  ],
  Cloud: ["AWS Glue", "Athena", "OpenSearch", "DynamoDB", "S3", "Step Functions"],
  "Languages & Frameworks": [
    "Python",
    "TypeScript",
    "Scala",
    "SQL",
    "FastAPI",
    "React / Next.js",
    "PyTorch",
    "TensorFlow",
    "HuggingFace",
    "OpenCV",
    "Databricks/Spark",
    "Terraform",
    "Docker",
    "Git",
  ],
};

export type Project = {
  slug: string;
  title: string;
  dates: string;
  /** Headline outcome, shown large so it survives a 3-second scan. */
  metric?: { value: string; label: string };
  summary: string;
  /** Replaces prose bullets: three or four scannable label/value rows. */
  specs: { label: string; value: string }[];
  tech: string[];
  repo?: string;
  demo?: string;
  /** Renders full-width above the grid. Reserve for the two strongest. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "entiscribe",
    title: "entiscribe — PDF Entity Extraction & Knowledge Graph",
    dates: "Side project",
    featured: true,
    metric: { value: "0 keys", label: "Runs fully local" },
    summary:
      "Upload PDFs, define your own entity types, extract them with an LLM, score the extraction, and link entities across every file into an interactive knowledge graph.",
    specs: [
      {
        label: "Pipeline",
        value: "LangGraph graphs for ingest → extract → evaluate → knowledge-graph assembly.",
      },
      {
        label: "Eval",
        value:
          "Gold-standard precision/recall/F1 against a reference CSV, plus an always-on LLM groundedness judge, merged into one report.",
      },
      {
        label: "Graph",
        value:
          "Canonicalizes entities that mean the same thing across files (\"Apple Inc.\" / \"Apple\") and infers links between co-occurring entities.",
      },
      {
        label: "Local",
        value:
          "LLM calls shell out to the Claude CLI and embeddings run on a bundled ONNX model — no API keys anywhere.",
      },
    ],
    tech: ["Python", "LangGraph", "LangChain", "ChromaDB", "Streamlit", "pypdf"],
    repo: "https://github.com/bernice511/entiscribe",
  },
  {
    slug: "crisis-aware-dialogue",
    title: "Crisis-Aware Dialogue: Self-Harm Prevention Classifier",
    dates: "Northeastern · June 2026",
    featured: true,
    metric: { value: "0.920", label: "F1 at ~1/100th of GPT-5's size" },
    summary:
      "A routed, prompt-specialized pipeline for distress-signal input — self-harm, suicidal ideation, abuse disclosure — built for early-intervention systems.",
    specs: [
      {
        label: "Data",
        value: "CRADLEBench — 1,308+ clinician-annotated cases across 7 crisis categories.",
      },
      {
        label: "Model",
        value:
          "RoBERTa-base multi-label classifier routing into a QLoRA fine-tune of Llama-3.2-1B-Instruct.",
      },
      {
        label: "Result",
        value:
          "0.785 macro F1, within ~2.7 points of GPT-5 alone; fine-tune cut completion loss 35% and perplexity 67% over base.",
      },
      {
        label: "Caveat",
        value:
          "Failure modes documented rather than hidden — a rare childhood-abuse class, and over-therapizing on benign small talk.",
      },
    ],
    tech: ["PyTorch", "HuggingFace", "RoBERTa", "Llama 3.2", "QLoRA", "Streamlit"],
    repo: "https://github.com/bernice511/crisis-aware-dialogue",
  },
  {
    slug: "delivery-delay-prediction",
    title: "E-Commerce Delivery Delay Prediction",
    dates: "Northeastern · Apr 2026",
    metric: { value: "0.922", label: "ROC-AUC on 100K+ orders" },
    summary:
      "Flags Brazilian Olist orders that will arrive late — and estimates how late — before they ship.",
    specs: [
      { label: "Data", value: "100K+ Olist orders against a 6.8% real-world delay rate." },
      {
        label: "Model",
        value:
          "Two-stage XGBoost: a classifier flags risk, a regressor trained only on late orders estimates magnitude above 50%.",
      },
      {
        label: "Shipped",
        value: "Streamlit dashboard with SHAP delay drivers, a geographic heatmap, and live prediction.",
      },
    ],
    tech: ["Python", "XGBoost", "SHAP", "Streamlit", "scikit-learn"],
    repo: "https://github.com/bernice511/delivery_prediction",
  },
  {
    slug: "jobapplier",
    title: "jobApplier — AI-Assisted Job Search Platform",
    dates: "Side project",
    metric: { value: "Human-in-loop", label: "Never submits without you" },
    summary:
      "Tailors resumes and cover letters to real job descriptions, with guardrails against both fabrication and unattended submission.",
    specs: [
      {
        label: "Guardrail",
        value:
          "Tailoring can never invent an employer, date, skill, or metric that isn't already in the master resume.",
      },
      {
        label: "Scoring",
        value:
          "Fit scored deterministically from classified keyword matches, so it doesn't drift between runs like a one-shot LLM judgment.",
      },
      {
        label: "Surface",
        value:
          "Browser automation that stops at the final human click, a paste-a-JD Flask app, and an MV3 Chrome extension.",
      },
    ],
    tech: ["Python", "Playwright", "Flask", "Claude", "Chrome Extension (MV3)"],
    repo: "https://github.com/bernice511/jobApplier",
  },
  {
    slug: "prompt-lab",
    title: "Prompt Playground",
    dates: "Side project",
    metric: { value: "Prod traces", label: "Replay real Langfuse generations" },
    summary:
      "Pull a real production trace out of Langfuse, re-run its prompt, and compare the new completion against the original.",
    specs: [
      { label: "Flow", value: "Browse Langfuse traces and iterate on a prompt without leaving the browser." },
      { label: "Stack", value: "Full-stack TypeScript — Express + Vite, sessions keyed by an httpOnly cookie." },
      {
        label: "Security",
        value:
          "The Langfuse secret key is never re-exposed to the browser, and the CLI re-running prompts has all tool access disabled since trace content is untrusted.",
      },
    ],
    tech: ["TypeScript", "React", "Vite", "Express", "Langfuse"],
    repo: "https://github.com/bernice511/prompt-lab",
  },
  {
    slug: "assistive-device",
    title: "Personal Assistance System for Visually Impaired",
    dates: "Loyola ICAM · Nov 2021 – May 2022",
    metric: { value: "96.24%", label: "On-device face recognition" },
    summary:
      "A Raspberry Pi wearable combining face recognition, object detection, and obstacle sensing with audio feedback.",
    specs: [
      { label: "Vision", value: "Haar Cascade face recognition plus SSD object detection at 1-second latency." },
      { label: "Data", value: "Trained and evaluated on-device on 500+ images across 75 people." },
      { label: "Sensing", value: "Ultrasonic obstacle detection to 4 meters, fed back over Bluetooth audio." },
    ],
    tech: ["Raspberry Pi", "OpenCV", "Haar Cascade", "SSD", "Bluetooth"],
  },
];
