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
  'maximum-profit-in-job-scheduling': { number: 1235, title: "Maximum Profit in Job Scheduling", difficulty: 'Hard', category: 'Algorithms', twist_type: "End-Time Sorted Interval Bisection LIS" },
  'guess-number-higher-or-lower-ii': { number: 375, title: 'Guess Number Higher or Lower II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Minimax Range Subproblem Decomposition' },
  'minimum-score-triangulation-of-polygon': { number: 1039, title: 'Minimum Score Triangulation of Polygon', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Polygon Base Edge Fixed Triangle Splitting' },
  'strange-printer': { number: 664, title: 'Strange Printer', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Same Character Boundary Print Merging' },
  'remove-boxes': { number: 546, title: 'Remove Boxes', difficulty: 'Hard', category: 'Algorithms', twist_type: '3D Range State with Trailing Identical Color Count' },
  'minimum-cost-to-merge-stones': { number: 1000, title: 'Minimum Cost to Merge Stones', difficulty: 'Hard', category: 'Algorithms', twist_type: 'K-Way Merge Step Modulo Parity Invariant' },
  'can-i-win': { number: 464, title: 'Can I Win', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Chosen Integer Bitmask Minimax Game Tree' },
  'matchsticks-to-square': { number: 473, title: 'Matchsticks to Square', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Four Equal Perimeter Side Subsets Bitmask' },
  'beautiful-arrangement': { number: 526, title: 'Beautiful Arrangement', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Implicit Position Index via Set Bit Count' },
  'stickers-to-spell-word': { number: 691, title: 'Stickers to Spell Word', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Target Character Completion Bitmask Search' },
  'find-the-shortest-superstring': { number: 943, title: 'Find the Shortest Superstring', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Traveling Salesperson Overlap Graph Bitmask' },
  'maximum-students-taking-exam': { number: 1349, title: 'Maximum Students Taking Exam', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Row-by-Row Independent Diagonal Bitmask DP' },
  'number-of-ways-to-wear-different-hats-to-each-other': { number: 1434, title: 'Number of Ways to Wear Different Hats to Each Other', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Inverted Hat-to-People Bitmask Assignment' },
  'replace-words': { number: 648, title: 'Replace Words', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Shortest Root Prefix Tree Lookup' },
  'word-search-ii': { number: 212, title: 'Word Search II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Trie-Guided Multi-Word Grid Backtracking' },
  'maximum-xor-of-two-numbers-in-an-array': { number: 421, title: 'Maximum XOR of Two Numbers in an Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Trie Opposite-Bit Greedy Branching' },
  'concatenated-words': { number: 472, title: 'Concatenated Words', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Trie Prefix DFS Decomposition with Short-Circuiting' },
  'longest-word-in-dictionary': { number: 720, title: 'Longest Word in Dictionary', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Trie Stepwise Prefix Completion Invariant' },
  'find-the-index-of-the-first-occurrence-in-a-string': { number: 28, title: 'Find the Index of the First Occurrence in a String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'KMP Longest Prefix-Suffix Partial Match Table' },
  'repeated-substring-pattern': { number: 459, title: 'Repeated Substring Pattern', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Doubled String Substring Search or KMP Periodicity' },
  'rotate-string': { number: 796, title: 'Rotate String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Concatenated String Substring Inclusion' },
  'longest-happy-prefix': { number: 1392, title: 'Longest Happy Prefix', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Terminal Value of KMP Prefix-Suffix Function' },
  'shortest-palindrome': { number: 214, title: 'Shortest Palindrome', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Mirrored Delimited String Prefix Function' },
  'constrained-subsequence-sum': { number: 1425, title: 'Constrained Subsequence Sum', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Monotonic Queue Sliding Window DP' },
  'jump-game-vi': { number: 1696, title: 'Jump Game VI', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sliding Window Maximum Monotonic Deque DP' },
  'sliding-window-median': { number: 480, title: 'Sliding Window Median', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dual Heaps with Lazy Deletion Removal Tracker' },
  'wiggle-sort-ii': { number: 324, title: 'Wiggle Sort II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Virtual Indexing Reverse Halves Interleaving' },
  'minimum-moves-to-equal-array-elements-ii': { number: 462, title: 'Minimum Moves to Equal Array Elements II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Median L1 Absolute Deviation Minimization' },
  'top-k-frequent-words': { number: 692, title: 'Top K Frequent Words', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Tier Frequency and Lexicographical Sorting' },
  'contiguous-array': { number: 525, title: 'Contiguous Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Zero-Sum Offset Balanced Prefix Hash Map' },
  'continuous-subarray-sum': { number: 523, title: 'Continuous Subarray Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Modulo Remainder Distance Invariant' },
  'subarray-sums-divisible-by-k': { number: 974, title: 'Subarray Sums Divisible by K', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Modulo Remainder Frequency Accumulation' },
  'maximum-absolute-sum-of-any-subarray': { number: 1749, title: 'Maximum Absolute Sum of Any Subarray', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Cumulative Prefix Sum Range Extremes' },
  'maximum-subarray-sum-with-one-deletion': { number: 1186, title: 'Maximum Subarray Sum with One Deletion', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual-State Zero vs One Skipped Element DP' },
  'count-primes': { number: 204, title: 'Count Primes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sieve of Eratosthenes Composite Elimination' },
  'powx-n': { number: 50, title: 'Pow(x, n)', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Exponentiation by Repeated Squaring' },
  'ugly-number': { number: 263, title: 'Ugly Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Allowed Prime Factor Decomposition' },
  'ugly-number-ii': { number: 264, title: 'Ugly Number II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Three-Pointer Multi-Stream Candidate Merging' },
  'number-of-1-bits': { number: 191, title: 'Number of 1 Bits', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Brian Kernighan Lowest Set Bit Clearing' },
  'reverse-bits': { number: 190, title: 'Reverse Bits', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bitwise Shifting 32-Bit Reversal' },
  'single-number-ii': { number: 137, title: 'Single Number II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Bit State Machine Modulo Three Counter' },
  'single-number-iii': { number: 260, title: 'Single Number III', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Differentiating Lowest Bit Partitioning' },
  'sum-of-two-integers': { number: 371, title: 'Sum of Two Integers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bitwise Half-Adder XOR and Shifted Carry' },
  'gas-station': { number: 134, title: 'Gas Station', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Negative Tank Segment Deficit Reset' },
  'jump-game-ii': { number: 45, title: 'Jump Game II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Farthest Reach Window Interval' },
  'candy': { number: 135, title: 'Candy', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bidirectional Neighbor Pass Extreme Envelope' },
  'partition-labels': { number: 763, title: 'Partition Labels', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Last Character Occurrence Boundary Merge' },
  'minimum-number-of-arrows-to-burst-balloons': { number: 452, title: 'Minimum Number of Arrows to Burst Balloons', difficulty: 'Medium', category: 'Algorithms', twist_type: 'End-Coordinate Sorted Greedy Point Stabbing' },
  'queue-reconstruction-by-height': { number: 406, title: 'Queue Reconstruction by Height', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Descending Height Decoupled Index Insertion' },
  'task-scheduler': { number: 621, title: 'Task Scheduler', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Max-Frequency Framing and Idle Slot Calculation' },
  'reverse-pairs': { number: 493, title: 'Reverse Pairs', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Merge Sort Cross-Inversion Monotonic Pointer' },
  'palindrome-number': { number: 9, title: 'Palindrome Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Half-Integer Digit Reversal Invariant' },
  'longest-common-prefix': { number: 14, title: 'Longest Common Prefix', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Horizontal Character Scanning Truncation' },
  'roman-to-integer': { number: 13, title: 'Roman to Integer', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Subtractive Precedence Subtraction Lookahead' },
  'integer-to-roman': { number: 12, title: 'Integer to Roman', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Value Symbol Matching Subtraction' },
  'reverse-integer': { number: 7, title: 'Reverse Integer', difficulty: 'Medium', category: 'Algorithms', twist_type: '32-Bit Overflow Boundary Check Ahead of Multiplication' },
  'reverse-words-in-a-string': { number: 151, title: 'Reverse Words in a String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pointer Whitespace Trimming and In-Place Word Reversal' },
  'remove-duplicates-from-sorted-array-ii': { number: 80, title: 'Remove Duplicates from Sorted Array II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fast-Slow Two-Pointer with K-Step Lookback' },
  'pascals-triangle': { number: 118, title: "Pascal's Triangle", difficulty: 'Easy', category: 'Algorithms', twist_type: 'Row-by-Row Dynamic Programming Combinations' },
  'pascals-triangle-ii': { number: 119, title: "Pascal's Triangle II", difficulty: 'Easy', category: 'Algorithms', twist_type: 'In-Place Reverse Suffix Vector Accumulation' },
  'single-number': { number: 136, title: 'Single Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bitwise XOR Self-Cancellation' },
  'happy-number': { number: 202, title: 'Happy Number', difficulty: 'Easy', category: 'Algorithms', twist_type: "Floyd's Cycle-Finding Algorithm on Digit Square Sums" },
  'isomorphic-strings': { number: 205, title: 'Isomorphic Strings', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bijective Character Mapping Alignment' },
  'majority-element-ii': { number: 229, title: 'Majority Element II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Generalized Boyer-Moore Majority Voting with Two Candidates' },
  'power-of-two': { number: 231, title: 'Power of Two', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bitwise Lowest Set Bit Resetting' },
  'power-of-three': { number: 326, title: 'Power of Three', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Prime Base Maximum Integer Divisibility' },
  'power-of-four': { number: 342, title: 'Power of Four', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Even Position Bitmask and Power-of-Two Conjunction' },
  'summary-ranges': { number: 228, title: 'Summary Ranges', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Contiguous Consecutive Difference Range Scanning' },
  'first-unique-character-in-a-string': { number: 387, title: 'First Unique Character in a String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pass Frequency Counting with Fixed Alphabet Array' },
  'find-the-difference': { number: 389, title: 'Find the Difference', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bitwise XOR Cancellation Across Augmented Strings' },
  'ransom-note': { number: 383, title: 'Ransom Note', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Character Inventory Deficit Verification' },
  'longest-palindrome': { number: 409, title: 'Longest Palindrome', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Even-Pair Character Summation with Odd Center' },
  'third-maximum-number': { number: 414, title: 'Third Maximum Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Three-Variable Waterfall Descent Update' },
  'add-strings': { number: 415, title: 'Add Strings', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Simulated Column Addition with Reverse Carry' },
  'assign-cookies': { number: 455, title: 'Assign Cookies', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Dual-Sorted Greedy Minimal Requirement Matching' },
  'repeated-dna-sequences': { number: 187, title: 'Repeated DNA Sequences', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fixed 10-Character Sliding Window Hash Deduplication' },
  'split-array-largest-sum': { number: 410, title: 'Split Array Largest Sum', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Monotonic Maximum Subarray Capacity Bisection' },
  'find-k-th-smallest-pair-distance': { number: 719, title: 'Find K-th Smallest Pair Distance', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Distance Threshold Bisection with Two-Pointer Counting' },
  'kth-smallest-number-in-multiplication-table': { number: 668, title: 'Kth Smallest Number in Multiplication Table', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Range Bisection with Row-Wise Floor Division Summation' },
  'shortest-unsorted-continuous-subarray': { number: 581, title: 'Shortest Unsorted Continuous Subarray', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Max and Suffix Min Extremal Inversion Bounds' },
  'max-chunks-to-make-sorted': { number: 769, title: 'Max Chunks To Make Sorted', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Running Maximum Prefix Permutation Index Match' },
  'max-chunks-to-make-sorted-ii': { number: 768, title: 'Max Chunks To Make Sorted II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Monotonic Stack of Chunk Maximum Envelopes' },
  'longest-harmonious-subsequence': { number: 594, title: 'Longest Harmonious Subsequence', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Hash Map Lookup for Adjacent Value Frequencies' },
  'can-place-flowers': { number: 605, title: 'Can Place Flowers', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Eager Plot Planting with Boundary Guards' },
  'maximum-product-of-three-numbers': { number: 628, title: 'Maximum Product of Three Numbers', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Five-Variable Extremum Tracking with Dual-Negative Consideration' },
  'set-mismatch': { number: 645, title: 'Set Mismatch', difficulty: 'Easy', category: 'Algorithms', twist_type: 'In-Place Sign Inversion Index Marking' },
  'valid-palindrome-ii': { number: 680, title: 'Valid Palindrome II', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pointer Inward Traversal with Single-Branch Deletion' },
  'degree-of-an-array': { number: 697, title: 'Degree of an Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'First-Last Occurrence Index Span over Max-Frequency Elements' },
  'binary-number-with-alternating-bits': { number: 693, title: 'Binary Number with Alternating Bits', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Adjacent Bit XOR All-Ones Identity' },
  'self-dividing-numbers': { number: 728, title: 'Self Dividing Numbers', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Arithmetic Digit Extraction and Divisibility Filtering' },
  'jewels-and-stones': { number: 771, title: 'Jewels and Stones', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Fast Hash Set Character Membership Filtering' },
  'toeplitz-matrix': { number: 766, title: 'Toeplitz Matrix', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Diagonal Neighbor Equivalence Verification' },
  'largest-number-at-least-twice-of-others': { number: 747, title: 'Largest Number At Least Twice of Others', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Dual-Max Single Pass Invariant' },
  'prime-number-of-set-bits-in-binary-representation': { number: 762, title: 'Prime Number of Set Bits in Binary Representation', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Small-Prime Bit Count Set Membership' },
  'letter-case-permutation': { number: 784, title: 'Letter Case Permutation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Character Branching Backtracking' },
  'shifting-letters': { number: 848, title: 'Shifting Letters', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Reverse Suffix Sum Accumulation Modulo 26' },
  'loud-and-rich': { number: 851, title: 'Loud and Rich', difficulty: 'Medium', category: 'Algorithms', twist_type: 'DAG Topological Traversal via Memoized DFS' },
  'maximum-sum-circular-subarray': { number: 918, title: 'Maximum Sum Circular Subarray', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual Kadane Subarray Max and Inverted Min Sum' },
  'shortest-subarray-with-sum-at-least-k': { number: 862, title: 'Shortest Subarray with Sum at Least K', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Monotonic Deque of Prefix Sums' },
  'best-time-to-buy-and-sell-stock-ii': { number: 122, title: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Consecutive Daily Gain Accumulation' },
  'find-all-numbers-disappeared-in-an-array': { number: 448, title: 'Find All Numbers Disappeared in an Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'In-Place Value-to-Index Sign Negation' },
  // Sub-Batch 13A
  'string-to-integer-atoi': { number: 8, title: 'String to Integer (atoi)', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Leading Whitespace Trimming and Integer Clamp Overflow Guard' },
  'length-of-last-word': { number: 58, title: 'Length of Last Word', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Trailing Whitespace Reverse Pointer Scan' },
  'plus-one': { number: 66, title: 'Plus One', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Right-to-Left Carry Propagation with Dynamic Head Prepend' },
  'add-binary': { number: 67, title: 'Add Binary', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Simulated Base-2 Columnar Addition with Modulo Carry' },
  'sqrtx': { number: 69, title: 'Sqrt(x)', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Monotonic Integer Search Space Range Bisection' },
  'excel-sheet-column-title': { number: 168, title: 'Excel Sheet Column Title', difficulty: 'Easy', category: 'Algorithms', twist_type: '1-Based to 0-Based Shifting in Base-26 Conversion' },
  'excel-sheet-column-number': { number: 171, title: 'Excel Sheet Column Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Horner Polynomial Evaluation in Base-26' },
  'factorial-trailing-zeroes': { number: 172, title: 'Factorial Trailing Zeroes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Legendre Prime Factor 5 Multiplicity Division' },
  'largest-number': { number: 179, title: 'Largest Number', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pairwise Concatenation Comparator Total Ordering' },
  'rotate-array': { number: 189, title: 'Rotate Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Three-Stage Segment Reversal Inversion' },
  'bitwise-and-of-numbers-range': { number: 201, title: 'Bitwise AND of Numbers Range', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Common High-Order Binary Prefix Shift Convergence' },
  'rectangle-area': { number: 223, title: 'Rectangle Area', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Inclusion-Exclusion Principle with Clamped Overlap Bounding' },
  // Sub-Batch 13B
  'reverse-vowels-of-a-string': { number: 345, title: 'Reverse Vowels of a String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pointer Inward Vowel Scan with Consonant Skipping' },
  'intersection-of-two-arrays': { number: 349, title: 'Intersection of Two Arrays', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Set-Based Element Deduplication Filtering' },
  'intersection-of-two-arrays-ii': { number: 350, title: 'Intersection of Two Arrays II', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Multiplicity Frequency Map Stock Decrementing' },
  'is-subsequence': { number: 392, title: 'Is Subsequence', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Two-Pointer Earliest Character Consumption' },
  'fizz-buzz': { number: 412, title: 'Fizz Buzz', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Multi-Condition Modulo Branching Precedence' },
  'arithmetic-slices': { number: 413, title: 'Arithmetic Slices', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Linear Streak Accumulation over Consecutive Differences' },
  'number-of-segments-in-a-string': { number: 434, title: 'Number of Segments in a String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Leading Edge Word Boundary Transition Detection' },
  'find-all-duplicates-in-an-array': { number: 442, title: 'Find All Duplicates in an Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'In-Place Value-to-Index Sign Inversion Marking' },
  'string-compression': { number: 443, title: 'String Compression', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pointer In-Place Run-Length Writing' },
  'minimum-moves-to-equal-array-elements': { number: 453, title: 'Minimum Moves to Equal Array Elements', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Mathematical Duality of Minimum Element Distance Summation' },
  '4sum-ii': { number: 454, title: '4Sum II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bipartite Meet-in-the-Middle Pair Sum Hash Mapping' },
  'hamming-distance': { number: 461, title: 'Hamming Distance', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bitwise XOR Difference Population Counting' },
  'number-complement': { number: 476, title: 'Number Complement', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bit-Length Bounded All-Ones Mask Inversion' },
  // Sub-Batch 13C
  'total-hamming-distance': { number: 477, title: 'Total Hamming Distance', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bit Column Independence Combinatorial Cross Product' },
  'license-key-formatting': { number: 482, title: 'License Key Formatting', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Reverse Grouping with Uniform Block Size Alignment' },
  'max-consecutive-ones': { number: 485, title: 'Max Consecutive Ones', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single-Pass Streak Reset Tracking' },
  'construct-the-rectangle': { number: 492, title: 'Construct the Rectangle', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Square Root Descending Factor Search' },
  'teemo-attacking': { number: 495, title: 'Teemo Attacking', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Poison Interval Clamped Difference Accumulation' },
  'keyboard-row': { number: 500, title: 'Keyboard Row', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Keyboard Row Subset Filtering' },
  'base-7': { number: 504, title: 'Base 7', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Divisive Remainder Base-7 Digit Reversal' },
  'relative-ranks': { number: 506, title: 'Relative Ranks', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Descending Index Pair Sorting with Medal Substitution' },
  'perfect-number': { number: 507, title: 'Perfect Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Square Root Bounded Proper Divisor Pair Summation' },
  'detect-capital': { number: 520, title: 'Detect Capital', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Capitalization Grammar Count Evaluation' },
  'reverse-string-ii': { number: 541, title: 'Reverse String II', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Stride-2K Segment Reversal with Bounded Right Pointer' },
  'array-partition': { number: 561, title: 'Array Partition', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Sorted Even Index Summation Greedy Loss Minimization' },
  // Sub-Batch 13D
  'student-attendance-record-i': { number: 551, title: 'Student Attendance Record I', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Absence Count and Consecutive Late Streak Verification' },
  'reverse-words-in-a-string-iii': { number: 557, title: 'Reverse Words in a String III', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Delimiter-Preserving Token Character Inversion' },
  'distribute-candies': { number: 575, title: 'Distribute Candies', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Unique Type Count Quota Capping' },
  'range-addition-ii': { number: 598, title: 'Range Addition II', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bounding Box Rectangle Intersection Minimization' },
  'minimum-index-sum-of-two-lists': { number: 599, title: 'Minimum Index Sum of Two Lists', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Preference Index Sum Hash Map Minimization' },
  'maximum-average-subarray-i': { number: 643, title: 'Maximum Average Subarray I', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Fixed-Size Sliding Window Running Sum Update' },
  'palindromic-substrings': { number: 647, title: 'Palindromic Substrings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Center Outward Expansion over 2N-1 Centers' },
  'robot-return-to-origin': { number: 657, title: 'Robot Return to Origin', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bilateral Direction Counter Balance' },
  'image-smoother': { number: 661, title: 'Image Smoother', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Nine-Cell Neighborhood Boundary Clamped Floor Average' },
  'non-decreasing-array': { number: 665, title: 'Non-decreasing Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Inversion Adjustment with Context Lookback' },
  'maximum-swap': { number: 670, title: 'Maximum Swap', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Rightmost Largest Digit Occurrence Greedy Swap' },
  'longest-continuous-increasing-subsequence': { number: 674, title: 'Longest Continuous Increasing Subsequence', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single-Pass Consecutive Ascent Streak Tracking' },
  'baseball-game': { number: 682, title: 'Baseball Game', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Stack Simulation with Operation History Unwinding' },
  // Sub-Batch 14A
  'longest-palindromic-substring': { number: 5, title: 'Longest Palindromic Substring', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Center Outward Expansion over 2N-1 Centers' },
  'divide-two-integers': { number: 29, title: 'Divide Two Integers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Exponential Subtraction with Clamping Guard' },
  'count-and-say': { number: 38, title: 'Count and Say', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pointer Run-Length String Transformation' },
  'first-missing-positive': { number: 41, title: 'First Missing Positive', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Cyclic Value-to-Index Bucket Swapping' },
  'multiply-strings': { number: 43, title: 'Multiply Strings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Positional Columnar Digit Product Accumulation' },
  'insert-interval': { number: 57, title: 'Insert Interval', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Three-Stage Non-Overlapping and Merged Interval Partition' },
  'permutation-sequence': { number: 60, title: 'Permutation Sequence', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Factorial Radix Digit Selection and Quotient Decomposition' },
  'gray-code': { number: 89, title: 'Gray Code', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bitwise i XOR Shift-Right Invariant Generation' },
  'restore-ip-addresses': { number: 93, title: 'Restore IP Addresses', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Four-Octet Numerical Range Backtracking' },
  'maximum-gap': { number: 164, title: 'Maximum Gap', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pigeonhole Bucket Partitioning with Inter-Bucket Min-Max Gap' },
  'compare-version-numbers': { number: 165, title: 'Compare Version Numbers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Delimiter Segment Parsing with Implicit Trailing Zero Padding' },
  'magic-squares-in-grid': { number: 840, title: 'Magic Squares In Grid', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Three-by-Three Distinct Digits and Magic Constant Fifteen Verification' },
  // Sub-Batch 14B
  'fraction-to-recurring-decimal': { number: 166, title: 'Fraction to Recurring Decimal', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Remainder Index Mapping for Recurring Cycle Detection' },
  'different-ways-to-add-parentheses': { number: 241, title: 'Different Ways to Add Parentheses', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Operator Bisection Divide-and-Conquer Memoization' },
  'add-digits': { number: 258, title: 'Add Digits', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Closed-Form Digital Root Modulo 9 Arithmetic' },
  'integer-to-english-words': { number: 273, title: 'Integer to English Words', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Three-Digit Triplet Scale Decomposition and String Assembly' },
  'h-index': { number: 274, title: 'H-Index', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bucket Counting Histogram with Suffix Accumulation' },
  'nim-game': { number: 292, title: 'Nim Game', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Periodic Four-Step Game Invariance Modulo 4' },
  'bulls-and-cows': { number: 299, title: 'Bulls and Cows', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single-Pass Exact Match and Digit Frequency Histogram' },
  'maximum-product-of-word-lengths': { number: 318, title: 'Maximum Product of Word Lengths', difficulty: 'Medium', category: 'Algorithms', twist_type: '26-Bit Character Set Mask Disjointness Testing' },
  'bulb-switcher': { number: 319, title: 'Bulb Switcher', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Odd Divisor Multiplicity Perfect Square Counting' },
  'count-numbers-with-unique-digits': { number: 357, title: 'Count Numbers with Unique Digits', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Permutational Choice Product Combinatorics' },
  'super-pow': { number: 372, title: 'Super Pow', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Horner Method Modular Exponentiation in Base 10' },
  'wiggle-subsequence': { number: 376, title: 'Wiggle Subsequence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Alternating Peak and Valley Extremum Tracking' },
  'rotate-function': { number: 396, title: 'Rotate Function', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Linear Step Recurrence with Full Array Sum Delta' },
  // Sub-Batch 14C
  'integer-replacement': { number: 397, title: 'Integer Replacement', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Bit Lookahead Greedy Parity Branching' },
  'nth-digit': { number: 400, title: 'Nth Digit', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Digit Block Capacity Skipping and Positional Character Extraction' },
  'convert-a-number-to-hexadecimal': { number: 405, title: 'Convert a Number to Hexadecimal', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Four-Bit Nibble Masking with Unsigned Shift' },
  'reconstruct-original-digits-from-english': { number: 423, title: 'Reconstruct Original Digits from English', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Wave Unique Letter Character Frequency Deduction' },
  'heaters': { number: 475, title: 'Heaters', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Point Binary Search with Minimal Distance Maximization' },
  'magical-string': { number: 481, title: 'Magical String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Kolakoski Dual-Pointer Self-Generating Sequence Simulation' },
  'longest-uncommon-subsequence-i': { number: 521, title: 'Longest Uncommon Subsequence I', difficulty: 'Easy', category: 'Algorithms', twist_type: 'String Equality Invariance and Maximum Length Bounding' },
  'longest-uncommon-subsequence-ii': { number: 522, title: 'Longest Uncommon Subsequence II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Descending Length Sorting with Pairwise Subsequence Verification' },
  'longest-word-in-dictionary-through-deleting': { number: 524, title: 'Longest Word in Dictionary through Deleting', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Subsequence Matching with Lexicographical Tie-Break' },
  'k-diff-pairs-in-an-array': { number: 532, title: 'K-diff Pairs in an Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Frequency Map Verification with Zero-Delta Branching' },
  'complex-number-multiplication': { number: 537, title: 'Complex Number Multiplication', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Component Delimiter Splitting with Algebraic Real-Imaginary Formula' },
  'minimum-time-difference': { number: 539, title: 'Minimum Time Difference', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Day-Minute Timeline Sorting with Circular Midnight Wrap-Around' },
  // Sub-Batch 14D
  'next-greater-element-iii': { number: 556, title: 'Next Greater Element III', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Digit Array Next Permutation with 32-Bit Integer Bound Guard' },
  'fraction-addition-and-subtraction': { number: 592, title: 'Fraction Addition and Subtraction', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Signed Rational Accumulation with Greatest Common Divisor Reduction' },
  'valid-square': { number: 593, title: 'Valid Square', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Six Pairwise Squared Euclidean Distances Multiplicity Verification' },
  'sum-of-square-numbers': { number: 633, title: 'Sum of Square Numbers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pointer Square Root Range Inward Bisection' },
  'find-k-closest-elements': { number: 658, title: 'Find K Closest Elements', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pointer Window Shrinkage Discarding Furthest Extremes' },
  'beautiful-arrangement-ii': { number: 667, title: 'Beautiful Arrangement II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual-Pointer Alternating Extremes Zigzag Construction' },
  'repeated-string-match': { number: 686, title: 'Repeated String Match', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Ceiling Repetition Bounding with Adjacent Length Checking' },
  'count-binary-substrings': { number: 696, title: 'Count Binary Substrings', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Consecutive Run Length Tracking with Adjacent Minimum Pairing' },
  'subarray-product-less-than-k': { number: 713, title: 'Subarray Product Less Than K', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sliding Window Right-Endpoint Increment Accumulation' },
  'maximum-length-of-repeated-subarray': { number: 718, title: 'Maximum Length of Repeated Subarray', difficulty: 'Medium', category: 'Algorithms', twist_type: '2D Longest Common Substring State Matrix with 1D Rolling Buffer' },
  'monotone-increasing-digits': { number: 738, title: 'Monotone Increasing Digits', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Right-to-Left Decrement with Cascade Trailing Nines Replacement' },
  'custom-sort-string': { number: 791, title: 'Custom Sort String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bucket Frequency Emission in Prescribed Character Order' },
  'positions-of-large-groups': { number: 830, title: 'Positions of Large Groups', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pointer Contiguous Identical Run Scanning' },
  // Sub-Batch 15A
  'longest-substring-with-at-most-two-distinct-characters': { number: 159, title: 'Longest Substring with At Most Two Distinct Characters', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sliding Window Frequency Map Dynamic Invalidation' },
  'one-edit-distance': { number: 161, title: 'One Edit Distance', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single-Mismatch Character Alignment and Length Offset Verification' },
  'shortest-word-distance': { number: 243, title: 'Shortest Word Distance', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Dual Index State Machine Minimal Distance Tracking' },
  'shortest-word-distance-iii': { number: 245, title: 'Shortest Word Distance III', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Alternating Previous Match Update under Identity Collision' },
  'strobogrammatic-number': { number: 246, title: 'Strobogrammatic Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Inward Two-Pointer Rotational Symmetry Mapping' },
  'group-shifted-strings': { number: 249, title: 'Group Shifted Strings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Cyclic Modulo-26 Step Canonical Representation Hashing' },
  'meeting-rooms': { number: 252, title: 'Meeting Rooms', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Start-Time Sorting with Adjacent Interval Overlap Check' },
  'meeting-rooms-ii': { number: 253, title: 'Meeting Rooms II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Min-Heap Allocation of Ongoing Meeting End Times' },
  'paint-house': { number: 256, title: 'Paint House', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Three-Color State Alternation Dynamic Programming' },
  '3sum-smaller': { number: 259, title: '3Sum Smaller', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fixed Pivot Inward Two-Pointer Range Counting' },
  'palindrome-permutation': { number: 266, title: 'Palindrome Permutation', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Character Frequency Odd Multiplicity Bit Set' },
  'paint-fence': { number: 276, title: 'Paint Fence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Same and Different Color Predecessor State Machine' },
  // Sub-Batch 15B
  'find-the-celebrity': { number: 277, title: 'Find the Celebrity', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Linear Elimination Tournament with Verification Pass' },
  'wiggle-sort': { number: 280, title: 'Wiggle Sort', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single-Pass Parity-Conditioned Adjacent Element Swapping' },
  'find-the-duplicate-number': { number: 287, title: 'Find the Duplicate Number', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Floyd Cycle Detection with Slow and Fast Pointers' },
  'word-pattern': { number: 290, title: 'Word Pattern', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bilateral Token-to-Character Bijection Mapping' },
  'flip-game': { number: 293, title: 'Flip Game', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Adjacent Consecutive Character State Modification Scanning' },
  'sparse-matrix-multiplication': { number: 311, title: 'Sparse Matrix Multiplication', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Non-Zero Element Iteration with Outer-Product Vector Accumulation' },
  'maximum-size-subarray-sum-equals-k': { number: 325, title: 'Maximum Size Subarray Sum Equals k', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Earliest Prefix Sum Index Hash Mapping' },
  'increasing-triplet-subsequence': { number: 334, title: 'Increasing Triplet Subsequence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy First and Second Minimum Cascading Thresholds' },
  'longest-substring-with-at-most-k-distinct-characters': { number: 340, title: 'Longest Substring with At Most K Distinct Characters', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dynamic Sliding Window with Distinct Frequency Map Shrinkage' },
  'sort-transformed-array': { number: 360, title: 'Sort Transformed Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Parabola Concavity Outward-to-Inward Two-Pointer Placement' },
  'largest-divisible-subset': { number: 368, title: 'Largest Divisible Subset', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Divisibility DP with Parent Backtracking' },
  'range-addition': { number: 370, title: 'Range Addition', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Difference Array Endpoint Stamping with Prefix Sweep' },
  'find-k-pairs-with-smallest-sums': { number: 373, title: 'Find K Pairs with Smallest Sums', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Priority Queue Multi-Way Merge Frontier Advancement' },
  // Sub-Batch 15C
  'sort-characters-by-frequency': { number: 451, title: 'Sort Characters By Frequency', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Descending Frequency Map Character Multiplicity Concatenation' },
  'max-consecutive-ones-ii': { number: 487, title: 'Max Consecutive Ones II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sliding Window Single Zero Tolerance Expansion' },
  'lonely-pixel-i': { number: 531, title: 'Lonely Pixel I', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Row and Column Target Frequency Counter Aggregation' },
  'optimal-division': { number: 553, title: 'Optimal Division', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Mathematical Denominator Maximization with Comprehensive Grouping' },
  'brick-wall': { number: 554, title: 'Brick Wall', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Cut Coordinate Frequency Maximization' },
  'longest-line-of-consecutive-one-in-matrix': { number: 562, title: 'Longest Line of Consecutive One in Matrix', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Four-Directional Dynamic Programming Matrix State Transition' },
  'array-nesting': { number: 565, title: 'Array Nesting', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Permutation Cycle Decomposition with Visited In-Place Stamping' },
  'squirrel-simulation': { number: 573, title: 'Squirrel Simulation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Manhattan Distance Delta Savings Maximization' },
  'kill-process': { number: 582, title: 'Kill Process', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Tree Adjacency Map Breadth-First Subtree Expansion' },
  'delete-operation-for-two-strings': { number: 583, title: 'Delete Operation for Two Strings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Longest Common Subsequence Reduction with Space Optimization' },
  'find-duplicate-file-in-system': { number: 609, title: 'Find Duplicate File in System', difficulty: 'Medium', category: 'Algorithms', twist_type: 'File Content Hash Map Grouping and Path Concatenation' },
  'valid-triangle-number': { number: 611, title: 'Valid Triangle Number', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fixed Longest Side Inward Two-Pointer Range Counting' },
  // Sub-Batch 15D
  'maximum-distance-in-arrays': { number: 624, title: 'Maximum Distance in Arrays', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Running Global Extrema Tracking Across Disjoint Arrays' },
  'solve-the-equation': { number: 640, title: 'Solve the Equation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Linear Term and Constant Extraction with Singular Case Handling' },
  'maximum-length-of-pair-chain': { number: 646, title: 'Maximum Length of Pair Chain', difficulty: 'Medium', category: 'Algorithms', twist_type: 'End-Time Interval Sorting with Greedy Activity Selection' },
  'dota2-senate': { number: 649, title: 'Dota2 Senate', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Queue Turn Simulation with Index Cyclic Re-enqueueing' },
  '4-keys-keyboard': { number: 651, title: '4 Keys Keyboard', difficulty: 'Medium', category: 'Algorithms', twist_type: 'One-Dimensional DP with Buffer Multiplier Lookback' },
  'split-array-into-consecutive-subsequences': { number: 659, title: 'Split Array into Consecutive Subsequences', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Tail Extension Preference with Triplet Creation Fallback' },
  'bulb-switcher-ii': { number: 672, title: 'Bulb Switcher II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Modulo-6 Operation Symmetry and Parity Case Analysis' },
  'to-lower-case': { number: 709, title: 'To Lower Case', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bitwise OR Thirty-Two ASCII Alphabet Case Conversion' },
  '1-bit-and-2-bit-characters': { number: 717, title: '1-bit and 2-bit Characters', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Leading-Bit Pointer Advance to Final Symbol' },
  'candy-crush': { number: 723, title: 'Candy Crush', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Absolute Value Sign Tagging with Gravity Drop Simulation' },
  'sentence-similarity': { number: 734, title: 'Sentence Similarity', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Positional Token Matching with Symmetric Pair Set Lookup' },
  'find-smallest-letter-greater-than-target': { number: 744, title: 'Find Smallest Letter Greater Than Target', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Binary Search Bisect Right with Circular Modulo Wrap' },
  'shortest-completing-word': { number: 748, title: 'Shortest Completing Word', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Alphabet Multiset Frequency Coverage with Earliest Tie-Break' },
  // Sub-Batch 16A
  'missing-ranges': { number: 163, title: 'Missing Ranges', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Range Boundary Consecutive Gap Interval Construction' },
  'reverse-words-in-a-string-ii': { number: 186, title: 'Reverse Words in a String II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'In-Place Full Array Reversal Followed by Space-Delimited Word Reversals' },
  'strobogrammatic-number-ii': { number: 247, title: 'Strobogrammatic Number II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Recursive Inside-Out Symmetric Digit Pair Expansion' },
  'factor-combinations': { number: 254, title: 'Factor Combinations', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Backtracking Divisor Decomposition with Non-Decreasing Factor Bound' },
  'verify-preorder-sequence-in-binary-search-tree': { number: 255, title: 'Verify Preorder Sequence in Binary Search Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Decreasing Stack Tracking Lower Bound for Right Subtree' },
  'paint-house-ii': { number: 265, title: 'Paint House II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Tracking Top Two Minimum Cost Indices for O(1) Color Selection' },
  'palindrome-permutation-ii': { number: 267, title: 'Palindrome Permutation II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Half-Frequency Permutation Generation Mirrored Around Central Character' },
  'word-pattern-ii': { number: 291, title: 'Word Pattern II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Backtracking Dual Bijection Mapping with Substring Partitioning' },
  'flip-game-ii': { number: 294, title: 'Flip Game II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Minimax Game State Memoization with Consecutive Character Inversion' },
  'best-meeting-point': { number: 296, title: 'Best Meeting Point', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Independent Median Coordinate Selection Minimizing Manhattan Distance' },
  'additive-number': { number: 306, title: 'Additive Number', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual Initial Length Enumeration with Big-Integer Sequence Verification' },
  'super-ugly-number': { number: 313, title: 'Super Ugly Number', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Multi-Pointer Dynamic Programming Merging Prime Multiples' },
  // Sub-Batch 16B
  'generalized-abbreviation': { number: 320, title: 'Generalized Abbreviation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Backtracking Choice of Abbreviating Count vs Keeping Character' },
  'patching-array': { number: 330, title: 'Patching Array', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy Reach Extension by Doubling Smallest Missing Prefix Sum' },
  'verify-preorder-serialization-of-a-binary-tree': { number: 331, title: 'Verify Preorder Serialization of a Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Capacity Counting of In-Degree vs Out-Degree Slots' },
  'self-crossing': { number: 335, title: 'Self Crossing', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Three Geometric Relative Overlap Cases for Orthogonal Paths' },
  'line-reflection': { number: 356, title: 'Line Reflection', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Symmetric Point Set Lookup Around Average of Extreme X Coordinates' },
  'rearrange-string-k-distance-apart': { number: 358, title: 'Rearrange String k Distance Apart', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Max-Heap Greedy Placement with Cooling Queue for Spacing K' },
  'bomb-enemy': { number: 361, title: 'Bomb Enemy', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Row and Column Continuous Blast Radius Caching Between Walls' },
  'water-and-jug-problem': { number: 365, title: 'Water and Jug Problem', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bézout Identity and Greatest Common Divisor Solvability Check' },
  'lexicographical-numbers': { number: 386, title: 'Lexicographical Numbers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Depth-First Number Generation Multiplying by Ten with Suffix Advance' },
  'longest-absolute-file-path': { number: 388, title: 'Longest Absolute File Path', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Depth-Indexed Stack Tracking Cumulative Directory Path Length' },
  'elimination-game': { number: 390, title: 'Elimination Game', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Mathematical Head Pointer Advance under Alternating Step Doubling' },
  'perfect-rectangle': { number: 391, title: 'Perfect Rectangle', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Area Summation with Corner Parity Hash Set Cancellation' },
  'binary-watch': { number: 401, title: 'Binary Watch', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bit-Count Pre-Filtering over Valid Hours and Minutes' },
  // Sub-Batch 16C
  'valid-word-abbreviation': { number: 408, title: 'Valid Word Abbreviation', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Dual Pointer Traversal Parsing Multi-Digit Integer Skips' },
  'sentence-screen-fitting': { number: 418, title: 'Sentence Screen Fitting', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Row-by-Row Word Offset State Transition Map Optimization' },
  'valid-word-square': { number: 422, title: 'Valid Word Square', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Direct Matrix Symmetry Verification with Ragged Row Length Checks' },
  'minimum-genetic-mutation': { number: 433, title: 'Minimum Genetic Mutation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Breadth-First Search on Gene Bank with Single Character Mutations' },
  'ternary-expression-parser': { number: 439, title: 'Ternary Expression Parser', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Right-to-Left Stack Evaluation of Conditional Expressions' },
  'sequence-reconstruction': { number: 444, title: 'Sequence Reconstruction', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Kahn Algorithm Verifying Unique Topological Order at Each Step' },
  'number-of-boomerangs': { number: 447, title: 'Number of Boomerangs', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Euclidean Distance Frequency Counter with Permutation Product' },
  'unique-substrings-in-wraparound-string': { number: 467, title: 'Unique Substrings in Wraparound String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Ending Character Max Contiguous Run Length Accumulator' },
  'validate-ip-address': { number: 468, title: 'Validate IP Address', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Component Parser with Leading Zero and Hexadecimal Validation' },
  'convex-polygon': { number: 469, title: 'Convex Polygon', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Cross Product Sign Consistency Along Consecutive Edge Pairs' },
  'find-permutation': { number: 484, title: 'Find Permutation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Segment Reversal for Decreasing Runs in Identity Sequence' },
  'predict-the-winner': { number: 486, title: 'Predict the Winner', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Minimax Dynamic Programming over Subarray Endpoints' },
  // Sub-Batch 16D
  'the-maze': { number: 490, title: 'The Maze', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Breadth-First Search with Wall-Stopping Roll Mechanics' },
  'non-decreasing-subsequences': { number: 491, title: 'Non-decreasing Subsequences', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Backtracking with Local Branch Set for Deduplication' },
  'the-maze-ii': { number: 505, title: 'The Maze II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dijkstra Priority Exploration on Ball Stopping Distances' },
  'minesweeper': { number: 529, title: 'Minesweeper', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Eight-Directional Flood Fill Reveal on Mine Proximity' },
  'lonely-pixel-ii': { number: 533, title: 'Lonely Pixel II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Row Pattern Hash Map Aggregation with Column Frequency Checks' },
  'output-contest-matches': { number: 544, title: 'Output Contest Matches', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Iterative Extremes Pairing Halving Competitor Array' },
  'split-array-with-equal-sum': { number: 548, title: 'Split Array with Equal Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Middle Cut Pivot Decoupling Left and Right Prefix Sum Sets' },
  'student-attendance-record-ii': { number: 552, title: 'Student Attendance Record II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Six-State Linear Dynamic Programming Modulo 10^9 + 7' },
  'split-concatenated-strings': { number: 555, title: 'Split Concatenated Strings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy String Reversal with Cut Position Enumeration' },
  'maximum-vacation-days': { number: 568, title: 'Maximum Vacation Days', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Weekly Dynamic Programming Transitioning over Flight Matrix' },
  'non-negative-integers-without-consecutive-ones': { number: 600, title: 'Non-negative Integers without Consecutive Ones', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Digit Dynamic Programming via Fibonacci Valid Binary Prefix Counts' },
  'ipo': { number: 502, title: 'IPO', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Two-Tier Priority Queue Greedy Project Selection' },
  'super-washing-machines': { number: 517, title: 'Super Washing Machines', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Running Flux Balance and Peak Surplus Capacity Analysis' }
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
