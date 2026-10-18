/**
 * Asymptote Serverless Data Engine
 * Pure JavaScript module providing client-side and extension pattern tracking,
 * hint resolution, complexity targeting, submission ingestion, and progress analytics.
 * Works uniformly in Node.js, Vite/React, and Chrome Extension.
 */

import './languages.js';
import { DiagnosticWizard } from './wizard.js';

const LanguagesModule = typeof globalThis !== 'undefined' && globalThis.LanguagesModule
  ? globalThis.LanguagesModule
  : null;

export const GENERIC_HINT_TITLES = {
  1: 'Recognize the obstacle',
  2: 'Identify the core insight',
  3: 'Outline the procedure',
  4: 'See the blueprint'
};

export const CATEGORY_PEDAGOGICAL_ORDER = [
  'Arrays & Hashing',
  'Two Pointers',
  'Binary Search',
  'Stacks & Queues',
  'Trees',
  'Heap / Priority Queue',
  'Backtracking',
  'Greedy & Intervals',
  'Graph Traversal',
  'Bit Manipulation',
  'Dynamic Programming',
  'Graph + DP',
  'Database',
  'pandas',
  'Shell',
  'Concurrency',
  'JavaScript'
];

export const PATTERN_PEDAGOGICAL_ORDER = [
  'hash-map-lookup',
  'prefix-sum-hashmap',
  'array-kadane',
  'two-pointers-opposite',
  'two-pointers-fast-slow',
  'sliding-window-fixed',
  'two-pointers-window-dynamic',
  'binary-search-basic',
  'binary-search-rotated',
  'binary-search-answer',
  'stack-parentheses-parser',
  'stack-monotonic-next-greater',
  'queue-monotonic-sliding-window',
  'linked-list-pointers',
  'design-data-structures',
  'tree-bfs-level-order',
  'tree-dfs-subproblem',
  'tree-bst-properties',
  'tree-trie-prefix',
  'heap-top-k-elements',
  'heap-two-heaps-median',
  'backtracking-subsets-perm',
  'backtracking-grid-dfs',
  'greedy-interval-scheduling',
  'graph-bfs-shortest-path',
  'graph-topo-kahn',
  'graph-union-find-dsu',
  'graph-01-bfs',
  'graph-dijkstra',
  'bit-manipulation-tricks',
  'dp-1d-fib-linear',
  'dp-grid-2d',
  'dp-knapsack-variants',
  'dp-state-machine',
  'dp-longest-common-subseq',
  'dp-interval',
  'dp-bitmask',
  'graph-dp-dag',
  'graph-dp-k-steps',
  'graph-bitmask-all-nodes',
  'graph-tree-rerooting'
];

