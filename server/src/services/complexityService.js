/**
 * Complexity Targeter Engine
 * Analyzes problem constraints and algorithmic patterns to compute:
 * 1. Target Time & Space Complexity expected by interviewers.
 * 2. Why naive / brute force approaches trigger Time Limit Exceeded (TLE).
 * 3. Space-Time trade-offs and operational budget.
 */

export class ComplexityService {
  /**
   * Derive complexity guidance from pattern, constraints, and problem metadata
   */
  analyze(problem, pattern) {
    // Only return complexity for verified problems
    if (!problem || !problem.verified) {
      return null;
    }

    const patternId = pattern?.id || problem?.pattern_id || '';
    if (!patternId) {
      return null;
    }

    const rawConstraints = problem?.constraints || '';
    const difficulty = problem?.difficulty || 'Medium';

    // 1. Extract primary variable bounds (N, V, E, K, etc.)
    const bounds = this.extractBounds(rawConstraints, problem);
    if (!bounds) {
      return null;
    }

    // 2. Pattern-specific complexity blueprints
    const patternAnalysis = this.getPatternComplexity(patternId, bounds, difficulty);
    if (!patternAnalysis) {
      return null;
    }

    // 3. Operational budget calculation
    const budgetExplanation = this.calculateOpsBudget(bounds, patternAnalysis.targetTime);

    return {
      targetTime: patternAnalysis.targetTime,
      targetSpace: patternAnalysis.targetSpace,
      naiveApproach: patternAnalysis.naiveApproach,
      naiveComplexity: patternAnalysis.naiveComplexity,
      whyNaiveFails: patternAnalysis.whyNaiveFails,
      spaceTimeTradeoff: patternAnalysis.spaceTimeTradeoff,
      boundsSummary: bounds.summary,
      opsBudgetExplanation: budgetExplanation,
      interviewerExpectation: patternAnalysis.interviewerExpectation
    };
  }

  /**
   * Extract scale of N from constraints text or infer standard defaults
   */
  extractBounds(constraintsText, problem) {
    const text = (constraintsText + ' ' + (problem?.summary || '')).toLowerCase();
    
    // Look for explicit bounds like 10^5, 1000, 200, 15
    let maxN = null;

    if (text.includes('10^5') || text.includes('100,000') || text.includes('100000') || text.includes('1e5')) {
      maxN = 100000;
    } else if (text.includes('10^4') || text.includes('10,000') || text.includes('10000')) {
      maxN = 10000;
    } else if (text.includes('10^6') || text.includes('1,000,000') || text.includes('1e6')) {
      maxN = 1000000;
    } else if (text.includes('2000') || text.includes('5000')) {
      maxN = 3000;
    } else if (text.includes('500') || text.includes('400')) {
      maxN = 500;
    } else if (text.includes('n <= 15') || text.includes('n <= 16') || text.includes('n <= 12')) {
      maxN = 16;
    } else if (text.includes('n <= 20')) {
      maxN = 20;
    } else if (text.includes('10^9') || text.includes('2^31')) {
      maxN = 1000000000;
    } else if (text.includes('n <= 100') || text.includes('100')) {
      maxN = 100;
    } else if (text.includes('n <= 300') || text.includes('300')) {
      maxN = 300;
    }

    // If constraints cannot be parsed, return null instead of guessing default
    if (!maxN) {
      return null;
    }

    return {
      maxN,
      summary: maxN >= 100000 ? `N ≈ 10⁵ (Large array / stream)` : maxN <= 20 ? `N ≤ ${maxN} (Exponential scale)` : maxN <= 500 ? `N ≤ ${maxN} (Quadratic / Cubic budget)` : `N ≈ ${maxN}`
    };
  }

