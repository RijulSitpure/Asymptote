<div align="center">
  <img src="extension/icons/icon-128.png" width="96" height="96" alt="Asymptote Logo" />
  <h1>Asymptote</h1>
  <p><strong>Algorithmic Pattern Intelligence & Socratic Mentor for LeetCode</strong></p>
  <p><em>The Free, 100% Serverless & Local-First Alternative to LeetCode Premium's Paywalled ($35/mo) "Leet AI"</em></p>

  <p>
    <a href="https://chromewebstore.google.com/detail/micohhdeepmpciohinomlngdlhkpbfhh?utm_source=item-share-cb"><img src="https://img.shields.io/badge/Chrome_Web_Store-Add_to_Chrome-blue?logo=googlechrome&logoColor=white" alt="Chrome Web Store" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
    <a href="https://github.com/RijulSitpure/Asymptote/actions/workflows/ci.yml"><img src="https://img.shields.io/badge/Tests-120%2F120%20Passed-brightgreen.svg" alt="Tests" /></a>
    <a href="https://github.com/RijulSitpure/Asymptote/actions/workflows/dataset.yml"><img src="https://img.shields.io/badge/Dataset-Verified%20(99%20Patterns)-emerald.svg" alt="Dataset Verified" /></a>
    <a href="https://developer.chrome.com/docs/extensions/mv3/intro/"><img src="https://img.shields.io/badge/Chrome_Extension-Manifest_V3-brightgreen.svg" alt="Chrome MV3" /></a>
    <a href="#-on-device-gemini-nano-ai"><img src="https://img.shields.io/badge/On--Device_AI-Gemini_Nano-red.svg" alt="Gemini Nano AI" /></a>
    <a href="PRIVACY.md"><img src="https://img.shields.io/badge/Privacy-100%25_Local_Storage-indigo.svg" alt="Privacy Policy" /></a>
  </p>
</div>

---

## 🥊 Asymptote vs. LeetCode Premium "Leet AI" vs. Generic LLMs

| Feature | ⚡ **Asymptote** | 💸 **LeetCode Premium Leet AI** | 🤖 **ChatGPT / Claude** |
| :--- | :--- | :--- | :--- |
| **Pricing** | **100% Free & Open-Source (MIT)** | **$35 / month** ($299 / year) | $20 / month subscription |
| **Pedagogical Philosophy** | **Strict 4-Tier Socratic Ladder** (Intuition $\to$ Invariant $\to$ Skeleton $\to$ Code) | Hallucinates full solutions easily | Immediately dumps full code, destroying learning retention |
| **Complexity Budgeting** | **Constraint-Derived Big-O Target** + concrete online judge ops/sec calculation ($N=10^5 \implies 10^{10} \gg 10^8$ ops $\implies$ TLE) | Vague high-level suggestions | Superficial Big-O remarks without constraint budget analysis |
| **In-Page Experience** | **Shadow DOM drawer & floating overlay inside `leetcode.com`** with zero layout shift | Paywalled integrated sidebar | Separate browser tab, manual copy-pasting |
| **Pattern Taxonomy** | **99 Fine-Grained Archetypes** across 6 domains (Algorithms, SQL Database, Pandas, JavaScript, Concurrency, Shell) | Broad standard tags (e.g. just "Dynamic Programming") | Ad-hoc unstandardized explanations |
| **Multi-Language Blueprints** | **Python, C++, Java, JavaScript, Go, Rust** across blueprints and hints | Limited to standard solution languages | Generates arbitrary unverified syntax |
| **AI Privacy & Offline** | **100% On-Device Gemini Nano AI** (`window.ai`), zero telemetry, works offline | Stored on remote corporate servers | Cloud-hosted; queries logged for model training |
| **Server Requirements** | **Zero Servers Needed** (100% Serverless, runs directly in browser) | Cloud-dependent proprietary infrastructure | Remote API servers |
| **Silent Updates** | **Silent Over-The-Air (OTA) Updates** via GitHub Raw shards with SHA-256 checks | Closed proprietary releases | Static training cutoffs |

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
* **Deterministic Fallback**: If Gemini Nano is not enabled in your browser, Asymptote seamlessly falls back to its curated hint database.

### 4. 🧭 Curated Pattern Atlas (99 Archetypes across 6 Domains)
* **Algorithms (50 Patterns, 1,538 Problems)**: Two Pointers, Sliding Window, Monotonic Stack, Interval Scheduling, Topological Sort, Dijkstra, Floyd-Warshall, 0/1 BFS, Tree Rerooting DP, Digit DP, Bitmask DP, Binary Lifting (LCA), and more.
* **Database SQL (19 Patterns, 13 Problems)**: Self-Joins, Window Functions (`DENSE_RANK`, `ROW_NUMBER`), CTEs, Recursive Trees, Conditional Aggregations.
* **Pandas (10 Patterns, 7 Problems)**: Vectorized Filtering, GroupBy-Aggregation Chains, Reshaping & Pivots.
* **JavaScript (8 Patterns, 6 Problems)**: Debounce/Throttle, Memoization, Event Emitter, Promise Pools, Curry Pipelines.
* **Concurrency (7 Patterns, 3 Problems)**: Mutex Locks, Condition Variables, Semaphore Barriers, Read-Write Locks.
* **Shell (5 Patterns, 3 Problems)**: Stream Processing, Awk/Sed Field Extraction, Pipeline Filtering.
* **4,086 Full Catalog Problems Indexed**: Instant metadata, suggested patterns, and multi-language support for the entire LeetCode library.

