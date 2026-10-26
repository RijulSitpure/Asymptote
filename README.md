# ⚡ Asymptote

> **Algorithmic Pattern Intelligence & In-Page Socratic Mentor for LeetCode**  
> *The Free, 100% Serverless & Local-First Alternative to LeetCode Premium's Paywalled ($35/mo) "Leet AI"*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-brightgreen.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Serverless](https://img.shields.io/badge/Architecture-100%25_Serverless-purple.svg)](#-serverless--local-first-architecture)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Local_Storage-indigo.svg)](#-privacy--local-first-guarantee)
[![Curated Problems](https://img.shields.io/badge/Curated_Problems-1%2C570%2B-orange.svg)](#-curated-pattern-atlas)
[![Algorithmic Patterns](https://img.shields.io/badge/Patterns-99_Archetypes-emerald.svg)](#-curated-pattern-atlas)
[![AI Engine](https://img.shields.io/badge/On--Device_AI-Gemini_Nano-red.svg)](#-on-device-gemini-nano-ai)

---

## 🥊 Asymptote vs. LeetCode Premium "Leet AI" vs. Generic LLMs

| Feature | ⚡ **Asymptote** | 💸 **LeetCode Premium Leet AI** | 🤖 **ChatGPT / Claude** |
| :--- | :--- | :--- | :--- |
| **Pricing** | **100% Free & Open-Source (MIT)** | **$35 / month** ($299 / year) | $20 / month subscription |
| **Pedagogical Philosophy** | **Strict 4-Tier Socratic Ladder** (Intuition $\to$ Invariant $\to$ Skeleton $\to$ Code) | Hallucinates full solutions easily | Immediately dumps working code, ruining learning retention |
| **Complexity Budgeting** | **Constraint-Derived Big-O Target** + concrete online judge ops/sec calculation ($N=10^5 \implies 10^{10} \gg 10^8$ ops $\implies$ TLE) | Vague high-level suggestions | Superficial Big-O remarks without constraint budget analysis |
| **In-Page Experience** | **Shadow DOM drawer & floating overlay inside `leetcode.com`** with zero layout shift | Paywalled integrated sidebar | Separate browser tab, manual copy-pasting |
| **Pattern Taxonomy** | **99 Fine-Grained Archetypes** (Monotonic Stack, Layered Graph DP, Interval DP, Bitmask BFS, Digit DP, etc.) | Broad standard tags (e.g. just "Dynamic Programming") | Ad-hoc unstandardized explanations |
| **Multi-Language Support** | **Python, C++, Java, JavaScript, Go, Rust** across blueprints and hints | Limited to standard solution languages | Generates arbitrary code syntax |
| **AI Privacy & Offline** | **100% On-Device Gemini Nano AI** (`window.ai`), zero telemetry, works offline | Stored on remote corporate servers | Cloud-hosted; queries logged for model training |
| **Backend Requirement** | **Zero Servers Needed** (100% Serverless, runs directly in browser) | Cloud-dependent proprietary infrastructure | Remote API servers |
| **Automatic Dataset Updates** | **Silent Over-The-Air (OTA) Updates** via GitHub Raw shards with SHA-256 checks | Closed proprietary releases | Static training cutoffs |

---

## 💡 Why Asymptote?

1. **Broad Tags Do Not Teach Problem Solving**: Knowing a problem is tagged *"Dynamic Programming"* or *"Graph"* tells you almost nothing. Dynamic Programming alone spans 12+ distinct archetypes (1D sequence, 0/1 knapsack, unbounded knapsack, interval DP, bitmask DP, digit DP, tree rerooting, layered graph DP).
2. **The "Interview Mutation Twist"**: Technical interviews rarely test pure textbook algorithms. They test **Core Archetype + Mutation Twist** (e.g., Shortest Path on a Graph, but edge count is bounded by $K \to$ Bellman-Ford or DP state expansion `dp[u][k]`).
3. **The Solution Spoiler Trap**: Jumping straight to LeetCode editorials or asking an LLM for code permanently damages retention and live problem-solving capability. Asymptote delivers progressively revealed hints that train your intuition without giving away the answer.

---

## 🚀 Key Capabilities

### 1. 🪜 4-Tier Socratic Hint Ladder
Unlock progressive clues sequentially with explicit spoiler warnings:
* **Tier 1 — Recognition Signal**: The crucial constraint or structural property that hints at this archetype *(never gives away algorithm names)*.
* **Tier 2 — State & Subproblem Formulation**: The mathematical parameters that uniquely define the subproblem, window, or state space.
* **Tier 3 — Invariant & Critical Twist**: The transition rule, monotonic invariant, or edge-case mutation required to avoid TLE or WA.
* **Tier 4 — Multi-Language Skeleton & Implementation**: Structural code blueprints available in **Python, C++, Java, JavaScript, Go, and Rust**.

### 2. 🎯 Constraint-to-Complexity Target Engine
Every online judge enforces a strict CPU execution budget of approximately **$\approx 10^8$ operations per second (1.0s time limit)**. Asymptote parses problem constraints and automatically computes:
* **Target Big-O**: Exact asymptotic target Time & Space complexity ($O(N)$, $O(N \log N)$, $O(K \cdot E)$, $O(2^N \cdot N)$, etc.).
* **Brute-Force Mathematical Disqualification**: Exact operations count showing why a naive approach will TLE (e.g., $N=10^5 \implies O(N^2) = 10^{10} \text{ ops} \gg 10^8 \text{ limit} \implies \sim 100\text{ seconds}$).
* **Space-Time Trade-off**: What supplementary data structure (Monotonic Deque, Disjoint Set Union, Trie, Segment Tree) buys down time complexity.
* **Interviewer Expectations**: What algorithmic trade-offs the interviewer expects you to articulate before writing any code.

### 3. 🧠 On-Device Gemini Nano AI
Asymptote integrates Chrome's built-in **Gemini Nano** (`window.ai` Prompt API) for private, zero-latency Socratic conversational tutoring:
* **100% Local & Private**: Prompts and code never leave your browser. Zero telemetry, zero cloud tracking.
* **Zero Latency**: Instant responses without waiting on remote API rate limits.
* **Strict Socratic Guardrails**: Built-in system prompts enforce hint guidance and prevent solution code leakage unless explicitly requested.
* **Deterministic Fallback**: If Gemini Nano is not enabled in your browser, Asymptote seamlessly falls back to its curated 1,570-problem hint database.

### 4. 🧭 Curated Pattern Atlas (99 Archetypes across 6 Domains)
* **Algorithms (50 Patterns, 1,538 Problems)**: Two Pointers, Sliding Window, Monotonic Stack, Interval Scheduling, Topological Sort, Dijkstra, Floyd-Warshall, 0/1 BFS, Tree Rerooting DP, Digit DP, Bitmask DP, Binary Lifting (LCA), and more.
* **Database SQL (19 Patterns, 13 Problems)**: Self-Joins, Window Functions (`DENSE_RANK`, `ROW_NUMBER`), CTEs, Recursive Trees, Conditional Aggregations.
* **Pandas (10 Patterns, 7 Problems)**: Vectorized Filtering, GroupBy-Aggregation Chains, Reshaping & Pivots.
* **JavaScript (8 Patterns, 6 Problems)**: Debounce/Throttle, Memoization, Event Emitter, Promise Pools, Curry Pipelines.
* **Concurrency (7 Patterns, 3 Problems)**: Mutex Locks, Condition Variables, Semaphore Barriers, Read-Write Locks.
* **Shell (5 Patterns, 3 Problems)**: Stream Processing, Awk/Sed Field Extraction, Pipeline Filtering.

### 5. 🔄 Silent Over-The-Air (OTA) Updates
* The companion Chrome extension background service worker checks for dataset updates every 6 hours via GitHub Raw shards.
* Cryptographic **SHA-256 checksum verification** guarantees that only valid, untampered data shards are saved to local Chrome storage.
* Zero manual updates, zero user interruption, zero browser reloads required.

### 6. 📊 Curriculum Roadmap & Spaced Repetition Review
* **118 Milestone Curriculum**: 13 progressive learning stages from Basic Arrays & Two Pointers through Advanced Graphs and DP.
* **Smart Review Queue**: Automatically identifies weak patterns (patterns with 0 solved problems or low confidence ratings) and review-flagged problems.
* **Detailed Solved Log**: Filter and sort solved problems by domain, difficulty, confidence rating, pattern category, or personal notes.
* **1-Click LeetCode Sync**: Automatically imports your public LeetCode submission history without requiring login credentials.

---

## 🛠️ Installation & Setup

### Option 1: Chrome Extension (Recommended)

1. **Download or Clone the Repository**:
   ```bash
   git clone https://github.com/RijulSitpure/Asymptote.git
   cd Asymptote
   ```
2. **Build the Extension Bundle**:
   ```bash
   npm install
   npm run build
   ```
3. **Load into Chrome / Brave / Arc / Edge**:
   - Navigate to `chrome://extensions/` in your browser.
   - Toggle **Developer mode** (top-right switch).
   - Click **Load unpacked** (top-left button).
   - Select the `extension/` folder inside the Asymptote repository.
4. **Practice on LeetCode**:
   - Open any LeetCode problem (e.g., [#787 Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) or [#1 Two Sum](https://leetcode.com/problems/two-sum/)).
   - Click the floating **⚡ Asymptote** pill or use the browser action popup to open the mentor drawer!

---

### Option 2: Standalone Web Dashboard

The web dashboard runs locally without needing any backend server:

```bash
# Start local Vite development server
npm run dev
```

Open your browser to:  
👉 **`http://localhost:5173`** (or access the dashboard directly inside the extension at `chrome-extension://<id>/dashboard/index.html`).

---

## 📁 Repository Structure

```
Asymptote/
├── extension/                   # Manifest V3 Chrome Extension
│   ├── manifest.json            # Extension configuration & permissions
│   ├── content.js               # Shadow DOM drawer & floating overlay
│   ├── background.js            # 6-hour alarm & silent OTA background sync
│   ├── popup.html / popup.js    # Browser action popup
│   ├── solution-chat.js         # In-page Socratic mentor & Gemini Nano chat
│   ├── data/                    # Pre-compiled dataset shards for offline & OTA
│   │   ├── manifest.json        # Shard versioning & SHA-256 checksums
│   │   ├── algorithms.json      # 50 patterns, 1,538 problems
│   │   ├── database.json        # 19 SQL patterns
│   │   ├── pandas.json          # 10 Pandas patterns
│   │   ├── javascript.json      # 8 JS patterns
│   │   ├── concurrency.json     # 7 Concurrency patterns
│   │   ├── shell.json           # 5 Shell patterns
│   │   ├── index.json           # Fast slug and number indexing
│   │   └── catalog.json         # 4,086 LeetCode problems catalog
│   └── dashboard/               # Compiled standalone dashboard inside extension
├── client/                      # Standalone React + Vite Dashboard
│   ├── src/
│   │   ├── components/          # StatsDashboard, CourseRoadmap, PatternAtlas, etc.
│   │   ├── lib/                 # Engine client, curriculum, languages, nano AI
│   │   └── App.jsx              # Main tabbed shell
│   └── index.html
├── dataset/                     # Source dataset blueprints & build tools
│   ├── domain/                  # Source pattern definitions & problem sets
│   └── tools/build.js           # Compiler for sharding, indexing, and hashing
├── shared/                      # Synchronized core logic across extension & client
│   ├── asymptote-engine.js      # Serverless algorithmic intelligence engine
│   ├── dataset-sync.js          # Silent OTA synchronization & hash verification
│   ├── nano-ai.js               # Gemini Nano window.ai abstraction
│   ├── nano-chat-service.js     # Socratic prompt engineering & chat service
│   ├── curriculum-roadmap.js    # 13-stage learning roadmap
│   └── languages.js             # 6-language blueprint & syntax resolver
├── scripts/
│   ├── sync-shared.js           # Single-source-of-truth syncer for shared/
│   ├── verify-dataset-build.js  # Cryptographic & schema distribution validator
│   └── package-extension.js     # Automated zip packager for Chrome Web Store
└── tests/                       # 15 Vitest suites (116 automated unit tests)
```

---

## 🔒 Privacy & Local-First Guarantee

* **100% Serverless**: Zero backend Node.js, Python, or external database servers required.
* **Zero Telemetry**: No user analytics, no behavioral tracking, no third-party cookies.
* **Local Storage**: All solved history, notes, confidence ratings, and review flags are stored strictly on your device via `chrome.storage.local` and browser `localStorage`.
* **Zero Cloud Dependence**: Works completely offline once installed.

---

## 🧪 Testing & Verification

Asymptote enforces rigorous automated testing across dataset integrity, engine correctness, and UI wiring:

```bash
# Verify shared modules sync
npm run check-shared

# Rebuild and cryptographically verify all dataset shards
npm run build:dataset && npm run verify:dataset

# Run all 15 Vitest test suites (116 tests)
npm test

# Run ESLint validation
npm run lint

# Build extension package for Chrome Web Store
npm run package:extension
```

---

## 🤝 Contributing

We welcome community contributions to expand problem coverage, add new patterns, and translate blueprints into additional languages!

1. Fork the repository.
2. Create your feature branch (`git checkout -b feat/add-new-pattern`).
3. Add pattern blueprints in `dataset/domain/` or enhance solver hints.
4. Run `npm run build:dataset && npm test` to verify dataset integrity and tests.
5. Commit your changes (`git commit -m 'feat: add segment tree lazy propagation pattern'`).
6. Push to the branch (`git push origin feat/add-new-pattern`) and open a Pull Request.

---

## 📜 License

Released under the [MIT License](LICENSE).

