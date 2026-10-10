# ⚡ LeetCode Pattern Tracker & Socratic Aid

> **Transform random problem grinding into systematic pattern mastery.**  
> Track questions automatically, decode complex combinations like **Graph + DP**, and reveal progressive clues when you're stuck without spoiling solutions.

---

## 🎯 The Philosophy: Why Traditional Grinding Fails

1. **LeetCode tags are too broad**: Labeling a problem as `"Dynamic Programming"` or `"Graph"` is useless. DP has over 8 distinct sub-archetypes (1D sequence, 0/1 knapsack, interval DP, bitmask DP, digit DP, tree rerooting, etc.).
2. **The "Twist Factor"**: Interview questions are rarely pure textbook templates. They are almost always **Pattern X + Twist Y** (e.g. Shortest Path on a Graph, but edge count is bounded by $K \rightarrow$ **Bellman-Ford / DP state expansion `dp[u][k]`**).
3. **Spoiler Traps**: When stuck, jumping directly to an editorial or YouTube solution ruins retention. You need **Progressive Socratic Clues**:
   - **Level 1**: The Recognition Signal (What constraint screams this pattern?)
   - **Level 2**: State Formulation (What variables define the subproblem?)
   - **Level 3**: Transition & Invariant (How do subproblems combine?)
   - **Level 4**: Code Skeleton (Fill-in-the-blank template)

---

## 🚀 Quick Start (Zero Setup Required!)

Built on Node.js 25's native `node:sqlite` and native `fetch` — **zero npm dependencies, zero compilation, starts in 5 milliseconds!**

```bash
# Start the Pattern Tracker app
npm start
```

Open your browser to:
👉 **[http://localhost:3001](http://localhost:3001)**

---

## 🧭 Core Features

### 1. The Pattern Atlas
* **Curated Archetypes**: Focused heavily on tricky combinations:
  - **DAG Longest/Shortest Path (Topological Sort + DP)** (LC 329, LC 2050)
  - **Constrained Steps / Layered Graph DP** (LC 787, LC 1928)
  - **Graph Traversal with Bitmask State (TSP / All Nodes)** (LC 847, LC 864)
  - **Tree DP / All-Directions Re-rooting DP** (LC 834, LC 310)
  - **0/1 BFS Deque Optimization** (LC 1368, LC 2290)
  - **Interval / Range DP** (LC 312, LC 1000)
  - **State Machine DP** (LC 309, LC 123)
  - **Monotonic Stack (Next Greater Element / Histogram)** (LC 739, LC 84)
  - **Dynamic Sliding Window** (LC 76, LC 3)
  - **Binary Search on Answer Space** (LC 1011, LC 875)
* Each pattern includes:
  - **Mental Triggers**: Keywords and constraints that alert you to use it.
  - **Canonical Blueprints**: Clean Python & C++ boilerplate code.
  - **Common Interview Twists**: How interviewers mutate the base pattern.

### 2. Socratic Stuck Solver
Type any problem number (e.g., `#787`, `#329`, `#847`, `#312`, `#1368`) or search by name. Reveal hints progressively one tier at a time.

### 3. Diagnostic Wizard
Facing an unfamiliar problem with no idea what pattern to use? Answer 4 quick multiple-choice questions about the data structure, constraints on $N$, and output objective:
* The inference engine calculates the highest matching patterns with step-by-step reasoning.

### 4. Automatic Ingestion & Syncing
* **Method 1: LeetCode GraphQL Profile Sync**:
  Click **Sync LeetCode**, enter your public LeetCode username, and the tracker automatically fetches your recent Accepted submissions and classifies them into patterns.
* **Method 2: Companion Chrome Extension**:
  Load the `extension` directory into Chrome/Brave (`chrome://extensions` $\rightarrow$ Load Unpacked).
  - Intercepts "Accepted" submissions on LeetCode.com and logs your code + pattern automatically.
  - Adds a floating **💡 Pattern Clue** button right inside LeetCode to reveal progressive hints without leaving the problem tab!

---

## 📂 Project Structure

```
LeetCode-Pattern_Tracker/
├── server/
│   ├── src/
│   │   ├── db/
│   │   │   ├── database.js          # SQLite manager via node:sqlite
│   │   │   ├── patternsSeed.js      # Curated pattern taxonomy & blueprints
│   │   │   └── problemsSeed.js      # Iconic problems with hints & twists
│   │   ├── services/
│   │   │   ├── leetcode.js          # LeetCode public GraphQL client
│   │   │   ├── classifier.js        # Pattern matcher & progressive hint engine
│   │   │   ├── wizard.js            # Constraint-to-pattern inference engine
│   │   │   └── syncService.js       # Background sync worker
│   │   └── index.js                 # HTTP server & REST API
│   └── data/
│       └── tracker.db               # Local SQLite database
├── client/
│   ├── index.html                   # Modern Dark-themed Dashboard SPA
│   └── app.js                       # Interactive frontend logic & reactive UI
├── extension/
│   ├── manifest.json                # Manifest V3 Chrome Extension
│   ├── content.js                   # In-page submission detector & hint drawer
│   ├── popup.html                   # Extension popup status
│   └── popup.js
└── package.json
```

---

## 🛠️ Testing the Companion Chrome Extension

1. Open Chrome, Brave, or Arc and navigate to `chrome://extensions`.
2. Toggle on **Developer mode** in the top right.
3. Click **Load unpacked** in the top left.
4. Select the `extension/` folder in this repo.
5. Go to any problem on LeetCode (e.g. `https://leetcode.com/problems/cheapest-flights-within-k-stops/`).
6. Notice the **💡 Pattern Clue** button on the bottom right — click it to see in-page progressive hints!
