# ⚡ Asymptote

> **The Free, Open-Source Alternative to LeetCode Premium's Paywalled ($35/mo) "Leet AI"**  
> Built for serious software engineers and competitive programmers who want to master algorithmic patterns, derive optimal Big-O complexity from constraints, and get progressive Socratic clues without spoiling the solution.

---

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-brightgreen.svg)](https://nodejs.org)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-orange.svg)](#-zero-dependency-architecture)
[![Privacy](https://img.shields.io/badge/Data-100%25%20Local%20SQLite-indigo.svg)](#-privacy--local-first)

---

## 🥊 Asymptote vs. LeetCode Premium "Leet AI"

| Feature | 🤖 Asymptote (This Project) | 💸 LeetCode Premium Leet AI |
| :--- | :--- | :--- |
| **Price** | **100% Free & Open Source (MIT)** | **$35 / month** ($299 / year) |
| **Philosophy** | **Coder-First & Socratic** (Teaches invariants & intuition) | Generic AI chatbot (Spoils full code easily) |
| **Complexity Targeter** | **Constraint-derived Big-O target** + concrete ops/sec calculation ($N=10^5 \to 10^{10} \gg 10^8$ ops $\to$ TLE) | Vague high-level suggestions |
| **Hint Progressive Ladder** | **4-Stage Progressive Reveal** (Intuition $\to$ State $\to$ Invariant $\to$ Skeleton) | Unstructured single-shot hints |
| **In-Page LeetCode Coach** | **Sleek dark drawer inside `leetcode.com`** with zero layout shift | Integrated sidebar behind paywall |
| **Pattern Taxonomy** | **37+ fine-grained archetypes** (Layered Graph DP, Bitmask BFS, Monotonic Stack, Interval DP, etc.) | Broad standard tags (e.g. just "Dynamic Programming") |
| **Data Privacy** | **100% Local SQLite** (`tracker.db`), zero tracking, zero telemetry | Stored on remote corporate servers |
| **Dependencies** | **Zero npm dependencies** (Uses native Node `node:sqlite` + native `fetch`) | Proprietary closed-source web stack |

---

## 💡 The Problem with Traditional Interview Prep

1. **Broad Tags are Useless**: Labeling a problem as "Dynamic Programming" or "Graph" gives away almost nothing. DP has over 10 distinct sub-archetypes (1D sequence, 0/1 knapsack, interval DP, bitmask DP, digit DP, tree rerooting, layered graph DP).
2. **The "Twist Factor"**: Technical interviews rarely test pure textbook templates. They test **Pattern X + Twist Y** (e.g. Shortest Path on a Graph, but edge count is bounded by $K \to$ Bellman-Ford / DP state expansion `dp[u][k]`).
3. **The Spoiler Trap**: When stuck, jumping directly to an editorial or asking ChatGPT for the answer permanently ruins your retention and ability to problem-solve during live interviews.

---

## 🚀 Key Features

### 1. 🪜 The 4-Tier Socratic Ladder
Reveal hints progressively without ever spoiling the code:
* **Level 1 — The Recognition Signal**: What constraint or problem property screams this pattern? *(Never mentions algorithm names!)*
* **Level 2 — State & Subproblem Formulation**: What parameters uniquely define the state or window?
* **Level 3 — Invariant & Critical Twist**: What transition or edge-case pitfall must you watch for?
* **Level 4 — Blueprint Skeleton**: A fill-in-the-blank code scaffold in Python/C++.

### 2. 🎯 Constraint-to-Complexity Target Engine
Every online judge enforces a strict CPU execution budget: **$\approx 10^8$ operations per second (1.0s limit)**. Asymptote analyzes problem constraints to tell you:
* **The Target Big-O**: Exact target Time & Space complexity ($O(N)$, $O(N \log N)$, $O(K \cdot E)$, etc.).
* **The Naive Flaw**: Why brute force TLEs with math (e.g., $N=10^5 \implies O(N^2) = 10^{10}$ ops $\gg 10^8$ ops $\implies$ 100 seconds to execute).
* **The Space-Time Trade-off**: What extra memory structure (Hash Map, Deque, Bitmask) buys down the time complexity.
* **Interviewer Expectation**: What the interviewer expects you to articulate before writing a single line of code.

### 3. 🧩 In-Page Chrome Extension (Works on LeetCode.com)
* An in-page drawer that opens right inside any LeetCode problem (`leetcode.com/problems/*`).
* Instant target complexity breakdown + progressive hints ladder.
* **Auto-Sync**: Automatically intercepts Accepted submissions and syncs your code, problem difficulty, and pattern archetype straight to your local SQLite database.

### 4. 🧭 Pattern Atlas & Diagnostic Wizard
* **37+ Curated Archetypes**: Blueprints and mental triggers for Graph+DP, Bitmask BFS, Monotonic Stack, Re-rooting DP, 0/1 BFS, Interval DP, Binary Search on Answer Space, etc.
* **Diagnostic Wizard**: Don't know where to start? Answer 4 quick multiple-choice questions about input geometry, constraints on $N$, and target output—the inference engine scores and ranks the best candidate patterns.

---

## ⚡ Zero-Dependency Architecture

Asymptote requires **zero external npm packages**. It runs entirely on modern Node.js standard library APIs:
* **Storage**: Node 22+ built-in `node:sqlite` database engine.
* **Networking**: Native Node `fetch` API.
* **Server**: Native Node `node:http` server.
* **Speed**: Boots up in **5 milliseconds** with minimal memory usage.

---

## 🛠️ Quick Start Guide

### Step 1: Start the Local Asymptote Server
Ensure you have **Node.js 22 or newer** installed (`node -v`):

```bash
# Clone the repository
git clone https://github.com/Rijul-Sitpure/LeetCode-Pattern_Tracker.git
cd LeetCode-Pattern_Tracker

# Start the server (Zero npm install required!)
node server/src/index.js
```

Open your browser to:  
👉 **[http://localhost:3001](http://localhost:3001)**

---

### Step 2: Install the Companion Chrome Extension (Optional, Recommended)
1. Open Google Chrome, Brave, or Arc and go to: `chrome://extensions`
2. Toggle on **Developer mode** (top-right corner).
3. Click **Load unpacked** (top-left button).
4. Select the `extension/` directory from this repository.
5. Visit any problem on LeetCode (e.g. [Two Sum](https://leetcode.com/problems/two-sum/) or [Cheapest Flights](https://leetcode.com/problems/cheapest-flights-within-k-stops/)).
6. Click the sleek **⚡ Asymptote** button on the bottom right to open the in-page coach!

---

## 📁 Repository Structure

```
LeetCode-Pattern_Tracker/
├── server/
│   ├── src/
│   │   ├── db/
│   │   │   ├── database.js          # SQLite manager using native node:sqlite
│   │   │   ├── patternsSeed.js      # 37+ Curated pattern archetypes & blueprints
│   │   │   └── problemsSeed.js      # Seed problems with hints, twists, and bounds
│   │   ├── services/
│   │   │   ├── complexityService.js # Constraint-to-Big-O budget targeter
│   │   │   ├── classifier.js        # Algorithmic pattern matcher & hint generator
│   │   │   ├── wizard.js            # Constraint-to-pattern inference engine
│   │   │   ├── leetcode.js          # GraphQL sync client
│   │   │   └── syncService.js       # Background sync processor
│   │   └── index.js                 # HTTP REST API server
│   └── data/
│       └── tracker.db               # Local SQLite database (100% private)
├── client/
│   ├── index.html                   # Asymptote Dashboard SPA
│   └── app.js                       # Socratic ladder & complexity visualizer
├── extension/
│   ├── manifest.json                # Manifest V3 Extension
│   ├── content.js                   # In-page coach drawer & submission interceptor
│   ├── popup.html                   # Extension popup interface
│   └── popup.js                     # 1-Click solved sync logic
└── package.json
```

---

## 🔒 Privacy & Local-First Guarantee

* **No External Servers**: Asymptote runs 100% on `localhost:3001`.
* **Zero Telemetry**: No tracking, analytics, or logging.
* **Persistent Storage**: All solved history, notes, and mastery ratings are saved locally in `server/data/tracker.db`.

---

## 🤝 Contributing

Contributions are warmly welcomed! You can:
1. Add new algorithmic pattern archetypes or interview twists to `server/src/db/patternsSeed.js`.
2. Expand Socratic hints and complexity bounds in `server/src/services/complexityService.js`.
3. Submit bug fixes or UI enhancements.

```bash
# Fork & clone
git checkout -b feature/new-pattern
git commit -m "feat: add 2-SAT pattern archetype"
git push origin feature/new-pattern
```

---

## 📜 License

Released under the [MIT License](LICENSE).
