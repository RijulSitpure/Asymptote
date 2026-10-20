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
  'word-search': { number: 79, title: 'Word Search', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Four-Directional Grid Backtracking with In-Place Visited Marker' },
  'number-of-islands': { number: 200, title: 'Number of Islands', difficulty: 'Medium', category: 'Algorithms', twist_type: 'In-Place Grid Cell Sinking' },
  'clone-graph': { number: 133, title: 'Clone Graph', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Visited Cloned Node Registry' },
  'rotting-oranges': { number: 994, title: 'Rotting Oranges', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Multi-Source Wavefront Propagation' },
  'pacific-atlantic-water-flow': { number: 417, title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual-Ocean Continental Coastal Reachability' },
  'course-schedule': { number: 207, title: 'Course Schedule', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Directed Cycle Indegree Pruning' },
  'redundant-connection': { number: 684, title: 'Redundant Connection', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Disjoint Set Cycle Detection' },
  'climbing-stairs': { number: 70, title: 'Climbing Stairs', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Fibonacci Step Recurrence' },
  'house-robber': { number: 198, title: 'House Robber', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Adjacent Non-Consecutive Loot Optimization' },
  'coin-change': { number: 322, title: 'Coin Change', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fewest Denominations Unbounded Knapsack' },
  'longest-increasing-subsequence': { number: 300, title: 'Longest Increasing Subsequence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Patience Sorting Tails Array' },
  'word-break': { number: 139, title: 'Word Break', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Segmentation Reachability' },
  'partition-equal-subset-sum': { number: 416, title: 'Partition Equal Subset Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Target Half-Sum Knapsack' },
  'unique-paths': { number: 62, title: 'Unique Paths', difficulty: 'Medium', category: 'Algorithms', twist_type: '2D Grid Inward Transition with 1D Rolling State' },
  'longest-common-subsequence': { number: 1143, title: 'Longest Common Subsequence', difficulty: 'Medium', category: 'Algorithms', twist_type: '2D Subsequence Character Alignment' },
  'jump-game': { number: 55, title: 'Jump Game', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Farthest Reachable Index Invariant' },
  'merge-intervals': { number: 56, title: 'Merge Intervals', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Boundary Overlap Merging' },
  'non-overlapping-intervals': { number: 435, title: 'Non-overlapping Intervals', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Earliest End-Time Elimination Strategy' },
  'counting-bits': { number: 338, title: 'Counting Bits', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Least Significant Bit Offset Recurrence' },
  'rank-scores': { number: 178, title: 'Rank Scores', difficulty: 'Medium', category: 'Database', twist_type: 'Dense Window Ranking Without Gaps' },
  'consecutive-numbers': { number: 180, title: 'Consecutive Numbers', difficulty: 'Medium', category: 'Database', twist_type: 'Three-Row Consecutive Window Offset' },
  'employees-earning-more-than-their-managers': { number: 181, title: 'Employees Earning More Than Their Managers', difficulty: 'Easy', category: 'Database', twist_type: 'Self-Join Hierarchical Comparison' },
  'duplicate-emails': { number: 182, title: 'Duplicate Emails', difficulty: 'Easy', category: 'Database', twist_type: 'Group By Frequency Having Filter' },
  'customers-who-never-order': { number: 183, title: 'Customers Who Never Order', difficulty: 'Easy', category: 'Database', twist_type: 'Left Join Null Foreign Key Anti-Join' },
  'department-top-three-salaries': { number: 185, title: 'Department Top Three Salaries', difficulty: 'Hard', category: 'Database', twist_type: 'Partitioned Dense Ranking Top Three' },
  'managers-with-at-least-5-direct-reports': { number: 570, title: 'Managers with at Least 5 Direct Reports', difficulty: 'Medium', category: 'Database', twist_type: 'Manager Aggregation Having Filter' },
  'classes-more-than-5-students': { number: 596, title: 'Classes More Than 5 Students', difficulty: 'Easy', category: 'Database', twist_type: 'Group By Class Student Threshold Filter' },
  'select-data': { number: 2880, title: 'Select Data', difficulty: 'Easy', category: 'pandas', twist_type: 'Boolean Indexing Column Projection' },
  'create-a-new-column': { number: 2881, title: 'Create a New Column', difficulty: 'Easy', category: 'pandas', twist_type: 'Vectorized Column Arithmetic Assignment' },
  'modify-columns': { number: 2884, title: 'Modify Columns', difficulty: 'Easy', category: 'pandas', twist_type: 'In-Place Column Scaling' },
  'fill-missing-data': { number: 2887, title: 'Fill Missing Data', difficulty: 'Easy', category: 'pandas', twist_type: 'Targeted Column Null Imputation' },
  'function-composition': { number: 2629, title: 'Function Composition', difficulty: 'Easy', category: 'JavaScript', twist_type: 'Right-to-Left Reducer Pipeline' },
  'filter-elements-from-array': { number: 2634, title: 'Filter Elements from Array', difficulty: 'Easy', category: 'JavaScript', twist_type: 'Index-Aware Predicate Collection' },
  'memoize': { number: 2623, title: 'Memoize', difficulty: 'Medium', category: 'JavaScript', twist_type: 'Serialized Key Closure Cache' },
  'remove-duplicates-from-sorted-array': { number: 26, title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Fast and Slow In-Place Overwriting' },
  'remove-element': { number: 27, title: 'Remove Element', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Opposite Pointers Target Eviction' },
  'sort-colors': { number: 75, title: 'Sort Colors', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dutch National Flag Three-Way Partition' },
  'merge-sorted-array': { number: 88, title: 'Merge Sorted Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Backward Write to Tail Space' },
  'majority-element': { number: 169, title: 'Majority Element', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Boyer-Moore Majority Voting Cancellation' },
  'move-zeroes': { number: 283, title: 'Move Zeroes', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Non-Zero Write Pointer Consolidation' },
  'reverse-string': { number: 344, title: 'Reverse String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Inward In-Place Character Swap' },
  'squares-of-a-sorted-array': { number: 977, title: 'Squares of a Sorted Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Outward Absolute Magnitude Backward Merge' },
  '3sum-closest': { number: 16, title: '3Sum Closest', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Triplet Absolute Difference Minimization' },
  '4sum': { number: 18, title: '4Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Nested Two Pointers with Quadruplet Deduplication' },
  'valid-sudoku': { number: 36, title: 'Valid Sudoku', difficulty: 'Medium', category: 'Algorithms', twist_type: '9x9 Row Column and Block Bitmask / Hash Tracking' },
  'minimum-size-subarray-sum': { number: 209, title: 'Minimum Size Subarray Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dynamic Sliding Window Inward Contraction' },
  'subarray-sum-equals-k': { number: 560, title: 'Subarray Sum Equals K', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Sum Frequency Map Difference Lookup' },
  'find-pivot-index': { number: 724, title: 'Find Pivot Index', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Total Sum Left-Right Balance Invariant' },
  'fruit-into-baskets': { number: 904, title: 'Fruit Into Baskets', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Distinct-Key Dynamic Sliding Window' },
  'add-two-numbers': { number: 2, title: 'Add Two Numbers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Digit-by-Digit Addition with Carry Propagation' },
  'swap-nodes-in-pairs': { number: 24, title: 'Swap Nodes in Pairs', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pairwise Link Pointer Rewiring with Sentinel' },
  'reverse-nodes-in-k-group': { number: 25, title: 'Reverse Nodes in k-Group', difficulty: 'Hard', category: 'Algorithms', twist_type: 'K-Group Segment Count and Inversion' },
  'rotate-list': { number: 61, title: 'Rotate List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Circular Ring Linkage and Modulo Cut' },
  'remove-duplicates-from-sorted-list-ii': { number: 82, title: 'Remove Duplicates from Sorted List II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sentinel Head Duplicate Subsegment Bypass' },
  'remove-duplicates-from-sorted-list': { number: 83, title: 'Remove Duplicates from Sorted List', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Adjacent Duplicate Node Link Skipping' },
  'partition-list': { number: 86, title: 'Partition List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual Sentinel Sublist Split and Concatenation' },
  'reverse-linked-list-ii': { number: 92, title: 'Reverse Linked List II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bounded Subsegment Head Inversion' },
  'linked-list-cycle-ii': { number: 142, title: 'Linked List Cycle II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Floyd Cycle Detection Phase 2 Entry Meeting' },
  'insertion-sort-list': { number: 147, title: 'Insertion Sort List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sentinel-Guided Sorted Sublist Insertion' },
  'sort-list': { number: 148, title: 'Sort List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Divide-and-Conquer Midpoint Split and Merge' },
  'intersection-of-two-linked-lists': { number: 160, title: 'Intersection of Two Linked Lists', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Dual Pointer Path Length Equalization' },
  'remove-linked-list-elements': { number: 203, title: 'Remove Linked List Elements', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Sentinel Predecessor Target Node Deletion' },
  'palindrome-linked-list': { number: 234, title: 'Palindrome Linked List', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Midpoint Splitting and Second Half Reversal' },
  'delete-the-middle-node-of-a-linked-list': { number: 2095, title: 'Delete the Middle Node of a Linked List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fast and Slow Runner Midpoint Predecessor Bypass' },
  'odd-even-linked-list': { number: 328, title: 'Odd Even Linked List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Parity Sublist Weaving and Splicing' },
  'add-two-numbers-ii': { number: 445, title: 'Add Two Numbers II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'LIFO Value Extraction with Carry Propagation' },
  'split-linked-list-in-parts': { number: 725, title: 'Split Linked List in Parts', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Quotient and Remainder Partitioning' },
  'middle-of-the-linked-list': { number: 876, title: 'Middle of the Linked List', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Fast and Slow Two-Runner Midpoint Traversal' },
  'swapping-nodes-in-a-linked-list': { number: 1721, title: 'Swapping Nodes in a Linked List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'K-Step Offset Window Value Swap' },
  'longest-valid-parentheses': { number: 32, title: 'Longest Valid Parentheses', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Index-Based Base Marker Monotonic Stack' },
  'simplify-path': { number: 71, title: 'Simplify Path', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Canonical Path Directory Segment Stack' },
  'basic-calculator-ii': { number: 227, title: 'Basic Calculator II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Operator Precedence Immediate Evaluation Stack' },
  'decode-string': { number: 394, title: 'Decode String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Nested Repeat Multiplier and String Stack' },
  'exclusive-time-of-functions': { number: 636, title: 'Exclusive Time of Functions', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Call Stack Interval Timestamp Accounting' },
  'valid-parenthesis-string': { number: 678, title: 'Valid Parenthesis String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Balance Interval Range Tracking' },
  'asteroid-collision': { number: 735, title: 'Asteroid Collision', difficulty: 'Medium', category: 'Algorithms', twist_type: 'LIFO Collision Simulation' },
  'backspace-string-compare': { number: 844, title: 'Backspace String Compare', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Reverse Two-Pointer Traversal with Skip Counter' },
  'minimum-add-to-make-parentheses-valid': { number: 921, title: 'Minimum Add to Make Parentheses Valid', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Counter Balance Tracking' },
  'validate-stack-sequences': { number: 946, title: 'Validate Stack Sequences', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Simulation with Auxiliary Sequence' },
  'check-if-word-is-valid-after-substitutions': { number: 1003, title: 'Check If Word Is Valid After Substitutions', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Triplet Cancellation via Character Buffer' },
  'remove-outermost-parentheses': { number: 1021, title: 'Remove Outermost Parentheses', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Depth Filter Single-Pass Accumulation' },
  'remove-all-adjacent-duplicates-in-string': { number: 1047, title: 'Remove All Adjacent Duplicates In String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'LIFO Adjacent Character Cancellation' },
  'reverse-substrings-between-each-pair-of-parentheses': { number: 1190, title: 'Reverse Substrings Between Each Pair of Parentheses', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Wormhole Teleportation Traversal' },
  'remove-all-adjacent-duplicates-in-string-ii': { number: 1209, title: 'Remove All Adjacent Duplicates in String II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'LIFO Run-Length Pair Reduction' },
  'minimum-remove-to-make-valid-parentheses': { number: 1249, title: 'Minimum Remove to Make Valid Parentheses', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Index Marking and Filtered Reconstruction' },
  'make-the-string-great': { number: 1544, title: 'Make The String Great', difficulty: 'Easy', category: 'Algorithms', twist_type: 'ASCII Offset 32 Adjacent Pair Cancellation' },
  'maximum-nesting-depth-of-the-parentheses': { number: 1614, title: 'Maximum Nesting Depth of the Parentheses', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Scalar Depth Tracking Single-Pass' },
  'maximal-rectangle': { number: 85, title: 'Maximal Rectangle', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Row-by-Row Histogram with Monotonic Index Buffer' },
  'sliding-window-maximum': { number: 239, title: 'Sliding Window Maximum', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Monotonic Decreasing Double-Ended Index Queue' },
  'remove-duplicate-letters': { number: 316, title: 'Remove Duplicate Letters', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Eviction with Last-Occurrence Lookahead' },
  'remove-k-digits': { number: 402, title: 'Remove K Digits', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Non-Decreasing Peak Eviction' },
  '132-pattern': { number: 456, title: '132 Pattern', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Reverse Monotonic Decreasing Stack with s3 Candidate Tracking' },
  'next-greater-element-i': { number: 496, title: 'Next Greater Element I', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Monotonic Decreasing Stack with Hash Map Lookup' },
  'next-greater-element-ii': { number: 503, title: 'Next Greater Element II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pass Virtual Circular Monotonic Index Traversal' },
  'sum-of-subarray-minimums': { number: 907, title: 'Sum of Subarray Minimums', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Contribution Counting with Deduplication' },
  'maximum-width-ramp': { number: 962, title: 'Maximum Width Ramp', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Decreasing Prefix Indices with Backward Scan' },
  'next-greater-node-in-linked-list': { number: 1019, title: 'Next Greater Node In Linked List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Array Conversion with Monotonic Index Stack' },
  'final-prices-with-a-special-discount-in-a-shop': { number: 1475, title: 'Final Prices With a Special Discount in a Shop', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Monotonic Increasing Index Stack with In-Place Discount' },
  'number-of-visible-people-in-a-queue': { number: 1944, title: 'Number of Visible People in a Queue', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Reverse Monotonic Decreasing Height Skyline Stack' },
  'search-insert-position': { number: 35, title: "Search Insert Position", difficulty: 'Easy', category: 'Algorithms', twist_type: "Lower Bound Invariant" },
  'find-first-and-last-position-of-element-in-sorted-array': { number: 34, title: "Find First and Last Position of Element in Sorted Array", difficulty: 'Medium', category: 'Algorithms', twist_type: "Two-Sided Monotonic Invariant" },
  'search-in-rotated-sorted-array-ii': { number: 81, title: "Search in Rotated Sorted Array II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Equality Truncation Invariant" },
  'find-minimum-in-rotated-sorted-array-ii': { number: 154, title: "Find Minimum in Rotated Sorted Array II", difficulty: 'Hard', category: 'Algorithms', twist_type: "Right Boundary Pruning Invariant" },
  'find-peak-element': { number: 162, title: "Find Peak Element", difficulty: 'Medium', category: 'Algorithms', twist_type: "Slope Ascent Invariant" },
  'search-a-2d-matrix-ii': { number: 240, title: "Search a 2D Matrix II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Corner Saddleback Invariant" },
  'missing-number': { number: 268, title: "Missing Number", difficulty: 'Easy', category: 'Algorithms', twist_type: "Gauss Formula Invariant" },
  'h-index-ii': { number: 275, title: "H-Index II", difficulty: 'Medium', category: 'Algorithms', twist_type: "H-Index Monotonic Invariant" },
  'first-bad-version': { number: 278, title: "First Bad Version", difficulty: 'Easy', category: 'Algorithms', twist_type: "Monotonic Boolean Step Invariant" },
  'valid-perfect-square': { number: 367, title: "Valid Perfect Square", difficulty: 'Easy', category: 'Algorithms', twist_type: "Quadratic Monotonic Invariant" },
  'guess-number-higher-or-lower': { number: 374, title: "Guess Number Higher or Lower", difficulty: 'Easy', category: 'Algorithms', twist_type: "Bisection Feedback Invariant" },
  'arranging-coins': { number: 441, title: "Arranging Coins", difficulty: 'Easy', category: 'Algorithms', twist_type: "Triangular Monotonic Invariant" },
  'single-element-in-a-sorted-array': { number: 540, title: "Single Element in a Sorted Array", difficulty: 'Medium', category: 'Algorithms', twist_type: "Even-Odd Parity Invariant" },
  'capacity-to-ship-packages-within-d-days': { number: 1011, title: "Capacity To Ship Packages Within D Days", difficulty: 'Medium', category: 'Algorithms', twist_type: "Feasibility Bound Invariant" },
  'permutation-in-string': { number: 567, title: "Permutation in String", difficulty: 'Medium', category: 'Algorithms', twist_type: "Fixed Length Frequency Invariant" },
  'find-all-anagrams-in-a-string': { number: 438, title: "Find All Anagrams in a String", difficulty: 'Medium', category: 'Algorithms', twist_type: "Sliding Window Multi-Set Invariant" },
  'contains-duplicate-ii': { number: 219, title: "Contains Duplicate II", difficulty: 'Easy', category: 'Algorithms', twist_type: "Window Set Invariant" },
  'max-consecutive-ones-iii': { number: 1004, title: "Max Consecutive Ones III", difficulty: 'Medium', category: 'Algorithms', twist_type: "Dynamic Window Invariant" },
  'longest-substring-with-at-least-k-repeating-characters': { number: 395, title: "Longest Substring with At Least K Repeating Characters", difficulty: 'Medium', category: 'Algorithms', twist_type: "Split Divider Invariant" },
  'number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold': { number: 1343, title: "Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold", difficulty: 'Medium', category: 'Algorithms', twist_type: "Threshold Target Invariant" },
  'maximum-sum-of-distinct-subarrays-with-length-k': { number: 2461, title: "Maximum Sum of Distinct Subarrays With Length K", difficulty: 'Medium', category: 'Algorithms', twist_type: "Frequency Table Window Invariant" },
  'get-equal-substrings-within-budget': { number: 1208, title: "Get Equal Substrings Within Budget", difficulty: 'Medium', category: 'Algorithms', twist_type: "Monotonic Window Cost Invariant" },
  'reorganize-string': { number: 767, title: "Reorganize String", difficulty: 'Medium', category: 'Algorithms', twist_type: "Max-Frequency Greedy Invariant" },
  'same-tree': { number: 100, title: "Same Tree", difficulty: 'Easy', category: 'Algorithms', twist_type: "Recursive Mirror Invariant" },
  'symmetric-tree': { number: 101, title: "Symmetric Tree", difficulty: 'Easy', category: 'Algorithms', twist_type: "Mirror Subtree Invariant" },
  'binary-tree-zigzag-level-order-traversal': { number: 103, title: "Binary Tree Zigzag Level Order Traversal", difficulty: 'Medium', category: 'Algorithms', twist_type: "Directional Buffer Invariant" },
  'binary-tree-level-order-traversal-ii': { number: 107, title: "Binary Tree Level Order Traversal II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Reversed Tier Invariant" },
  'minimum-depth-of-binary-tree': { number: 111, title: "Minimum Depth of Binary Tree", difficulty: 'Easy', category: 'Algorithms', twist_type: "First Leaf Level Invariant" },
  'path-sum': { number: 112, title: "Path Sum", difficulty: 'Easy', category: 'Algorithms', twist_type: "Target Reduction Invariant" },
  'binary-tree-right-side-view': { number: 199, title: "Binary Tree Right Side View", difficulty: 'Medium', category: 'Algorithms', twist_type: "Tier Silhouette Invariant" },
  'sum-of-left-leaves': { number: 404, title: "Sum of Left Leaves", difficulty: 'Easy', category: 'Algorithms', twist_type: "Direct Child Leaf Invariant" },
  'cousins-in-binary-tree': { number: 993, title: "Cousins in Binary Tree", difficulty: 'Easy', category: 'Algorithms', twist_type: "Tier and Parent Invariant" },
  'find-largest-value-in-each-tree-row': { number: 515, title: "Find Largest Value in Each Tree Row", difficulty: 'Medium', category: 'Algorithms', twist_type: "Level Snapshot Invariant" },
  'search-in-a-binary-search-tree': { number: 700, title: "Search in a Binary Search Tree", difficulty: 'Easy', category: 'Algorithms', twist_type: "BST Routing Invariant" },
  'insert-into-a-binary-search-tree': { number: 701, title: "Insert into a Binary Search Tree", difficulty: 'Medium', category: 'Algorithms', twist_type: "Leaf Attachment Invariant" },
  'delete-node-in-a-bst': { number: 450, title: "Delete Node in a BST", difficulty: 'Medium', category: 'Algorithms', twist_type: "Successor Replacement Invariant" },
  'binary-search-tree-iterator': { number: 173, title: "Binary Search Tree Iterator", difficulty: 'Medium', category: 'Algorithms', twist_type: "Left Spine Stack Invariant" },
  'construct-binary-tree-from-preorder-and-inorder-traversal': { number: 105, title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: 'Medium', category: 'Algorithms', twist_type: "Inorder Subtree Partition Invariant" },
  'construct-binary-tree-from-inorder-and-postorder-traversal': { number: 106, title: "Construct Binary Tree from Inorder and Postorder Traversal", difficulty: 'Medium', category: 'Algorithms', twist_type: "Reverse Postorder Invariant" },
  'path-sum-ii': { number: 113, title: "Path Sum II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Backtracking Path Invariant" },
  'sum-root-to-leaf-numbers': { number: 129, title: "Sum Root to Leaf Numbers", difficulty: 'Medium', category: 'Algorithms', twist_type: "Decimal Shift Invariant" },
  'binary-tree-paths': { number: 257, title: "Binary Tree Paths", difficulty: 'Easy', category: 'Algorithms', twist_type: "Path String Accumulation Invariant" },
  'lowest-common-ancestor-of-a-binary-tree': { number: 236, title: "Lowest Common Ancestor of a Binary Tree", difficulty: 'Medium', category: 'Algorithms', twist_type: "Branch Separation Invariant" },
  'merge-two-binary-trees': { number: 617, title: "Merge Two Binary Trees", difficulty: 'Easy', category: 'Algorithms', twist_type: "Disjoint Subtree Conservation Invariant" },
  'subtree-of-another-tree': { number: 572, title: "Subtree of Another Tree", difficulty: 'Easy', category: 'Algorithms', twist_type: "Exact Structural Identity Invariant" },
  'count-complete-tree-nodes': { number: 222, title: "Count Complete Tree Nodes", difficulty: 'Medium', category: 'Algorithms', twist_type: "Full Tree Formula Invariant" },
  'unique-binary-search-trees': { number: 96, title: "Unique Binary Search Trees", difficulty: 'Medium', category: 'Algorithms', twist_type: "Cartesian Product Invariant" },
  'recover-binary-search-tree': { number: 99, title: "Recover Binary Search Tree", difficulty: 'Medium', category: 'Algorithms', twist_type: "Dual Inversion Detection Invariant" },
  'convert-sorted-array-to-binary-search-tree': { number: 108, title: "Convert Sorted Array to Binary Search Tree", difficulty: 'Easy', category: 'Algorithms', twist_type: "Median Split Invariant" },
  'convert-sorted-list-to-binary-search-tree': { number: 109, title: "Convert Sorted List to Binary Search Tree", difficulty: 'Medium', category: 'Algorithms', twist_type: "Slow-Fast Bisect Invariant" },
  'letter-combinations-of-a-phone-number': { number: 17, title: "Letter Combinations of a Phone Number", difficulty: 'Medium', category: 'Algorithms', twist_type: "Digit-to-Letter Cartesian Exploration" },
  'generate-parentheses': { number: 22, title: "Generate Parentheses", difficulty: 'Medium', category: 'Algorithms', twist_type: "Open-Close Balance State Tracking" },
  'combination-sum-ii': { number: 40, title: "Combination Sum II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Sorted Adjacent Duplicate Skip Traversal" },
  'permutations-ii': { number: 47, title: "Permutations II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Sorted Frequency Position Backtracking" },
  'combinations': { number: 77, title: "Combinations", difficulty: 'Medium', category: 'Algorithms', twist_type: "Lexicographical Suffix Boundary Pruning" },
  'subsets-ii': { number: 90, title: "Subsets II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Duplicate Run Size Choice Branching" },
  'palindrome-partitioning': { number: 131, title: "Palindrome Partitioning", difficulty: 'Medium', category: 'Algorithms', twist_type: "Prefix Palindrome Bounding Search" },
  'combination-sum-iii': { number: 216, title: "Combination Sum III", difficulty: 'Medium', category: 'Algorithms', twist_type: "Fixed Length Digit Sum Pruning" },
  'sudoku-solver': { number: 37, title: "Sudoku Solver", difficulty: 'Hard', category: 'Algorithms', twist_type: "Bitmask Row-Col-Box Constraint Propagation" },
  'n-queens': { number: 51, title: "N-Queens", difficulty: 'Hard', category: 'Algorithms', twist_type: "Column and Diagonal Coordinate Marking" },
  'n-queens-ii': { number: 52, title: "N-Queens II", difficulty: 'Hard', category: 'Algorithms', twist_type: "Bitwise Column Diagonal Interference Vector" },
  'rotate-image': { number: 48, title: "Rotate Image", difficulty: 'Medium', category: 'Algorithms', twist_type: "Transpose and Horizontal Reflection Invariant" },
  'spiral-matrix': { number: 54, title: "Spiral Matrix", difficulty: 'Medium', category: 'Algorithms', twist_type: "Four-Boundary Contraction Perimeter Walk" },
  'spiral-matrix-ii': { number: 59, title: "Spiral Matrix II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Concentric Square Layer Fill Sequence" },
  'set-matrix-zeroes': { number: 73, title: "Set Matrix Zeroes", difficulty: 'Medium', category: 'Algorithms', twist_type: "First Row and Column Flag Reuse" },
  'game-of-life': { number: 289, title: "Game of Life", difficulty: 'Medium', category: 'Algorithms', twist_type: "Two-Bit State Transition Encoding" },
  'diagonal-traverse': { number: 498, title: "Diagonal Traverse", difficulty: 'Medium', category: 'Algorithms', twist_type: "Sum Index Alternating Direction Flip" },
  'reshape-the-matrix': { number: 566, title: "Reshape the Matrix", difficulty: 'Easy', category: 'Algorithms', twist_type: "Linear Index Flattening Coordinate Map" },
  'transpose-matrix': { number: 867, title: "Transpose Matrix", difficulty: 'Easy', category: 'Algorithms', twist_type: "Index Inversion Direct Coordinate Map" },
  'island-perimeter': { number: 463, title: "Island Perimeter", difficulty: 'Easy', category: 'Algorithms', twist_type: "Boundary and Water Edge Counting" },
  'flood-fill': { number: 733, title: "Flood Fill", difficulty: 'Easy', category: 'Algorithms', twist_type: "Target Color In-Place Connected Walk" },
  'max-area-of-island': { number: 695, title: "Max Area of Island", difficulty: 'Medium', category: 'Algorithms', twist_type: "Recursive Connected Component Accumulation" },
  'surrounded-regions': { number: 130, title: "Surrounded Regions", difficulty: 'Medium', category: 'Algorithms', twist_type: "Border Escape Reachability Inversion" },
  'walls-and-gates': { number: 286, title: "Walls and Gates", difficulty: 'Medium', category: 'Algorithms', twist_type: "Multi-Source Frontier Distance Propagation" },
  '01-matrix': { number: 542, title: "01 Matrix", difficulty: 'Medium', category: 'Algorithms', twist_type: "Multi-Source Zero Frontier Wavefront" },
  'word-ladder': { number: 127, title: "Word Ladder", difficulty: 'Hard', category: 'Algorithms', twist_type: "Single-Character Wildcard Frontier Search" },
  'as-far-from-land-as-possible': { number: 1162, title: "As Far from Land as Possible", difficulty: 'Medium', category: 'Algorithms', twist_type: "Multi-Source Land Distance Expansion" },
  'shortest-path-in-binary-matrix': { number: 1091, title: "Shortest Path in Binary Matrix", difficulty: 'Medium', category: 'Algorithms', twist_type: "8-Directional Diagonal Frontier Traversal" },
  'shortest-bridge': { number: 934, title: "Shortest Bridge", difficulty: 'Medium', category: 'Algorithms', twist_type: "Component Isolation Multi-Source Expansion" },
  'keys-and-rooms': { number: 841, title: "Keys and Rooms", difficulty: 'Medium', category: 'Algorithms', twist_type: "Transitive Reachability Node Accumulation" },
  'find-if-path-exists-in-graph': { number: 1971, title: "Find if Path Exists in Graph", difficulty: 'Easy', category: 'Algorithms', twist_type: "Connected Component Reachability Traversal" },
  'find-the-town-judge': { number: 997, title: "Find the Town Judge", difficulty: 'Easy', category: 'Algorithms', twist_type: "Net In-Degree Unanimity Invariant" },
  'all-paths-from-source-to-target': { number: 797, title: "All Paths From Source to Target", difficulty: 'Medium', category: 'Algorithms', twist_type: "Acyclic Exhaustive Path Enumeration" },
  'is-graph-bipartite': { number: 785, title: "Is Graph Bipartite?", difficulty: 'Medium', category: 'Algorithms', twist_type: "Two-Color Conflict Alternation Check" },
  'possible-bipartition': { number: 886, title: "Possible Bipartition", difficulty: 'Medium', category: 'Algorithms', twist_type: "Dislike Graph Parity Coloring" },
  'network-delay-time': { number: 743, title: "Network Delay Time", difficulty: 'Medium', category: 'Algorithms', twist_type: "Shortest Path Non-Negative Weight Propagation" },
  'find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance': { number: 1334, title: "Find the City With the Smallest Number of Neighbors at a Threshold Distance", difficulty: 'Medium', category: 'Algorithms', twist_type: "All-Pairs Shortest Path Neighborhood Count" },
  'course-schedule-ii': { number: 210, title: "Course Schedule II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Kahn Indegree Topological Course Sequence" },
  'alien-dictionary': { number: 269, title: "Alien Dictionary", difficulty: 'Hard', category: 'Algorithms', twist_type: "Lexicographical Prefix Dag Topological Order" },
  'minimum-height-trees': { number: 310, title: "Minimum Height Trees", difficulty: 'Medium', category: 'Algorithms', twist_type: "Centroid Leaf Trimming Inward Pruning" },
  'find-eventual-safe-states': { number: 802, title: "Find Eventual Safe States", difficulty: 'Medium', category: 'Algorithms', twist_type: "Reverse Graph Terminal Reachability" },
  'graph-valid-tree': { number: 261, title: "Graph Valid Tree", difficulty: 'Medium', category: 'Algorithms', twist_type: "Edge Count Acyclic Connectivity Invariant" },
  'number-of-connected-components-in-an-undirected-graph': { number: 323, title: "Number of Connected Components in an Undirected Graph", difficulty: 'Medium', category: 'Algorithms', twist_type: "Disjoint Set Disjoint Component Contraction" },
  'number-of-provinces': { number: 547, title: "Number of Provinces", difficulty: 'Medium', category: 'Algorithms', twist_type: "Symmetric Matrix Transitive Equivalence Partition" },
  'redundant-connection-ii': { number: 685, title: "Redundant Connection II", difficulty: 'Hard', category: 'Algorithms', twist_type: "Dual-Parent Directed Cycle Disambiguation" },
  'evaluate-division': { number: 399, title: "Evaluate Division", difficulty: 'Medium', category: 'Algorithms', twist_type: "Multiplicative Ratio Path Query Search" },
  'accounts-merge': { number: 721, title: "Accounts Merge", difficulty: 'Medium', category: 'Algorithms', twist_type: "Shared Identifier Equivalence Class Merging" },
  'min-cost-to-connect-all-points': { number: 1584, title: "Min Cost to Connect All Points", difficulty: 'Medium', category: 'Algorithms', twist_type: "Manhattan Spanning Tree Greedy Union" },
  'critical-connections-in-a-network': { number: 1192, title: "Critical Connections in a Network", difficulty: 'Hard', category: 'Algorithms', twist_type: "Tarjan Low-Link Bridge Detection" },
  'find-all-people-with-secret': { number: 2092, title: "Find All People With Secret", difficulty: 'Hard', category: 'Algorithms', twist_type: "Timestamped Disjoint Set Rollback Merging" },
  'min-cost-climbing-stairs': { number: 746, title: "Min Cost Climbing Stairs", difficulty: 'Easy', category: 'Algorithms', twist_type: "Rolling Two-State Cost Step Minimization" },
  'house-robber-ii': { number: 213, title: "House Robber II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Circular Street Boundary Bipartition" },
  'decode-ways': { number: 91, title: "Decode Ways", difficulty: 'Medium', category: 'Algorithms', twist_type: "Valid Digit Lookback Combination Counting" },
  'perfect-squares': { number: 279, title: "Perfect Squares", difficulty: 'Medium', category: 'Algorithms', twist_type: "Square Subtraction Minimum Count Transition" },
  'integer-break': { number: 343, title: "Integer Break", difficulty: 'Medium', category: 'Algorithms', twist_type: "Sub-Factor Product Maximization Partition" },
  'fibonacci-number': { number: 509, title: "Fibonacci Number", difficulty: 'Easy', category: 'Algorithms', twist_type: "Constant Space Scalar Sequence Shift" },
  'n-th-tribonacci-number': { number: 1137, title: "N-th Tribonacci Number", difficulty: 'Easy', category: 'Algorithms', twist_type: "Triplet Sliding Window Sum Shift" },
  'delete-and-earn': { number: 740, title: "Delete and Earn", difficulty: 'Medium', category: 'Algorithms', twist_type: "Frequency-Weighted Non-Adjacent Robber Reduction" },
  'maximum-product-subarray': { number: 152, title: "Maximum Product Subarray", difficulty: 'Medium', category: 'Algorithms', twist_type: "Dual Min-Max Sign-Inversion Tracking" },
  'word-break-ii': { number: 140, title: "Word Break II", difficulty: 'Hard', category: 'Algorithms', twist_type: "Suffix Decomposition Sub-Sentence Assembly" },
  'combination-sum-iv': { number: 377, title: "Combination Sum IV", difficulty: 'Medium', category: 'Algorithms', twist_type: "Ordered Permutation Target Accumulation" },
  'count-ways-to-build-good-strings': { number: 2466, title: "Count Ways To Build Good Strings", difficulty: 'Medium', category: 'Algorithms', twist_type: "Modular Additive Length Combination Accumulation" },
  'unique-paths-ii': { number: 63, title: "Unique Paths II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Obstacle Zeroing 1D Rolling Row Routing" },
  'minimum-path-sum': { number: 64, title: "Minimum Path Sum", difficulty: 'Medium', category: 'Algorithms', twist_type: "1D Rolling Row Minimum Arrival Accumulation" },
  'triangle': { number: 120, title: "Triangle", difficulty: 'Medium', category: 'Algorithms', twist_type: "In-Place Bottom-Up Triangular Tier Reduction" },
  'maximal-square': { number: 221, title: "Maximal Square", difficulty: 'Medium', category: 'Algorithms', twist_type: "Triplet Minimum Corner Square Side Expansion" },
  'dungeon-game': { number: 174, title: "Dungeon Game", difficulty: 'Hard', category: 'Algorithms', twist_type: "Bottom-Right Destination Survival Reverse Propagation" },
  'cherry-pickup': { number: 741, title: "Cherry Pickup", difficulty: 'Hard', category: 'Algorithms', twist_type: "Dual-Walker Synchronous Step Forward Tracking" },
  'cherry-pickup-ii': { number: 1463, title: "Cherry Pickup II", difficulty: 'Hard', category: 'Algorithms', twist_type: "Synchronous Dual-Robot Column-Pair Row Descent" },
  'minimum-falling-path-sum': { number: 931, title: "Minimum Falling Path Sum", difficulty: 'Medium', category: 'Algorithms', twist_type: "1D Rolling Row Triplet Minimum Falling Path" },
  'out-of-boundary-paths': { number: 576, title: "Out of Boundary Paths", difficulty: 'Medium', category: 'Algorithms', twist_type: "Step-Wise Grid Move Propagation Boundary Escape" },
  'knight-probability-in-chessboard': { number: 688, title: "Knight Probability in Chessboard", difficulty: 'Medium', category: 'Algorithms', twist_type: "Equiprobable Knight Jump Step Distribution" },
  'number-of-dice-rolls-with-target-sum': { number: 1155, title: "Number of Dice Rolls With Target Sum", difficulty: 'Medium', category: 'Algorithms', twist_type: "Die-by-Die Face Sum Rolling Transition" },
  'champagne-tower': { number: 799, title: "Champagne Tower", difficulty: 'Medium', category: 'Algorithms', twist_type: "Pyramid Overflow Bifurcated Spillover Simulation" },
  'matrix-block-sum': { number: 1314, title: "Matrix Block Sum", difficulty: 'Medium', category: 'Algorithms', twist_type: "2D Prefix Sum Inclusion-Exclusion Box Query" },
  'coin-change-ii': { number: 518, title: "Coin Change II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Unbounded Knapsack Forward Combination Accumulation" },
  'ones-and-zeroes': { number: 474, title: "Ones and Zeroes", difficulty: 'Medium', category: 'Algorithms', twist_type: "Dual-Constraint 2D Reverse Knapsack" },
  'target-sum': { number: 494, title: "Target Sum", difficulty: 'Medium', category: 'Algorithms', twist_type: "Subset Sum Algebraic Identity Reduction" },
  'last-stone-weight-ii': { number: 1049, title: "Last Stone Weight II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Partition Balance Knapsack Minimization" },
  'partition-to-k-equal-sum-subsets': { number: 698, title: "Partition to K Equal Sum Subsets", difficulty: 'Medium', category: 'Algorithms', twist_type: "Bitmask Subset Accumulation Modulo Resets" },
  'shopping-offers': { number: 638, title: "Shopping Offers", difficulty: 'Medium', category: 'Algorithms', twist_type: "Needs Tuple State Bundle Optimization" },
  '2-keys-keyboard': { number: 650, title: "2 Keys Keyboard", difficulty: 'Medium', category: 'Algorithms', twist_type: "Prime Factor Sum Decomposition" },
  'greatest-sum-divisible-by-three': { number: 1262, title: "Greatest Sum Divisible by Three", difficulty: 'Medium', category: 'Algorithms', twist_type: "Modulo Three State Remainder Transition" },
  'minimum-cost-for-tickets': { number: 983, title: "Minimum Cost For Tickets", difficulty: 'Medium', category: 'Algorithms', twist_type: "Calendar Day Pass Lookback Recurrence" },
  'domino-and-tromino-tiling': { number: 790, title: "Domino and Tromino Tiling", difficulty: 'Medium', category: 'Algorithms', twist_type: "Three-Term Interlocking Tiling Recurrence" },
  'painting-the-walls': { number: 2742, title: "Painting the Walls", difficulty: 'Hard', category: 'Algorithms', twist_type: "Paid vs Free Painter Knapsack Reformulation" },
  'profitable-schemes': { number: 879, title: "Profitable Schemes", difficulty: 'Hard', category: 'Algorithms', twist_type: "Capped Profit Workforce Knapsack Accumulation" },
  'longest-palindromic-subsequence': { number: 516, title: "Longest Palindromic Subsequence", difficulty: 'Medium', category: 'Algorithms', twist_type: "Interval Outer-Character Matching Shrinkage" },
  'edit-distance': { number: 72, title: "Edit Distance", difficulty: 'Medium', category: 'Algorithms', twist_type: "Levenshtein Triple-Operation Recurrence" },
  'distinct-subsequences': { number: 115, title: "Distinct Subsequences", difficulty: 'Hard', category: 'Algorithms', twist_type: "1D Reverse Matching Subsequence Tally" },
  'interleaving-string': { number: 97, title: "Interleaving String", difficulty: 'Medium', category: 'Algorithms', twist_type: "2D Dual-String Prefix Interleaving Verification" },
  'wildcard-matching': { number: 44, title: "Wildcard Matching", difficulty: 'Hard', category: 'Algorithms', twist_type: "Any-Sequence Asterisk Prefix Reachability" },
  'regular-expression-matching': { number: 10, title: "Regular Expression Matching", difficulty: 'Hard', category: 'Algorithms', twist_type: "Kleene Star Zero-or-More Branch Parsing" },
  'russian-doll-envelopes': { number: 354, title: "Russian Doll Envelopes", difficulty: 'Hard', category: 'Algorithms', twist_type: "Width-Ascending Height-Descending Patience Sorting LIS" },
  'number-of-longest-increasing-subsequence': { number: 673, title: "Number of Longest Increasing Subsequence", difficulty: 'Medium', category: 'Algorithms', twist_type: "Dual-Property Length and Count LIS Tracking" },
  'best-time-to-buy-and-sell-stock-with-cooldown': { number: 309, title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: 'Medium', category: 'Algorithms', twist_type: "Three-State Finite Machine Cooldown Cycle" },
  'best-time-to-buy-and-sell-stock-with-transaction-fee': { number: 714, title: "Best Time to Buy and Sell Stock with Transaction Fee", difficulty: 'Medium', category: 'Algorithms', twist_type: "Two-State Cash vs Holding Fee Deduction" },
  'best-time-to-buy-and-sell-stock-iii': { number: 123, title: "Best Time to Buy and Sell Stock III", difficulty: 'Hard', category: 'Algorithms', twist_type: "Four-State Sequential Two-Trade Pipeline" },
  'best-time-to-buy-and-sell-stock-iv': { number: 188, title: "Best Time to Buy and Sell Stock IV", difficulty: 'Hard', category: 'Algorithms', twist_type: "K-Transaction State Array Greedy Fallback" },
  'maximum-profit-in-job-scheduling': { number: 1235, title: "Maximum Profit in Job Scheduling", difficulty: 'Hard', category: 'Algorithms', twist_type: "End-Time Sorted Interval Bisection LIS" }
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

  // Helper to normalize pattern object
  function normalizePattern(p) {
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
  }

  // Hot-apply OTA updates in memory
  function applyOtaDataset(otaData) {
    if (!otaData) return;
    if (Array.isArray(otaData.patterns)) {
      for (const pat of otaData.patterns) {
        if (pat && pat.id) {
          const norm = normalizePattern(pat);
          patternsById.set(pat.id, norm);
          const pIdx = normalizedPatterns.findIndex(p => p.id === pat.id);
          if (pIdx !== -1) {
            normalizedPatterns[pIdx] = norm;
          } else {
            normalizedPatterns.push(norm);
          }
        }
      }
    }
    if (Array.isArray(otaData.problems)) {
      for (const prob of otaData.problems) {
        if (prob && prob.slug) {
          curatedProblemsBySlug.set(prob.slug, prob);
          const cIdx = rawCuratedProblems.findIndex(p => p.slug === prob.slug);
          if (cIdx !== -1) {
            rawCuratedProblems[cIdx] = prob;
          } else {
            rawCuratedProblems.push(prob);
          }
        }
      }
    }
  }

  // Async load OTA dataset on engine creation if present in storage
  if (store && typeof store.get === 'function') {
    store.get('asymptote_ota_dataset').then(otaData => {
      if (otaData) applyOtaDataset(otaData);
    }).catch(() => {});
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
    applyOtaDataset(otaData) {
      applyOtaDataset(otaData);
    },

    getPatterns() {
      return [...normalizedPatterns];
    },

    getPatternById(id) {
      return patternsById.get(id) || null;
    },

    async getProblems(filters = {}) {
      const opts = filters || {};
      const rawUserProblems = (await store.get(STORAGE_KEY_USER_PROBLEMS)) || {};
      const problemsList = [];

      // Build bidirectional lookup for user problem state (canonical slug & problem number)
      const userStateBySlug = new Map();
      const userStateByNumber = new Map();

      for (const [key, state] of Object.entries(rawUserProblems)) {
        if (!state || typeof state !== 'object') continue;

        const resolvedSlug = resolveProblemSlug(key, dataset.index, rawCatalog)
          || (state.slug ? resolveProblemSlug(state.slug, dataset.index, rawCatalog) : null)
          || (state.titleSlug ? resolveProblemSlug(state.titleSlug, dataset.index, rawCatalog) : null)
          || key;

        let numVal = null;
        if (/^\d+$/.test(key)) {
          numVal = parseInt(key, 10);
        } else if (state.number !== undefined && state.number !== null && !isNaN(Number(state.number))) {
          numVal = Number(state.number);
        } else if (state.id !== undefined && /^\d+$/.test(String(state.id))) {
          numVal = parseInt(String(state.id), 10);
        } else if (state.frontend_id !== undefined && /^\d+$/.test(String(state.frontend_id))) {
          numVal = parseInt(String(state.frontend_id), 10);
        }

        if (numVal === null) {
          const cat = catalogBySlug.get(resolvedSlug);
          if (cat?.n) numVal = cat.n;
        }

        userStateBySlug.set(resolvedSlug, state);
        userStateBySlug.set(key, state);
        if (numVal !== null) {
          userStateByNumber.set(numVal, state);
          userStateByNumber.set(String(numVal), state);
        }
      }

      const handledSlugs = new Set();
      const handledNumbers = new Set();

      // 1. Curated problems
      for (const cp of rawCuratedProblems) {
        handledSlugs.add(cp.slug);
        if (cp.number) {
          handledNumbers.add(cp.number);
          handledNumbers.add(String(cp.number));
        }

        const meta = CURATED_PROBLEMS_META[cp.slug] || {};
        const userState = userStateBySlug.get(cp.slug)
          || (cp.number ? userStateByNumber.get(cp.number) : null)
          || (cp.number ? userStateByNumber.get(String(cp.number)) : null)
          || rawUserProblems[cp.slug]
          || (cp.number ? rawUserProblems[String(cp.number)] : null)
          || {};

        const isTestedOrReviewed = cp.review?.status === 'tested' || cp.review?.status === 'reviewed';
        const tier = cp.review?.status === 'reviewed' ? 'reviewed' : cp.review?.status === 'tested' ? 'tested' : 'unverified';

        const catalogEntry = catalogBySlug.get(cp.slug) || (cp.number ? catalogByNumber.get(cp.number) : null);
        const primaryPattern = cp.patterns?.[0] || meta.pattern_id || catalogEntry?.p || null;
        const pat = primaryPattern ? patternsById.get(primaryPattern) : null;
        const patternTitle = pat?.title || (primaryPattern ? primaryPattern.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : null);
        const languages = cp.languages || (Array.isArray(cp.solutions) ? cp.solutions.map(s => s.lang) : []);

        const isSolved = userState.is_solved ? 1 : 0;
        const reviewNeeded = userState.review_needed ? 1 : 0;

        problemsList.push({
          id: cp.number,
          frontend_id: String(cp.number),
          number: cp.number,
          title: meta.title || catalogEntry?.t || cp.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          title_slug: cp.slug,
          slug: cp.slug,
          difficulty: meta.difficulty || catalogEntry?.d || 'Medium',
          category: cp.category || meta.category || catalogEntry?.c || 'Algorithms',
          pattern_id: primaryPattern,
          pattern_title: patternTitle,
          patterns: cp.patterns || (primaryPattern ? [primaryPattern] : []),
          languages,
          verified: isTestedOrReviewed ? 1 : 0,
          verification_tier: tier,
          review: cp.review || { status: 'unverified' },
          source: 'dataset',
          twist_type: meta.twist_type || cp.twist_type || '',
          is_solved: isSolved,
          solved_at: userState.solved_at || null,
          user_code: userState.user_code || '',
          user_notes: userState.user_notes || userState.notes || '',
          notes: userState.user_notes || userState.notes || '',
          user_rating: userState.user_rating !== undefined ? userState.user_rating : (userState.confidence !== undefined ? userState.confidence : 0),
          confidence: userState.user_rating !== undefined ? userState.user_rating : (userState.confidence !== undefined ? userState.confidence : 0),
          review_needed: reviewNeeded,
          solutions: cp.solutions || [],
          hints: cp.hints || [],
          complexity: cp.complexity || null
        });
      }

      // 2. Uncurated problems from user storage
      for (const [key, userState] of Object.entries(rawUserProblems)) {
        if (!key || !userState || typeof userState !== 'object') continue;

        const resolvedSlug = resolveProblemSlug(key, dataset.index, rawCatalog)
          || (userState.slug ? resolveProblemSlug(userState.slug, dataset.index, rawCatalog) : null)
          || (userState.titleSlug ? resolveProblemSlug(userState.titleSlug, dataset.index, rawCatalog) : null)
          || key;

        // Skip if already handled in curated problems or handled earlier
        if (
          curatedProblemsBySlug.has(resolvedSlug) ||
          curatedProblemsBySlug.has(key) ||
          handledSlugs.has(resolvedSlug) ||
          handledSlugs.has(key) ||
          handledNumbers.has(key)
        ) {
          continue;
        }

        handledSlugs.add(resolvedSlug);
        handledSlugs.add(key);

        let parsedNum = null;
        if (/^\d+$/.test(key)) {
          parsedNum = parseInt(key, 10);
        } else if (userState.number !== undefined && userState.number !== null && !isNaN(Number(userState.number))) {
          parsedNum = Number(userState.number);
        } else if (userState.id !== undefined && /^\d+$/.test(String(userState.id))) {
          parsedNum = parseInt(String(userState.id), 10);
        } else if (userState.frontend_id !== undefined && /^\d+$/.test(String(userState.frontend_id))) {
          parsedNum = parseInt(String(userState.frontend_id), 10);
        }

        const catalogEntry = catalogBySlug.get(resolvedSlug)
          || (parsedNum !== null ? catalogByNumber.get(parsedNum) : null);

        const number = parsedNum || catalogEntry?.n || null;
        if (number) {
          handledNumbers.add(number);
          handledNumbers.add(String(number));
        }

        const category = userState.category || catalogEntry?.c || 'Algorithms';
        const difficulty = userState.difficulty || catalogEntry?.d || 'Medium';
        const title = userState.title || catalogEntry?.t || resolvedSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const patternId = userState.pattern_id || catalogEntry?.p || null;
        const pat = patternId ? patternsById.get(patternId) : null;
        const patternTitle = pat?.title || (patternId ? patternId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : null);

        problemsList.push({
          id: number || resolvedSlug,
          frontend_id: number ? String(number) : resolvedSlug,
          number: number ? Number(number) : null,
          title,
          title_slug: resolvedSlug,
          slug: resolvedSlug,
          difficulty,
          category,
          pattern_id: patternId,
          pattern_title: patternTitle,
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
          user_notes: userState.user_notes || userState.notes || '',
          notes: userState.user_notes || userState.notes || '',
          user_rating: userState.user_rating !== undefined ? userState.user_rating : (userState.confidence !== undefined ? userState.confidence : 0),
          confidence: userState.user_rating !== undefined ? userState.user_rating : (userState.confidence !== undefined ? userState.confidence : 0),
          review_needed: userState.review_needed ? 1 : 0,
          solutions: [],
          hints: [],
          complexity: null
        });
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
      const rawUserProblems = (await store.get(STORAGE_KEY_USER_PROBLEMS)) || {};

      const isNumQuery = /^\d+$/.test(String(query).trim());
      const queryNum = isNumQuery ? parseInt(String(query).trim(), 10) : null;
      const catalogEntry = catalogBySlug.get(slug) || (queryNum !== null ? catalogByNumber.get(queryNum) : null);
      const numCandidate = cp?.number || catalogEntry?.n || queryNum || null;

      // Bidirectional lookup for user state (supports slug, numeric ID, query, and search)
      const userState = rawUserProblems[slug]
        || (numCandidate !== null ? rawUserProblems[String(numCandidate)] : null)
        || (numCandidate !== null ? rawUserProblems[numCandidate] : null)
        || (queryNum !== null ? rawUserProblems[String(queryNum)] : null)
        || Object.values(rawUserProblems).find(s => s && (s.slug === slug || (numCandidate !== null && (s.number === numCandidate || s.frontend_id === String(numCandidate)))))
        || {};

      if (!cp || (cp.review?.status !== 'tested' && cp.review?.status !== 'reviewed')) {
        // Unverified or catalog problem: Never fallback to two-pointers or generate fake hints
        const meta = CURATED_PROBLEMS_META[slug] || {};
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
      const current = userProblems[slug] 
        || (typeof idOrSlug === 'number' || /^\d+$/.test(String(idOrSlug)) ? userProblems[String(idOrSlug)] : null) 
        || {};

      const next = {
        ...current,
        slug
      };

      if (updates.is_solved !== undefined) next.is_solved = updates.is_solved ? 1 : 0;
      if (updates.review_needed !== undefined) next.review_needed = updates.review_needed ? 1 : 0;
      if (updates.user_code !== undefined) next.user_code = updates.user_code;
      if (updates.user_notes !== undefined) {
        next.user_notes = updates.user_notes;
        next.notes = updates.user_notes;
      }
      if (updates.notes !== undefined) {
        next.user_notes = updates.notes;
        next.notes = updates.notes;
      }
      if (updates.user_rating !== undefined) {
        next.user_rating = Number(updates.user_rating);
        next.confidence = Number(updates.user_rating);
      }
      if (updates.confidence !== undefined) {
        next.user_rating = Number(updates.confidence);
        next.confidence = Number(updates.confidence);
      }
      if (updates.unlocked_hint_level !== undefined) next.unlocked_hint_level = Number(updates.unlocked_hint_level);

      userProblems[slug] = next;
      if (typeof idOrSlug === 'number' || /^\d+$/.test(String(idOrSlug))) {
        userProblems[String(idOrSlug)] = next;
      }
      await store.set(STORAGE_KEY_USER_PROBLEMS, userProblems);

      const all = await this.getProblems();
      return all.find(p => p.slug === slug) || null;
    },

    async updateProblemNotes(idOrSlug, data = {}) {
      return this.updateProblemUserState(idOrSlug, data);
    },

    async batchSyncProblems(problems = [], username = null) {
      return this.syncBatch({ username, problems });
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
      const curated = curatedProblemsBySlug.get(slug);
      const meta = CURATED_PROBLEMS_META[slug] || {};
      const primaryPattern = curated?.patterns?.[0] || meta.pattern_id || catalogEntry?.p || null;

      const next = {
        ...prev,
        slug,
        is_solved: 1,
        solved_at: new Date().toISOString()
      };

      if (code) next.user_code = code;
      next.number = parsedNum !== null ? parsedNum : (curated?.number || catalogEntry?.n || prev?.number || null);
      next.title = title || meta.title || catalogEntry?.t || prev?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      next.difficulty = difficulty || meta.difficulty || catalogEntry?.d || prev?.difficulty || 'Medium';
      next.category = category || curated?.category || meta.category || catalogEntry?.c || prev?.category || 'Algorithms';
      if (languages) next.languages = languages;
      if (primaryPattern && !next.pattern_id) {
        next.pattern_id = primaryPattern;
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
        const curated = curatedProblemsBySlug.get(slug);
        const meta = CURATED_PROBLEMS_META[slug] || {};
        const primaryPattern = curated?.patterns?.[0] || meta.pattern_id || catalogEntry?.p || null;

        userProblems[slug] = {
          ...prev,
          slug,
          number: parsedNum || curated?.number || catalogEntry?.n || prev?.number || null,
          title: p.title || meta.title || catalogEntry?.t || prev?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          difficulty: p.difficulty || meta.difficulty || catalogEntry?.d || prev?.difficulty || 'Medium',
          category: p.categoryTitle || p.category || curated?.category || meta.category || catalogEntry?.c || prev?.category || 'Algorithms',
          pattern_id: prev?.pattern_id || primaryPattern,
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
    },

    async exportUserData() {
      const userProblems = (await store.get(STORAGE_KEY_USER_PROBLEMS)) || {};
      const username = (await store.get(STORAGE_KEY_USERNAME)) || null;
      const lastSync = (await store.get(STORAGE_KEY_LAST_SYNC)) || null;
      const recentLogs = (await store.get(STORAGE_KEY_RECENT_LOGS)) || [];

      return {
        schema_version: 'asymptote-backup-v1',
        app_version: '2.0.0',
        exported_at: new Date().toISOString(),
        username,
        last_sync: lastSync,
        total_problems: Object.keys(userProblems).length,
        user_problems: userProblems,
        recent_logs: recentLogs
      };
    },

    async importUserData(backupData) {
      if (!backupData || typeof backupData !== 'object') {
        throw new Error('Invalid backup file: Payload must be a JSON object');
      }

      // Check if user_problems is present (supports both root-level mapping or backup wrapper)
      const incomingProblems = backupData.user_problems || (backupData.schema_version ? null : backupData);
      if (!incomingProblems || typeof incomingProblems !== 'object' || Array.isArray(incomingProblems)) {
        throw new Error('Invalid backup file: Missing user_problems mapping');
      }

      const existingProblems = (await store.get(STORAGE_KEY_USER_PROBLEMS)) || {};
      const mergedProblems = { ...existingProblems };

      let importedCount = 0;
      for (const [key, data] of Object.entries(incomingProblems)) {
        if (!key || !data || typeof data !== 'object') continue;

        const canonicalSlug = resolveProblemSlug(key, dataset.index, rawCatalog)
          || (data.slug ? resolveProblemSlug(data.slug, dataset.index, rawCatalog) : null)
          || (data.titleSlug ? resolveProblemSlug(data.titleSlug, dataset.index, rawCatalog) : null)
          || key;

        const curated = curatedProblemsBySlug.get(canonicalSlug);
        const cat = catalogBySlug.get(canonicalSlug);
        const patternId = data.pattern_id || curated?.patterns?.[0] || cat?.p || null;

        const prev = mergedProblems[canonicalSlug] || mergedProblems[key] || {};
        mergedProblems[canonicalSlug] = {
          ...prev,
          ...data,
          slug: canonicalSlug,
          pattern_id: patternId || prev.pattern_id || null,
          user_notes: data.user_notes !== undefined ? data.user_notes : (data.notes !== undefined ? data.notes : (prev.user_notes || prev.notes || '')),
          notes: data.notes !== undefined ? data.notes : (data.user_notes !== undefined ? data.user_notes : (prev.notes || prev.user_notes || '')),
          user_rating: data.user_rating !== undefined ? Number(data.user_rating) : (data.confidence !== undefined ? Number(data.confidence) : (prev.user_rating || prev.confidence || 0)),
          confidence: data.confidence !== undefined ? Number(data.confidence) : (data.user_rating !== undefined ? Number(data.user_rating) : (prev.confidence || prev.user_rating || 0))
        };
        importedCount++;
      }

      await store.set(STORAGE_KEY_USER_PROBLEMS, mergedProblems);

      if (backupData.username && typeof backupData.username === 'string') {
        await store.set(STORAGE_KEY_USERNAME, backupData.username);
      }
      if (backupData.last_sync && typeof backupData.last_sync === 'string') {
        await store.set(STORAGE_KEY_LAST_SYNC, backupData.last_sync);
      }

      const now = new Date().toISOString();
      const logs = (await store.get(STORAGE_KEY_RECENT_LOGS)) || [];
      logs.unshift({
        timestamp: now,
        type: 'backup_restore',
        message: `Restored ${importedCount} problems from backup file`
      });
      await store.set(STORAGE_KEY_RECENT_LOGS, logs.slice(0, 20));

      return {
        success: true,
        importedCount,
        totalUserProblems: Object.keys(mergedProblems).length
      };
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
