/**
 * Algorithmic Pattern Curriculum Map & Pedagogical Ordering (Client)
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
  // 1. Arrays & Hashing
  'prefix-sum-hashmap',
  'array-kadane',

  // 2. Two Pointers
  'two-pointers-opposite',
  'two-pointers-fast-slow',
  'sliding-window-fixed',
  'two-pointers-window-dynamic',

  // 3. Binary Search
  'binary-search-rotated',
  'binary-search-answer',

  // 4. Stacks & Queues
  'stack-parentheses-parser',
  'stack-monotonic-next-greater',
  'queue-monotonic-sliding-window',

  // 5. Trees
  'tree-bfs-level-order',
  'tree-dfs-subproblem',
  'tree-bst-properties',
  'tree-trie-prefix',

  // 6. Heap / Priority Queue
  'heap-top-k-elements',
  'heap-two-heaps-median',

  // 7. Backtracking
  'backtracking-subsets-perm',
  'backtracking-grid-dfs',

  // 8. Greedy & Intervals
  'greedy-interval-scheduling',

  // 9. Graph Traversal
  'graph-bfs-shortest-path',
  'graph-topo-kahn',
  'graph-union-find-dsu',
  'graph-01-bfs',
  'graph-dijkstra',

  // 10. Bit Manipulation
  'bit-manipulation-tricks',

  // 11. Dynamic Programming
  'dp-1d-fib-linear',
  'dp-grid-2d',
  'dp-knapsack-variants',
  'dp-state-machine',
  'dp-longest-common-subseq',
  'dp-interval',
  'dp-bitmask',

  // 12. Graph + DP
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
