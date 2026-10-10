/**
 * Interactive Diagnostic Wizard
 * Helps users identify the right pattern when facing an unfamiliar problem.
 */

export class DiagnosticWizard {
  constructor(patterns = []) {
    this.patterns = patterns;
  }

  diagnose({ structure, constraints, goal, properties = [] }) {
    const candidates = [];

    // Rule 1: Small N <= 15 with Graph or Subsets
    if (constraints === 'n_small' || constraints === 'n_15') {
      candidates.push({
        pattern_id: 'graph-bitmask-all-nodes',
        score: 95,
        reason: 'Constraint N <= 15 allows 2^N state representations (2^15 = 32,768). Bitmask DP or Multi-source BFS with Bitmask is almost certainly intended.'
      });
    }

    // Rule 2: Graph with at most K steps / time limit
    if (goal === 'k_steps' || properties.includes('limited_steps') || properties.includes('time_bounded')) {
      candidates.push({
        pattern_id: 'graph-dp-k-steps',
        score: 96,
        reason: 'Bounded edge count K breaks standard Dijkstra because a shorter edge path might cost more money. Bellman-Ford or DP state dp[node][steps] is optimal.'
      });
    }

    // Rule 3: DAG or Strictly increasing values on Grid/Graph
    if (structure === 'dag' || properties.includes('strictly_increasing') || properties.includes('topological')) {
      candidates.push({
        pattern_id: 'graph-dp-dag',
        score: 94,
        reason: 'Acyclic property (DAG) guarantees zero cycles. Topological Sort + DP or Memoized DFS processes all states in O(V + E) linear time.'
      });
    }

    // Rule 4: Binary edge weights (0 and 1 only)
    if (properties.includes('binary_weights') || properties.includes('zero_one_cost')) {
      candidates.push({
        pattern_id: 'graph-01-bfs',
        score: 93,
        reason: 'When edge costs are strictly 0 and 1, a Double-Ended Queue (0-1 BFS) achieves O(V + E) time without the log(V) heap overhead of Dijkstra.'
      });
    }

    // Rule 5: N <= 400 with interval merges or matrix chains
    if (constraints === 'n_400' && (goal === 'merge' || goal === 'interval_partition' || properties.includes('burst_merge'))) {
      candidates.push({
        pattern_id: 'dp-interval',
        score: 90,
        reason: 'Constraint N <= 400 is the hallmark of O(N^3) Interval DP. Iterate over window lengths and test every possible split point k.'
      });
    }

    // Rule 6: Unrooted tree requiring answers for all nodes
    if (structure === 'tree' && goal === 'all_roots') {
      candidates.push({
        pattern_id: 'graph-tree-rerooting',
        score: 95,
        reason: 'Calculating tree aggregates for every possible root in O(N) requires 2-pass Re-rooting DP: post-order bottom-up, then pre-order top-down.'
      });
    }

    // Rule 7: Next greater / smaller element on array
    if (goal === 'next_greater' || properties.includes('histogram') || properties.includes('first_larger')) {
      candidates.push({
        pattern_id: 'stack-monotonic-next-greater',
        score: 92,
        reason: 'Maintaining indices on a Monotonic Stack finds the next/previous greater/smaller element for all N elements in a single O(N) pass.'
      });
    }

    // Rule 8: Bounded range with monotonic verification isValid(X)
    if (goal === 'min_max' || goal === 'max_min' || constraints === 'range_10_9') {
      candidates.push({
        pattern_id: 'binary-search-answer',
        score: 89,
        reason: 'When the objective asks to "minimize the maximum" or "maximize the minimum" over an integer range, binary search on the answer space with a greedy feasibility check.'
      });
    }

    // Rule 9: Dynamic sliding window on contiguous arrays
    if (structure === 'array' && goal === 'longest_valid_subarray' && properties.includes('all_positive')) {
      candidates.push({
        pattern_id: 'two-pointers-window-dynamic',
        score: 86,
        reason: 'Contiguous subarray with monotonic property (e.g. adding elements never decreases sum) fits the Dynamic Sliding Window pattern.'
      });
    }

    // Rule 10: Mutually exclusive state transitions (Hold, Sold, Rest)
    if (properties.includes('state_machine') || properties.includes('cooldown')) {
      candidates.push({
        pattern_id: 'dp-state-machine',
        score: 91,
        reason: 'System moves between 2-4 distinct discrete states. Maintain rolling variables for each state across iterations.'
      });
    }

    // Fallback if none scored high
    if (candidates.length === 0) {
      if (structure === 'graph') {
        candidates.push({
          pattern_id: 'graph-dp-dag',
          score: 70,
          reason: 'Consider checking if the graph is a DAG or if cycles can be eliminated with memoization/visited state.'
        });
      } else {
        candidates.push({
          pattern_id: 'dp-state-machine',
          score: 65,
          reason: 'Consider defining subproblem states and checking transitions.'
        });
      }
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
