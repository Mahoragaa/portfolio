/**
 * ============================================================================
 *  SITE CONTENT: single source of truth.
 *  Edit text here; components read everything from this file.
 *  Rule: every fact must be traceable to the resume or to the repo source code.
 * ============================================================================
 */

/* ----------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------*/

export type SectionId =
  | "top"
  | "projects"
  | "experience"
  | "skills"
  | "education"
  | "contact";

export type SkillCategory =
  | "languages"
  | "ai"
  | "backend"
  | "cloud"
  | "data"
  | "concepts";

/** Where a piece of evidence comes from. */
export type EvidenceSource = "resume" | "code" | "both";

export interface Evidence {
  /** project slug or role id */
  kind: "project" | "role";
  id: string;
  label: string;
  /** short "how it was used" note shown in the evidence panel */
  note: string;
  /** file path or resume bullet reference */
  citation: string;
  source: EvidenceSource;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  evidence: Evidence[];
}

export interface Role {
  id: string;
  title: string;
  company: string;
  /** Display string exactly as on the resume, e.g. "05/2026 – Present" */
  period: string;
  /** ISO-ish start for machine-readable <time> */
  start: string;
  end?: string;
  context?: string;
  highlightStat?: { value: string; label: string };
  bullets: string[];
  tech: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  /** Only set when a real verification URL is known */
  verifyUrl?: string;
}

export interface Education {
  degree: string;
  school: string;
  url: string;
  period: string;
  grade: string;
}

export interface ArchNode {
  id: string;
  label: string;
  sub: string;
  /** exact file or config reference */
  fileRef: string;
  /** visual group for colouring */
  group: "client" | "api" | "compute" | "ai" | "data" | "external";
}

export interface ArchEdge {
  from: string;
  to: string;
  label: string;
  fileRef: string;
}

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  poster?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  pitch: string;
  description: string;
  categories: string[];
  repo: string;
  demo?: string;
  /** real screenshots / recordings only */
  media: ProjectMedia[];
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  role: string;
  roleVerificationNote?: string;
  challenges: { title: string; body: string; fileRef: string }[];
  /** Architecture derived strictly from source code (imports / calls). */
  architecture: {
    nodes: ArchNode[];
    edges: ArchEdge[];
    /** true until the owner has reviewed the derived diagram */
    pendingReview: boolean;
    sourceNote: string;
  };
  /** Fallback repo facts if the GitHub API is unavailable at build time */
  fallbackLanguage: string;
  accentHue: number;
}

/* ----------------------------------------------------------------------------
 * Identity & links
 * --------------------------------------------------------------------------*/

export const site = {
  name: "Raghav Arora",
  shortName: "RA",
  url: "https://raghav-arora.vercel.app",
  title: "Raghav Arora · Software Engineer (AI, Cloud & Backend)",
  description:
    "Raghav Arora is a Software Engineer at Infosys building AI-powered, cloud and backend systems: serverless Generative AI on AWS, LLM-powered Next.js apps, agentic RAG and production PL/SQL.",
  email: "raghav2303arora@gmail.com",
  links: {
    github: "https://github.com/Mahoragaa",
    githubUser: "Mahoragaa",
    linkedin: "https://www.linkedin.com/in/raghav-arora-found/",
  },
  resume: "/Raghav_Arora_Resume.pdf",
  languages: ["English (Professional)", "Hindi (Native)"],
} as const;

/* ----------------------------------------------------------------------------
 * Hero
 * --------------------------------------------------------------------------*/

export const hero = {
  eyebrow: "Software Engineer · AI, Cloud & Backend",
  /**
   * Primary static headline. Alternatives proposed for your review:
   *  Option A: "I build AI systems that hold up in production."
   *  Option B: "From production databases to production AI."
   *  Option C (active): "Reliable backends. Useful AI. Shipped to the cloud."
   */
  headline: "Reliable backends. Useful AI. Shipped to the cloud.",
  headlineOptions: [
    "Reliable backends. Useful AI. Shipped to the cloud.",
    "I build AI systems that hold up in production.",
    "From production databases to production AI.",
  ],
  summary:
    "Computer Science graduate and Infosys System Engineer building serverless Generative AI on AWS, full-stack TypeScript & Next.js applications, agentic RAG pipelines, and tuned production PL/SQL databases.",
  focusAreas: [
    "Generative AI & Agents",
    "Serverless Cloud (AWS & OCI)",
    "Backend & Production Databases",
    "Full-Stack TypeScript",
  ],
  /** One-line proof, straight from the resume */
  proof: {
    role: "System Engineer @ Infosys",
    context: "Pfizer pharmacovigilance & safety-data L3 engineering",
    metric: "2h → 15m (−87.5%)",
    detail:
      "Cut a production PL/SQL database script execution time from 2 hours to 15 minutes (an 87.5% reduction).",
  },
  ctas: {
    primary: { label: "Explore Projects", href: "#projects" },
    resume: { label: "Download Résumé (Web-Safe PDF)", href: "/Raghav_Arora_Resume.pdf" },
    contact: { label: "Get in Touch", href: "#contact" },
  },
} as const;

/* ----------------------------------------------------------------------------
 * Projects (derived from resume + cloned source repositories)
 * --------------------------------------------------------------------------*/