### 5. 🔄 Silent Over-The-Air (OTA) Updates
* The companion Chrome extension background service worker checks for dataset updates every 12 hours via GitHub Raw shards (`dist-dataset/`).
* Cryptographic **SHA-256 checksum verification** guarantees that only valid, untampered data shards are saved to local Chrome storage (`asymptote_ota_dataset_v2`).
* Zero manual updates, zero user interruption, zero browser reloads required.

### 6. 📊 Curriculum Roadmap & Spaced Repetition Review
* **118 Milestone Curriculum**: 13 progressive learning stages from Basic Arrays & Two Pointers through Advanced Graphs and DP.
* **Smart Review Queue**: Automatically identifies weak patterns (patterns with 0 solved problems or low confidence ratings) and review-flagged problems.
* **Detailed Solved Log**: Filter and sort solved problems by domain, difficulty, confidence rating, pattern category, or personal notes.
* **1-Click LeetCode Sync**: Automatically imports your public LeetCode submission history without requiring login credentials.

---

## 📦 Installation & Setup

### Path 1: Chrome Web Store (Recommended — 1-Click Install)

[![Available in the Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Add_to_Chrome-blue?logo=googlechrome&logoColor=white&style=for-the-badge)](https://chromewebstore.google.com/detail/micohhdeepmpciohinomlngdlhkpbfhh?utm_source=item-share-cb)

👉 **[Install Asymptote from the Chrome Web Store](https://chromewebstore.google.com/detail/micohhdeepmpciohinomlngdlhkpbfhh?utm_source=item-share-cb)** (Automatic background updates, zero manual setup).

---

### Path 2: 1-Click GitHub Release Install (No Terminal Required)

1. Download the latest **`asymptote-extension.zip`** from [GitHub Releases](https://github.com/RijulSitpure/Asymptote/releases).
2. Unzip the downloaded file to a local folder.
3. Open Google Chrome, Brave, Arc, or Microsoft Edge and navigate to:  
   `chrome://extensions/`
4. Enable **Developer mode** (switch in the top-right corner).
5. Click **Load unpacked** (button in the top-left corner) and select the unzipped directory.
6. Visit any problem on LeetCode (e.g., [#787 Cheapest Flights](https://leetcode.com/problems/cheapest-flights-within-k-stops/) or [#1 Two Sum](https://leetcode.com/problems/two-sum/)).
7. Click the floating **⚡ Asymptote** pill in the bottom-right corner to open your in-page Socratic coach!

---

### Path 3: Developer Setup

```bash
# 1. Clone repository
git clone https://github.com/RijulSitpure/Asymptote.git
cd Asymptote

# 2. Install dependencies
npm ci

# 3. Verify dataset and run all 117 unit tests
npm run check-shared
npm test

# 4. Build extension bundle and release zip
npm run package:extension

# 5. Start standalone web dashboard
npm run dev
```

---

## 🔬 Architecture & Dataset Integrity

Asymptote enforces an automated multi-language sandboxed verification pipeline to guarantee dataset correctness before any release:

```
Asymptote/
├── extension/                   # Manifest V3 Chrome Extension (Shadow DOM isolated)
├── client/                      # Standalone React + Vite Web Dashboard
├── dataset/
│   ├── domain/                  # Source pattern definitions & problem sets
│   ├── tests/                   # Python, SQL, C++, Java test suites per problem
│   └── tools/
│       ├── validate.js          # Schema, pattern reference, and Big-O validator
│       ├── run-tests.js         # Sandboxed multi-language test execution engine
│       └── build.js             # Shards compiler, SHA-256 generator, and manifest builder
├── dist-dataset/                # Compiled static dataset for GitHub Raw OTA updates
├── shared/                      # Synchronized core engine logic (shared across client & extension)
│   ├── asymptote-engine.js      # Serverless algorithmic intelligence engine
│   ├── dataset-sync.js          # Silent background OTA updater
│   └── nano-chat-service.js     # On-device Gemini Nano Socratic tutor
└── tests/                       # 15 Vitest suites (117 automated unit tests)
```

- **Referential Integrity**: `node dataset/tools/validate.js` ensures every problem points to valid patterns, has complete progressive hints, and matches strict Big-O constraints.
- **Hint Spoiler Guard**: Automated unit tests assert that locked hint titles never leak algorithmic invariants or names.
- **Sandboxed Test Runner**: `node dataset/tools/run-tests.js` tests reference implementations across Python, C++, Java, and MySQL.

---

## 🔒 Privacy & Local-First Guarantee

* **100% Serverless**: Zero backend Node.js, Python, or external database servers required.
* **Zero Telemetry**: No user analytics, no behavioral tracking, no third-party cookies.
* **Local Storage**: All solved history, notes, confidence ratings, and review flags are stored strictly on your device via `chrome.storage.local` and browser `localStorage`.
* **Zero Cloud Dependence**: Works completely offline once installed.

Read our complete [Privacy Policy](PRIVACY.md).

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
