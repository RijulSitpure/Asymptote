/**
 * Algorithmic Pattern Curriculum Map & Pedagogical Ordering
 * Defines the natural learning progression: Foundations (Arrays, Two Pointers) -> Hierarchical -> Graphs -> DP (Capstone)
 */

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
  'Graph + DP'
];

export const PATTERN_PEDAGOGICAL_ORDER = [
  // 1. Arrays & Hashing (Foundational array indexing, hash maps, frequency, prefix sums, Kadane)
  'prefix-sum-hashmap',
  'array-kadane',

  // 2. Two Pointers (Linear scans, dynamic/fixed sliding windows, fast & slow cycle detection)
  'two-pointers-opposite',
  'two-pointers-fast-slow',
  'sliding-window-fixed',
  'two-pointers-window-dynamic',

  // 3. Binary Search (Monotonic space invariants, rotated arrays, answer-space search)
  'binary-search-rotated',
  'binary-search-answer',

  // 4. Stacks & Queues (LIFO/FIFO, syntactic balancing, monotonic stack/deque)
  'stack-parentheses-parser',
  'stack-monotonic-next-greater',
  'queue-monotonic-sliding-window',

  // 5. Trees (Subtree recursion/divide & conquer, level-order BFS, BST sorted invariants, Trie)
  'tree-bfs-level-order',
  'tree-dfs-subproblem',
  'tree-bst-properties',
  'tree-trie-prefix',

  // 6. Heap / Priority Queue (Running extremes, top K elements, streaming dual-heap median)
  'heap-top-k-elements',
  'heap-two-heaps-median',

  // 7. Backtracking (Exhaustive combinatorial exploration, permutations/subsets, grid DFS pruning)
  'backtracking-subsets-perm',
  'backtracking-grid-dfs',

  // 8. Greedy & Intervals (Locally optimal sorting, non-overlapping intervals, interval merging)
  'greedy-interval-scheduling',

  // 9. Graph Traversal (Multi-source BFS, Kahn's topological sort, DSU/Union-Find, 0-1 BFS, Dijkstra)
  'graph-bfs-shortest-path',
  'graph-topo-kahn',
  'graph-union-find-dsu',
  'graph-01-bfs',
  'graph-dijkstra',

  // 10. Bit Manipulation (Bitwise operators, XOR cancellation invariants, power of two)
  'bit-manipulation-tricks',

  // 11. Dynamic Programming (Subproblem memoization/tabulation, 1D linear, 2D grid, Knapsack, LCS, Interval DP, Bitmask DP)
  'dp-1d-fib-linear',
  'dp-grid-2d',
  'dp-knapsack-variants',
  'dp-state-machine',
  'dp-longest-common-subseq',
  'dp-interval',
  'dp-bitmask',

  // 12. Graph + DP (Capstone synthesis: DAG topological DP, constrained K-steps, graph bitmasks, tree re-rooting)
  'graph-dp-dag',
  'graph-dp-k-steps',
  'graph-bitmask-all-nodes',
  'graph-tree-rerooting'
];

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
  return [...patterns].sort((a, b) => {
    const aId = a.id || a.pattern_id;
    const bId = b.id || b.pattern_id;
    const aRank = getPatternRank(aId);
    const bRank = getPatternRank(bId);

    if (aRank !== 999 || bRank !== 999) {
      if (aRank !== bRank) return aRank - bRank;
    }

    const aCatRank = getCategoryRank(a.category || a.pattern_category);
    const bCatRank = getCategoryRank(b.category || b.pattern_category);
    if (aCatRank !== bCatRank) return aCatRank - bCatRank;

    return (a.title || a.pattern_title || '').localeCompare(b.title || b.pattern_title || '');
  });
}

export function sortCategoriesByPedagogy(categories = []) {
  return [...categories].sort((a, b) => {
    const aCat = typeof a === 'string' ? a : (a.category || a.name || a.fullName || '');
    const bCat = typeof b === 'string' ? b : (b.category || b.name || b.fullName || '');
    const aRank = getCategoryRank(aCat);
    const bRank = getCategoryRank(bCat);
    if (aRank !== bRank) return aRank - bRank;
    return aCat.localeCompare(bCat);
  });
}
