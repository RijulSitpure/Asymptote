// generated, do not edit - source: shared/curriculum-roadmap.js
/**
 * Asymptote - Master Course & Roadmap Curriculum
 * Universal module: works in browser, Node.js, and Chrome Extension.
 * Defines the 7-stage pedagogical curriculum from algorithmic foundations to advanced systems mastery.
 */

(function (global) {
  const COURSE_ROADMAP = [
    {
      id: 'stage-1-foundations',
      stageNumber: 1,
      title: 'Stage 1: Algorithmic Foundations & Multi-Pointers',
      tagline: 'Eliminate redundant nested iterations with linear pointer state machines.',
      estimatedHours: '6–8 hrs',
      difficulty: 'Easy–Medium',
      description: 'Master in-place pointer scanning, window size adjustment invariants, and cumulative prefix sums. Essential baseline for all technical interviews.',
      patternIds: [
        'two-pointers',
        'sliding-window-fixed',
        'sliding-window-variable',
        'prefix-sum'
      ],
      milestones: [
        { number: 1, slug: 'two-sum', title: 'Two Sum', difficulty: 'Easy', patternId: 'two-pointers' },
        { number: 167, slug: 'two-sum-ii-input-array-is-sorted', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', patternId: 'two-pointers' },
        { number: 15, slug: '3sum', title: '3Sum', difficulty: 'Medium', patternId: 'two-pointers' },
        { number: 11, slug: 'container-with-most-water', title: 'Container With Most Water', difficulty: 'Medium', patternId: 'two-pointers' },
        { number: 3, slug: 'longest-substring-without-repeating-characters', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', patternId: 'sliding-window-variable' },
        { number: 560, slug: 'subarray-sum-equals-k', title: 'Subarray Sum Equals K', difficulty: 'Medium', patternId: 'prefix-sum' }
      ]
    },
    {
      id: 'stage-2-linear-monotonic',
      stageNumber: 2,
      title: 'Stage 2: Linear Structures & Monotonic Invariants',
      tagline: 'Master pointer rewiring, cycle invariants, and LIFO monotonic evictions.',
      estimatedHours: '8–10 hrs',
      difficulty: 'Medium',
      description: 'Learn sentinel-guided linked list manipulation, Floyd cycle meeting arithmetic, and monotonic stacks/queues that break O(N^2) bounds.',
      patternIds: [
        'linked-list-reversal',
        'fast-slow-pointers',
        'stack-matching',
        'monotonic-stack',
        'monotonic-queue'
      ],
      milestones: [
        { number: 206, slug: 'reverse-linked-list', title: 'Reverse Linked List', difficulty: 'Easy', patternId: 'linked-list-reversal' },
        { number: 141, slug: 'linked-list-cycle', title: 'Linked List Cycle', difficulty: 'Easy', patternId: 'fast-slow-pointers' },
        { number: 142, slug: 'linked-list-cycle-ii', title: 'Linked List Cycle II', difficulty: 'Medium', patternId: 'fast-slow-pointers' },
        { number: 20, slug: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'Easy', patternId: 'stack-matching' },
        { number: 739, slug: 'daily-temperatures', title: 'Daily Temperatures', difficulty: 'Medium', patternId: 'monotonic-stack' },
        { number: 84, slug: 'largest-rectangle-in-histogram', title: 'Largest Rectangle in Histogram', difficulty: 'Hard', patternId: 'monotonic-stack' },
        { number: 239, slug: 'sliding-window-maximum', title: 'Sliding Window Maximum', difficulty: 'Hard', patternId: 'monotonic-queue' }
      ]
    },
    {
      id: 'stage-3-binary-search',
      stageNumber: 3,
      title: 'Stage 3: Binary Search & Monotonic Answer Spaces',
      tagline: 'Halve the search universe logarithmically across discrete and continuous bounds.',
      estimatedHours: '6–8 hrs',
      difficulty: 'Medium',
      description: 'Go beyond basic array lookups to master rotated boundary detection, lower/upper bounds, and binary search on monotonic predicate functions.',
      patternIds: [
        'binary-search-boundary',
        'binary-search-rotated',
        'binary-search-answer'
      ],
      milestones: [
        { number: 704, slug: 'binary-search', title: 'Binary Search', difficulty: 'Easy', patternId: 'binary-search-boundary' },
        { number: 33, slug: 'search-in-rotated-sorted-array', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', patternId: 'binary-search-rotated' },
        { number: 153, slug: 'find-minimum-in-rotated-sorted-array', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', patternId: 'binary-search-rotated' },
        { number: 875, slug: 'koko-eating-bananas', title: 'Koko Eating Bananas', difficulty: 'Medium', patternId: 'binary-search-answer' },
        { number: 4, slug: 'median-of-two-sorted-arrays', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', patternId: 'binary-search-boundary' }
      ]
    },
    {
      id: 'stage-4-trees-bst',
      stageNumber: 4,
      title: 'Stage 4: Hierarchies, Trees & Recursive Invariants',
      tagline: 'Recursively decompose tree nodes and conquer ordered binary search trees.',
      estimatedHours: '8–10 hrs',
      difficulty: 'Easy–Medium',
      description: 'Explore bottom-up subtree aggregation, level-order BFS queueing, BST range boundaries, and lowest common ancestor pointer convergence.',
      patternIds: [
        'tree-dfs',
        'tree-bfs',
        'bst-invariant',
        'tree-lca'
      ],
      milestones: [
        { number: 104, slug: 'maximum-depth-of-binary-tree', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', patternId: 'tree-dfs' },
        { number: 226, slug: 'invert-binary-tree', title: 'Invert Binary Tree', difficulty: 'Easy', patternId: 'tree-dfs' },
        { number: 102, slug: 'binary-tree-level-order-traversal', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', patternId: 'tree-bfs' },
        { number: 98, slug: 'validate-binary-search-tree', title: 'Validate Binary Search Tree', difficulty: 'Medium', patternId: 'bst-invariant' },
        { number: 236, slug: 'lowest-common-ancestor-of-a-binary-tree', title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', patternId: 'tree-lca' },
        { number: 124, slug: 'binary-tree-maximum-path-sum', title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', patternId: 'tree-dfs' }
      ]
    },
    {
      id: 'stage-5-graphs',
      stageNumber: 5,
      title: 'Stage 5: Graphs, Cycles & Topological Orderings',
      tagline: 'Model complex relationships, connected components, and directed acyclic workflows.',
      estimatedHours: '10–12 hrs',
      difficulty: 'Medium–Hard',
      description: 'Master grid flood-fills, queue-based shortest paths, Kahn’s in-degree topological sort, Disjoint Set Union (DSU), and Dijkstra priority queues.',
      patternIds: [
        'graph-bfs',
        'graph-dfs',
        'topological-sort',
        'union-find',
        'dijkstra'
      ],
      milestones: [
        { number: 200, slug: 'number-of-islands', title: 'Number of Islands', difficulty: 'Medium', patternId: 'graph-dfs' },
        { number: 133, slug: 'clone-graph', title: 'Clone Graph', difficulty: 'Medium', patternId: 'graph-dfs' },
        { number: 207, slug: 'course-schedule', title: 'Course Schedule', difficulty: 'Medium', patternId: 'topological-sort' },
        { number: 210, slug: 'course-schedule-ii', title: 'Course Schedule II', difficulty: 'Medium', patternId: 'topological-sort' },
        { number: 684, slug: 'redundant-connection', title: 'Redundant Connection', difficulty: 'Medium', patternId: 'union-find' },
        { number: 787, slug: 'cheapest-flights-within-k-stops', title: 'Cheapest Flights Within K Stops', difficulty: 'Medium', patternId: 'dijkstra' }
      ]
    },
    {
      id: 'stage-6-dynamic-programming',
      stageNumber: 6,
      title: 'Stage 6: Dynamic Programming & Optimal Substructure',
      tagline: 'Break multi-stage optimization down into deterministic recurrence relations.',
      estimatedHours: '12–14 hrs',
      difficulty: 'Medium–Hard',
      description: 'Conquer state transition modeling: 1D linear DP, 0/1 Knapsack decision trees, unbounded coin picking, 2D string alignments, and interval matrix chains.',
      patternIds: [
        '1d-dp-fibonacci',
        'knapsack-01',
        'unbounded-knapsack',
        'longest-common-subsequence',
        'interval-dp'
      ],
      milestones: [
        { number: 70, slug: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'Easy', patternId: '1d-dp-fibonacci' },
        { number: 198, slug: 'house-robber', title: 'House Robber', difficulty: 'Medium', patternId: '1d-dp-fibonacci' },
        { number: 322, slug: 'coin-change', title: 'Coin Change', difficulty: 'Medium', patternId: 'unbounded-knapsack' },
        { number: 300, slug: 'longest-increasing-subsequence', title: 'Longest Increasing Subsequence', difficulty: 'Medium', patternId: '1d-dp-fibonacci' },
        { number: 1143, slug: 'longest-common-subsequence', title: 'Longest Common Subsequence', difficulty: 'Medium', patternId: 'longest-common-subsequence' },
        { number: 72, slug: 'edit-distance', title: 'Edit Distance', difficulty: 'Medium', patternId: 'longest-common-subsequence' }
      ]
    },
    {
      id: 'stage-7-advanced-systems',
      stageNumber: 7,
      title: 'Stage 7: Advanced Systems & Multimodal Engineering',
      tagline: 'Combine heaps, prefix trees, interval scheduling, concurrency, and SQL data pipelines.',
      estimatedHours: '10–12 hrs',
      difficulty: 'Medium–Hard',
      description: 'The pinnacle of technical interviews: top-K heaps, Trie prefix search, interval sweep-line, multi-thread synchronizers, and analytical SQL queries.',
      patternIds: [
        'heap-k-way',
        'trie-prefix',
        'interval-merge',
        'concurrency-synchronization',
        'sql-window-functions'
      ],
      milestones: [
        { number: 23, slug: 'merge-k-sorted-lists', title: 'Merge k Sorted Lists', difficulty: 'Hard', patternId: 'heap-k-way' },
        { number: 208, slug: 'implement-trie-prefix-tree', title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', patternId: 'trie-prefix' },
        { number: 56, slug: 'merge-intervals', title: 'Merge Intervals', difficulty: 'Medium', patternId: 'interval-merge' },
        { number: 1114, slug: 'print-in-order', title: 'Print in Order', difficulty: 'Easy', patternId: 'concurrency-synchronization' },
        { number: 185, slug: 'department-top-three-salaries', title: 'Department Top Three Salaries', difficulty: 'Hard', patternId: 'sql-window-functions' }
      ]
    }
  ];

  /**
   * Calculates detailed student progress through the roadmap.
   * @param {Array} roadmap The COURSE_ROADMAP array
   * @param {Array|Set} solvedProblems List of solved problem objects or slug/number strings
   */
  function calculateCurriculumProgress(roadmap = COURSE_ROADMAP, solvedProblems = []) {
    const solvedSet = new Set();

    if (Array.isArray(solvedProblems)) {
      for (const p of solvedProblems) {
        if (!p) continue;
        if (typeof p === 'string' || typeof p === 'number') {
          solvedSet.add(String(p).toLowerCase().trim());
        } else if (typeof p === 'object') {
          if (p.is_solved) {
            if (p.slug) solvedSet.add(String(p.slug).toLowerCase().trim());
            if (p.title_slug) solvedSet.add(String(p.title_slug).toLowerCase().trim());
            if (p.number !== undefined && p.number !== null) solvedSet.add(String(p.number));
            if (p.frontend_id) solvedSet.add(String(p.frontend_id));
            if (p.id) solvedSet.add(String(p.id));
          }
        }
      }
    } else if (solvedProblems instanceof Set) {
      for (const item of solvedProblems) {
        solvedSet.add(String(item).toLowerCase().trim());
      }
    }

    let totalMilestones = 0;
    let completedMilestones = 0;

    const stages = (roadmap || COURSE_ROADMAP).map((stage, idx) => {
      const stageMilestones = stage.milestones || [];
      const totalStage = stageMilestones.length;
      totalMilestones += totalStage;

      const solvedInStage = stageMilestones.filter(m => {
        const slugMatch = m.slug && solvedSet.has(String(m.slug).toLowerCase().trim());
        const numMatch = m.number !== undefined && solvedSet.has(String(m.number));
        return slugMatch || numMatch;
      });

      const solvedStageCount = solvedInStage.length;
      completedMilestones += solvedStageCount;

      const stagePercent = totalStage > 0 ? Math.round((solvedStageCount / totalStage) * 100) : 0;
      let status = 'locked';

      if (stagePercent === 100) {
        status = 'completed';
      } else if (stagePercent > 0 || idx === 0) {
        status = 'in-progress';
      }

      return {
        ...stage,
        totalMilestones: totalStage,
        completedMilestones: solvedStageCount,
        percent: stagePercent,
        status,
        milestonesWithStatus: stageMilestones.map(m => {
          const isSolved = (m.slug && solvedSet.has(String(m.slug).toLowerCase().trim())) ||
            (m.number !== undefined && solvedSet.has(String(m.number)));
          return {
            ...m,
            isSolved: Boolean(isSolved)
          };
        })
      };
    });

    // Make sure next stage after completed stage is unlocked
    for (let i = 0; i < stages.length; i++) {
      if (stages[i].status === 'completed' && i + 1 < stages.length) {
        if (stages[i + 1].status === 'locked') {
          stages[i + 1].status = 'in-progress';
        }
      }
    }

    const overallPercent = totalMilestones > 0 
      ? Math.round((completedMilestones / totalMilestones) * 100) 
      : 0;

    // Find next recommended problem
    let nextMilestone = null;
    for (const stage of stages) {
      const uncompleted = stage.milestonesWithStatus.find(m => !m.isSolved);
      if (uncompleted) {
        nextMilestone = {
          ...uncompleted,
          stageTitle: stage.title,
          stageNumber: stage.stageNumber
        };
        break;
      }
    }

    return {
      totalMilestones,
      completedMilestones,
      overallPercent,
      nextMilestone,
      stages
    };
  }

  const api = {
    COURSE_ROADMAP,
    calculateCurriculumProgress
  };

  if (typeof global !== 'undefined') {
    global.CurriculumRoadmapModule = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
