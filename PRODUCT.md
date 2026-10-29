# Product

<!-- impeccable:product-schema 1 -->

## Platform

Chrome Extension (Manifest V3) + Standalone Web Dashboard (React + Vite) + Zero-Backend Static Delivery.

## Users

Software engineers, computer science students, and competitive programmers actively preparing for technical coding interviews who struggle to identify, categorize, and retain algorithmic patterns (e.g. Graph + DP, Monotonic Stack, Interval DP, Bitmask DP, Topological Sort) when facing unfamiliar problems.

## Product Purpose

Asymptote transforms repetitive, unstructured problem grinding into systematic algorithmic pattern mastery. Success means an engineer can examine any problem statement and its constraints, accurately deduce the optimal Big-O target and algorithmic archetype, and solve it through progressive Socratic hints without spoiling the solution code.

## Positioning

A free, 100% serverless, local-first, privacy-respecting alternative to LeetCode Premium ($35/mo) and generic LLM chatbots. Unlike ChatGPT or Leet AI which immediately hallucinate full code solutions and spoil learning retention, Asymptote:
1. Enforces a strict 4-tier Socratic hint ladder (Intuition → Invariant → Skeleton → Implementation).
2. Derives optimal Big-O bounds directly from online judge operational CPU limits (~10⁸ ops/sec).
3. Embeds on-device Gemini Nano AI (`window.ai`) for real-time private conversational tutoring.
4. Requires zero backend servers or databases—running completely client-side in the browser.

## Operating Context

- **Workflow:** Daily LeetCode practice sessions, mock technical interviews, and pre-interview pattern review.
- **Environments:**
  1. **Companion Chrome Extension (Manifest V3):** Injecting directly into `leetcode.com/problems/*` with Shadow DOM style isolation, floating control pill, and slide-out mentor drawer.
  2. **Extension Popup & Full-Page Dashboard:** Accessible directly from browser action toolbar with full navigation (`chrome-extension://.../dashboard/index.html`).
  3. **Standalone Static Web App:** Deployable to any static host (GitHub Pages, Vercel, Netlify) or local dev server.
- **Data Boundary:** 100% local-first storage (`chrome.storage.local` and browser `localStorage`). Zero telemetry, zero external cloud database, zero tracking cookies, zero mandatory user accounts.

## Capabilities and Constraints

- **Capabilities:**
  - **1,600+ Curated Problems & 99 Algorithmic Patterns:** Structured across 5 master tiers (Foundations, Core DSA, Advanced Dynamic Programming, Graph Theory, and Specialized Topics).
  - **Multi-Language Blueprints:** Python, C++, Java, JavaScript, Go, and Rust support across blueprints and implementation hints.
  - **Constraint-Derived Target Big-O Analyzer:** Automatic deduction of time/space complexity budgets derived from constraints against the 10⁸ ops/sec CPU threshold.
  - **4-Tier Socratic Progressive Hint Ladder:** Spoilers unlocked sequentially with clear warnings.
  - **On-Device Gemini Nano AI:** Optional local Socratic chat powered by Chrome's native `window.ai` Prompt API—private, instant, and offline-capable.
  - **Diagnostic Inference Wizard:** 4-question interactive deduction tool to identify matching patterns from problem characteristics.
  - **Silent Over-The-Air (OTA) Dataset Updates:** Chrome background alarm checks GitHub Raw repository shards every 6 hours for catalog updates, caching datasets with zero user intervention.
  - **Comprehensive Solved Tracker & Review Queue:** Spaced repetition tracking, difficulty breakdowns, and 1-click sync directly from LeetCode public submissions.
- **Constraints:**
  - **Strict Privacy:** Zero remote telemetry, zero analytics tracking, zero third-party cloud dependencies for core functionality.
  - **Coder-First Learning:** Solution code is strictly the final tier of progressive disclosure, never the entry point.
  - **Zero Server Overhead:** Zero persistent Node.js/Python server required. 100% client-side serverless engine.

## Brand Commitments

- **Name:** Asymptote
- **Tone & Aesthetic:** Minimalist, engineering-focused, and distraction-free (clean geometric typography, subtle 3D tactile elevation, drafting grid motif, generous whitespace).
- **Anti-patterns to Avoid:** No generic rainbow "AI" gradients, no cartoon mascots, no cognitive clutter.

## Product Principles

1. **Intuition Before Implementation:** Never give away code when an algorithmic invariant or state definition can teach the underlying mental model.
2. **Constraint-Led Engineering:** Complexity isn't an afterthought; problem bounds determine the algorithm before writing a single line.
3. **Local Ownership & Absolute Privacy:** User notes, solved history, and mastery metrics belong solely to the user on their local machine.
4. **Distilled Clarity:** Airy, uncluttered interfaces with high information signal over dense walls of text.
