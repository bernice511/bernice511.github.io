export const profile = {
  name: "Bernice Mercy Sharon Malaiarasu",
  title: "Generative AI Engineer",
  tagline:
    "Generative AI engineer with 4+ years of software/data engineering experience, including 2+ years building production LLM systems at Thoughtworks, recipient of the Bayer GenAI Award for Best Technical Implementation. Built PRINCE, a multi-agent platform embedded in Bayer's preclinical research workflow across RAG, Text-to-SQL, and NER at scale. Now pursuing an MS in AI at Northeastern's Khoury College, seeking a Spring 2027 Agentic AI internship.",
  email: "bernicemalaiarasu@gmail.com",
  linkedin: "https://linkedin.com/in/bernice-mercy",
  github: "https://github.com/bernice511",
  resumeHref: "/resume.pdf",
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
        heading: "Husky AI",
        text: "Platform enabling students to practice and refine prompt engineering skills through interactive exercises and guided feedback.",
      },
      {
        heading: "AI Journalism Platform",
        text: "Research project applying data analytics, AI video generation, and automated report generation to make news more accessible and reduce journalists' production workload.",
      },
      {
        heading: "Lab WordPress Site",
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
        heading: "PRINCE Chatbot – Generative AI (Jan 2024 – Dec 2025)",
        text: "Led development of PRINCE (LangChain, LangGraph) — a ReAct-based multi-agent system with tool calling, deployed in production at Bayer across 18,000+ preclinical safety studies, cutting query response time by 30% and automating report generation.",
      },
      {
        text: "Built the RAG backbone: 100 GB+ of biomedical data indexed in OpenSearch (vector store) using text embeddings, hybrid semantic + keyword search, 5x query expansion, and cross-encoder re-ranking; every response citation-linked to source.",
      },
      {
        text: "Built Text-to-SQL on Claude 3.5 Sonnet using few-shot prompt engineering and structured output validation; pushed SQL accuracy above 90% against AWS Athena, cutting ad-hoc data requests from days to minutes.",
      },
      {
        text: "Built a NER pipeline achieving 98%+ accuracy across 40+ entity fields, cutting data correction from days to 15 minutes and surfacing entry errors in 30%+ of records missed in prior manual review.",
      },
      {
        text: "Built RAGAS + DeepEval as a CI/CD gate for MLOps; auto-ran expert-curated test sets on every code or prompt change across 5 metrics, with Langfuse observability and score drops triggering root-cause analysis before reaching production.",
      },
      {
        heading: "PRINCE Data Platform – Data Engineering (Aug 2022 – Dec 2023)",
        text: "Processed 20,000+ preclinical study PDFs — extracting, chunking, and generating text embeddings into OpenSearch as the vector store powering PRINCE's RAG retrieval.",
      },
      {
        text: "Migrated 56 database tables from Kubernetes to AWS; built Terraform-managed pipelines syncing data into Elasticsearch as the query layer for the preclinical research API.",
      },
      {
        text: "Built and maintained daily Spark (Scala) + AWS Glue ETL pipelines across 70+ source and 20+ sink tables, ingesting study reports, LIMS data, and lab metadata.",
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
};