export const projects: Project[] = [
  {
    slug: "code-complexity-analyzer",
    title: "Code Complexity Analyzer",
    subtitle: "Serverless Generative AI Code Analysis on AWS",
    pitch:
      "Serverless AWS service that returns Big-O complexity, bottlenecks, and an optimized refactor across four languages.",
    description:
      "A serverless Generative AI application deployed on AWS (Lambda, HTTP API Gateway, DynamoDB, S3 via AWS SAM) that analyzes Java, Python, JavaScript, and C++ source code. It uses a pluggable LLM provider layer (Groq Llama 3.3 70B, Google Gemini, OpenAI) with strict JSON schema validation and stores browsable history in DynamoDB.",
    categories: ["Gen AI", "Cloud", "Backend"],
    repo: "https://github.com/Mahoragaa/code-complexity-analyzer",
    demo: "http://complexity-analyzer-frontend-470895880655.s3-website-us-east-1.amazonaws.com",
    media: [
      {
        type: "image",
        src: "/projects/complexity-analyzer.png",
        alt: "Code Complexity Analyzer browser interface showing CodeMirror editor, Big-O complexity badges, bottleneck analysis, and Chart.js comparison",
        caption: "Live S3 browser UI (`frontend/index.html`) with CodeMirror 5 editor, side-by-side refactor diff, and Chart.js complexity curves.",
        width: 1440,
        height: 900,
      },
    ],
    overview:
      "Built and deployed an end-to-end serverless code review tool within the AWS Free Tier. Users paste Java, Python, JavaScript, or C++ snippets into a single-page browser UI hosted on S3; an HTTP API Gateway invokes a Python 3.12 Lambda function that validates the payload, queries a configurable LLM provider for structured Big-O analysis and refactored code, persists the run to DynamoDB, and renders a side-by-side diff and complexity chart.",
    problem:
      "Developers preparing algorithms or reviewing unfamiliar code often want immediate feedback on time and space complexity, concrete bottleneck explanations, and an idiomatic optimized rewrite—without spinning up paid infrastructure or locking into a single LLM vendor.",
    solution:
      "Defined the entire cloud stack in a single AWS SAM template (`template.yaml`) combining an S3 static frontend, HTTP API Gateway (`AWS::Serverless::HttpApi`), a Python 3.12 Lambda handler (`lambda/lambda_function.py`), and an on-demand DynamoDB table with a Global Secondary Index for time-ordered history queries (`EntityTypeCreatedAtIndex`). Locally, a Flask proxy (`server.py`) and automatic SQLite fallback (`lambda/history_client.py`) let the full stack run with zero AWS credentials.",
    features: [
      "Multi-language analysis for Java, Python, JavaScript, and C++ with language-specific prompt assembly (`lambda/prompt_builder.py`).",
      "Pluggable LLM provider layer (`AnalyzerProvider` ABC in `lambda/providers/base.py`) supporting Groq Llama 3.3 70B, Gemini, and OpenAI swapped via `ACTIVE_PROVIDER`.",
      "Pre-flight request validation (`lambda/validator.py`) enforcing a language allow-list and a 4,000-character input cap before any model call to keep token spend bounded.",
      "Dual-mode persistence (`lambda/history_client.py`): DynamoDB with GSI in AWS production, automatic SQLite (`history.db`) fallback in local development.",
      "Browser UI (`frontend/index.html`) featuring a CodeMirror 5 editor, original-vs-optimized code view, and a Chart.js Big-O growth comparison.",
      "30 pytest unit tests (`lambda/test_handler.py`) covering happy paths, validator rules, routing, and clean 502/503 provider error responses.",
    ],
    stack: [
      "Python",
      "AWS Lambda",
      "API Gateway",
      "DynamoDB",
      "S3",
      "AWS SAM",
      "Groq API",
      "Gemini API",
      "OpenAI API",
      "Flask",
      "SQLite",
      "pytest",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    role: "Sole author and architect (verified via git commit history under Raghav Arora).",
    challenges: [
      {
        title: "Swappable LLM backends with deterministic error contracts",
        body: "Implemented `AnalyzerProvider` (`lambda/providers/base.py`) with concrete Groq, Gemini, and OpenAI classes and provider-agnostic `MalformedResponseError` (HTTP 502) and `ProviderError` (HTTP 503) exceptions so the Lambda handler never leaks raw SDK tracebacks.",
        fileRef: "lambda/providers/base.py · lambda/lambda_function.py",
      },
      {
        title: "Bounded token spend and backward-compatible payloads",
        body: "Built `validate_request` (`lambda/validator.py`) to reject empty, non-string, unsupported-language, or >4,000-character inputs with HTTP 400 before invoking any LLM, while preserving backward compatibility with legacy `java_code` payloads.",
        fileRef: "lambda/validator.py",
      },
      {
        title: "Chronological history queries on DynamoDB + zero-config local dev",
        body: "Modeled DynamoDB with partition key `analysis_id` plus a GSI (`entity_type` HASH + `created_at` RANGE) for `ScanIndexForward=False` recent-20 queries, and added transparent fallback to local SQLite whenever `HISTORY_TABLE` is unset or unreachable.",
        fileRef: "template.yaml · lambda/history_client.py",
      },
    ],
    architecture: {
      pendingReview: false,
      sourceNote:
        "Derived directly from `template.yaml`, `lambda/lambda_function.py`, `lambda/providers/__init__.py`, and `lambda/history_client.py` (also documented in repo `README.md`).",
      nodes: [
        {
          id: "s3-ui",
          label: "Browser SPA (S3)",
          sub: "CodeMirror 5 + Chart.js",
          fileRef: "frontend/index.html",
          group: "client",
        },
        {
          id: "apigw",
          label: "HTTP API Gateway",
          sub: "POST /analyze · GET /history",
          fileRef: "template.yaml (AnalyzerApi)",
          group: "api",
        },
        {
          id: "lambda",
          label: "Lambda (Python 3.12)",
          sub: "Validator + Router + Prompt Builder",
          fileRef: "lambda/lambda_function.py",
          group: "compute",
        },
        {
          id: "llm",
          label: "Pluggable LLM Provider",
          sub: "Groq · Gemini · OpenAI",
          fileRef: "lambda/providers/base.py",
          group: "ai",
        },
        {
          id: "db",
          label: "DynamoDB / SQLite",
          sub: "EntityTypeCreatedAtIndex GSI",
          fileRef: "lambda/history_client.py",
          group: "data",
        },
      ],
      edges: [
        {
          from: "s3-ui",
          to: "apigw",
          label: "HTTPS JSON",
          fileRef: "frontend/index.html",
        },
        {
          from: "apigw",
          to: "lambda",
          label: "AWS proxy event",
          fileRef: "template.yaml",
        },
        {
          from: "lambda",
          to: "llm",
          label: "Strict JSON prompt (≤4k chars)",
          fileRef: "lambda/prompt_builder.py",
        },
        {
          from: "lambda",
          to: "db",
          label: "save_analysis / list_recent",
          fileRef: "lambda/history_client.py",
        },
      ],
    },
    fallbackLanguage: "Python",
    accentHue: 82,
  },
  {
    slug: "applytrail",
    title: "ApplyTrail",
    subtitle: "AI-Powered Job Application Tracker & Resume Tailor",
    pitch:
      "Local-first Next.js 14 app that syncs Gmail over OAuth, classifies ATS & recruiter emails with LLMs, and tailors resumes with word-level diffs.",
    description:
      "A full-stack TypeScript application (~9,000 lines across `src/`) that connects to Gmail via NextAuth Google OAuth, pre-filters ATS and recruiter messages (Greenhouse, Lever, Workday, Ashby, LinkedIn, Wellfound), classifies each into application or reply states using OpenAI or Gemini (with a deterministic rule-based fallback), and includes an interactive Resume Tailoring & Diff Preview Studio.",
    categories: ["Full-stack", "Gen AI", "Backend"],
    repo: "https://github.com/Mahoragaa/job-application-app",
    media: [],
    overview:
      "ApplyTrail automates job-search bookkeeping without handing inbox data to a third-party SaaS. Running against a local SQLite database managed by Prisma, it incrementally syncs Gmail in batches of 200 oldest-to-newest, deduplicates via a `ProcessedEmail` marker written in the same database transaction as the `Application` update, and provides a `/resume` studio that parses PDF/DOCX/TXT/Markdown resumes, scrapes job descriptions, and generates word-level red/green diffs with ATS keyword match scores.",
    problem:
      "Active job seekers receive hundreds of confirmations, ATS status updates, and recruiter replies scattered across Gmail threads, while tailoring resumes per role requires tedious keyword comparison and formatting.",
    solution:
      "Built an incremental sync pipeline (`src/app/api/sync/route.ts`) guarded by a per-user in-memory lock (`activeSyncs`), parallel Gmail metadata fetching (`METADATA_CONCURRENCY = 10`), parallel AI classification (`AI_CONCURRENCY = 5`), and sequential oldest-to-newest Prisma transactions (`persistEmail`). Paired it with a Resume Studio (`src/lib/ai-resume.ts`, `src/app/resume/preview/[id]/page.tsx`) featuring a custom coordinate-aware PDF parser (`extractPdfTextLocal`), DOCX ZIP/XML inflater (`extractDocxText`), three alignment modes, and DOCX/PDF/Markdown export.",
    features: [
      "Gmail OAuth integration (`src/lib/gmail.ts`, `src/lib/auth.ts`) with targeted search operators for Greenhouse, Lever, Workday, Ashby, LinkedIn Easy Apply, and Wellfound.",
      "Three-tier email classifier (`src/lib/ai-classifier.ts`): OpenAI `gpt-4o-mini` strict JSON schema, Gemini `gemini-2.5-flash` response schema, or a zero-cost rule-based classifier with a 0.75 confidence threshold.",
      "Transactional sync engine (`src/app/api/sync/route.ts`): batches of 200, per-user concurrency lock, thread + normalized-company matching (`src/lib/company.ts`), bulk Gmail label application, and 6-hour auto-sync.",
      "Custom binary PDF & DOCX text extraction (`src/lib/ai-resume.ts`): parses PDF `BT...ET` text operators, `TJ` kerning arrays, and TeX octal ligatures without external native binaries.",
      "Interactive Resume Diff Preview (`/resume/preview/[id]`): word-level diffs, matched vs. missing JD keywords, before/after ATS match scores, per-edit toggles, revision history, and DOCX export (`src/lib/docx-export.ts`).",
      "Dashboard (`src/app/dashboard/page.tsx`) with search, status pills, sorting, date-range picker, Recharts analytics (`analytics-charts.tsx`), and CSV export.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Prisma",
      "SQLite",
      "NextAuth",
      "Gmail API",
      "OpenAI API",
      "Gemini API",
    ],
    role: "Sole author and architect (verified via git commit history under Raghav Arora).",
    challenges: [
      {
        title: "Idempotent, retry-safe incremental Gmail sync",
        body: "Gmail lists messages newest-first, which can cause an older confirmation to overwrite a newer interview reply if processed naively. `src/app/api/sync/route.ts` filters out `ProcessedEmail` IDs up front, slices the oldest 200 (`newIds.slice(-MAX_PER_SYNC)`), classifies in parallel (`AI_CONCURRENCY = 5`), then persists sequentially oldest-to-newest inside `prisma.$transaction` so failed emails are left unmarked and retried cleanly on the next sync.",
        fileRef: "src/app/api/sync/route.ts · prisma/schema.prisma",
      },
      {
        title: "Strict schema & confidence gating against inbox noise",
        body: "`src/lib/ai-classifier.ts` combines a shared sender exclusion list (`isExcludedSender`), strict JSON schemas for OpenAI/Gemini, a `CONFIDENCE_THRESHOLD = 0.75` sanitizer (`sanitizeResult`), and a comprehensive regex fallback that extracts hiring companies from ATS display names, domains, and Wellfound/LinkedIn snippets.",
        fileRef: "src/lib/ai-classifier.ts · src/lib/senders.ts",
      },
      {
        title: "Zero-dependency coordinate-aware PDF & DOCX resume parser",
        body: "Implemented `extractPdfTextLocal` and `decodePdfOctalAndEscapes` in `src/lib/ai-resume.ts` to inflate compressed PDF streams via Node `zlib`, track `Tm`/`Td`/`TD` text positioning and negative `TJ` kerning spaces, decode TeX ligatures, and inflate `word/document.xml` directly from `.docx` ZIP headers.",
        fileRef: "src/lib/ai-resume.ts",
      },
    ],
    architecture: {
      pendingReview: false,
      sourceNote:
        "Derived from imports and route handlers in `src/app/api/sync/route.ts`, `src/lib/gmail.ts`, `src/lib/ai-classifier.ts`, `src/lib/ai-resume.ts`, and `prisma/schema.prisma`.",
      nodes: [
        {
          id: "next-ui",
          label: "Next.js 14 UI",
          sub: "/dashboard · /resume · /resume/preview/[id]",
          fileRef: "src/app/dashboard/page.tsx",
          group: "client",
        },
        {
          id: "api-routes",
          label: "App Router API",
          sub: "/api/sync · /api/applications · /api/resume/tailor",
          fileRef: "src/app/api/sync/route.ts",
          group: "api",
        },
        {
          id: "gmail",
          label: "Gmail OAuth Client",
          sub: "Query + parallel metadata + bulk labels",
          fileRef: "src/lib/gmail.ts",
          group: "external",
        },
        {
          id: "classifier",
          label: "Classifier & Tailor Engine",
          sub: "OpenAI · Gemini · Rule-based fallback",
          fileRef: "src/lib/ai-classifier.ts · src/lib/ai-resume.ts",
          group: "ai",
        },
        {
          id: "prisma-db",
          label: "Prisma + SQLite",
          sub: "Application · ProcessedEmail · TailoredResume",
          fileRef: "prisma/schema.prisma",
          group: "data",
        },
      ],
      edges: [
        {
          from: "next-ui",
          to: "api-routes",
          label: "fetch (manual + 6h auto-sync)",
          fileRef: "src/components/dashboard/sync-button.tsx",
        },
        {
          from: "api-routes",
          to: "gmail",
          label: "OAuth2 token · batch 200",
          fileRef: "src/app/api/sync/route.ts",
        },
        {
          from: "api-routes",
          to: "classifier",
          label: "mapWithConcurrency(5)",
          fileRef: "src/lib/concurrency.ts",
        },
        {
          from: "api-routes",
          to: "prisma-db",
          label: "prisma.$transaction (persistEmail)",
          fileRef: "src/app/api/sync/route.ts",
        },
      ],
    },
    fallbackLanguage: "TypeScript",
    accentHue: 150,
  },
  {
    slug: "agentic-research-assistant",
    title: "Agentic Research Assistant",
    subtitle: "Generative AI RAG Agent for arXiv",
    pitch:
      "LangGraph ReAct agent on Gemini that routes between ChromaDB paper retrieval, live web search, and clarifying questions.",
    description:
      "An agentic Retrieval-Augmented Generation (RAG) system built with Python, LangGraph, LangChain, Google Gemini, ChromaDB, PyMuPDF (`pymupdf4llm`), and Gradio. It ingests arXiv PDFs into topic-scoped ChromaDB collections using deterministic chunk IDs and uses a checkpointed ReAct state graph to decide per query whether to retrieve from ingested papers, search the web, or ask the user for clarification.",
    categories: ["Gen AI", "Backend"],
    repo: "https://github.com/Mahoragaa/agentic-research-assistant",
    media: [],
    overview:
      "Built a multi-tool research assistant (`app/agent/graph.py`) that avoids blind RAG hallucination. Users ingest arXiv papers by topic through a Gradio Blocks interface (`app/ui/components.py`); the ingestion orchestrator (`app/ingestion/pipeline.py`) downloads PDFs via the arXiv API, converts pages to structured Markdown with `pymupdf4llm`, splits them with `RecursiveCharacterTextSplitter`, embeds chunks with Google `text-embedding-004`, and upserts only non-duplicate IDs into a persistent ChromaDB collection. At query time, a compiled LangGraph `StateGraph` with `MemorySaver` streams tool calls and cited answers in real time.",
    problem:
      "Standard single-step RAG pipelines retrieve chunks unconditionally—even when a query is ambiguous or requires external web context—and re-ingesting papers often creates duplicate vector entries.",
    solution:
      "Compiled a two-node LangGraph ReAct workflow (`agent` ↔ `tools` in `app/agent/graph.py`) bound to three explicit tools (`retrieve`, `web_search`, `clarify`) with `MemorySaver` thread checkpointing and `MAX_ITERATIONS = 10`. Designed the indexer (`app/ingestion/indexer.py`) and chunker (`app/ingestion/chunker.py`) around deterministic IDs (`{arxiv_id}::chunk_{chunk_index}`) and pre-insert `collection.get(ids=ids)` checks so re-running ingestion on any topic is strictly idempotent.",
    features: [
      "LangGraph `StateGraph` ReAct agent (`app/agent/graph.py`) with conditional tool routing (`should_continue`), `MemorySaver` conversation checkpointing, and `astream_events` token/tool streaming.",
      "Three specialized agent tools (`app/agent/tools/`): `retrieve` (cosine search over the active ChromaDB collection), `web_search` (external context), and `clarify` (prompts user when queries are ambiguous).",
      "End-to-end arXiv ingestion pipeline (`app/ingestion/pipeline.py`): `fetch_papers` → `parse_pdf_safe` (`pymupdf4llm`) → Markdown-aware `chunk_pages` (1,000 chars, 200 overlap) → batched `embed_and_upsert`.",
      "Idempotent vector indexing (`app/ingestion/indexer.py`): deterministic `{arxiv_id}::chunk_{index}` IDs with batch deduplication against existing ChromaDB IDs.",
      "Citation-enforced system prompt (`SYSTEM_PROMPT` in `app/agent/graph.py`) requiring title, authors, and arXiv ID, and flagging low-similarity retrievals (< 0.3) rather than guessing.",
      "Gradio Blocks UI (`app/ui/components.py`, `app/main.py`) with per-topic collection selector, live stage-by-stage ingestion callbacks, and pytest suites (`tests/test_agent.py`, `tests/test_ingestion.py`, `tests/test_tools.py`).",
    ],
    stack: [
      "Python",
      "LangGraph",
      "LangChain",
      "Gemini API",
      "ChromaDB",
      "PyMuPDF",
      "Gradio",
      "pytest",
    ],
    role: "Sole author and architect (verified via git commit history under Raghav Arora).",
    challenges: [
      {
        title: "Idempotent re-ingestion with deterministic chunk IDs",
        body: "`TextChunk.chunk_id` (`app/ingestion/chunker.py`) formats every chunk ID as `{arxiv_id}::chunk_{chunk_index}`. Before calling the embedding API, `embed_and_upsert` (`app/ingestion/indexer.py`) queries `collection.get(ids=ids)` per batch of 50 and filters out existing IDs—saving both embedding cost and duplicate vectors.",
        fileRef: "app/ingestion/chunker.py · app/ingestion/indexer.py",
      },
      {
        title: "Dynamic tool routing & low-similarity guardrails",
        body: "Configured `agent_node` (`app/agent/graph.py`) to inject the active ChromaDB collection name into `SYSTEM_PROMPT` on every turn, binding `retrieve`, `web_search`, and `clarify` at temperature 0.1 and instructing the agent to surface uncertainty whenever cosine similarity falls below 0.3.",
        fileRef: "app/agent/graph.py · app/agent/tools/retrieve.py",
      },
      {
        title: "Deferred settings validation for clean test imports",
        body: "Implemented a lazy `_SettingsProxy` over `pydantic-settings` (`app/config.py`) so importing agent or ingestion modules in `pytest` never fails when `GOOGLE_API_KEY` is unset.",
        fileRef: "app/config.py",
      },
    ],
    architecture: {
      pendingReview: false,
      sourceNote:
        "Derived from `app/main.py`, `app/ui/components.py`, `app/ingestion/pipeline.py`, `app/ingestion/indexer.py`, and `app/agent/graph.py`.",
      nodes: [
        {
          id: "gradio",
          label: "Gradio Blocks UI",
          sub: "Topic ingest + streaming chat",
          fileRef: "app/ui/components.py · app/main.py",
          group: "client",
        },
        {
          id: "pipeline",
          label: "Ingestion Pipeline",
          sub: "arXiv fetch → pymupdf4llm → splitter",
          fileRef: "app/ingestion/pipeline.py",
          group: "compute",
        },
        {
          id: "chroma",
          label: "ChromaDB (Cosine)",
          sub: "Idempotent arxiv_id::chunk_i",
          fileRef: "app/ingestion/indexer.py",
          group: "data",
        },
        {
          id: "langgraph",
          label: "LangGraph ReAct Agent",
          sub: "Gemini + MemorySaver checkpointer",
          fileRef: "app/agent/graph.py",
          group: "ai",
        },
        {
          id: "tools",
          label: "ToolNode Router",
          sub: "retrieve · web_search · clarify",
          fileRef: "app/agent/tools/",
          group: "api",
        },
      ],
      edges: [
        {
          from: "gradio",
          to: "pipeline",
          label: "ingest_papers(topic)",
          fileRef: "app/ingestion/pipeline.py",
        },
        {
          from: "pipeline",
          to: "chroma",
          label: "text-embedding-004 upsert",
          fileRef: "app/ingestion/indexer.py",
        },
        {
          from: "gradio",
          to: "langgraph",
          label: "stream_agent(query, collection)",
          fileRef: "app/agent/graph.py",
        },
        {
          from: "langgraph",
          to: "tools",
          label: "conditional edge (should_continue)",
          fileRef: "app/agent/graph.py",
        },
        {
          from: "tools",
          to: "chroma",
          label: "retrieve(collection_name)",
          fileRef: "app/agent/tools/retrieve.py",
        },
      ],
    },
    fallbackLanguage: "Python",
    accentHue: 195,
  },
  {
    slug: "healthlens",
    title: "HealthLens",
    subtitle: "Chest X-Ray Disease Detection Web App (Deep Learning)",
    pitch:
      "FastAPI + PyTorch chest X-ray classifier for COVID-19 and pneumonia with Captum Occlusion saliency maps and a React frontend.",
    description:
      "A full-stack medical imaging web application combining a React + Vite + Tailwind CSS frontend (with Firebase authentication) and a FastAPI backend that runs a PyTorch classifier (`model.pth`) on uploaded chest X-rays to detect COVID-19 and pneumonia, paired with Captum's Occlusion algorithm to render post-hoc saliency heatmaps.",
    categories: ["Machine Learning", "Full-stack", "Backend"],
    repo: "https://github.com/Mahoragaa/HealthLens",
    media: [],
    overview:
      "HealthLens pairs real-time chest X-ray classification with visual explainability. Users sign in on the React frontend (`Frontend/src/Components/`) and upload a chest radiograph (`Diagnose.jsx`); the FastAPI server (`Backend/app.py`) normalizes the 224×224 tensor (`Backend/utils.py`), computes softmax class probabilities across `COVID` and `PNEUMONIA`, and on request runs Captum `Occlusion` (`Backend/exp.py`) with a 3×30×30 sliding window to overlay a jet-colormap severity map showing which lung regions drove the prediction.",
    problem:
      "Black-box deep learning predictions on medical radiographs give clinicians a class label and confidence score without showing which anatomical regions influenced the model's decision.",
    solution:
      "Served a PyTorch CNN classifier through FastAPI (`/upload/` and `/explanation/` endpoints in `Backend/app.py`) and integrated Captum's `Occlusion` attribution (`Backend/exp.py`) to compute sliding-window sensitivity maps normalized to `[0, 1]` and rendered side-by-side with the original X-ray.",
    features: [
      "FastAPI inference endpoint (`POST /upload/` in `Backend/app.py` + `Backend/utils.py`) performing 224×224 ImageNet-normalized tensor preprocessing and softmax classification (`COVID` vs. `PNEUMONIA`).",
      "Post-hoc explainability endpoint (`POST /explanation/` in `Backend/app.py` + `Backend/exp.py`) using Captum's `Occlusion` algorithm (`sliding_window_shapes=(3, 30, 30)`, `strides=(3, 5, 5)`) to generate side-by-side X-ray and severity heatmaps.",
      "React + Vite + Tailwind CSS frontend (`Frontend/src/Components/Diagnose.jsx`) with drag-and-drop image upload, live preview, class/confidence readout, and severity map toggle.",
      "Firebase authentication setup (`Frontend/src/Components/Config.jsx`, `Signin.jsx`) and interactive diagnostic assistant component (`chatMessage.jsx`).",
    ],
    stack: [
      "Python",
      "PyTorch",
      "Captum",
      "FastAPI",
      "React",
      "Tailwind CSS",
      "Firebase",
      "JavaScript",
    ],
    role: "Developer & Core Team Contributor (Team Project — built the PyTorch ResNet-18 inference pipeline, Captum Occlusion explainability integration, and React + Firebase diagnostic workflow).",
    challenges: [
      {
        title: "Sliding-window occlusion attribution on 224×224 radiographs",
        body: "In `Backend/exp.py`, `Occlusion(model).attribute` perturbations are run with `sliding_window_shapes=(3, 30, 30)` and `strides=(3, 5, 5)`, collapsed across color channels via `torch.sum(attributions.abs(), dim=1, keepdim=True)`, and min-max normalized to `[0, 1]` before compositing a `jet` heatmap (`alpha=0.5`) over the grayscale radiograph.",
        fileRef: "Backend/exp.py",
      },
      {
        title: "Decoupling fast inference from heavier saliency generation",
        body: "`Backend/app.py` splits inference (`POST /upload/`) from explainability (`POST /explanation/`) so the user receives the predicted class and softmax confidence immediately, and only computes the Captum occlusion map when toggling 'Show Severity' in `Diagnose.jsx`.",
        fileRef: "Backend/app.py · Frontend/src/Components/Diagnose.jsx",
      },
    ],
    architecture: {
      pendingReview: false,
      sourceNote:
        "Derived from `Frontend/src/Components/Diagnose.jsx`, `Backend/app.py`, `Backend/utils.py`, and `Backend/exp.py`.",
      nodes: [
        {
          id: "react-ui",
          label: "React + Tailwind SPA",
          sub: "Diagnose.jsx · Firebase Auth",
          fileRef: "Frontend/src/Components/Diagnose.jsx",
          group: "client",
        },
        {
          id: "fastapi",
          label: "FastAPI Server",
          sub: "POST /upload/ · POST /explanation/",
          fileRef: "Backend/app.py",
          group: "api",
        },
        {
          id: "pytorch",
          label: "PyTorch Classifier",
          sub: "224×224 normalize → Softmax",
          fileRef: "Backend/utils.py (model.pth)",
          group: "ai",
        },
        {
          id: "captum",
          label: "Captum Occlusion",
          sub: "3×30×30 window · Jet saliency map",
          fileRef: "Backend/exp.py",
          group: "compute",
        },
      ],
      edges: [
        {
          from: "react-ui",
          to: "fastapi",
          label: "FormData (X-ray image)",
          fileRef: "Frontend/src/Components/Diagnose.jsx",
        },
        {
          from: "fastapi",
          to: "pytorch",
          label: "utils.predict(image)",
          fileRef: "Backend/app.py → Backend/utils.py",
        },
        {
          from: "fastapi",
          to: "captum",
          label: "exp.explanation(stored_image)",
          fileRef: "Backend/app.py → Backend/exp.py",
        },
      ],
    },
    fallbackLanguage: "Python",
    accentHue: 35,
  },
];

/* ----------------------------------------------------------------------------
 * Experience (verbatim from resume)
 * --------------------------------------------------------------------------*/

export const roles: Role[] = [
  {
    id: "infosys-se",
    title: "System Engineer",
    company: "Infosys",
    period: "05/2026 – Present",
    start: "2026-05",
    context: "L3 Engineering · Pfizer Pharmacovigilance & Safety-Data Project",
    highlightStat: {
      value: "87.5%",
      label: "query execution time reduction (2h → 15m) on production PL/SQL",
    },
    bullets: [
      "Developed and optimized multiple PL/SQL clean-up and performance-tuning scripts for production databases, for example one that cut query execution time from 2 hours to 15 minutes (an 87.5% reduction), significantly improving the performance of routine database operations.",
      "Diagnosed and fixed production defects and resolved technical tickets as part of the L3 engineering team on a Pfizer pharmacovigilance and safety-data project, managed through ServiceNow.",
      "Maintained and administered Oracle Argus databases, running refresh operations with APC, database and UI verification and documentation across pre- and post-refresh cycles, plus LDAP and non-LDAP access provisioning and ESDM and web-server refreshes.",
      "Gained early exposure to AI-driven automation tooling for regulatory data workflows before moving into core database and infrastructure engineering.",
      "Earned the Oracle Argus certification supporting enterprise pharmacovigilance and safety-data systems work.",
    ],
    tech: ["PL/SQL", "Oracle SQL", "Oracle Argus", "ServiceNow", "Unix"],
  },
  {
    id: "infosys-trainee",
    title: "System Engineer Trainee",
    company: "Infosys",
    period: "11/2025 – 04/2026",
    start: "2025-11",
    end: "2026-04",
    context: "Enterprise Database, Java & Oracle EBS R12 Procure-to-Pay Capstone",
    highlightStat: {
      value: "15%",
      label: "query efficiency gain across 3 Agile sprint cycles",
    },
    bullets: [
      "Completed foundation training in Java, OOP and Data Structures & Algorithms, solving 50+ algorithmic problems with a focus on time and space complexity.",
      "Worked with HSQLDB and Oracle SQL across 3 Agile sprint cycles, applying SDLC practices and improving query execution efficiency by 15%.",
      "Built an Oracle EBS R12 Procure-to-Pay capstone: designed the data model with 3-way matching (purchase order, receipt, invoice), wrote PL/SQL procedures, triggers and collections to validate and load staging data into base tables, and automated the load with registered concurrent programs.",
    ],
    tech: [
      "Java",
      "PL/SQL",
      "Oracle SQL",
      "HSQLDB",
      "Oracle E-Business Suite R12",
      "ERP",
      "Data Structures & Algorithms",
      "Agile/SDLC",
    ],
  },
  {
    id: "netsmartz",
    title: "Python Project Developer",
    company: "NetSmartz",
    period: "06/2023 – 08/2023",
    start: "2023-06",
    end: "2023-08",
    context: "Backend REST APIs & Data Processing",
    highlightStat: {
      value: "20% / 30%",
      label: "lower API data transfer latency / faster dataset formatting (10,000+ records)",
    },
    bullets: [
      "Developed backend and data-manipulation skills in Python and SQL by delivering 3 real-world projects.",
      "Built and optimized 4 RESTful APIs for data retrieval between Python applications and SQL databases, reducing data transfer latency by about 20%.",
      "Used NumPy and Pandas to process datasets of 10,000+ records, cutting manual data formatting time by 30%.",
    ],
    tech: ["Python", "SQL", "REST APIs", "NumPy", "Pandas"],
  },
  {
    id: "apssdc",
    title: "Internship Trainee",
    company: "APSSDC",
    period: "06/2023 – 08/2023",
    start: "2023-06",
    end: "2023-08",
    context: "Healthcare Machine Learning · Brain Stroke Prediction",
    highlightStat: {
      value: "85%",
      label: "stroke prediction accuracy across 5,000+ patient records (+12% via feature selection)",
    },
    bullets: [
      "Engineered a predictive model for brain stroke detection in Python, applying data analytics and machine learning across 5,000+ patient records to identify key risk factors.",
      "Used Pandas, NumPy and Scikit-learn for analysis and model building, achieving 85% accuracy to support healthcare decision-making.",
      "Applied data preprocessing and feature selection across 15+ medical variables, improving the model’s evaluation metrics by 12%.",
    ],
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Machine Learning"],
  },
];

/* ----------------------------------------------------------------------------
 * Skills & Verified Evidence Mapping
 * Rule: Every skill on the resume is listed. Links to projects/roles are ONLY
 * added where the repo source code or resume explicitly proves usage.
 * --------------------------------------------------------------------------*/

export const skillCategories: { id: SkillCategory | "all"; label: string; count?: number }[] = [
  { id: "all", label: "All Skills" },
  { id: "languages", label: "Languages" },
  { id: "ai", label: "AI, ML & Gen AI" },
  { id: "backend", label: "Backend & Web" },
  { id: "cloud", label: "Cloud & Tools" },
  { id: "data", label: "Databases & Enterprise" },
  { id: "concepts", label: "Concepts" },
];

export const skills: Skill[] = [
  // ── Languages ─────────────────────────────────────────────────────────────
  {
    id: "python",
    name: "Python",
    category: "languages",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Python 3.12 AWS Lambda handler, provider classes, validator, and 30 pytest tests.",
        citation: "lambda/lambda_function.py · template.yaml",
        source: "both",
      },
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "LangGraph ReAct agent, arXiv PDF ingestion pipeline, ChromaDB indexer, and Gradio UI.",
        citation: "app/agent/graph.py · app/ingestion/pipeline.py",
        source: "both",
      },
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "FastAPI inference server, PyTorch model prediction, and Captum Occlusion heatmap script.",
        citation: "Backend/app.py · Backend/utils.py · Backend/exp.py",
        source: "both",
      },
      {
        kind: "role",
        id: "netsmartz",
        label: "Python Project Developer · NetSmartz",
        note: "Delivered 3 Python/SQL projects and 4 RESTful APIs (20% lower latency).",
        citation: "Resume · Working Experience (NetSmartz)",
        source: "resume",
      },
      {
        kind: "role",
        id: "apssdc",
        label: "Internship Trainee · APSSDC",
        note: "Built a brain stroke predictive model in Python across 5,000+ patient records.",
        citation: "Resume · Working Experience (APSSDC)",
        source: "resume",
      },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "languages",
    evidence: [
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "~9,000 lines of strict TypeScript across Gmail sync, LLM classification, and resume diff studio.",
        citation: "src/app/api/sync/route.ts · src/lib/ai-resume.ts",
        source: "both",
      },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Browser SPA frontend (CodeMirror 5 + Chart.js) and supported target language in validator/prompts.",
        citation: "frontend/index.html · lambda/validator.py",
        source: "both",
      },
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "React `.jsx` frontend components (`Diagnose.jsx`, `chatMessage.jsx`, `Navbar2.jsx`).",
        citation: "Frontend/src/Components/Diagnose.jsx",
        source: "code",
      },
    ],
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    evidence: [
      {
        kind: "role",
        id: "infosys-trainee",
        label: "System Engineer Trainee · Infosys",
        note: "Completed foundation training in Java, OOP, and DSA, solving 50+ algorithmic problems.",
        citation: "Resume · Working Experience (Infosys Trainee)",
        source: "resume",
      },
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Supported target analysis language with Java-specific refactoring prompts.",
        citation: "lambda/validator.py · lambda/prompt_builder.py",
        source: "both",
      },
    ],
  },
  {
    id: "pl-sql",
    name: "PL/SQL",
    category: "languages",
    evidence: [
      {
        kind: "role",
        id: "infosys-se",
        label: "System Engineer · Infosys",
        note: "Developed and tuned production PL/SQL scripts on a Pfizer project, cutting a 2h query to 15m (−87.5%).",
        citation: "Resume · Working Experience (Infosys SE)",
        source: "resume",
      },
      {
        kind: "role",
        id: "infosys-trainee",
        label: "System Engineer Trainee · Infosys",
        note: "Wrote PL/SQL procedures, triggers, and collections for the Oracle EBS R12 Procure-to-Pay capstone.",
        citation: "Resume · Working Experience (Infosys Trainee)",
        source: "resume",
      },
    ],
  },
  {
    id: "sql",
    name: "SQL",
    category: "languages",
    evidence: [
      {
        kind: "role",
        id: "infosys-se",
        label: "System Engineer · Infosys",
        note: "Production database query optimization and verification on Oracle Argus databases.",
        citation: "Resume · Working Experience (Infosys SE)",
        source: "resume",
      },
      {
        kind: "role",
        id: "infosys-trainee",
        label: "System Engineer Trainee · Infosys",
        note: "Worked with HSQLDB and Oracle SQL across 3 Agile sprints, improving query efficiency by 15%.",
        citation: "Resume · Working Experience (Infosys Trainee)",
        source: "resume",
      },
      {
        kind: "role",
        id: "netsmartz",
        label: "Python Project Developer · NetSmartz",
        note: "Built 4 RESTful APIs retrieving data between Python apps and SQL databases.",
        citation: "Resume · Working Experience (NetSmartz)",
        source: "resume",
      },
    ],
  },
  {
    id: "c-cpp",
    name: "C/C++",
    category: "languages",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "C++ (`cpp`) supported in request validator and language-aware LLM prompt builder.",
        citation: "lambda/validator.py · lambda/prompt_builder.py",
        source: "both",
      },
    ],
  },

  // ── AI, ML & Gen AI ───────────────────────────────────────────────────────
  {
    id: "generative-ai",
    name: "Generative AI",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Serverless Generative AI service generating Big-O explanations and refactored code.",
        citation: "lambda/lambda_function.py",
        source: "both",
      },
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "LLM-powered email classification and resume bullet rewriting across 3 alignment modes.",
        citation: "src/lib/ai-classifier.ts · src/lib/ai-resume.ts",
        source: "both",
      },
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "Generative AI research assistant synthesizing cited answers from arXiv papers.",
        citation: "app/agent/graph.py",
        source: "both",
      },
    ],
  },
  {
    id: "llms",
    name: "LLMs",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Pluggable provider layer targeting Llama 3.3 70B (Groq), Gemini, and GPT-4o Mini.",
        citation: "lambda/providers/",
        source: "both",
      },
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Structured JSON output from GPT-4o Mini and Gemini 2.5 Flash with confidence gating.",
        citation: "src/lib/ai-classifier.ts",
        source: "both",
      },
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "Tool-bound Gemini model reasoning over retrieved paper chunks.",
        citation: "app/agent/graph.py",
        source: "both",
      },
    ],
  },
  {
    id: "agentic-ai",
    name: "Agentic AI",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "ReAct agent loop with conditional tool routing (`retrieve`, `web_search`, `clarify`) and a 10-iteration cap.",
        citation: "app/agent/graph.py",
        source: "both",
      },
    ],
  },
  {
    id: "rag",
    name: "RAG",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "End-to-end arXiv PDF ingestion, Markdown chunking, vector embedding, and cited retrieval.",
        citation: "app/ingestion/pipeline.py · app/agent/tools/retrieve.py",
        source: "both",
      },
    ],
  },
  {
    id: "langgraph",
    name: "LangGraph",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "`StateGraph(AgentState)` with `ToolNode`, conditional edges, `MemorySaver` checkpointer, and `astream_events`.",
        citation: "app/agent/graph.py · app/agent/state.py",
        source: "both",
      },
    ],
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "`ChatGoogleGenerativeAI`, `GoogleGenerativeAIEmbeddings`, and `RecursiveCharacterTextSplitter`.",
        citation: "app/agent/graph.py · app/ingestion/chunker.py · app/ingestion/indexer.py",
        source: "both",
      },
    ],
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Language-aware prompt builder (`lambda/prompt_builder.py`) enforcing a 7-key JSON response schema.",
        citation: "lambda/prompt_builder.py",
        source: "both",
      },
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Strict email classifier prompt with explicit ATS/platform rules and negative exclusions.",
        citation: "src/lib/ai-classifier.ts",
        source: "both",
      },
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "Tool-selection system prompt enforcing arXiv citations and <0.3 similarity uncertainty flags.",
        citation: "app/agent/graph.py",
        source: "both",
      },
    ],
  },
  {
    id: "chromadb",
    name: "ChromaDB",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "`chromadb.PersistentClient` with cosine-space topic collections and deterministic ID deduplication.",
        citation: "app/ingestion/indexer.py",
        source: "both",
      },
    ],
  },
  {
    id: "gemini-api",
    name: "Gemini API",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "`GeminiProvider` implementation in `lambda/providers/gemini_provider.py`.",
        citation: "lambda/providers/gemini_provider.py",
        source: "both",
      },
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "`@google/generative-ai` (`gemini-2.5-flash`) with strict `ResponseSchema` for classification and resume tailoring.",
        citation: "src/lib/ai-classifier.ts · src/lib/ai-resume.ts",
        source: "both",
      },
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "Primary reasoning LLM and `text-embedding-004` embedding model.",
        citation: "app/config.py · app/agent/graph.py",
        source: "both",
      },
    ],
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "`OpenAIProvider` implementation in `lambda/providers/openai_provider.py`.",
        citation: "lambda/providers/openai_provider.py",
        source: "both",
      },
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "`gpt-4o-mini` with `json_schema` strict structured outputs in `src/lib/ai-classifier.ts`.",
        citation: "src/lib/ai-classifier.ts",
        source: "both",
      },
    ],
  },
  {
    id: "groq-api",
    name: "Groq API",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Default free LLM backend (`GroqProvider` running Llama 3.3 70B).",
        citation: "lambda/providers/groq_provider.py · template.yaml",
        source: "both",
      },
    ],
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    category: "ai",
    evidence: [
      {
        kind: "role",
        id: "apssdc",
        label: "Internship Trainee · APSSDC",
        note: "Engineered a brain stroke predictive model across 5,000+ patient records achieving 85% accuracy.",
        citation: "Resume · Working Experience (APSSDC)",
        source: "resume",
      },
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "Supervised chest X-ray disease classification web application.",
        citation: "Backend/utils.py",
        source: "both",
      },
    ],
  },
  {
    id: "deep-learning",
    name: "Deep Learning",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "Convolutional neural network inference and occlusion sensitivity attribution on chest radiographs.",
        citation: "Backend/utils.py · Backend/exp.py",
        source: "both",
      },
    ],
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "`torch` & `torchvision.transforms` 224×224 preprocessing and `F.softmax` inference on `model.pth`.",
        citation: "Backend/utils.py · Backend/exp.py",
        source: "both",
      },
    ],
  },
  {
    id: "captum",
    name: "Captum",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "Captum `Occlusion` (`sliding_window_shapes=(3,30,30)`) generating clinical saliency heatmaps.",
        citation: "Backend/exp.py",
        source: "both",
      },
    ],
  },
  {
    id: "scikit-learn",
    name: "Scikit-learn",
    category: "ai",
    evidence: [
      {
        kind: "role",
        id: "apssdc",
        label: "Internship Trainee · APSSDC",
        note: "Feature selection across 15+ medical variables (+12% metric gain) and stroke classification (85% accuracy).",
        citation: "Resume · Working Experience (APSSDC)",
        source: "resume",
      },
    ],
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "ai",
    evidence: [
      {
        kind: "role",
        id: "netsmartz",
        label: "Python Project Developer · NetSmartz",
        note: "Processed datasets of 10,000+ records, cutting manual formatting time by 30%.",
        citation: "Resume · Working Experience (NetSmartz)",
        source: "resume",
      },
      {
        kind: "role",
        id: "apssdc",
        label: "Internship Trainee · APSSDC",
        note: "Data preprocessing and exploratory analysis across 5,000+ patient records.",
        citation: "Resume · Working Experience (APSSDC)",
        source: "resume",
      },
    ],
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "ai",
    evidence: [
      {
        kind: "role",
        id: "netsmartz",
        label: "Python Project Developer · NetSmartz",
        note: "Numerical dataset processing across 10,000+ records.",
        citation: "Resume · Working Experience (NetSmartz)",
        source: "resume",
      },
      {
        kind: "role",
        id: "apssdc",
        label: "Internship Trainee · APSSDC",
        note: "Feature array manipulation for the brain stroke prediction pipeline.",
        citation: "Resume · Working Experience (APSSDC)",
        source: "resume",
      },
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "Min-max normalization of detached Captum attribution tensors (`importance_np`).",
        citation: "Backend/exp.py",
        source: "code",
      },
    ],
  },
  {
    id: "cnns",
    name: "CNNs",
    category: "ai",
    evidence: [
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "ResNet-18 convolutional classifier for chest X-ray COVID-19 and pneumonia detection.",
        citation: "Resume · Projects (HealthLens) & Backend/utils.py",
        source: "both",
      },
    ],
  },

  // ── Backend & Web ─────────────────────────────────────────────────────────
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "`POST /upload/` and `POST /explanation/` endpoints with CORS middleware serving PyTorch + Captum.",
        citation: "Backend/app.py",
        source: "both",
      },
    ],
  },
  {
    id: "flask",
    name: "Flask",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Local development server (`server.py`) proxying HTTP requests to `lambda_handler`.",
        citation: "server.py",
        source: "code",
      },
    ],
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "backend",
    evidence: [
      {
        kind: "role",
        id: "netsmartz",
        label: "Python Project Developer · NetSmartz",
        note: "Built and optimized 4 RESTful APIs between Python apps and SQL databases (−20% transfer latency).",
        citation: "Resume · Working Experience (NetSmartz)",
        source: "resume",
      },
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "REST endpoints (`POST /analyze`, `GET /history`, `GET /history/{id}`) on AWS HTTP API Gateway.",
        citation: "template.yaml · lambda/lambda_function.py",
        source: "both",
      },
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Next.js Route Handlers (`/api/sync`, `/api/applications`, `/api/resume/tailor`, `/api/resume/scrape-jd`).",
        citation: "src/app/api/",
        source: "code",
      },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Next.js 14 App Router full-stack app with Route Handlers, Server Sessions, and interactive studio pages.",
        citation: "package.json · src/app/",
        source: "both",
      },
    ],
  },
  {
    id: "react",
    name: "React",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Interactive dashboard table, date-range picker, Recharts analytics, and word-level diff toggle UI.",
        citation: "src/components/dashboard/ · src/app/resume/preview/[id]/page.tsx",
        source: "both",
      },
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "Vite + React SPA with X-ray uploader, prediction readout, and severity toggle.",
        citation: "Frontend/src/Components/Diagnose.jsx",
        source: "both",
      },
    ],
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Styled dashboard, badges, tables, and resume diff studio using Tailwind CSS.",
        citation: "tailwind.config.ts · src/app/globals.css",
        source: "both",
      },
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "Tailwind utility styling across the React frontend.",
        citation: "Frontend/tailwind.config.js",
        source: "both",
      },
    ],
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Schema & client for `User`, `Application`, `ProcessedEmail`, `Resume`, and `TailoredResume` with `$transaction`.",
        citation: "prisma/schema.prisma · src/app/api/sync/route.ts",
        source: "both",
      },
    ],
  },
  {
    id: "nextauth",
    name: "NextAuth",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Google OAuth 2.0 authentication with `gmail.modify` scope and token refresh handling.",
        citation: "src/lib/auth.ts · src/app/api/auth/[...nextauth]/route.ts",
        source: "both",
      },
    ],
  },
  {
    id: "gmail-api",
    name: "Gmail API",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Search query builder, parallel `messages.get` metadata fetching, and bulk label application.",
        citation: "src/lib/gmail.ts",
        source: "both",
      },
    ],
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "healthlens",
        label: "HealthLens",
        note: "Firebase Google authentication config (`Frontend/src/Components/Config.jsx`).",
        citation: "Frontend/src/Components/Config.jsx",
        source: "both",
      },
    ],
  },
  {
    id: "html",
    name: "HTML",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Single-page browser UI (`frontend/index.html`) hosted on Amazon S3.",
        citation: "frontend/index.html",
        source: "code",
      },
    ],
  },
  {
    id: "css",
    name: "CSS",
    category: "backend",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Custom dark-mode layout and editor styling in `frontend/index.html`.",
        citation: "frontend/index.html",
        source: "code",
      },
    ],
  },

  // ── Cloud & Tools ─────────────────────────────────────────────────────────
  {
    id: "aws",
    name: "AWS (Lambda, API Gateway, DynamoDB, S3, SAM)",
    category: "cloud",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Full serverless stack defined in `template.yaml` (`AWS::Serverless::Function`, `HttpApi`, `DynamoDB::Table`, `S3::Bucket`).",
        citation: "template.yaml · DEPLOY.md",
        source: "both",
      },
    ],
  },
  {
    id: "oci",
    name: "Oracle Cloud Infrastructure (OCI)",
    category: "cloud",
    evidence: [], // Certified (OCI Foundations & OCI AI Foundations); no specific repo/role bullet
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    category: "cloud",
    evidence: [
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Version control plus automated secret-scanning git auto-push script (`scripts/auto-push.ps1`).",
        citation: "scripts/auto-push.ps1",
        source: "code",
      },
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Published open-source MIT repository on GitHub.",
        citation: "README.md",
        source: "code",
      },
    ],
  },
  {
    id: "unix",
    name: "Unix",
    category: "cloud",
    evidence: [
      {
        kind: "role",
        id: "infosys-se",
        label: "System Engineer · Infosys",
        note: "Server and environment administration during production database and web-server refresh cycles.",
        citation: "Resume · Skills & Infosys SE",
        source: "resume",
      },
    ],
  },
  {
    id: "pytest",
    name: "pytest",
    category: "cloud",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "30 unit tests in `lambda/test_handler.py` covering validation, routing, and provider errors.",
        citation: "lambda/test_handler.py",
        source: "both",
      },
      {
        kind: "project",
        id: "agentic-research-assistant",
        label: "Agentic Research Assistant",
        note: "Unit test suites for agent graph, ingestion pipeline, and tools (`tests/`).",
        citation: "tests/test_agent.py · tests/test_ingestion.py · tests/test_tools.py",
        source: "code",
      },
    ],
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    category: "cloud",
    evidence: [
      {
        kind: "role",
        id: "infosys-se",
        label: "System Engineer · Infosys",
        note: "Managed L3 production defect diagnosis and technical ticket resolution on the Pfizer project.",
        citation: "Resume · Working Experience (Infosys SE)",
        source: "resume",
      },
    ],
  },

  // ── Databases & Enterprise ────────────────────────────────────────────────
  {
    id: "oracle-sql",
    name: "Oracle SQL",
    category: "data",
    evidence: [
      {
        kind: "role",
        id: "infosys-se",
        label: "System Engineer · Infosys",
        note: "Production query tuning and database verification on Oracle Argus databases.",
        citation: "Resume · Working Experience (Infosys SE)",
        source: "resume",
      },
      {
        kind: "role",
        id: "infosys-trainee",
        label: "System Engineer Trainee · Infosys",
        note: "Improved query execution efficiency by 15% across 3 Agile sprints.",
        citation: "Resume · Working Experience (Infosys Trainee)",
        source: "resume",
      },
    ],
  },
  {
    id: "sqlite",
    name: "SQLite",
    category: "data",
    evidence: [
      {
        kind: "project",
        id: "applytrail",
        label: "ApplyTrail",
        note: "Local-first SQLite database (`dev.db`) backing Prisma models for applications and tailored resumes.",
        citation: "prisma/schema.prisma",
        source: "both",
      },
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Automatic local storage fallback (`history.db`) in `lambda/history_client.py`.",
        citation: "lambda/history_client.py",
        source: "both",
      },
    ],
  },
  {
    id: "dynamodb",
    name: "DynamoDB",
    category: "data",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "`ComplexityAnalyzerHistory` table with `EntityTypeCreatedAtIndex` GSI for chronological queries.",
        citation: "template.yaml · lambda/history_client.py",
        source: "both",
      },
    ],
  },
  {
    id: "hsqldb",
    name: "HSQLDB",
    category: "data",
    evidence: [
      {
        kind: "role",
        id: "infosys-trainee",
        label: "System Engineer Trainee · Infosys",
        note: "Worked with HSQLDB and Oracle SQL across 3 Agile sprint cycles (+15% query efficiency).",
        citation: "Resume · Working Experience (Infosys Trainee)",
        source: "resume",
      },
    ],
  },
  {
    id: "oracle-ebs-r12",
    name: "Oracle E-Business Suite R12",
    category: "data",
    evidence: [
      {
        kind: "role",
        id: "infosys-trainee",
        label: "System Engineer Trainee · Infosys",
        note: "Built a Procure-to-Pay capstone with 3-way matching (PO, receipt, invoice) and registered concurrent programs.",
        citation: "Resume · Working Experience (Infosys Trainee)",
        source: "resume",
      },
    ],
  },
  {
    id: "oracle-argus",
    name: "Oracle Argus",
    category: "data",
    evidence: [
      {
        kind: "role",
        id: "infosys-se",
        label: "System Engineer · Infosys",
        note: "Administered Oracle Argus pharmacovigilance databases, APC refresh cycles, and LDAP/non-LDAP provisioning.",
        citation: "Resume · Working Experience (Infosys SE)",
        source: "resume",
      },
    ],
  },
  {
    id: "erp",
    name: "ERP",
    category: "data",
    evidence: [
      {
        kind: "role",
        id: "infosys-trainee",
        label: "System Engineer Trainee · Infosys",
        note: "Oracle EBS R12 Procure-to-Pay enterprise data modeling and staging validation.",
        citation: "Resume · Working Experience (Infosys Trainee)",
        source: "resume",
      },
    ],
  },

  // ── Concepts ──────────────────────────────────────────────────────────────
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    category: "concepts",
    evidence: [
      {
        kind: "role",
        id: "infosys-trainee",
        label: "System Engineer Trainee · Infosys",
        note: "Solved 50+ algorithmic problems in Java with a focus on time and space complexity.",
        citation: "Resume · Working Experience (Infosys Trainee)",
        source: "resume",
      },
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Built an automated Big-O time & space complexity analyzer and refactoring tool.",
        citation: "lambda/prompt_builder.py",
        source: "both",
      },
    ],
  },
  {
    id: "agile-sdlc",
    name: "Agile / SDLC",
    category: "concepts",
    evidence: [
      {
        kind: "role",
        id: "infosys-trainee",
        label: "System Engineer Trainee · Infosys",
        note: "Applied SDLC practices across 3 Agile sprint cycles.",
        citation: "Resume · Working Experience (Infosys Trainee)",
        source: "resume",
      },
    ],
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing",
    category: "concepts",
    evidence: [
      {
        kind: "project",
        id: "code-complexity-analyzer",
        label: "Code Complexity Analyzer",
        note: "Serverless architecture on AWS (Lambda, HTTP API Gateway, DynamoDB, S3, SAM).",
        citation: "template.yaml",
        source: "both",
      },
    ],
  },
];