  /**
   * Return pattern-tailored complexity expectations
   */
  getPatternComplexity(patternId, bounds, difficulty) {
    switch (patternId) {
      case 'graph-dp-k-steps':
        return {
          targetTime: 'O(K · E) or O(E log(V · K))',
          targetSpace: 'O(V · K) or O(V)',
          naiveApproach: 'Unbounded backtracking DFS visiting all simple paths from source to dest.',
          naiveComplexity: 'O(V!) or O(V^K) Exponential',
          whyNaiveFails: 'Without memoization or layered relaxation, path exploration re-evaluates the same node thousands of times with different remaining stops, exceeding the 1-second limit.',
          spaceTimeTradeoff: 'We expand state to (node, stops_remaining) or run K rounds of Bellman-Ford edge relaxation with O(V) previous-round buffer.',
          interviewerExpectation: 'Interviewer wants to see if you recognize that standard Dijkstra greedily commits to shortest distance without considering the stop constraint.'
        };

      case 'graph-bitmask-all-nodes':
        return {
          targetTime: 'O(N² · 2ᴺ)',
          targetSpace: 'O(N · 2ᴺ)',
          naiveApproach: 'Permute all N! node visitation sequences and compute shortest path for each.',
          naiveComplexity: 'O(N!) Factorial (12! ≈ 4.79 × 10⁸ ops)',
          whyNaiveFails: 'Factorial path permutations explode rapidly. 12! exceeds 400 million operations.',
          spaceTimeTradeoff: 'Compress subset of visited nodes into an integer bitmask (0 to 2ᴺ-1). BFS on state (node, mask) guarantees each state visited at most once.',
          interviewerExpectation: 'Spotting N ≤ 15 immediately triggers bitmasking. Interviewer expects BFS because all edge weights are 1 (unweighted shortest path).'
        };

      case 'graph-01-bfs':
        return {
          targetTime: 'O(V + E) Linear Graph Traversal',
          targetSpace: 'O(V) Deque & Distance Table',
          naiveApproach: 'Standard Dijkstra using Min-Heap / Priority Queue.',
          naiveComplexity: 'O(E log V)',
          whyNaiveFails: 'Dijkstra with priority queue works, but adds an extra O(log V) heap overhead factor that costs unnecessary runtime in tight grid graphs.',
          spaceTimeTradeoff: 'Replace Priority Queue with Double-Ended Queue (collections.deque). Cost 0 edges appendleft (front), Cost 1 edges append (back). Keeps deque strictly monotonic in O(1).',
          interviewerExpectation: 'Knowing when 0/1 BFS replaces Dijkstra is a major interview differentiator for grid navigation.'
        };

      case 'graph-tree-rerooting':
        return {
          targetTime: 'O(N) 2-Pass Tree Traversal',
          targetSpace: 'O(N) Subtree count & distance arrays',
          naiveApproach: 'Run standard BFS/DFS starting from every single node as root independently.',
          naiveComplexity: 'O(N²) (N BFS runs of O(N) each)',
          whyNaiveFails: 'For N = 3 × 10⁴, N² = 9 × 10⁸ ops, which causes immediate Time Limit Exceeded.',
          spaceTimeTradeoff: 'Compute base answer for root=0 via post-order DFS (bottom-up), then compute all other roots in O(1) each via pre-order DFS transition: ans[neighbor] = ans[curr] - count[neighbor] + (N - count[neighbor]).',
          interviewerExpectation: 'Recognizing that re-rooting shifts subtrees in O(1) without recomputing the entire tree from scratch.'
        };

      case 'graph-dp-dag':
        return {
          targetTime: 'O(V + E) or O(R · C) on Grids',
          targetSpace: 'O(V) Memoization Cache + Recursion Stack',
          naiveApproach: 'Plain recursive DFS searching all strictly increasing paths without memoization.',
          naiveComplexity: 'O(4^(R·C)) Exponential',
          whyNaiveFails: 'Overlapping paths recompute the longest path from the same cell millions of times.',
          spaceTimeTradeoff: 'Strict monotonicity guarantees an acyclic DAG. Cache the answer for cell (r, c) so each cell is calculated exactly once.',
          interviewerExpectation: 'Realizing that strict ordering (e.g. matrix[next] > matrix[curr]) proves the graph is acyclic, enabling memoized DFS.'
        };

      case 'stack-monotonic-next-greater':
        return {
          targetTime: 'O(N) Single Pass',
          targetSpace: 'O(N) Auxiliary Stack',
          naiveApproach: 'For each element at index i, scan forward through all j > i to find the first greater value.',
          naiveComplexity: 'O(N²)',
          whyNaiveFails: 'For N = 10⁵, N² = 10¹⁰ operations. Exceeds standard 10⁸ ops/sec threshold by 100x.',
          spaceTimeTradeoff: 'Maintain indices in a decreasing monotonic stack. When current element exceeds stack top, we pop and resolve the boundary for that element. Each element pushed/popped at most once.',
          interviewerExpectation: 'Understanding amortized O(1) analysis: even with a while loop inside the for loop, total pops across the whole run cannot exceed N.'
        };

      case 'two-pointers-opposite':
        return {
          targetTime: 'O(N log N) if unsorted, O(N) if sorted',
          targetSpace: 'O(1) Auxiliary Space',
          naiveApproach: 'Nested loop checking every pair (i, j) for sum == target.',
          naiveComplexity: 'O(N²)',
          whyNaiveFails: 'Quadratic scan is too slow for N = 10⁵ (10¹⁰ ops).',
          spaceTimeTradeoff: 'Sort array in O(N log N). Two pointers at left and right eliminate half the search space with each comparison without allocating any extra memory.',
          interviewerExpectation: 'Explaining why sorted array monotonicity allows eliminating elements safely without missing the target.'
        };

      case 'two-pointers-window-dynamic':
        return {
          targetTime: 'O(N) Amortized (Two Pointers)',
          targetSpace: 'O(K) or O(1) Character frequency map',
          naiveApproach: 'Generate all O(N²) substrings and validate each substring in O(N).',
          naiveComplexity: 'O(N³)',
          whyNaiveFails: 'Cubing N = 10⁴ requires 10¹² operations (hours of CPU time).',
          spaceTimeTradeoff: 'Expand right pointer until invariant breaks. Shrink left pointer until invariant is restored. Both pointers advance monotonically.',
          interviewerExpectation: 'Clear explanation of window invariant (e.g. "at most K distinct chars" or "no duplicate characters").'
        };

      case 'dp-interval':
        return {
          targetTime: 'O(N³) Dynamic Programming',
          targetSpace: 'O(N²) DP Table',
          naiveApproach: 'Try all permutations of bursting balloons / evaluating parenthesization.',
          naiveComplexity: 'O(N!) Exponential',
          whyNaiveFails: 'Factorial complexity chokes for N > 12.',
          spaceTimeTradeoff: 'Iterate over interval length len from 1 to N, fixing left and right boundaries, and testing all possible last choices k between left and right.',
          interviewerExpectation: 'Recognizing that thinking of the "LAST burst balloon" decouples the subproblems, whereas the "first burst balloon" couples them.'
        };

      case 'binary-search-answer':
        return {
          targetTime: 'O(N · log(Range))',
          targetSpace: 'O(1) Auxiliary Space',
          naiveApproach: 'Linear search testing every possible capacity from 1 up to max.',
          naiveComplexity: 'O(N · Range)',
          whyNaiveFails: 'When Range = 10⁹, testing values one by one requires 10¹⁴ operations.',
          spaceTimeTradeoff: 'Feasibility check condition is monotonic: if capacity C is feasible, all C\' > C are feasible. Binary search halves the candidate space in log₂(10⁹) ≈ 30 steps.',
          interviewerExpectation: 'Ability to formalize the predicate function canAchieve(candidate) and establish clean low/high boundaries.'
        };

      default:
        return {
          targetTime: bounds.maxN >= 100000 ? 'O(N) or O(N log N)' : bounds.maxN <= 500 ? 'O(N²) or O(N³)' : 'O(N)',
          targetSpace: 'O(N) or O(1)',
          naiveApproach: 'Exhaustive search / Brute force testing all combinations.',
          naiveComplexity: 'O(N²) or O(2ᴺ)',
          whyNaiveFails: `Constraints (${bounds.summary}) make naive quadratic or exponential exploration exceed the ~10⁸ operations/sec limit.`,
          spaceTimeTradeoff: 'Trade auxiliary memory (hash table, monotonic structure, or DP array) to eliminate redundant calculations.',
          interviewerExpectation: 'Identify optimal subproblem structure or monotonicity invariant to reduce exponential/quadratic search to polynomial/linear.'
        };
    }
  }

  /**
   * Explains CPU operational limit in simple terms for coders
   */
  calculateOpsBudget(bounds, targetTime) {
    const n = bounds.maxN;
    if (n >= 100000) {
      return `LeetCode runs in ~1.0 second (~10⁸ CPU ops). At N = ${n.toLocaleString()}, an O(N²) solution needs ${(n * n).toExponential(1)} operations (100x over budget → TLE). Target must be O(N) or O(N log N).`;
    } else if (n <= 20) {
      return `At N = ${n}, an O(2ᴺ) solution needs ${(Math.pow(2, n)).toLocaleString()} operations (well under 10⁸ ops limit). Exponential bitmask / backtracking is viable and expected.`;
    } else if (n <= 500) {
      return `At N = ${n}, an O(N²) solution needs ${(n * n).toLocaleString()} ops, and O(N³) needs ${(n * n * n).toLocaleString()} ops (well under 10⁸ limit). 2D or 3D Dynamic Programming is acceptable.`;
    }
    return `Standard time limit allows ~10⁸ operations per second. Design your algorithm so (Operations count) < 10⁸ for worst-case input.`;
  }
}
