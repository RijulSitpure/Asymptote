// generated, do not edit - source: shared/classifier.js
/**
 * Comprehensive Algorithmic Pattern Classifier & Socratic Hint Generator
 * Categorizes problems into 37+ granular patterns across all algorithmic domains.
 */

export class PatternClassifier {
  constructor(patterns = []) {
    this.patterns = patterns;
  }

  /**
   * Classify problem by tags, title, constraints, and content
   */
  classify(problemData) {
    const title = (problemData.title || '').toLowerCase();
    const slug = (problemData.titleSlug || '').toLowerCase();
    const tags = (problemData.topicTags || []).map(t => (t.name || t).toLowerCase());
    const content = (problemData.content || '').toLowerCase();
    const constraints = (problemData.constraints || '').toLowerCase();

    const fullText = `${title} ${slug} ${tags.join(' ')} ${content} ${constraints}`;

    // ==================== 1. GRAPH + DP COMBINATIONS ====================
    if (
      (fullText.includes('at most') && (fullText.includes('stops') || fullText.includes('steps') || fullText.includes('flights') || fullText.includes('time limit'))) ||
      slug.includes('cheapest-flights') ||
      slug.includes('minimum-cost-to-reach-destination-in-time')
    ) {
      return {
        pattern_id: 'graph-dp-k-steps',
        twist_type: 'Constrained Edge/Step Count (State expansion or Bellman-Ford round tracking)',
        confidence: 0.96
      };
    }

    if (
      (fullText.includes('visit all nodes') || fullText.includes('visiting all nodes') || fullText.includes('all keys') || fullText.includes('hamiltonian')) ||
      (tags.includes('bit manipulation') && tags.includes('graph')) ||
      (content.includes('n <= 15') || content.includes('n <= 12') || content.includes('1 <= n <= 16'))
    ) {
      return {
        pattern_id: 'graph-bitmask-all-nodes',
        twist_type: 'State Bitmask Compression (Subset representation with BFS / DP)',
        confidence: 0.95
      };
    }

    if (
      (tags.includes('tree') && (fullText.includes('for each node') || fullText.includes('sum of distances') || (fullText.includes('root') && fullText.includes('all nodes')))) ||
      slug.includes('sum-of-distances') ||
      slug.includes('minimum-height-trees')
    ) {
      return {
        pattern_id: 'graph-tree-rerooting',
        twist_type: '2-Pass Re-rooting Tree DP (Post-order bottom-up + Pre-order top-down)',
        confidence: 0.94
      };
    }

    if (
      (tags.includes('topological sort') && tags.includes('dynamic programming')) ||
      (fullText.includes('increasing path') && fullText.includes('matrix')) ||
      (fullText.includes('acyclic') && fullText.includes('longest path')) ||
      slug.includes('longest-increasing-path') ||
      slug.includes('parallel-courses')
    ) {
      return {
        pattern_id: 'graph-dp-dag',
        twist_type: 'Topological Order DP / Memoized DFS on implicit DAG',
        confidence: 0.95
      };
    }

    // ==================== 2. GRAPHS (0/1 BFS, DIJKSTRA, TOPOLOGICAL, DSU) ====================
    if (
      (fullText.includes('0') && fullText.includes('1') && fullText.includes('cost') && tags.includes('breadth-first search')) ||
      slug.includes('minimum-cost-to-make-at-least-one-valid-path') ||
      slug.includes('minimum-obstacle-removal')
    ) {
      return {
        pattern_id: 'graph-01-bfs',
        twist_type: '0/1 BFS Deque Optimization (O(V+E) Dijkstra replacement)',
        confidence: 0.93
      };
    }

    if (
      tags.includes('union find') ||
      fullText.includes('union find') ||
      fullText.includes('disjoint set') ||
      slug.includes('redundant-connection') ||
      slug.includes('number-of-provinces') ||
      slug.includes('connected-components')
    ) {
      return {
        pattern_id: 'graph-union-find-dsu',
        twist_type: 'Disjoint Set Union (Connected components & cycle detection)',
        confidence: 0.92
      };
    }

    if (
      tags.includes('shortest path') ||
      slug.includes('network-delay') ||
      slug.includes('path-with-minimum-effort') ||
      slug.includes('swim-in-rising-water')
    ) {
      return {
        pattern_id: 'graph-dijkstra',
        twist_type: 'Dijkstra Shortest Path with Min-Heap',
        confidence: 0.92
      };
    }

    if (
      tags.includes('topological sort') ||
      slug.includes('course-schedule') ||
      slug.includes('alien-dictionary')
    ) {
      return {
        pattern_id: 'graph-topo-kahn',
        twist_type: 'Topological Sort (Kahn In-Degree / Cycle Detection)',
        confidence: 0.94
      };
    }

    if (
      (tags.includes('breadth-first search') && (tags.includes('matrix') || tags.includes('grid'))) ||
      slug.includes('rotting-oranges') ||
      slug.includes('01-matrix') ||
      slug.includes('shortest-path-in-binary-matrix')
    ) {
      return {
        pattern_id: 'graph-bfs-shortest-path',
        twist_type: 'Multi-Source BFS / Unweighted Level-by-Level Shortest Path',
        confidence: 0.91
      };
    }

    // ==================== 3. DYNAMIC PROGRAMMING ARCHETYPES ====================
    if (
      (fullText.includes('interval') && tags.includes('dynamic programming')) ||
      fullText.includes('burst balloons') ||
      fullText.includes('merge stones') ||
      slug.includes('burst-balloons')
    ) {
      return {
        pattern_id: 'dp-interval',
        twist_type: 'Interval DP (Window length iteration with optimal split point k)',
        confidence: 0.92
      };
    }

    if (
      (tags.includes('dynamic programming') && (fullText.includes('stock') || fullText.includes('cooldown') || fullText.includes('state machine'))) ||
      slug.includes('best-time-to-buy-and-sell-stock')
    ) {
      return {
        pattern_id: 'dp-state-machine',
        twist_type: 'State Machine DP (Mutually exclusive operational mode transitions)',
        confidence: 0.91
      };
    }

    if (
      slug.includes('longest-common-subsequence') ||
      slug.includes('edit-distance') ||
      slug.includes('interleaving-string') ||
      (tags.includes('string') && tags.includes('dynamic programming') && (fullText.includes('subsequence') || fullText.includes('edit distance')))
    ) {
      return {
        pattern_id: 'dp-longest-common-subseq',
        twist_type: '2-Sequence String DP (Matrix grid of prefix comparisons)',
        confidence: 0.93
      };
    }

    if (
      slug.includes('partition-equal-subset-sum') ||
      slug.includes('coin-change') ||
      slug.includes('target-sum') ||
      fullText.includes('knapsack') ||
      (tags.includes('dynamic programming') && (fullText.includes('subset sum') || fullText.includes('coin change')))
    ) {
      return {
        pattern_id: 'dp-knapsack-variants',
        twist_type: '0/1 or Unbounded Knapsack (Backward/Forward weight iteration)',
        confidence: 0.92
      };
    }

    if (
      (tags.includes('dynamic programming') && (tags.includes('matrix') || fullText.includes('grid') || fullText.includes('unique paths') || fullText.includes('minimum path sum'))) ||
      slug.includes('unique-paths') ||
      slug.includes('minimum-path-sum') ||
      slug.includes('maximal-square')
    ) {
      return {
        pattern_id: 'dp-grid-2d',
        twist_type: '2D Grid DP (Accumulation across rows and columns)',
        confidence: 0.92
      };
    }

    if (
      slug.includes('house-robber') ||
      slug.includes('climbing-stairs') ||
      slug.includes('decode-ways')
    ) {
      return {
        pattern_id: 'dp-1d-fib-linear',
        twist_type: '1D Linear DP (Constant lookback sequential choice)',
        confidence: 0.94
      };
    }

    // ==================== 4. STACKS & QUEUES ====================
    if (
      tags.includes('monotonic stack') ||
      slug.includes('daily-temperatures') ||
      slug.includes('largest-rectangle-in-histogram') ||
      slug.includes('maximal-rectangle') ||
      slug.includes('trapping-rain-water') ||
      fullText.includes('next greater')
    ) {
      return {
        pattern_id: 'stack-monotonic-next-greater',
        twist_type: 'Monotonic Stack (O(N) index boundary calculation)',
        confidence: 0.95
      };
    }

    if (
      slug.includes('sliding-window-maximum') ||
      slug.includes('constrained-subsequence-sum') ||
      fullText.includes('monotonic deque') ||
      tags.includes('monotonic queue')
    ) {
      return {
        pattern_id: 'queue-monotonic-sliding-window',
        twist_type: 'Monotonic Deque (Sliding window extremum in O(1))',
        confidence: 0.93
      };
    }

    if (
      slug.includes('valid-parentheses') ||
      slug.includes('basic-calculator') ||
      slug.includes('asteroid-collision') ||
      slug.includes('decode-string') ||
      (tags.includes('stack') && (fullText.includes('parenthes') || fullText.includes('calculator') || fullText.includes('expression')))
    ) {
      return {
        pattern_id: 'stack-parentheses-parser',
        twist_type: 'Stack for Nested Enclosure Matching & Expression Evaluation',
        confidence: 0.93
      };
    }

    // ==================== 5. TWO POINTERS & SLIDING WINDOW ====================
    if (
      tags.includes('sliding window') ||
      slug.includes('longest-substring') ||
      slug.includes('minimum-window') ||
      fullText.includes('at most k distinct')
    ) {
      return {
        pattern_id: 'two-pointers-window-dynamic',
        twist_type: 'Dynamic Sliding Window (Shrink left upon constraint violation)',
        confidence: 0.92
      };
    }

    if (
      slug.includes('find-all-anagrams') ||
      slug.includes('permutation-in-string') ||
      slug.includes('maximum-average-subarray')
    ) {
      return {
        pattern_id: 'sliding-window-fixed',
        twist_type: 'Fixed Size Sliding Window (Rolling window of length K)',
        confidence: 0.93
      };
    }

    if (
      slug.includes('linked-list-cycle') ||
      slug.includes('find-the-duplicate-number') ||
      slug.includes('happy-number') ||
      (tags.includes('two pointers') && fullText.includes('cycle'))
    ) {
      return {
        pattern_id: 'two-pointers-fast-slow',
        twist_type: 'Fast & Slow Pointers (Floyd Tortoise and Hare Cycle Finding)',
        confidence: 0.94
      };
    }

    if (
      slug.includes('two-sum-ii') ||
      slug.includes('3sum') ||
      slug.includes('container-with-most-water') ||
      slug.includes('valid-palindrome') ||
      (tags.includes('two pointers') && fullText.includes('sorted'))
    ) {
      return {
        pattern_id: 'two-pointers-opposite',
        twist_type: 'Opposite Ends Two Pointers (Converging inward on sorted array)',
        confidence: 0.92
      };
    }

    if (
      slug.includes('subarray-sum-equals-k') ||
      slug.includes('contiguous-array') ||
      slug.includes('subarray-sums-divisible') ||
      (tags.includes('prefix sum') && tags.includes('hash table'))
    ) {
      return {
        pattern_id: 'prefix-sum-hashmap',
        twist_type: 'Prefix Sum + Hash Map (Exact Target Subarray Matching)',
        confidence: 0.94
      };
    }

    if (
      slug.includes('maximum-subarray') ||
      slug.includes('maximum-product-subarray') ||
      fullText.includes('kadane')
    ) {
      return {
        pattern_id: 'array-kadane',
        twist_type: 'Kadane Algorithm (Contiguous Maximum Subarray in O(1) space)',
        confidence: 0.94
      };
    }

    // ==================== 6. BINARY SEARCH ====================
    if (
      slug.includes('search-in-rotated-sorted-array') ||
      slug.includes('find-minimum-in-rotated')
    ) {
      return {
        pattern_id: 'binary-search-rotated',
        twist_type: 'Binary Search on Rotated Segmented Array',
        confidence: 0.95
      };
    }

    if (
      (tags.includes('binary search') && (fullText.includes('minimum') || fullText.includes('maximum') || fullText.includes('capacity') || fullText.includes('koko'))) ||
      slug.includes('capacity-to-ship') ||
      slug.includes('koko-eating-bananas') ||
      slug.includes('split-array-largest-sum')
    ) {
      return {
        pattern_id: 'binary-search-answer',
        twist_type: 'Binary Search on Answer Space (Monotonic Feasibility Function)',
        confidence: 0.93
      };
    }

    // ==================== 7. TREES & TRIE ====================
    if (
      tags.includes('trie') ||
      slug.includes('implement-trie') ||
      slug.includes('word-search-ii') ||
      slug.includes('maximum-xor-of-two-numbers')
    ) {
      return {
        pattern_id: 'tree-trie-prefix',
        twist_type: 'Trie / Prefix Tree (Character and Bitwise Prefix Indexing)',
        confidence: 0.94
      };
    }

    if (
      tags.includes('binary search tree') ||
      slug.includes('validate-binary-search-tree') ||
      slug.includes('kth-smallest-element-in-a-bst')
    ) {
      return {
        pattern_id: 'tree-bst-properties',
        twist_type: 'Binary Search Tree (Inorder Sorted Property & Bounds)',
        confidence: 0.93
      };
    }

    if (
      slug.includes('binary-tree-level-order') ||
      slug.includes('binary-tree-right-side-view') ||
      slug.includes('zigzag')
    ) {
      return {
        pattern_id: 'tree-bfs-level-order',
        twist_type: 'Tree BFS (Queue Level-Order Traversal)',
        confidence: 0.93
      };
    }

    if (
      tags.includes('tree') ||
      tags.includes('binary tree') ||
      slug.includes('binary-tree-maximum-path-sum') ||
      slug.includes('diameter-of-binary-tree')
    ) {
      return {
        pattern_id: 'tree-dfs-subproblem',
        twist_type: 'Tree DFS (Subtree Bottom-Up Divide & Conquer)',
        confidence: 0.90
      };
    }

    // ==================== 8. HEAP / PRIORITY QUEUE ====================
    if (
      slug.includes('find-median-from-data-stream') ||
      slug.includes('sliding-window-median')
    ) {
      return {
        pattern_id: 'heap-two-heaps-median',
        twist_type: 'Two Heaps (Balanced Min/Max Heaps for Running Median)',
        confidence: 0.95
      };
    }

    if (
      tags.includes('heap (priority queue)') ||
      slug.includes('kth-largest-element') ||
      slug.includes('top-k-frequent') ||
      slug.includes('k-closest-points')
    ) {
      return {
        pattern_id: 'heap-top-k-elements',
        twist_type: 'Min-Heap of Size K (Streaming Top-K Retention)',
        confidence: 0.92
      };
    }

    // ==================== 9. BACKTRACKING ====================
    if (
      slug.includes('word-search') ||
      slug.includes('n-queens') ||
      slug.includes('sudoku-solver')
    ) {
      return {
        pattern_id: 'backtracking-grid-dfs',
        twist_type: 'Grid / Board Backtracking with In-Place Visited Restore',
        confidence: 0.93
      };
    }

    if (
      tags.includes('backtracking') ||
      slug.includes('subsets') ||
      slug.includes('permutations') ||
      slug.includes('combination-sum')
    ) {
      return {
        pattern_id: 'backtracking-subsets-perm',
        twist_type: 'Backtracking (Recursive Subset/Permutation with Duplicate Pruning)',
        confidence: 0.93
      };
    }

    // ==================== 10. GREEDY & BIT MANIPULATION ====================
    if (
      slug.includes('merge-intervals') ||
      slug.includes('non-overlapping-intervals') ||
      slug.includes('meeting-rooms') ||
      slug.includes('minimum-number-of-arrows')
    ) {
      return {
        pattern_id: 'greedy-interval-scheduling',
        twist_type: 'Interval Scheduling & Merging (Greedy Sorting by Boundaries)',
        confidence: 0.93
      };
    }

    if (
      tags.includes('bit manipulation') ||
      slug.includes('single-number') ||
      slug.includes('counting-bits') ||
      slug.includes('number-of-1-bits')
    ) {
      return {
        pattern_id: 'bit-manipulation-tricks',
        twist_type: 'Bit Manipulation Invariants (XOR Cancellation & Bitmask Masks)',
        confidence: 0.91
      };
    }

    // Default Fallbacks
    if (tags.includes('dynamic programming')) {
      return {
        pattern_id: 'dp-1d-fib-linear',
        twist_type: 'Dynamic Programming Subproblem State Transition',
        confidence: 0.65
      };
    }

    if (tags.includes('graph')) {
      return {
        pattern_id: 'graph-bfs-shortest-path',
        twist_type: 'Graph Traversal State',
        confidence: 0.65
      };
    }

    return {
      pattern_id: null,
      twist_type: null,
      confidence: 0
    };
  }

  /**
   * Progressive Socratic hints are only returned for curated, verified problems.
   */
  generateProgressiveHints(_problem, _pattern) {
    return [];
  }
}

if (typeof globalThis !== 'undefined') {
  globalThis.PatternClassifier = PatternClassifier;
}
