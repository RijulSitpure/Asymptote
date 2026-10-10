/**
 * Algorithmic Pattern Classifier & Socratic Hint Generator
 * Maps incoming LeetCode problems to granular patterns and extracts key clues & twists.
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

    // Specific Rule Matchers with high-priority signals
    if (
      (fullText.includes('at most') && (fullText.includes('stops') || fullText.includes('steps') || fullText.includes('time limit'))) ||
      slug.includes('cheapest-flights') ||
      slug.includes('minimum-cost-to-reach-destination-in-time')
    ) {
      return {
        pattern_id: 'graph-dp-k-steps',
        twist_type: 'Constrained Edge/Step Count (State expansion or Bellman-Ford round tracking)',
        confidence: 0.95
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
        confidence: 0.92
      };
    }

    if (
      (tags.includes('tree') && (fullText.includes('for each node') || fullText.includes('sum of distances') || fullText.includes('root') && fullText.includes('all nodes'))) ||
      slug.includes('sum-of-distances') ||
      slug.includes('minimum-height-trees')
    ) {
      return {
        pattern_id: 'graph-tree-rerooting',
        twist_type: '2-Pass Re-rooting Tree DP (Post-order bottom-up + Pre-order top-down)',
        confidence: 0.90
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
        confidence: 0.94
      };
    }

    if (
      (fullText.includes('0') && fullText.includes('1') && fullText.includes('cost') && tags.includes('breadth-first search')) ||
      slug.includes('minimum-cost-to-make-at-least-one-valid-path') ||
      slug.includes('minimum-obstacle-removal')
    ) {
      return {
        pattern_id: 'graph-01-bfs',
        twist_type: '0/1 BFS Deque Optimization (O(V+E) Dijkstra replacement)',
        confidence: 0.91
      };
    }

    if (
      (tags.includes('monotonic stack')) ||
      (fullText.includes('next greater') || fullText.includes('daily temperatures') || fullText.includes('largest rectangle in histogram'))
    ) {
      return {
        pattern_id: 'stack-monotonic-next-greater',
        twist_type: 'Monotonic Stack (Index boundary maintenance)',
        confidence: 0.93
      };
    }

    if (
      (tags.includes('sliding window')) ||
      (fullText.includes('longest substring') || fullText.includes('minimum window') || fullText.includes('at most k distinct'))
    ) {
      return {
        pattern_id: 'two-pointers-window-dynamic',
        twist_type: 'Dynamic Sliding Window (Shrink left on invalid state)',
        confidence: 0.88
      };
    }

    if (
      (fullText.includes('interval') && tags.includes('dynamic programming')) ||
      (fullText.includes('burst balloons') || fullText.includes('merge stones') || fullText.includes('matrix chain')) ||
      slug.includes('burst-balloons')
    ) {
      return {
        pattern_id: 'dp-interval',
        twist_type: 'Interval DP (Length-based iteration with split point k)',
        confidence: 0.89
      };
    }

    if (
      (tags.includes('binary search') && (fullText.includes('minimum') || fullText.includes('maximum') || fullText.includes('capacity') || fullText.includes('koko'))) ||
      slug.includes('capacity-to-ship') ||
      slug.includes('koko-eating-bananas')
    ) {
      return {
        pattern_id: 'binary-search-answer',
        twist_type: 'Binary Search on Answer Range (Monotonic Feasibility Check)',
        confidence: 0.87
      };
    }

    if (
      (tags.includes('dynamic programming') && (fullText.includes('stock') || fullText.includes('cooldown') || fullText.includes('state machine')))
    ) {
      return {
        pattern_id: 'dp-state-machine',
        twist_type: 'State Machine DP (Mutually exclusive status transitions)',
        confidence: 0.88
      };
    }

    // Default fallback pattern if DP or Graph
    if (tags.includes('dynamic programming') && tags.includes('graph')) {
      return {
        pattern_id: 'graph-dp-dag',
        twist_type: 'Graph State DP Transition',
        confidence: 0.70
      };
    } else if (tags.includes('dynamic programming')) {
      return {
        pattern_id: 'dp-state-machine',
        twist_type: 'Subproblem State Transition',
        confidence: 0.60
      };
    } else if (tags.includes('graph') || tags.includes('breadth-first search')) {
      return {
        pattern_id: 'graph-01-bfs',
        twist_type: 'Graph Traversal State',
        confidence: 0.60
      };
    }

    return {
      pattern_id: 'two-pointers-window-dynamic',
      twist_type: 'Algorithmic Pattern Variation',
      confidence: 0.50
    };
  }

  /**
   * Generate progressive Socratic hints if not already provided
   */
  generateProgressiveHints(problem, pattern) {
    const title = problem.title;
    const category = pattern ? pattern.category : 'Algorithms';
    const patternTitle = pattern ? pattern.title : 'Target Pattern';

    return [
      {
        level: 1,
        title: "The Recognition Signal",
        content: `Look at the constraints and output objective. This problem maps directly to the ${patternTitle} pattern (${category}). Ask yourself: What mathematical property prevents an exhaustive or brute-force search?`
      },
      {
        level: 2,
        title: "State & Subproblem Formulation",
        content: `What parameters uniquely define the state at any moment? For this variation, you likely need to track the position alongside the accumulated constraints or step count.`
      },
      {
        level: 3,
        title: "Transition Recurrence & Invariants",
        content: `How does the state at step (t) transition to step (t + 1)? Pay attention to edge cases where you must avoid modifying states in-place before evaluating all neighbors.`
      },
      {
        level: 4,
        title: "Blueprint Reference",
        content: pattern?.base_template_py || `# Refer to canonical pattern template: ${patternTitle}`
      }
    ];
  }
}
