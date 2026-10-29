# Chrome Web Store Developer Dashboard Submission Guide

> **Live Chrome Web Store URL:** [Asymptote on Chrome Web Store](https://chromewebstore.google.com/detail/micohhdeepmpciohinomlngdlhkpbfhh?utm_source=item-share-cb)  
> **Extension ID:** `micohhdeepmpciohinomlngdlhkpbfhh`

Copy and paste the exact fields below directly into the Google Chrome Web Store Developer Dashboard (`chrome.google.com/webstore/devcenter`).

---

## 1. Store Listing Details

### Extension Name:
`Asymptote - Algorithmic Pattern Intelligence`

### Short Description (127 / 132 characters limit):
`Algorithmic Pattern Intelligence & in-page Socratic Mentor for LeetCode. Progressive hints, Big-O budget, and pattern tracking.`

### Category:
`Developer Tools` (Secondary: `Education`)

### Language:
`English`

---

## 2. Detailed Description

```markdown
Asymptote is your free, privacy-first in-page algorithmic mentor for technical coding interview preparation on LeetCode.

Unlike generic AI assistants that immediately dump full code solutions and spoil your learning retention, Asymptote enforces a strict Socratic hint ladder—training your intuition to recognize underlying problem structures, state formulations, and algorithmic invariants before writing code.

⚡ CORE CAPABILITIES:

🪜 4-Tier Socratic Progressive Hint Ladder
Reveal clues progressively without ever spoiling the solution:
• Tier 1: Recognition Signal (The structural trigger or constraint clue without algorithm names)
• Tier 2: State & Subproblem Formulation (The mathematical parameters defining the state space or window)
• Tier 3: Invariant & Critical Twist (The edge-case mutation, monotonic condition, or transition rule)
• Tier 4: Code Skeleton & Implementation (Fill-in-the-blank blueprints in Python, C++, Java, JavaScript, Go, and Rust)

🎯 Constraint-to-Big-O Budget Targeter
Online judges enforce a strict CPU execution budget (~10⁸ operations per second). Asymptote parses problem constraints and proves mathematically why brute-force approaches will TLE (e.g., N=10⁵ ⟹ 10¹⁰ ops ≫ 10⁸ ops ⟹ TLE) and deduces your exact target Time and Space Big-O.

🧠 On-Device Gemini Nano AI
Powered by Chrome's native window.ai Prompt API for zero-latency, private, and offline conversational tutoring. Your code and prompts never leave your browser.

🧭 1,600+ Curated Problems & 99 Algorithmic Archetypes
Deep pattern coverage across all 6 LeetCode domains:
• Algorithms (Monotonic Stack, Layered Graph DP, Bitmask BFS, Interval DP, Binary Lifting)
• Database SQL (Window Functions, CTEs, Self-Joins)
• Pandas (Vectorized Filtering, GroupBy-Aggregation Chains)
• JavaScript (Debounce/Throttle, Memoization, Promise Pools)
• Concurrency (Mutex Locks, Condition Variables, Semaphore Barriers)
• Shell (Stream Processing, Awk/Sed Field Extraction)

📊 1-Click Submission Sync & Curriculum Roadmap
Track your solved problems, review queue, and 118-milestone curriculum progress across 13 stages. Syncs your public LeetCode submission history in 1 click without requiring login credentials.

🔄 Silent Over-The-Air (OTA) Updates
Receives updated problem hints and catalog additions seamlessly in the background with cryptographic SHA-256 integrity verification.

🔒 100% PRIVATE & LOCAL-FIRST
• Zero telemetry, zero analytics tracking, zero third-party cookies
• Zero remote backend servers or databases required
• All notes, solved records, and ratings remain strictly on your local device

Free & Open Source under the MIT License.
GitHub: https://github.com/RijulSitpure/Asymptote
```

---

## 3. Single Purpose Statement (Required by CWS)

> "Asymptote provides algorithmic pattern intelligence and progressive Socratic hints directly inside LeetCode problem pages to help software engineers learn and retain data structure and algorithm patterns without spoiling solution code."

---

## 4. Privacy Practices Tab & Permission Justifications

### Does the extension collect user data?
**Select:** "No, I am not collecting or using user data."

### Remote Code Disclosure:
**Select:** "No, I am not using remote code."  
*Justification:* "The extension does not execute any remote code. It only fetches static, cryptographically signed JSON dataset shards (containing problem hints and patterns) which are strictly parsed via JSON.parse()."

### Permission Justifications:

#### 1. `storage`
> "Used exclusively to store the user's local practice progress, solved problems list, personal notes, confidence ratings, and cached static dataset shards locally on their device via chrome.storage.local. No data is transmitted to external servers."

#### 2. `tabs`
> "Used to detect when the active browser tab navigates to a LeetCode problem URL (leetcode.com/problems/*) so the in-page Socratic drawer can initialize and display the relevant problem hints, and to open the local dashboard tab."

#### 3. `alarms`
> "Used to trigger a periodic background check (every 12 hours) to download static problem hint catalog updates silently from the project's public GitHub repository."

#### 4. Host Permissions (`*://leetcode.com/*`, `*://*.leetcode.com/*`)
> "Required to inject the Shadow DOM in-page coach overlay on LeetCode problem pages, read the current problem title/slug, and query LeetCode's public GraphQL API for the user's solved submission status."

#### 5. Host Permission (`https://raw.githubusercontent.com/*`)
> "Used exclusively by the background service worker to fetch static JSON dataset shards and manifest updates from the official public open-source GitHub repository."
