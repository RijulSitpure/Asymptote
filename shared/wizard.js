/**
 * Interactive Diagnostic Wizard
 * Deductive reasoning engine that maps problem geometry, scale constraints,
 * objectives, and structural properties to the optimal algorithmic pattern.
 */

export class DiagnosticWizard {
  constructor(patterns = []) {
    this.patterns = patterns;
  }

  diagnose({ structure, constraints, goal, properties = [], property }) {
    const props = Array.isArray(properties) && properties.length > 0
      ? properties
      : (property ? [property] : (properties ? [properties] : []));

    const candidates = [];

    const addCandidate = (pattern_id, score, reason) => {
      const existing = candidates.find(c => c.pattern_id === pattern_id);
      if (existing) {
        if (score > existing.score) {
          existing.score = score;
          existing.reason = reason;
        }
      } else {
        candidates.push({ pattern_id, score, reason });
      }
    };

    // 1. Small N <= 16 (Exponential / 2^N Bitmask / Subsets / TSP)
    if (constraints === 'n_small' || constraints === 'n_15' || constraints === 'n_16') {
      if (structure === 'graph' || structure === 'grid' || goal === 'shortest_all_nodes') {
        addCandidate(
          'graph-bitmask-all-nodes',
          98,
          'Constraint N <= 16 with visiting all nodes/collecting keys is the classic state-compressed BFS / Traveling Salesperson bitmask pattern.'
        );
      } else {
        addCandidate(
          'dp-bitmask',
          96,
          'Constraint N <= 16 allows representing chosen elements as bitmask integers (1 << N states) for optimal assignment or subset DP.'
        );
        addCandidate(
          'backtracking-subsets-perm',
          90,
          'Exponential bounds (N <= 16) also allow exhaustive backtracking with branch-and-bound pruning.'
        );
      }
    }

    // 2. Graph with at most K steps / edge threshold
    if (goal === 'k_steps' || props.includes('limited_steps') || props.includes('time_bounded')) {
      addCandidate(
        'graph-dp-k-steps',
        97,
        'Bounded edge count K breaks standard greedy Dijkstra because a shorter edge path might cost more money. Bellman-Ford or DP state dp[node][steps] is optimal.'
      );
    }

    // 3. Shortest all nodes / collect keys / TSP
    if (goal === 'shortest_all_nodes') {
      addCandidate(
        'graph-bitmask-all-nodes',
        98,
        'Collecting all keys, visiting all vertices, or Hamiltonian cycles on small graphs requires storing visited status in a bitmask integer alongside the current node in BFS/DP.'
      );
    }

    // 4. DAG or Strictly increasing values on Grid/Graph
    if (structure === 'dag' || props.includes('strictly_increasing') || props.includes('topological')) {
      addCandidate(
        'graph-dp-dag',
        95,
        'Acyclic property (DAG) guarantees zero cycles. Topological Sort + DP or Memoized DFS processes all states in O(V + E) linear time.'
      );
      addCandidate(
        'graph-topo-kahn',
        91,
        "Kahn's in-degree queue determines valid prerequisite ordering and detects unexpected cycles in O(V + E)."
      );
    }

    // 5. Binary edge weights (0 and 1 only)
    if (props.includes('binary_weights') || props.includes('zero_one_cost')) {
      addCandidate(
        'graph-01-bfs',
        96,
        'When edge costs are strictly 0 and 1, a Double-Ended Queue (0-1 BFS) achieves O(V + E) time without the log(V) heap overhead of Dijkstra.'
      );
    }

    // 6. N <= 400 with interval merges or matrix chains
    if (constraints === 'n_400' || goal === 'merge' || props.includes('burst_merge') || goal === 'interval_partition') {
      addCandidate(
        'dp-interval',
        94,
        'Constraint N <= 400 with adjacent element merging is the hallmark of O(N^3) Interval DP. Iterate over window lengths and test every possible split point k.'
      );
    }

    // 7. Tree properties and re-rooting
    if (structure === 'tree') {
      if (goal === 'all_roots') {
        addCandidate(
          'graph-tree-rerooting',
          98,
          'Calculating tree aggregates for every possible root in O(N) requires 2-pass Re-rooting DP: post-order bottom-up, then pre-order top-down.'
        );
      } else if (goal === 'longest_path') {
        addCandidate(
          'tree-dfs-subproblem',
          95,
          'Tree diameter and longest branch paths decompose into post-order DFS subproblems returning child depths to parents.'
        );
      } else {
        addCandidate(
          'tree-dfs-subproblem',
          92,
          'Hierarchical tree subproblems are solved recursively by combining sub-answers from left and right child subtrees in O(N).'
        );
        addCandidate(
          'tree-bfs-level-order',
          88,
          'Level-by-level breadth-first search is optimal for breadth, horizontal widths, and shallowest path discoveries.'
        );
      }
    }

    // 8. Next greater / smaller element on array
    if (goal === 'next_greater' || props.includes('histogram') || props.includes('first_larger')) {
      addCandidate(
        'stack-monotonic-next-greater',
        96,
        'Maintaining indices on a Monotonic Stack finds the next/previous greater/smaller element for all N elements in a single O(N) pass.'
      );
      addCandidate(
        'queue-monotonic-sliding-window',
        89,
        'If the extremum query operates over a sliding window rather than the full array, a Monotonic Deque maintains window min/max in O(N).'
      );
    }

    // 9. Bounded range with monotonic verification isValid(X) / Min-Max
    if (goal === 'min_max' || goal === 'max_min' || constraints === 'range_10_9') {
      addCandidate(
        'binary-search-answer',
        95,
        'When the objective asks to "minimize the maximum" or "maximize the minimum" over an integer range, binary search on the answer space with a greedy feasibility check runs in O(N log(range)).'
      );
    }

    // 10. Contiguous subarrays & sliding windows
    if (goal === 'longest_valid_subarray' || structure === 'array') {
      if (goal === 'longest_valid_subarray') {
        addCandidate(
          'two-pointers-window-dynamic',
          94,
          'Contiguous subarray with monotonic property (expand right, shrink left upon invalid state) fits the Dynamic Sliding Window pattern in O(N).'
        );
        addCandidate(
          'sliding-window-fixed',
          88,
          'If the subarray size K is fixed or asking for maximum sum of length K, maintain a rolling sliding window sum in O(N).'
        );
        addCandidate(
          'prefix-sum-hashmap',
          85,
          'If values can be negative or condition requires exact target sum (subarray sum = K), Prefix Sum + Hash Map finds matches in O(N) time.'
        );
      }
    }

    // 11. Mutually exclusive state transitions (Hold, Sold, Cooldown)
    if (props.includes('state_machine') || props.includes('cooldown')) {
      addCandidate(
        'dp-state-machine',
        95,
        'System moves between 2-4 distinct discrete states (e.g. Hold, Sold, Rest). Maintain rolling variables for each state across iterations in O(1) space.'
      );
    }

    // 12. 2D Grid & Matrix Navigation
    if (structure === 'grid') {
      if (constraints === 'n_2000' || goal === 'longest_path') {
        addCandidate(
          'dp-grid-2d',
          93,
          '2D Grid DP evaluates optimal paths from (0,0) to (M,N) where cell dp[i][j] depends on adjacent neighbors dp[i-1][j] and dp[i][j-1].'
        );
      } else {
        addCandidate(
          'graph-bfs-shortest-path',
          91,
          'Unweighted 2D grid pathfinding uses multi-source BFS with a visited matrix to discover minimum steps in O(R * C).'
        );
        addCandidate(
          'backtracking-grid-dfs',
          86,
          'Grid exploration with word search or visited cell backtracking explores paths with in-place mutation and restoration.'
        );
      }
    }

    // 13. String / Two-Sequence Comparisons
    if (structure === 'string') {
      if (constraints === 'n_2000' || goal === 'longest_path') {
        addCandidate(
          'dp-longest-common-subseq',
          93,
          'Two-string sequence comparisons (LCS, Edit Distance) compare prefixes s1[0..i] and s2[0..j] in O(M * N) dynamic programming.'
        );
      } else {
        addCandidate(
          'two-pointers-opposite',
          89,
          'Palindrome verification and string reverse scans use opposite ends two pointers meeting in the center in O(N).'
        );
      }
    }

    // 14. General Graph Traversal
    if (structure === 'graph' && candidates.length === 0) {
      addCandidate(
        'graph-dijkstra',
        90,
        "General graphs with non-negative weights use Dijkstra's Algorithm with a Priority Queue in O((V + E) log V)."
      );
      addCandidate(
        'graph-union-find-dsu',
        86,
        'Connected components, redundant edge cycle detection, and Kruskal MST utilize Disjoint Set Union (DSU) with path compression.'
      );
    }

    // 15. General 1D Array Optimization
    if (structure === 'array' && candidates.length === 0) {
      if (constraints === 'n_2000') {
        addCandidate(
          'dp-1d-fib-linear',
          90,
          'Subproblem memoization on 1D sequences (House Robber, LIS, Jump Game) evaluates optimal decisions at index i in O(N) or O(N^2).'
        );
      } else {
        addCandidate(
          'two-pointers-opposite',
          87,
          'Sorted array targets (Two Sum II, 3Sum, Container With Most Water) collapse to O(N) with inward-moving pointers.'
        );
        addCandidate(
          'prefix-sum-hashmap',
          85,
          'Cumulative sum tracking with hash map resolves subarray questions in a single linear pass.'
        );
      }
    }

    // Fallback if none scored high
    if (candidates.length === 0) {
      addCandidate(
        'two-pointers-window-dynamic',
        75,
        'Consider if the problem constraints can be framed as a sliding window or two-pointer scan.'
      );
      addCandidate(
        'prefix-sum-hashmap',
        70,
        'Consider if a running prefix sum and hash map can resolve subproblems in linear time.'
      );
    }

    // Sort by score descending
    candidates.sort((a, b) => b.score - a.score);

    // Enrich with pattern details
    return candidates.map(c => {
      const p = this.patterns.find(item => item.id === c.pattern_id);
      return {
        ...c,
        pattern: p || null
      };
    });
  }
}

if (typeof globalThis !== 'undefined') {
  globalThis.DiagnosticWizard = DiagnosticWizard;
}