export const CURATED_PROBLEMS_META = {
  'two-sum': { number: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Algorithms', twist_type: 'One-Pass Hash Map Lookup' },
  'valid-parentheses': { number: 20, title: 'Valid Parentheses', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Syntactic Balance with Stack' },
  'maximum-subarray': { number: 53, title: 'Maximum Subarray', difficulty: 'Medium', category: 'Algorithms', twist_type: "Kadane's Running Reset Invariant" },
  'combine-two-tables': { number: 175, title: 'Combine Two Tables', difficulty: 'Easy', category: 'Database', twist_type: 'Left Outer Join on foreign key' },
  'second-highest-salary': { number: 176, title: 'Second Highest Salary', difficulty: 'Medium', category: 'Database', twist_type: 'Offset and Limit with NULL protection' },
  'department-highest-salary': { number: 184, title: 'Department Highest Salary', difficulty: 'Medium', category: 'Database', twist_type: 'Window function DENSE_RANK or correlated subquery' },
  'word-frequency': { number: 192, title: 'Word Frequency', difficulty: 'Medium', category: 'Shell', twist_type: 'Pipelined tokenization, sorting and counting' },
  'valid-phone-numbers': { number: 193, title: 'Valid Phone Numbers', difficulty: 'Easy', category: 'Shell', twist_type: 'Regex matching telephone formats' },
  'tenth-line': { number: 195, title: 'Tenth Line', difficulty: 'Easy', category: 'Shell', twist_type: 'Sed / awk line selection' },
  'delete-duplicate-emails': { number: 196, title: 'Delete Duplicate Emails', difficulty: 'Easy', category: 'Database', twist_type: 'Self-join deletion matching smaller id' },
  'rising-temperature': { number: 197, title: 'Rising Temperature', difficulty: 'Easy', category: 'Database', twist_type: 'Self-join or DATEDIFF date increment' },
  'burst-balloons': { number: 312, title: 'Burst Balloons', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Reverse Interval DP: last balloon burst' },
  'longest-increasing-path-in-a-matrix': { number: 329, title: 'Longest Increasing Path in a Matrix', difficulty: 'Hard', category: 'Algorithms', twist_type: 'DAG Topological Traversal via Memoized DFS' },
  'daily-temperatures': { number: 739, title: 'Daily Temperatures', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Stack of unresolved index days' },
  'cheapest-flights-within-k-stops': { number: 787, title: 'Cheapest Flights Within K Stops', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bounded Edge Count (Bellman-Ford / DP state expansion)' },
  'sum-of-distances-in-tree': { number: 834, title: 'Sum of Distances in Tree', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Two-Pass Tree Re-rooting' },
  'shortest-path-visiting-all-nodes': { number: 847, title: 'Shortest Path Visiting All Nodes', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitmask BFS over (node, visited_mask) state' },
  'print-in-order': { number: 1114, title: 'Print in Order', difficulty: 'Easy', category: 'Concurrency', twist_type: 'Event synchronization / lock sequencing' },
  'print-foobar-alternately': { number: 1115, title: 'Print FooBar Alternately', difficulty: 'Medium', category: 'Concurrency', twist_type: 'Dual Semaphore Ping-Pong Interleaving' },
  'building-h2o': { number: 1117, title: 'Building H2O', difficulty: 'Medium', category: 'Concurrency', twist_type: 'Barrier synchronization / Rendezvous' },
  'minimum-cost-to-make-at-least-one-valid-path-in-a-grid': { number: 1368, title: 'Minimum Cost to Make at Least One Valid Path in a Grid', difficulty: 'Hard', category: 'Algorithms', twist_type: '0-1 BFS Double-Ended Queue Pathfinding' },
  'counter': { number: 2620, title: 'Counter', difficulty: 'Easy', category: 'JavaScript', twist_type: 'Lexical Closure Stateful Counter' },
  'sleep': { number: 2621, title: 'Sleep', difficulty: 'Easy', category: 'JavaScript', twist_type: 'Promise setTimeout asynchronous sleep' },
  'event-emitter': { number: 2694, title: 'Event Emitter', difficulty: 'Medium', category: 'JavaScript', twist_type: 'Subscription registry with callback dispatch' },
  'create-a-dataframe-from-list': { number: 2877, title: 'Create a DataFrame from List', difficulty: 'Easy', category: 'pandas', twist_type: 'Direct pd.DataFrame Constructor with Column Names' },
  'drop-duplicate-rows': { number: 2882, title: 'Drop Duplicate Rows', difficulty: 'Easy', category: 'pandas', twist_type: 'drop_duplicates subset filtering' },
  'reshape-data-pivot': { number: 2889, title: 'Reshape Data: Pivot', difficulty: 'Medium', category: 'pandas', twist_type: 'pivot table index and column reshaping' },
  'contains-duplicate': { number: 217, title: 'Contains Duplicate', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Early Exit Set Membership Scan' },
  'valid-anagram': { number: 242, title: 'Valid Anagram', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Frequency Counting with Fixed Alphabet Array' },
  'group-anagrams': { number: 49, title: 'Group Anagrams', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Canonical Signature Key Bucketing' },
  'top-k-frequent-elements': { number: 347, title: 'Top K Frequent Elements', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Min-Heap of Size K over Frequencies' },
  'product-of-array-except-self': { number: 238, title: 'Product of Array Except Self', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix and Suffix Accumulation in Single Array' },
  'longest-consecutive-sequence': { number: 128, title: 'Longest Consecutive Sequence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sequence Starter Condition (x - 1 not in set)' },
  'valid-palindrome': { number: 125, title: 'Valid Palindrome', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Inward Two Pointers Skipping Non-Alphanumeric' },
  'two-sum-ii-input-array-is-sorted': { number: 167, title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Two Pointers on Sorted Array' },
  '3sum': { number: 15, title: '3Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Fix-and-Two-Pointer with Deduplication' },
  'container-with-most-water': { number: 11, title: 'Container With Most Water', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Inward Squeeze of Shorter Boundary' },
  'trapping-rain-water': { number: 42, title: 'Trapping Rain Water', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Opposite Two Pointers with Running Max Invariant' },
  'best-time-to-buy-and-sell-stock': { number: 121, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Prefix Minimum Price Tracker' },
  'longest-substring-without-repeating-characters': { number: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sliding Window with Last-Seen Index Boundary Jump' },
  'longest-repeating-character-replacement': { number: 424, title: 'Longest Repeating Character Replacement', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sliding Window with Max-Frequency Invariant' },
  'minimum-window-substring': { number: 76, title: 'Minimum Window Substring', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Two Pointers Expand and Shrink Matching Target Frequencies' },
  'min-stack': { number: 155, title: 'Min Stack', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Parallel Auxiliary Minimum Stack' },
  'evaluate-reverse-polish-notation': { number: 150, title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Postfix Stack Evaluation with Zero Truncation' },
  'car-fleet': { number: 853, title: 'Car Fleet', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Time-to-Target Fleet Merging' },
  'largest-rectangle-in-histogram': { number: 84, title: 'Largest Rectangle in Histogram', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Monotonic Increasing Stack with Width Expansion' },
  'binary-search': { number: 704, title: 'Binary Search', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Classic Half-Interval Elimination' },
  'search-a-2d-matrix': { number: 74, title: 'Search a 2D Matrix', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Virtual 1D Coordinate Mapping Binary Search' },
  'koko-eating-bananas': { number: 875, title: 'Koko Eating Bananas', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search on Answer Space with Feasibility Invariant' },
  'find-minimum-in-rotated-sorted-array': { number: 153, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Right-Boundary Comparison Pivot Invariant' },
  'search-in-rotated-sorted-array': { number: 33, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Half Interval Inclusion Check' },
  'reverse-linked-list': { number: 206, title: 'Reverse Linked List', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Iterative 3-Pointer Link Reversal' },
  'merge-two-sorted-lists': { number: 21, title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Sentinel Dummy Node Merging' },
  'reorder-list': { number: 143, title: 'Reorder List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Midpoint Split, Reversal, and Alternating Interleave' },
  'remove-nth-node-from-end-of-list': { number: 19, title: 'Remove Nth Node From End of List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two Pointers Fixed Gap Traversal with Dummy Head' },
  'linked-list-cycle': { number: 141, title: 'Linked List Cycle', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Floyd Tortoise and Hare Cycle Detection' },
  'lru-cache': { number: 146, title: 'LRU Cache', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Doubly Linked List with Hash Map Sentinel Design' },
  'invert-binary-tree': { number: 226, title: 'Invert Binary Tree', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Subtree Child Swapping Recursion' },
  'maximum-depth-of-binary-tree': { number: 104, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Subtree Max Height Aggregation' },
  'diameter-of-binary-tree': { number: 543, title: 'Diameter of Binary Tree', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Global Maximum Path via Local Subtree Heights' },
  'balanced-binary-tree': { number: 110, title: 'Balanced Binary Tree', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bottom-Up Height and Balance Short-Circuit' },
  'lowest-common-ancestor-of-a-binary-search-tree': { number: 235, title: 'Lowest Common Ancestor of a Binary Search Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'BST Split Node Value Comparison' },
  'binary-tree-level-order-traversal': { number: 102, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Queue Level Size Snapshot Traversal' },
  'validate-binary-search-tree': { number: 98, title: 'Validate Binary Search Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Strict Min-Max Interval Propagation' },
  'kth-smallest-element-in-a-bst': { number: 230, title: 'Kth Smallest Element in a BST', difficulty: 'Medium', category: 'Algorithms', twist_type: 'In-Order Monotonic Traversal Early Exit' },
  'implement-trie-prefix-tree': { number: 208, title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Character Tree Child Map Traversal' },
  'kth-largest-element-in-an-array': { number: 215, title: 'Kth Largest Element in an Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Min-Heap of Size K' },
  'find-median-from-data-stream': { number: 295, title: 'Find Median from Data Stream', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dual Balanced Max-Heap and Min-Heap' },
  'subsets': { number: 78, title: 'Subsets', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Decision Tree / Combinatorial Backtracking' },
  'combination-sum': { number: 39, title: 'Combination Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Reusable Candidate Pruning Backtracking' },
  'permutations': { number: 46, title: 'Permutations', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Element Exclusion Set Backtracking' },
  'word-search': { number: 79, title: 'Word Search', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Four-Directional Grid Backtracking with In-Place Visited Marker' }
};

export function getCategoryRank(category) {
  if (!category) return 999;
  const idx = CATEGORY_PEDAGOGICAL_ORDER.indexOf(category);
  return idx === -1 ? 999 : idx;
}

export function getPatternRank(patternId) {
  if (!patternId) return 999;
  const idx = PATTERN_PEDAGOGICAL_ORDER.indexOf(patternId);
  return idx === -1 ? 999 : idx;
}

export function sortPatternsByPedagogy(patterns = []) {
  return [...patterns].filter(Boolean).sort((a, b) => {
    const aId = a?.id ?? a?.pattern_id ?? null;
    const bId = b?.id ?? b?.pattern_id ?? null;
    const aRank = getPatternRank(aId);
    const bRank = getPatternRank(bId);

    if (aRank !== 999 || bRank !== 999) {
      if (aRank !== bRank) return aRank - bRank;
    }

    const aCatRank = getCategoryRank(a?.category || a?.domain || a?.pattern_category);
    const bCatRank = getCategoryRank(b?.category || b?.domain || b?.pattern_category);
    if (aCatRank !== bCatRank) return aCatRank - bCatRank;

    return (a?.title || a?.pattern_title || a?.name || '').localeCompare(b?.title || b?.pattern_title || b?.name || '');
  });
}

export function sortCategoriesByPedagogy(categories = []) {
  return [...categories].filter(Boolean).sort((a, b) => {
    const aCat = typeof a === 'string' ? a : (a?.category || a?.name || a?.fullName || '');
    const bCat = typeof b === 'string' ? b : (b?.category || b?.name || b?.fullName || '');
    const aRank = getCategoryRank(aCat);
    const bRank = getCategoryRank(bCat);
    if (aRank !== bRank) return aRank - bRank;
    return aCat.localeCompare(bCat);
  });
}

export function resolveProblemSlug(query, index = null, catalog = null) {
  if (query === null || query === undefined) return null;
  const q = String(query).trim();
  if (!q) return null;

  // 1. Direct number check (e.g. "1" or 1)
  if (/^\d+$/.test(q)) {
    if (index?.byNumber && index.byNumber[q]) {
      return index.byNumber[q];
    }
    for (const [slug, meta] of Object.entries(CURATED_PROBLEMS_META)) {
      if (String(meta.number) === q) return slug;
    }
    if (index) {
      const bySlug = index.bySlug || index;
      for (const [slug, entry] of Object.entries(bySlug)) {
        if (entry && String(entry.number) === q) return slug;
      }
    }
    if (catalog) {
      const num = parseInt(q, 10);
      if (Array.isArray(catalog)) {
        const found = catalog.find(item => item.n === num);
        if (found?.s) return found.s;
      } else if (catalog instanceof Map) {
        const found = catalog.get(num);
        if (found?.s) return found.s;
      }
    }
  }

  // 2. Direct slug candidate
  const slugCandidate = q.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (index?.bySlug && index.bySlug[slugCandidate]) return slugCandidate;
  if (index?.[slugCandidate]) return slugCandidate;
  if (CURATED_PROBLEMS_META[slugCandidate]) return slugCandidate;
  if (catalog) {
    if (Array.isArray(catalog)) {
      const found = catalog.find(item => item.s === slugCandidate);
      if (found?.s) return found.s;
    } else if (catalog instanceof Map) {
      const found = catalog.get(slugCandidate);
      if (found?.s) return found.s;
    }
  }

  // 3. Case-insensitive title match (e.g. "Two Sum")
  const qLower = q.toLowerCase();
  for (const [slug, meta] of Object.entries(CURATED_PROBLEMS_META)) {
    if (meta.title.toLowerCase() === qLower || slug.toLowerCase() === qLower) {
      return slug;
    }
  }

  // 4. Case-insensitive slug match in index
  if (index) {
    const bySlug = index.bySlug || index;
    for (const [slug] of Object.entries(bySlug)) {
      if (slug.toLowerCase() === qLower) return slug;
    }
  }

  // 5. Case-insensitive title match in catalog
  if (catalog) {
    if (Array.isArray(catalog)) {
      const found = catalog.find(item => item.t && item.t.toLowerCase() === qLower);
      if (found?.s) return found.s;
    }
  }

  return slugCandidate || null;
}

export function formatHintsForDisplay(hints = [], unlockedMaxLevel = 0) {
  return hints.map(h => {
    const level = h.level || 1;
    const genericTitle = GENERIC_HINT_TITLES[level] || `Hint ${level}`;
    const realTitle = h.realTitle || h.title;
    const isUnlocked = level <= unlockedMaxLevel;

    return {
      level,
      genericTitle,
      realTitle,
      title: isUnlocked ? realTitle : genericTitle,
      locked: !isUnlocked,
      text: isUnlocked ? (h.text || h.content || '') : null,
      content: isUnlocked ? (h.content || h.text || '') : null
    };
  });
}

export function getProblemSolutionCode(problem, langSlug = 'python3') {
  if (LanguagesModule?.getProblemSolutionCode) {
    return LanguagesModule.getProblemSolutionCode(problem, langSlug);
  }

  if (!problem) return '';
  if (!problem.verified) return '';

  const meta = LanguagesModule?.getLanguageMeta?.(langSlug) || { id: langSlug, name: langSlug };
  const targetId = meta.id;

  if (Array.isArray(problem.solutions)) {
    const sol = problem.solutions.find(s => s.lang === targetId || (targetId === 'python' && s.lang === 'python3') || (targetId === 'python3' && s.lang === 'python'));
    if (sol && sol.code) return sol.code;
  }

  if (targetId === 'python3' || targetId === 'python') {
    if (problem.solution_python && problem.solution_python.trim()) {
      return problem.solution_python;
    }
  }

  if (Array.isArray(problem.hints)) {
    const l4 = problem.hints.find(h => h.level === 4);
    if (l4 && l4.text) {
      const codeMatch = l4.text.match(/```(?:\w+)?\n([\s\S]*?)```/);
      if (codeMatch) return codeMatch[1].trim();
      return l4.text;
    }
  }

  return `// Verified ${meta.name || langSlug} solution is not yet in the local dataset.`;
}

function normalizeComplexity(rawComp) {
  if (!rawComp) {
    return {
      kind: 'none',
      time: 'n/a',
      space: 'n/a',
      targetTime: 'O(N)',
      targetSpace: 'O(1)',
      opsBudgetExplanation: '',
      whyNaiveFails: '',
      spaceTimeTradeoff: '',
      interviewerExpectation: '',
      notes: ''
    };
  }

  const kind = rawComp.kind || 'big-o';
  const time = rawComp.time || 'O(N)';
  const space = rawComp.space || 'O(1)';
  const notes = rawComp.notes || '';
  const whyNaiveFails = rawComp.whyNaiveFails || notes || '';
  const spaceTimeTradeoff = rawComp.spaceTimeTradeoff || (space && space !== 'O(1)' && space !== 'n/a' ? `Auxiliary memory requirement: ${space}.` : (notes || 'Minimal auxiliary space used.'));
  const interviewerExpectation = rawComp.interviewerExpectation || notes || '';

  return {
    kind,
    time,
    space,
    variables: rawComp.variables || [],
    notes,
    targetTime: time,
    targetSpace: space,
    opsBudgetExplanation: whyNaiveFails || `${time} complexity required to meet operational budget.`,
    whyNaiveFails,
    spaceTimeTradeoff,
    interviewerExpectation
  };
}

// Storage Adapters
export function createMemoryStorage(initialState = {}) {
  const map = new Map(Object.entries(initialState));
  return {
    async get(key) {
      return map.has(key) ? map.get(key) : null;
    },
    async set(key, value) {
      map.set(key, value);
    },
    async remove(key) {
      map.delete(key);
    },
    async clear() {
      map.clear();
    }
  };
}

export function createLocalStorageAdapter(prefix = 'asymptote:') {
  return {
    async get(key) {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      try {
        const item = window.localStorage.getItem(prefix + key);
        return item ? JSON.parse(item) : null;
      } catch {
        return null;
      }
    },
    async set(key, value) {
      if (typeof window === 'undefined' || !window.localStorage) return;
      try {
        window.localStorage.setItem(prefix + key, JSON.stringify(value));
      } catch {}
    }
  };
}

export function createChromeStorageAdapter() {
  return {
    async get(key) {
      if (typeof chrome === 'undefined' || !chrome.storage?.local) return null;
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          resolve(result && result[key] !== undefined ? result[key] : null);
        });
      });
    },
    async set(key, value) {
      if (typeof chrome === 'undefined' || !chrome.storage?.local) return;
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, () => resolve());
      });
    }
  };
}

export async function loadDatasetFromFetch(baseUrl = '/data') {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const [manifestRes, indexRes, catalogRes] = await Promise.all([
    fetch(`${cleanBase}/manifest.json`),
    fetch(`${cleanBase}/index.json`),
    fetch(`${cleanBase}/catalog.json`).catch(() => null)
  ]);
  const manifest = await manifestRes.json();
  const index = await indexRes.json();
  const catalog = catalogRes && catalogRes.ok ? await catalogRes.json() : [];

  const domains = ['algorithms', 'database', 'pandas', 'shell', 'concurrency', 'javascript'];
  const shardPromises = domains.map(async (d) => {
    const res = await fetch(`${cleanBase}/${d}.json`);
    const data = await res.json();
    return [d, data];
  });
  const shardEntries = await Promise.all(shardPromises);
  const shards = Object.fromEntries(shardEntries);

  return {
    manifest,
    index,
    catalog,
    shards,
    ...shards
  };
}

export async function loadDatasetFromFs(dataDir = null) {
  if (typeof process === 'undefined' || !process.versions?.node) {
    throw new Error('loadDatasetFromFs is only available in Node.js environments');
  }
  const fs = await import('node:fs');
  const path = await import('node:path');
  const resolvedDir = dataDir || path.resolve(process.cwd(), 'extension', 'data');

  const manifest = JSON.parse(fs.readFileSync(path.join(resolvedDir, 'manifest.json'), 'utf8'));
  const index = JSON.parse(fs.readFileSync(path.join(resolvedDir, 'index.json'), 'utf8'));

  const catalogFile = path.join(resolvedDir, 'catalog.json');
  const rawCatalogSource = path.resolve(resolvedDir, '../../dataset/catalog/leetcode-catalog.json');
  let catalog = [];
  if (fs.existsSync(catalogFile)) {
    catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));
  } else if (fs.existsSync(rawCatalogSource)) {
    catalog = JSON.parse(fs.readFileSync(rawCatalogSource, 'utf8'));
  }

  const domains = ['algorithms', 'database', 'pandas', 'shell', 'concurrency', 'javascript'];
  const shards = {};
  for (const d of domains) {
    const shardFile = path.join(resolvedDir, `${d}.json`);
    if (fs.existsSync(shardFile)) {
      shards[d] = JSON.parse(fs.readFileSync(shardFile, 'utf8'));
    } else {
      shards[d] = { domain: d, patterns: [], problems: [] };
    }
  }

  return {
    manifest,
    index,
    catalog,
    shards,
    ...shards
  };
}

/**
 * Creates the main serverless engine instance
 */
export function createAsymptoteEngine({ dataset, storage = null }) {
  if (!dataset) {
    throw new Error('createAsymptoteEngine requires a valid static dataset');
  }

  const store = storage || createMemoryStorage();
  const STORAGE_KEY_USER_PROBLEMS = 'asymptote_user_problems';
  const STORAGE_KEY_USERNAME = 'asymptote_username';
  const STORAGE_KEY_LAST_SYNC = 'asymptote_last_sync';
  const STORAGE_KEY_RECENT_LOGS = 'asymptote_recent_logs';

  const domainShards = dataset.shards || dataset;
  const domains = ['algorithms', 'database', 'pandas', 'shell', 'concurrency', 'javascript'];

  // Cache raw patterns and problems from dataset shards
  const rawPatterns = [];
  const rawCuratedProblems = [];

  for (const d of domains) {
    const shard = domainShards[d];
    if (shard && Array.isArray(shard.patterns)) {
      rawPatterns.push(...shard.patterns);
    }
    if (shard && Array.isArray(shard.problems)) {
      rawCuratedProblems.push(...shard.problems);
    }
  }

  // Normalized patterns list (99 patterns)
  const normalizedPatterns = rawPatterns.map(p => {
    return {
      id: p.id,
      domain: p.domain,
      family: p.family,
      category: p.domain === 'Algorithms' ? p.family : p.domain,
      title: p.title || p.name || p.id,
      name: p.title || p.name || p.id,
      difficulty: p.difficulty || 'Medium',
      short_description: p.short_description || p.summary || '',
      summary: p.short_description || p.summary || '',
      mental_triggers: Array.isArray(p.mental_triggers) ? p.mental_triggers : (Array.isArray(p.signals) ? p.signals : []),
      constraint_signals: Array.isArray(p.constraint_signals) ? p.constraint_signals : [],
      complexity: typeof p.complexity === 'string' ? p.complexity : 'Time: O(N) | Space: O(1)',
      base_template_py: p.base_template_py || '',
      base_template_cpp: p.base_template_cpp || '',
      twists: Array.isArray(p.twists) ? p.twists : []
    };
  });

  const patternsById = new Map();
  for (const p of normalizedPatterns) {
    patternsById.set(p.id, p);
  }

  // Curated problem map
  const curatedProblemsBySlug = new Map();
  for (const cp of rawCuratedProblems) {
    curatedProblemsBySlug.set(cp.slug, cp);
  }

  // Full LeetCode catalog index maps
  const rawCatalog = Array.isArray(dataset.catalog) ? dataset.catalog : [];
  const catalogBySlug = new Map();
  const catalogByNumber = new Map();
  for (const item of rawCatalog) {
    if (item.s) catalogBySlug.set(item.s, item);
    if (item.n) catalogByNumber.set(item.n, item);
  }

  return {
    getPatterns() {
      return [...normalizedPatterns];
    },

    getPatternById(id) {
      return patternsById.get(id) || null;
    },

    async getProblems(filters = {}) {
      const opts = filters || {};
      const userProblems = (await store.get(STORAGE_KEY_USER_PROBLEMS)) || {};
      const problemsList = [];

      // 1. Curated problems
      for (const cp of rawCuratedProblems) {
        const meta = CURATED_PROBLEMS_META[cp.slug] || {};
        const userState = userProblems[cp.slug] || {};
        const isTestedOrReviewed = cp.review?.status === 'tested' || cp.review?.status === 'reviewed';
        const tier = cp.review?.status === 'reviewed' ? 'reviewed' : cp.review?.status === 'tested' ? 'tested' : 'unverified';

        const primaryPattern = cp.patterns?.[0] || null;
        const pat = primaryPattern ? patternsById.get(primaryPattern) : null;
        const languages = cp.languages || (Array.isArray(cp.solutions) ? cp.solutions.map(s => s.lang) : []);

        const isSolved = userState.is_solved ? 1 : 0;
        const reviewNeeded = userState.review_needed ? 1 : 0;

        problemsList.push({
          id: cp.number,
          frontend_id: String(cp.number),
          number: cp.number,
          title: meta.title || cp.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          title_slug: cp.slug,
          slug: cp.slug,
          difficulty: meta.difficulty || 'Medium',
          category: cp.category || meta.category || 'Algorithms',
          pattern_id: primaryPattern,
          pattern_title: pat?.title || primaryPattern,
          patterns: cp.patterns || [],
          languages,
          verified: isTestedOrReviewed ? 1 : 0,
          verification_tier: tier,
          review: cp.review || { status: 'unverified' },
          source: 'dataset',
          twist_type: meta.twist_type || cp.twist_type || '',
          is_solved: isSolved,
          solved_at: userState.solved_at || null,
          user_code: userState.user_code || '',
          user_notes: userState.user_notes || '',
          user_rating: userState.user_rating !== undefined ? userState.user_rating : 0,
          review_needed: reviewNeeded,
          solutions: cp.solutions || [],
          hints: cp.hints || [],
          complexity: cp.complexity || null
        });
      }

      // 2. Uncurated problems from user storage
      for (const [slug, userState] of Object.entries(userProblems)) {
        if (!curatedProblemsBySlug.has(slug)) {
          const catalogEntry = catalogBySlug.get(slug);
          const number = userState.number || catalogEntry?.n || userState.id || userState.frontend_id || null;
          const category = userState.category || catalogEntry?.c || 'Algorithms';
          const difficulty = userState.difficulty || catalogEntry?.d || 'Medium';
          const title = userState.title || catalogEntry?.t || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          const patternId = userState.pattern_id || catalogEntry?.p || null;
          const pat = patternId ? patternsById.get(patternId) : null;
          problemsList.push({
            id: number || slug,
            frontend_id: number ? String(number) : slug,
            number: number ? Number(number) : null,
            title,
            title_slug: slug,
            slug,
            difficulty,
            category,
            pattern_id: patternId,
            pattern_title: pat?.title || patternId,
            patterns: patternId ? [patternId] : [],
            languages: userState.languages || [],
            verified: 0,
            verification_tier: 'unverified',
            review: { status: 'unverified' },
            source: userState.source || (catalogEntry ? 'catalog' : 'leetcode-sync'),
            twist_type: '',
            is_solved: userState.is_solved ? 1 : 0,
            solved_at: userState.solved_at || null,
            user_code: userState.user_code || '',
            user_notes: userState.user_notes || '',
            user_rating: userState.user_rating !== undefined ? userState.user_rating : 0,
            review_needed: userState.review_needed ? 1 : 0,
            solutions: [],
            hints: [],
            complexity: null
          });
        }
      }

      // 3. Filter problems
      return problemsList.filter(p => {
        if (!p) return false;
        if (opts.pattern_id && p.pattern_id !== opts.pattern_id && !p.patterns?.includes(opts.pattern_id)) {
          return false;
        }
        if (opts.difficulty && p.difficulty?.toLowerCase() !== opts.difficulty.toLowerCase()) {
          return false;
        }
        if (opts.is_solved !== undefined) {
          const wantSolved = opts.is_solved === true || opts.is_solved === 1 || opts.is_solved === 'true';
          if (Boolean(p.is_solved) !== wantSolved) return false;
        }
        if (opts.review_needed !== undefined) {
          const wantReview = opts.review_needed === true || opts.review_needed === 1 || opts.review_needed === 'true';
          if (Boolean(p.review_needed) !== wantReview) return false;
        }
        return true;
      });
    },

    async getProblemHints(query) {
      const slug = resolveProblemSlug(query, dataset.index, rawCatalog);
      if (!slug) {
        return {
          problem: null,
          pattern: null,
          suggested_pattern: null,
          hints: [],
          complexity: null,
          supported_languages: [],
          verification_tier: 'unverified',
          verified: 0
        };
      }

      const cp = curatedProblemsBySlug.get(slug);
      const userProblems = (await store.get(STORAGE_KEY_USER_PROBLEMS)) || {};
      const userState = userProblems[slug] || {};

      if (!cp || (cp.review?.status !== 'tested' && cp.review?.status !== 'reviewed')) {
        // Unverified or catalog problem: Never fallback to two-pointers or generate fake hints
        const meta = CURATED_PROBLEMS_META[slug] || {};
        const isNumQuery = /^\d+$/.test(String(query).trim());
        const queryNum = isNumQuery ? parseInt(String(query).trim(), 10) : null;
        const catalogEntry = catalogBySlug.get(slug) || (queryNum !== null ? catalogByNumber.get(queryNum) : null);
        const number = cp?.number || catalogEntry?.n || userState.number || queryNum;
        const title = meta.title || catalogEntry?.t || userState.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const difficulty = meta.difficulty || catalogEntry?.d || userState.difficulty || 'Medium';
        const category = cp?.category || meta.category || catalogEntry?.c || userState.category || 'Algorithms';
        const suggestedPatternId = catalogEntry?.p || null;
        const suggestedPattern = suggestedPatternId ? patternsById.get(suggestedPatternId) : null;

        const categoryLangs = LanguagesModule?.CATEGORY_ALLOWED_LANGUAGES?.[category] || LanguagesModule?.CATEGORY_ALLOWED_LANGUAGES?.Algorithms || ['python3', 'cpp', 'java', 'javascript', 'typescript'];
        const languages = (Array.isArray(userState.languages) && userState.languages.length > 0)
          ? userState.languages
          : categoryLangs;

        const supportedLanguages = languages.map(slugId => {
          if (LanguagesModule?.getLanguageMeta) {
            return LanguagesModule.getLanguageMeta(slugId);
          }
          return { id: slugId, name: slugId, langSlug: slugId, displayName: slugId };
        }).filter(Boolean);

        return {
          problem: {
            id: number || slug,
            frontend_id: number ? String(number) : null,
            number,
            title,
            title_slug: slug,
            slug,
            difficulty,
            category,
            pattern_id: null,
            pattern_title: null,
            patterns: [],
            languages,
            verified: 0,
            verification_tier: 'unverified',
            review: { status: 'unverified' },
            source: userState.source || (catalogEntry ? 'catalog' : 'uncurated'),
            is_solved: userState.is_solved ? 1 : 0,
            user_notes: userState.user_notes || '',
            user_rating: userState.user_rating || 0,
            review_needed: userState.review_needed ? 1 : 0,
            supported_languages: supportedLanguages,
            hints: [],
            complexity: null
          },
          pattern: null,
          suggested_pattern: suggestedPattern,
          hints: [],
          complexity: null,
          supported_languages: supportedLanguages,
          verification_tier: 'unverified',
          verified: 0
        };
      }

      // Curated and verified problem
      const meta = CURATED_PROBLEMS_META[slug] || {};
      const primaryPatternId = cp.patterns?.[0] || null;
      const pattern = primaryPatternId ? patternsById.get(primaryPatternId) : null;
      const complexity = normalizeComplexity(cp.complexity);

      // Raw hints with generic and real titles
      const rawHints = (cp.hints || []).map(h => {
        const level = h.level || 1;
        const genericTitle = GENERIC_HINT_TITLES[level] || `Hint ${level}`;
        const realTitle = h.title;
        const text = h.text || h.content || '';
        return {
          level,
          genericTitle,
          realTitle,
          title: realTitle,
          text,
          content: text
        };
      });

      const category = cp.category || meta.category || 'Algorithms';
      const categoryLangs = LanguagesModule?.CATEGORY_ALLOWED_LANGUAGES?.[category] || LanguagesModule?.CATEGORY_ALLOWED_LANGUAGES?.Algorithms || ['python3', 'cpp', 'java', 'javascript', 'typescript'];
      const languages = (Array.isArray(cp.languages) && cp.languages.length > 0)
        ? cp.languages
        : categoryLangs;

      const problemObj = {
        id: cp.number,
        frontend_id: String(cp.number),
        number: cp.number,
        title: meta.title || cp.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        title_slug: cp.slug,
        slug: cp.slug,
        difficulty: meta.difficulty || 'Medium',
        category,
        pattern_id: primaryPatternId,
        pattern_title: pattern?.title || primaryPatternId,
        patterns: cp.patterns || [],
        languages,
        verified: 1,
        verification_tier: cp.review?.status || 'tested',
        review: cp.review,
        source: 'dataset',
        twist_type: meta.twist_type || cp.twist_type || '',
        is_solved: userState.is_solved ? 1 : 0,
        user_code: userState.user_code || '',
        user_notes: userState.user_notes || '',
        user_rating: userState.user_rating !== undefined ? userState.user_rating : 0,
        review_needed: userState.review_needed ? 1 : 0,
        solutions: cp.solutions || [],
        complexity
      };

      const supportedLanguages = languages.map(slugId => {
        if (LanguagesModule?.getLanguageMeta) {
          return LanguagesModule.getLanguageMeta(slugId);
        }
        return { id: slugId, name: slugId, langSlug: slugId, displayName: slugId };
      }).filter(Boolean);

      problemObj.supported_languages = supportedLanguages;

      return {
        problem: problemObj,
        pattern,
        suggested_pattern: pattern,
        hints: rawHints,
        complexity,
        supported_languages: supportedLanguages,
        verification_tier: cp.review?.status || 'tested',
        verified: 1
      };
    },

    async updateProblemUserState(idOrSlug, updates = {}) {
      const slug = resolveProblemSlug(idOrSlug, dataset.index, rawCatalog);
      if (!slug) throw new Error(`Problem not found for identifier: ${idOrSlug}`);

      const userProblems = (await store.get(STORAGE_KEY_USER_PROBLEMS)) || {};
      const current = userProblems[slug] || {};

      const next = {
        ...current,
        slug
      };

      if (updates.is_solved !== undefined) next.is_solved = updates.is_solved ? 1 : 0;
      if (updates.review_needed !== undefined) next.review_needed = updates.review_needed ? 1 : 0;
      if (updates.user_code !== undefined) next.user_code = updates.user_code;
      if (updates.user_notes !== undefined) next.user_notes = updates.user_notes;
      if (updates.user_rating !== undefined) next.user_rating = Number(updates.user_rating);
      if (updates.unlocked_hint_level !== undefined) next.unlocked_hint_level = Number(updates.unlocked_hint_level);

      userProblems[slug] = next;
      await store.set(STORAGE_KEY_USER_PROBLEMS, userProblems);

      const all = await this.getProblems();
      return all.find(p => p.slug === slug) || null;
    },

    async recordSubmission({ titleSlug, title_slug, slug: slugParam, questionId, questionFrontendId, frontend_id, number, title, difficulty, category, languages, code }) {
      const rawSlug = titleSlug || title_slug || slugParam;
      const rawNum = questionId || questionFrontendId || frontend_id || number;
      const slug = resolveProblemSlug(rawSlug || rawNum, dataset.index, rawCatalog);
      if (!slug) throw new Error('Cannot record submission without a valid problem slug or id');

      const userProblems = (await store.get(STORAGE_KEY_USER_PROBLEMS)) || {};
      const prev = userProblems[slug] || {};
      const wasNew = !prev.is_solved;

      const parsedNum = rawNum && /^\d+$/.test(String(rawNum)) ? parseInt(String(rawNum), 10) : (prev?.number || null);
      const catalogEntry = catalogBySlug.get(slug) || (parsedNum ? catalogByNumber.get(parsedNum) : null);

      const next = {
        ...prev,
        slug,
        is_solved: 1,
        solved_at: new Date().toISOString()
      };

      if (code) next.user_code = code;
      next.number = parsedNum !== null ? parsedNum : (catalogEntry?.n || prev?.number || null);
      next.title = title || catalogEntry?.t || prev?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      next.difficulty = difficulty || catalogEntry?.d || prev?.difficulty || 'Medium';
      next.category = category || catalogEntry?.c || prev?.category || 'Algorithms';
      if (languages) next.languages = languages;
      if (catalogEntry?.p && !next.pattern_id) {
        next.pattern_id = catalogEntry.p;
      }

      userProblems[slug] = next;
      await store.set(STORAGE_KEY_USER_PROBLEMS, userProblems);

      // Append log
      const logs = (await store.get(STORAGE_KEY_RECENT_LOGS)) || [];
      logs.unshift({
        timestamp: new Date().toISOString(),
        type: 'submission',
        message: `Solved ${title || slug}`
      });
      await store.set(STORAGE_KEY_RECENT_LOGS, logs.slice(0, 20));
      await store.set(STORAGE_KEY_LAST_SYNC, new Date().toISOString());

      return {
        success: true,
        newlySynced: wasNew ? 1 : 0,
        updatedCount: wasNew ? 0 : 1,
        totalProcessed: 1
      };
    },

    async syncBatch({ username, problems = [] }) {
      const userProblems = (await store.get(STORAGE_KEY_USER_PROBLEMS)) || {};
      let newlySynced = 0;
      let updatedCount = 0;

      for (const p of problems) {
        if (!p) continue;
        const rawSlug = p.title_slug || p.titleSlug || p.slug;
        const numberCandidate = p.frontend_id || p.questionFrontendId || p.questionId || p.number || p.id;
        const slug = rawSlug 
          ? resolveProblemSlug(rawSlug, dataset.index, rawCatalog) 
          : (numberCandidate ? resolveProblemSlug(numberCandidate, dataset.index, rawCatalog) : null);
        if (!slug) continue;

        const prev = userProblems[slug];
        const wasSolved = prev && prev.is_solved;

        if (!wasSolved) {
          newlySynced++;
        } else {
          updatedCount++;
        }

        const rawNum = p.questionFrontendId || p.frontend_id || p.questionId || p.number || p.id;
        const parsedNum = rawNum && /^\d+$/.test(String(rawNum)) ? parseInt(String(rawNum), 10) : (prev?.number || null);
        const catalogEntry = catalogBySlug.get(slug) || (parsedNum ? catalogByNumber.get(parsedNum) : null);

        userProblems[slug] = {
          ...prev,
          slug,
          number: parsedNum || catalogEntry?.n || prev?.number || null,
          title: p.title || catalogEntry?.t || prev?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          difficulty: p.difficulty || catalogEntry?.d || prev?.difficulty || 'Medium',
          category: p.categoryTitle || p.category || catalogEntry?.c || prev?.category || 'Algorithms',
          pattern_id: prev?.pattern_id || catalogEntry?.p || null,
          languages: p.languages || prev?.languages || [],
          is_solved: 1,
          solved_at: p.solved_at || prev?.solved_at || new Date().toISOString(),
          user_code: p.user_code || p.code || prev?.user_code || ''
        };
      }

      await store.set(STORAGE_KEY_USER_PROBLEMS, userProblems);
      if (username) {
        await store.set(STORAGE_KEY_USERNAME, username);
      }
      const now = new Date().toISOString();
      await store.set(STORAGE_KEY_LAST_SYNC, now);

      const logs = (await store.get(STORAGE_KEY_RECENT_LOGS)) || [];
      logs.unshift({
        timestamp: now,
        type: 'batch_sync',
        message: `Synced ${problems.length} problems for ${username || 'user'}`
      });
      await store.set(STORAGE_KEY_RECENT_LOGS, logs.slice(0, 20));

      return {
        success: true,
        newlySynced,
        updatedCount,
        totalProcessed: problems.length
      };
    },

    async getStats() {
      const problems = await this.getProblems();
      const patterns = this.getPatterns();

      const totalProblems = problems.length;
      const solvedProblems = problems.filter(p => Boolean(p.is_solved));
      const solvedCount = solvedProblems.length;
      const reviewQueueCount = problems.filter(p => Boolean(p.review_needed)).length;

      // Difficulty breakdown for solved problems
      const difficultyBreakdown = { Easy: 0, Medium: 0, Hard: 0 };
      for (const p of solvedProblems) {
        if (p.difficulty && difficultyBreakdown.hasOwnProperty(p.difficulty)) {
          difficultyBreakdown[p.difficulty]++;
        }
      }

      // Category distribution for solved problems
      const catCountMap = new Map();
      for (const p of solvedProblems) {
        const cat = p.category || 'Algorithms';
        catCountMap.set(cat, (catCountMap.get(cat) || 0) + 1);
      }
      const rawCategoryDist = Array.from(catCountMap.entries()).map(([category, count]) => ({
        category,
        count
      }));
      const categoryDistribution = sortCategoriesByPedagogy(rawCategoryDist);

      // Pattern distribution
      const rawPatternDist = patterns.map(pat => {
        const total = problems.filter(prob => prob?.pattern_id === pat.id || prob?.patterns?.includes(pat.id)).length;
        const solved = solvedProblems.filter(prob => prob?.pattern_id === pat.id || prob?.patterns?.includes(pat.id)).length;
        return {
          id: pat.id,
          pattern_id: pat.id,
          title: pat.title,
          pattern_title: pat.title,
          category: pat.category,
          difficulty: pat.difficulty,
          short_description: pat.short_description,
          total_problems: total,
          solved_problems: solved
        };
      });
      const patternDistribution = sortPatternsByPedagogy(rawPatternDist);

      const totalPatternsCount = patterns.length;
      const coveredPatternsCount = patternDistribution.filter(p => p.solved_problems > 0).length;
      const patternCoveragePercent = totalPatternsCount > 0
        ? Math.round((coveredPatternsCount / totalPatternsCount) * 100)
        : 0;

      // Identify weak spots: prioritized in pedagogical learning sequence
      const weakSpots = patternDistribution
        .filter(p => p.solved_problems === 0 || (p.solved_problems / Math.max(1, p.total_problems) < 0.5))
        .slice(0, 6);

      const lastSync = (await store.get(STORAGE_KEY_LAST_SYNC)) || null;
      const username = (await store.get(STORAGE_KEY_USERNAME)) || null;
      const recentLogs = (await store.get(STORAGE_KEY_RECENT_LOGS)) || [];

      return {
        totalProblems,
        solvedCount,
        totalSolved: solvedCount,
        reviewQueueCount,
        totalPatternsCount,
        coveredPatternsCount,
        patternCoveragePercent,
        difficultyBreakdown,
        categoryDistribution,
        patternDistribution,
        weakSpots,
        lastSync,
        username,
        recentLogs
      };
    },

    diagnoseWizard(payload) {
      const patterns = this.getPatterns();
      const wizard = new DiagnosticWizard(patterns);
      return wizard.diagnose(payload);
    }
  };
}

if (typeof globalThis !== 'undefined') {
  globalThis.createAsymptoteEngine = createAsymptoteEngine;
  globalThis.AsymptoteEngine = {
    createAsymptoteEngine,
    loadDatasetFromFetch,
    loadDatasetFromFs,
    createMemoryStorage,
    createLocalStorageAdapter,
    createChromeStorageAdapter,
    formatHintsForDisplay,
    getProblemSolutionCode,
    resolveProblemSlug,
    GENERIC_HINT_TITLES,
    CATEGORY_PEDAGOGICAL_ORDER,
    PATTERN_PEDAGOGICAL_ORDER,
    CURATED_PROBLEMS_META
  };
}
