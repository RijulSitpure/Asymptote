# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Software engineers, computer science students, and competitive programmers actively preparing for technical coding interviews who struggle to identify and map algorithmic patterns (e.g. Graph + DP, Bitmask BFS, Monotonic Stack, Interval DP) when facing unfamiliar problems.

## Product Purpose

OpenLeet exists to transform repetitive, unstructured problem grinding into systematic algorithmic pattern mastery. Success means a coder can look at any problem statement and its constraints, accurately deduce the optimal Big-O target and algorithmic archetype, and solve it through progressive Socratic clues without spoiling the solution code.

## Positioning

A free, 100% local-first, privacy-respecting alternative to LeetCode Premium ($35/mo) and generic LLM chatbots. Unlike ChatGPT or Leet AI which immediately hallucinate full code solutions and spoil learning retention, OpenLeet enforces a strict Socratic hint ladder (Intuition → State → Invariant → Skeleton) and derives optimal Big-O bounds directly from online judge operational CPU limits (~10⁸ ops/sec).

## Operating Context

- **Workflow:** Daily LeetCode practice sessions, mock technical interviews, and pre-interview pattern review.
- **Environments:** 
  1. Standalone web dashboard running locally at `http://localhost:3001` (React + Tailwind + Vite).
  2. Companion Chrome Extension (Manifest V3) running on `leetcode.com/problems/*` with Shadow DOM style isolation.
- **Data Boundary:** 100% local SQLite database (`server/data/tracker.db`), zero external cloud database, zero telemetry, zero mandatory user accounts.

## Capabilities and Constraints

- **Capabilities:**
  - 37+ Curated Algorithmic Pattern Archetypes with Python and C++ blueprints.
  - Constraint-derived Target Big-O Complexity analyzer with online judge CPU operations budget explanation.
  - 4-Tier Socratic Progressive Hint Ladder (spoilers unlocked sequentially).
  - Diagnostic Inference Wizard (4-question deduction of matching patterns from problem constraints).
  - Dynamic on-the-fly ingestion for any LeetCode problem by number or slug.
  - In-page Chrome Extension drawer with `[ Ask AI ] | [ Solution ] | [ Complexity ]` tabs and 1-click solved history sync.
- **Constraints:**
  - Strict privacy: No remote telemetry or cloud dependency for core functionality.
  - Coder-first: Code solutions must remain the final tier of progressive hints, never the first.
  - Lightweight and fast: Minimal dependencies, fast local launch.

## Brand Commitments

- **Name:** OpenLeet
- **Tone & Aesthetic:** Minimalist, mature, and engineering-focused (inspired by Sarvam AI's light aesthetic, clean geometric typography, subtle 3D tactile elevation, and generous whitespace).
- **Anti-patterns to avoid:** No generic glowing "AI" cliches, rainbow gradients, or cartoonish chatbot mascots.

## Evidence on Hand

- 191 solved problems synced from active user (`Rijul-Sitpure`) stored in local SQLite database (`server/data/tracker.db`).
- 37 curated pattern blueprints with complexity targets, recognition triggers, and interview mutation twists (`server/src/db/patternsSeed.js`).
- Working native Node.js HTTP API server on port 3001 (`server/src/index.js`).
- Working Manifest V3 Chrome Extension with Shadow DOM integration (`extension/content.js`).

## Product Principles

1. **Intuition Before Implementation:** Never give away code when an algorithmic invariant or state definition can teach the mental model.
2. **Constraint-Led Engineering:** Complexity isn't an afterthought; problem bounds determine the algorithm before writing a single line.
3. **Local Ownership & Frictionless Privacy:** User notes, solved history, and ratings belong solely to the user on their local machine.
4. **Distilled Clarity:** Prefer airy, uncluttered interfaces with high information signal over dense walls of text.