export const awards: Award[] = [
  {
    title: "Bayer GenAI Award",
    description: "Best Technical Implementation for multi-agent GenAI system at Bayer",
    date: "2025",
  },
  {
    title: "Frontiers in AI",
    description: "Contributions to PRINCE acknowledged in peer-reviewed AI journal",
    date: "2025",
  },
  {
    title: "Speaker, XConf",
    description:
      "Multi-agent architecture of PRINCE and LLM evaluation strategies, Thoughtworks Bangalore",
    date: "Aug 2025",
  },
  {
    title: "GenAI Workshop Facilitator",
    description: "Designed and delivered workshop on LLMs and RAG to 50+ developers",
    date: "Mar 2025",
  },
  {
    title: "Speaker, Geeknight",
    description:
      "Talk on improving Text-to-SQL accuracy using dynamic few-shot prompting, 80+ engineers",
    date: "Dec 2024",
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
    "Scala",
    "SQL",
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
  summary: string;
  bullets: string[];
  tech: string[];
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "delivery-delay-prediction",
    title: "E-Commerce Delivery Delay Prediction",
    dates: "Northeastern · Apr 2026",
    summary:
      "Predicts whether an order from the Brazilian Olist e-commerce platform will arrive late and estimates how many days late, so at-risk orders can be flagged before they ship.",
    bullets: [
      "XGBoost classifier + regressor on 100K+ Olist orders reached 0.922 ROC-AUC against a 6.8% real-world delay rate, outperforming LightGBM and Random Forest baselines.",
      "Two-stage design: a classifier flags delay risk, then a separate regressor (trained only on delayed orders) estimates the magnitude, invoked only when risk ≥ 50%.",
      "Used SHAP to identify the features actually driving delays — seller on-time rate, purchase month, destination-state delay rate, delivery distance, and product-category delay rate — and shipped the model in an interactive Streamlit dashboard with a geographic delay heatmap and real-time prediction page.",
    ],
    tech: ["Python", "XGBoost", "SHAP", "Streamlit", "scikit-learn"],
    repo: "https://github.com/bernice511/delivery_prediction",
  },
  {
    slug: "crisis-aware-dialogue",
    title: "Crisis-Aware Dialogue: Self-Harm Prevention Classifier",
    dates: "Northeastern · June 2026",
    summary:
      "A routed, prompt-specialized pipeline for handling distress-signal user input (self-harm, suicide ideation, abuse disclosure), fine-tuning LLaMA 3 on a published benchmark of implicit suicidal-ideation cases for early-intervention systems.",
    bullets: [
      "Layer 1: a RoBERTa-base multi-label crisis-type classifier fine-tuned on CRADLEBench (1,308+ clinician-annotated cases across 7 crisis categories), reaching 0.785 macro F1 and 0.920 F1 on the derived flagged/not-flagged signal — within ~2.7 points of GPT-5 alone despite being ~100-500x smaller.",
      "Layer 3: QLoRA fine-tune of Llama-3.2-1B-Instruct on CRADLE-Dialogue to generate risk-context-conditioned responses, cutting test completion loss by 35% and perplexity by 67% over the base model.",
      "Wired both layers end-to-end into a Streamlit demo (classifier → risk context → generated response) and documented real failure modes transparently, including a rare childhood-abuse class and an over-therapizing tendency on benign small talk.",
    ],
    tech: ["PyTorch", "HuggingFace", "RoBERTa", "Llama 3.2", "QLoRA", "Streamlit"],
    repo: "https://github.com/bernice511/crisis-aware-dialogue",
  },
  {
    slug: "entiscribe",
    title: "entiscribe — PDF Entity Extraction & Knowledge Graph",
    dates: "Side project",
    summary:
      "Upload PDFs, define custom entity types, extract them with an LLM, evaluate extraction quality, and link entities across every uploaded file into an interactive knowledge graph.",
    bullets: [
      "End-to-end LangGraph pipelines for ingest (chunk + embed into a local Chroma vector store), extract (retrieve + LLM schema fill), evaluate, and knowledge-graph assembly.",
      "Evaluation combines gold-standard precision/recall/F1 against a reference CSV with an always-on LLM groundedness judge, merged into a single report.",
      "Canonicalizes entities that refer to the same real-world thing across files (e.g. \"Apple Inc.\" and \"Apple\"), infers relationships between co-occurring entities, and renders the result as an interactive graph colored by entity type — with zero API keys, since all LLM calls shell out to the local Claude CLI and embeddings run on a bundled local ONNX model.",
    ],
    tech: ["Python", "LangGraph", "LangChain", "ChromaDB", "Streamlit", "pypdf"],
    repo: "https://github.com/bernice511/entiscribe",
  },
  {
    slug: "jobapplier",
    title: "jobApplier — AI-Assisted Job Search Platform",
    dates: "Side project",
    summary:
      "A semi-automated LinkedIn job-search assistant that tailors resumes and cover letters to real job descriptions with guardrails against fabrication and against unattended submission.",
    bullets: [
      "Full automation flow searches LinkedIn for matching roles, tailors a resume and drafts a cover letter per job with Claude, and drives a real headed browser through Easy Apply up to — but never past — a human-confirmed final click; external-site applications are opened with documents ready rather than auto-filled.",
      "Paste-a-JD web app scores resume fit deterministically from classified keyword matches (not a one-shot LLM judgment), so the score doesn't drift between runs, then generates a tailored resume/cover letter — the tailoring guardrail never lets the model invent an employer, date, skill, or metric that isn't already in the master resume.",
      "Companion Manifest V3 Chrome extension detects job postings across major ATS platforms and can autofill application forms, deliberately never auto-checking consent boxes or clicking submit.",
    ],
    tech: ["Python", "Playwright", "Flask", "Claude", "Chrome Extension (MV3)"],
    repo: "https://github.com/bernice511/jobApplier",
  },
  {
    slug: "prompt-lab",
    title: "Prompt Playground",
    dates: "Side project",
    summary:
      "A tool for browsing Langfuse traces and re-running any generation's prompt through Claude to compare a new completion against the original in production LLM debugging workflows.",
    bullets: [
      "Full-stack TypeScript app (Express + Vite) that lets an engineer pull a real trace from Langfuse and iterate on its prompt without leaving the browser.",
      "Security-conscious design: the Langfuse secret key is sent once to the server and never re-exposed to the browser, sessions are keyed by an httpOnly cookie, and the CLI used to re-run prompts has all built-in tool access disabled since trace content is untrusted LLM input/output.",
    ],
    tech: ["TypeScript", "React", "Vite", "Express", "Langfuse"],
    repo: "https://github.com/bernice511/prompt-lab",
  },
  {
    slug: "assistive-device",
    title: "Personal Assistance System for Visually Impaired",
    dates: "Loyola ICAM · Nov 2021 – May 2022",
    summary:
      "A Raspberry Pi wearable assistive device combining real-time face recognition, object detection, and obstacle sensing with audio feedback, built as an undergraduate capstone project.",
    bullets: [
      "Haar Cascade face recognition reaching 96.24% accuracy, trained and evaluated on-device.",
      "SSD-based object detection at 1-second latency, trained on 500+ images across 75 people.",
      "Ultrasonic obstacle sensing to 4 meters with real-time feedback delivered over Bluetooth audio.",
    ],
    tech: ["Raspberry Pi", "OpenCV", "Haar Cascade", "SSD", "Bluetooth"],
  },
];