/* ----------------------------------------------------------------------------
 * Education & certifications (verbatim from resume)
 * --------------------------------------------------------------------------*/

export const education: Education[] = [
  {
    degree: "B.Tech, Computer Science Engineering",
    school: "SRM University AP",
    url: "https://srmap.edu.in/",
    period: "2021 – 2025",
    grade: "CGPA: 7.32",
  },
  {
    degree: "Senior Secondary (CBSE)",
    school: "Delhi Public School Indirapuram",
    url: "https://www.dpsindirapuram.com/",
    period: "2020 – 2021",
    grade: "Grade: 90.0%",
  },
];

export const certifications: Certification[] = [
  {
    name: "Infosys Certified Generative AI Professional Foundation",
    issuer: "Infosys",
    date: "09/2026",
  },
  {
    name: "Oracle Cloud Infrastructure Certified Foundations Associate",
    issuer: "Oracle University",
    date: "07/2026",
    credentialId: "330061829OCI26FNDCFA",
  },
  {
    name: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
    issuer: "Oracle University",
    date: "07/2026",
    credentialId: "330061829OCI26AICFA",
  },
  {
    name: "Oracle AI Database Certified Foundations Associate",
    issuer: "Oracle University",
    date: "07/2026",
    credentialId: "330061829OCI26DCFA",
  },
  {
    name: "Oracle E-Business Suite (EBS) R12 Certification",
    issuer: "Infosys",
    date: "04/2026",
  },
  {
    name: "Oracle Argus Certification",
    issuer: "Infosys",
    date: "04/2026",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

