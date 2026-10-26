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
  'super-washing-machines': { number: 517, title: 'Super Washing Machines', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Running Flux Balance and Peak Surplus Capacity Analysis' },
  // Sub-Batch 17A
  'median-of-two-sorted-arrays': { number: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dual Binary Search Partitioning on Smaller Array' },
  'merge-k-sorted-lists': { number: 23, title: 'Merge k Sorted Lists', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Min-Heap Priority Queue or Divide and Conquer Pairwise Merging' },
  'substring-with-concatenation-of-all-words': { number: 30, title: 'Substring with Concatenation of All Words', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Multi-Offset Sliding Window with Word Frequency Maps' },
  'valid-number': { number: 65, title: 'Valid Number', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Deterministic State Machine Validation with Exponent and Sign Flags' },
  'text-justification': { number: 68, title: 'Text Justification', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy Line Packing with Divmod Space Distribution' },
  'scramble-string': { number: 87, title: 'Scramble String', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Memoized Recursive Splitting with Swapped and Unswapped Branches' },
  'binary-tree-inorder-traversal': { number: 94, title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Iterative Stack Traversal or Morris Traversal without Recursion' },
  'unique-binary-search-trees-ii': { number: 95, title: 'Unique Binary Search Trees II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Recursive Cartesian Product of Left and Right BST Subtrees' },
  'flatten-binary-tree-to-linked-list': { number: 114, title: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Morris Preorder Predecessor Splicing with In-Place Right Pointers' },
  'binary-tree-maximum-path-sum': { number: 124, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Post-Order Gain Propagation with Global Turnaround Sum Tracking' },
  'word-ladder-ii': { number: 126, title: 'Word Ladder II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Layered BFS Parent Graph Construction followed by DFS Backtracking' },
  'palindrome-partitioning-ii': { number: 132, title: 'Palindrome Partitioning II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Center Expansion Updating 1D Prefix Cut Dynamic Programming' },
  // Sub-Batch 17B
  'binary-tree-preorder-traversal': { number: 144, title: 'Binary Tree Preorder Traversal', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Iterative Stack Traversal Visiting Root Before Children' },
  'binary-tree-postorder-traversal': { number: 145, title: 'Binary Tree Postorder Traversal', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Iterative Two-Stack or Reversed Modified Preorder Traversal' },
  'max-points-on-a-line': { number: 149, title: 'Max Points on a Line', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Coprime Slope Reduction with GCD Pairs and Hash Map Counts' },
  'binary-tree-upside-down': { number: 156, title: 'Binary Tree Upside Down', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Left Spine Inversion Attaching Siblings and Parents' },
  'the-skyline-problem': { number: 218, title: 'The Skyline Problem', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sweep-Line Event Sorting with Max-Heap Active Height Tracking' },
  'contains-duplicate-iii': { number: 220, title: 'Contains Duplicate III', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bucketing by Value Window or Sliding Balanced Binary Search Tree' },
  'basic-calculator': { number: 224, title: 'Basic Calculator', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Parenthesized Sign Stack with Running Total Accumulation' },
  'number-of-digit-one': { number: 233, title: 'Number of Digit One', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Digit Place Value Contribution Analysis by High, Curr, and Low Slices' },
  'delete-node-in-a-linked-list': { number: 237, title: 'Delete Node in a Linked List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Value Copying from Successor with Pointer Bypass' },
  'strobogrammatic-number-iii': { number: 248, title: 'Strobogrammatic Number III', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Centered Symmetric Digit Generation with String Length Bounding' },
  'count-univalue-subtrees': { number: 250, title: 'Count Univalue Subtrees', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Bottom-Up Univalue Consistency Propagation' },
  'closest-binary-search-tree-value': { number: 270, title: 'Closest Binary Search Tree Value', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Iterative BST Descent Updating Closest Absolute Distance' },
  'closest-binary-search-tree-value-ii': { number: 272, title: 'Closest Binary Search Tree Value II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Inorder Traversal with Fixed-Size K Sliding Deque Pruning' },
  // Sub-Batch 17C
  'expression-add-operators': { number: 282, title: 'Expression Add Operators', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Backtracking with Running Total and Multiplicative Precedence Rollback' },
  'inorder-successor-in-bst': { number: 285, title: 'Inorder Successor in BST', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search Tree Directional Traversal Recording Rightward Candidate' },
  'binary-tree-longest-consecutive-sequence': { number: 298, title: 'Binary Tree Longest Consecutive Sequence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Top-Down DFS Passing Incrementing Consecutive Streak Length' },
  'remove-invalid-parentheses': { number: 301, title: 'Remove Invalid Parentheses', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Count-Constrained Backtracking or BFS Level Exploration' },
  'smallest-rectangle-enclosing-black-pixels': { number: 302, title: 'Smallest Rectangle Enclosing Black Pixels', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Four Binary Searches on Projected Row and Column Projections' },
  'number-of-islands-ii': { number: 305, title: 'Number of Islands II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dynamic Disjoint Set Union Adding Positions Incrementally' },
  'binary-tree-vertical-order-traversal': { number: 314, title: 'Binary Tree Vertical Order Traversal', difficulty: 'Medium', category: 'Algorithms', twist_type: 'BFS Column Index Queue Grouping Preserving Top-Down Order' },
  'count-of-smaller-numbers-after-self': { number: 315, title: 'Count of Smaller Numbers After Self', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Merge Sort Inversion Counting or Binary Indexed Tree on Coordinate Compression' },
  'shortest-distance-from-all-buildings': { number: 317, title: 'Shortest Distance from All Buildings', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Multi-Source BFS Distance and Reachability Accumulation over Empty Lands' },
  'create-maximum-number': { number: 321, title: 'Create Maximum Number', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Mono-Stack Subsequence Selection and Lexicographical Array Merging' },
  'count-of-range-sum': { number: 327, title: 'Count of Range Sum', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Merge Sort Two-Pointer Counting on Prefix Sums' },
  'reconstruct-itinerary': { number: 332, title: 'Reconstruct Itinerary', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Hierholzer Eulerian Path Algorithm with Reverse Alphabetical Adjacency Lists' },
  // Sub-Batch 17D
  'largest-bst-subtree': { number: 333, title: 'Largest BST Subtree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Synthesis of Subtree Validity, Bounds, and Size' },
  'palindrome-pairs': { number: 336, title: 'Palindrome Pairs', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Prefix and Suffix Partitioning with Reversed String Lookup' },
  'house-robber-iii': { number: 337, title: 'House Robber III', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Tree Independent Set Dynamic Programming' },
  'android-unlock-patterns': { number: 351, title: 'Android Unlock Patterns', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Grid Symmetry Pruning with Precomputed Key Obstacle Table' },
  'max-sum-of-rectangle-no-larger-than-k': { number: 363, title: 'Max Sum of Rectangle No Larger Than K', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Column Compression with Ordered Set Binary Search on Prefix Sums' },
  'find-leaves-of-binary-tree': { number: 366, title: 'Find Leaves of Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Bottom-Up Height Calculation Grouping Leaf Layers' },
  'plus-one-linked-list': { number: 369, title: 'Plus One Linked List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single Forward Pass Tracking Rightmost Non-Nine Node' },
  'kth-smallest-element-in-a-sorted-matrix': { number: 378, title: 'Kth Smallest Element in a Sorted Matrix', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Value Range Bisection with Saddleback Staircase Counting' },
  'utf-8-validation': { number: 393, title: 'UTF-8 Validation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bitmask Prefix Inspection Tracking Remaining Continuation Bytes' },
  'frog-jump': { number: 403, title: 'Frog Jump', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Forward Jump State Reachability Propagation across River Stones' },
  'trapping-rain-water-ii': { number: 407, title: 'Trapping Rain Water II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Perimeter Min-Heap Priority Queue BFS Inward Flooding' },
  'minimum-unique-word-abbreviation': { number: 411, title: 'Minimum Unique Word Abbreviation', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitmask Conflict Encoding with Branch and Bound Abbreviation Search' },
  'battleships-in-a-board': { number: 419, title: 'Battleships in a Board', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single Pass Top-Left Ship Head Identification without Matrix Mutation' },
  'strong-password-checker': { number: 420, title: 'Strong Password Checker', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy Modulo 3 Repeat Reduction with Three Length Regimes' },
  'word-squares': { number: 425, title: 'Word Squares', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Prefix Trie Backtracking Matrix Construction with Symmetry Pruning' },
  'find-right-interval': { number: 436, title: 'Find Right Interval', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Start Point Index Sorting with Lower Bound Binary Search' },
  'path-sum-iii': { number: 437, title: 'Path Sum III', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Sum Frequency Map Backtracking on Tree DFS' },
  'k-th-smallest-in-lexicographical-order': { number: 440, title: 'K-th Smallest in Lexicographical Order', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Prefix Denary 10-Ary Tree Step Counting with Subtree Skip' },
  'arithmetic-slices-ii-subsequence': { number: 446, title: 'Arithmetic Slices II - Subsequence', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dynamic Programming with Difference Hash Maps at Each Index' },
  'circular-array-loop': { number: 457, title: 'Circular Array Loop', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fast and Slow Pointer Cycle Detection with Direction Consistency' },
  'poor-pigs': { number: 458, title: 'Poor Pigs', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Information Theoretic Dimensional Base Encoding Formula' },
  'optimal-account-balancing': { number: 465, title: 'Optimal Account Balancing', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Net Balance Filtering with Backtracking Debt Elimination' },
  'count-the-repetitions': { number: 466, title: 'Count The Repetitions', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Cycle Detection Pigeonhole Principle on Repetitive String Matching' },
  'encode-string-with-shortest-length': { number: 471, title: 'Encode String with Shortest Length', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Interval Dynamic Programming with Periodic Substring Compression' },
  'largest-palindrome-product': { number: 479, title: 'Largest Palindrome Product', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Upper Half Palindrome Generation with Symmetrical Factor Search' },
  'smallest-good-base': { number: 483, title: 'Smallest Good Base', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Polynomial Exponent Bound Iteration with Binary Search for Base' },
  'zuma-game': { number: 488, title: 'Zuma Game', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Branch and Bound State Search with Consecutive Color Deletion' },
  'the-maze-iii': { number: 499, title: 'The Maze III', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dijkstra Priority Queue Shortest Path with Lexicographical Direction Order' },
  'find-mode-in-binary-search-tree': { number: 501, title: 'Find Mode in Binary Search Tree', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pass In-Order Morris Traversal with Frequency Tracking' },
  'most-frequent-subtree-sum': { number: 508, title: 'Most Frequent Subtree Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Subtree Summing with Global Frequency Map' },
  'find-bottom-left-tree-value': { number: 513, title: 'Find Bottom Left Tree Value', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Right-to-Left Breadth First Search Queue Traversal' },
  'freedom-trail': { number: 514, title: 'Freedom Trail', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Ring Dial Dynamic Programming with Clockwise Counterclockwise Step Offsets' },
  'word-abbreviation': { number: 527, title: 'Word Abbreviation', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Length and End-Character Grouping with Prefix Trie Disambiguation' },
  'minimum-absolute-difference-in-bst': { number: 530, title: 'Minimum Absolute Difference in BST', difficulty: 'Easy', category: 'Algorithms', twist_type: 'In-Order BST Traversal Tracking Predecessor Difference' },
  'construct-binary-tree-from-string': { number: 536, title: 'Construct Binary Tree from String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Parentheses Subtree Parsing with Recursion or Monotonic Stack' },
  'convert-bst-to-greater-tree': { number: 538, title: 'Convert BST to Greater Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Reverse In-Order Traversal with Running Sum Accumulation' },
  'boundary-of-binary-tree': { number: 545, title: 'Boundary of Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Decomposed Traversal of Left Boundary Leaves and Right Boundary' },
  'binary-tree-longest-consecutive-sequence-ii': { number: 549, title: 'Binary Tree Longest Consecutive Sequence II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order State Propagation of Increasing and Decreasing Branch Lengths' },
  'binary-tree-tilt': { number: 563, title: 'Binary Tree Tilt', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Post-Order Subtree Summation with Absolute Difference Accumulator' },
  'find-the-closest-palindrome': { number: 564, title: 'Find the Closest Palindrome', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Half-String Mirroring with Prefix Increment and Decrement Candidates' },
  'erect-the-fence': { number: 587, title: 'Erect the Fence', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Monoids Andrew Algorithm 2D Convex Hull with Collinear Point Preservation' },
  'tag-validator': { number: 591, title: 'Tag Validator', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Linear State Machine XML Parser with Stack Matching and CDATA Handling' },
  'construct-string-from-binary-tree': { number: 606, title: 'Construct String from Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pre-Order Traversal with Empty Left Subtree Parentheses Retention' },
  'add-bold-tag-in-string': { number: 616, title: 'Add Bold Tag in String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Substring Interval Merging with Trie or Substring Search' },
  'add-one-row-to-tree': { number: 623, title: 'Add One Row to Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Level-Order Traversal or DFS Depth Insertion of Intermediate Nodes' },
  'minimum-factorization': { number: 625, title: 'Minimum Factorization', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Digits Extraction from 9 Down to 2 with 32-Bit Overflow Check' },
  'k-inverse-pairs-array': { number: 629, title: 'K Inverse Pairs Array', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dynamic Programming with Sliding Window Prefix Sum Optimization' },
  'course-schedule-iii': { number: 630, title: 'Course Schedule III', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy Sorting by Deadline with Max-Heap Longest Course Eviction' },
  'smallest-range-covering-elements-from-k-lists': { number: 632, title: 'Smallest Range Covering Elements from K Lists', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Min-Heap Multiway Merge Tracking Current Window Range' },
  'find-the-derangement-of-an-array': { number: 634, title: 'Find the Derangement of An Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Subfactorial Derangement Recurrence with Constant Space DP' },
  'average-of-levels-in-binary-tree': { number: 637, title: 'Average of Levels in Binary Tree', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Level-Order Breadth First Traversal Calculating Tier Arithmetic Means' },
  'decode-ways-ii': { number: 639, title: 'Decode Ways II', difficulty: 'Hard', category: 'Algorithms', twist_type: '1D Dynamic Programming Tracking Single and Wildcard Pair Decodings' },
  'maximum-average-subarray-ii': { number: 644, title: 'Maximum Average Subarray II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Binary Search on Solution Space with Minimum Prefix Sum Subarray Check' },
  'find-duplicate-subtrees': { number: 652, title: 'Find Duplicate Subtrees', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Subtree Serialization with Structural Frequency Mapping' },
  'two-sum-iv-input-is-a-bst': { number: 653, title: 'Two Sum IV - Input is a BST', difficulty: 'Easy', category: 'Algorithms', twist_type: 'BST Traversal with Hash Set Complement Lookup' },
  'maximum-binary-tree': { number: 654, title: 'Maximum Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Decreasing Stack Cartesian Tree Linear Construction' },
  'print-binary-tree': { number: 655, title: 'Print Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pre-Calculated Tree Height Grid with Recursive Center Offset Placement' },
  'coin-path': { number: 656, title: 'Coin Path', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Reverse Dynamic Programming with Lexicographical Tie-Breaking' },
  'remove-9': { number: 660, title: 'Remove 9', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Base 9 Radix Conversion Mapping Rank to Digits without Nine' },
  'maximum-width-of-binary-tree': { number: 662, title: 'Maximum Width of Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Level-Order Traversal with 0-Indexed Position Normalization' },
  'equal-tree-partition': { number: 663, title: 'Equal Tree Partition', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Subtree Summing with Half-Total Sum Set Membership Check' },
  'path-sum-iv': { number: 666, title: 'Path Sum IV', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Depth and Position Coordinate Tree DFS with Leaf Path Accumulation' },
  'trim-a-binary-search-tree': { number: 669, title: 'Trim a Binary Search Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Recursive BST Ordering Pruning Subtrees Outside Inclusive Range' },
  'second-minimum-node-in-a-binary-tree': { number: 671, title: 'Second Minimum Node In a Binary Tree', difficulty: 'Easy', category: 'Algorithms', twist_type: 'DFS Pruning Branches Strictly Exceeding Root Node Value' },
  'cut-off-trees-for-golf-event': { number: 675, title: 'Cut Off Trees for Golf Event', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sequential BFS Matrix Pathfinding in Ascending Tree Heights' },
  '24-game': { number: 679, title: '24 Game', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Backtracking All 4-Element Arithmetic Expressions with Floating Point Tolerance' },
  'next-closest-time': { number: 681, title: 'Next Closest Time', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Digit Permutation Time Simulation with Modulo 1440 Minute Search' },
  'k-empty-slots': { number: 683, title: 'K Empty Slots', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sliding Window Over Inverse Position Index Array with Fixed Boundary Distance' },
  'longest-univalue-path': { number: 687, title: 'Longest Univalue Path', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order DFS Branch Extension with Matching Child Node Values' },
  'maximum-sum-of-3-non-overlapping-subarrays': { number: 689, title: 'Maximum Sum of 3 Non-Overlapping Subarrays', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Three-Interval Prefix Sum DP with Lexicographical Index Tracking' },
  'number-of-distinct-islands': { number: 694, title: 'Number of Distinct Islands', difficulty: 'Medium', category: 'Algorithms', twist_type: 'DFS Relative Path Signature Hashing for Island Geometry' },
  'falling-squares': { number: 699, title: 'Falling Squares', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Coordinate Compression and Interval Max Height Tracking' },
  'minimum-ascii-delete-sum-for-two-strings': { number: 712, title: 'Minimum ASCII Delete Sum for Two Strings', difficulty: 'Medium', category: 'Algorithms', twist_type: '2D Dynamic Programming Computing Maximum Common Subsequence ASCII Weight' },
  'remove-comments': { number: 722, title: 'Remove Comments', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Linear Parsing State Machine Handling Block and Line Comment States' },
  'number-of-atoms': { number: 726, title: 'Number of Atoms', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Recursive Descent or Stack-Based Chemical Formula Multiplier Parsing' },
  'minimum-window-subsequence': { number: 727, title: 'Minimum Window Subsequence', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Two Pointer Dynamic Programming Tracking Rightmost Valid Subsequence Starts' },
  'count-different-palindromic-subsequences': { number: 730, title: 'Count Different Palindromic Subsequences', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Interval DP with Next and Previous Character Pointers Modulo 10^9+7' },
  'sentence-similarity-ii': { number: 737, title: 'Sentence Similarity II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Union-Find Disjoint Set Connected Components on Transitive Word Pairs' },
  'closest-leaf-in-a-binary-tree': { number: 742, title: 'Closest Leaf in a Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Tree to Undirected Graph Transformation Followed by Multi-Source BFS' },
  'contain-virus': { number: 749, title: 'Contain Virus', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Matrix Simulation Tracking Perimeter Walls and Frontier Expansion Per Region' },
  'number-of-corner-rectangles': { number: 750, title: 'Number Of Corner Rectangles', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pairwise Row Bitset Intersections Counting Shared Active Columns' },
  'ip-to-cidr': { number: 751, title: 'IP to CIDR', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Low-Bit Power-of-Two Subnet Allocation' },
  'open-the-lock': { number: 752, title: 'Open the Lock', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bidirectional BFS on 4-Digit Dial Graph Avoiding Deadends' },
  'cracking-the-safe': { number: 753, title: 'Cracking the Safe', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Hierholzer Algorithm for Eulerian Path on De Bruijn Graph' },
  'reach-a-number': { number: 754, title: 'Reach a Number', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Triangular Number Parity Match with Minimal Step Offset' },
  'pour-water': { number: 755, title: 'Pour Water', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Simulated Single Droplet Flow with Left Preference and Slope Fallback' },
  'pyramid-transition-matrix': { number: 756, title: 'Pyramid Transition Matrix', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Recursive Backtracking Across Allowed 3-Block Transition Rules' },
  'set-intersection-size-at-least-two': { number: 757, title: 'Set Intersection Size At Least Two', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy Interval End Sorting Retaining Largest Common Elements' },
  'bold-words-in-string': { number: 758, title: 'Bold Words in String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Substring Interval Marking Followed by HTML Tag Insertion' },
  'find-anagram-mappings': { number: 760, title: 'Find Anagram Mappings', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Inverted Index Mapping with List Removal for Duplicate Elements' },
  'special-binary-string': { number: 761, title: 'Special Binary String', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dyck Path Component Decomposition with Recursive Lexicographical Sorting' },
  'largest-plus-sign': { number: 764, title: 'Largest Plus Sign', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Four-Pass Directional Consecutive Ones DP Grid' },
  'couples-holding-hands': { number: 765, title: 'Couples Holding Hands', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Union-Find Over Couple Identifiers Counting Disjoint Components' },
  'basic-calculator-iii': { number: 772, title: 'Basic Calculator III', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Recursive Descent Parsing Handling Parentheses and Operator Precedence' },
  'sliding-puzzle': { number: 773, title: 'Sliding Puzzle', difficulty: 'Hard', category: 'Algorithms', twist_type: 'BFS Shortest Path on 2x3 Board Permutation State Graph' },
  'minimize-max-distance-to-gas-station': { number: 774, title: 'Minimize Max Distance to Gas Station', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Binary Search on Continuous Distance Space with Gap Division Feasibility' },
  'global-and-local-inversions': { number: 775, title: 'Global and Local Inversions', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single Pass Verification that Absolute Displacement Is at Most One' },
  'split-bst': { number: 776, title: 'Split BST', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Recursive BST Partitioning Rewiring Subtrees Along Target Boundary' },
  'swap-adjacent-in-lr-string': { number: 777, title: 'Swap Adjacent in LR String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two Pointer Monotonic Index Verification Skipping Blank Characters' },
  'swim-in-rising-water': { number: 778, title: 'Swim in Rising Water', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dijkstra Minimax Pathfinding on Grid Elevations' },
  'k-th-symbol-in-grammar': { number: 779, title: 'K-th Symbol in Grammar', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Popcount Parity on Zero-Indexed Position in Thue-Morse Sequence' },
  'reaching-points': { number: 780, title: 'Reaching Points', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Backwards Euclidean Modulo Reduction on Coordinate Pairs' },
  'rabbits-in-forest': { number: 781, title: 'Rabbits in Forest', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Ceiling Division Batching on Reported Group Capacities' },
  'transform-to-chessboard': { number: 782, title: 'Transform to Chessboard', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Corner XOR Invariants and Alternating Parity Mismatch Minimization' },
  'minimum-distance-between-bst-nodes': { number: 783, title: 'Minimum Distance Between BST Nodes', difficulty: 'Easy', category: 'Algorithms', twist_type: 'In-Order Traversal Tracking Predecessor Difference' },
  'k-th-smallest-prime-fraction': { number: 786, title: 'K-th Smallest Prime Fraction', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search on Real Interval with Two Pointer Fraction Counting' },
  'rotated-digits': { number: 788, title: 'Rotated Digits', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Digit Set Categorization Filtering Out Invalids and Requiring Mutating Digits' },
  'escape-the-ghosts': { number: 789, title: 'Escape The Ghosts', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Manhattan Distance Bottleneck Check Against Direct Ghost Paths' },
  'number-of-matching-subsequences': { number: 792, title: 'Number of Matching Subsequences', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Inverted Character Position Index with Binary Search Advancement' },
  'preimage-size-of-factorial-zeroes-function': { number: 793, title: 'Preimage Size of Factorial Zeroes Function', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Binary Search for Multiples of Five Legendre Zero Inversion' },
  'valid-tic-tac-toe-state': { number: 794, title: 'Valid Tic-Tac-Toe State', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Piece Count Alternation Invariants with Terminal Winning Line Rules' },
  'number-of-subarrays-with-bounded-maximum': { number: 795, title: 'Number of Subarrays with Bounded Maximum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Inclusion-Exclusion on Contiguous Runs of Upper-Bounded Subarrays' },
  'minimum-swaps-to-make-sequences-increasing': { number: 801, title: 'Minimum Swaps To Make Sequences Increasing', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Two-State Rolling DP for Natural and Crossed Sequence Invariants' },
  'bricks-falling-when-hit': { number: 803, title: 'Bricks Falling When Hit', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Reverse Time Union-Find Component Size Tracking from Ceiling' },
  'unique-morse-code-words': { number: 804, title: 'Unique Morse Code Words', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Alphabet Morse Mapping and Unique Transformation Hashing' },
  'split-array-with-same-average': { number: 805, title: 'Split Array With Same Average', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Zero-Centered Transformation with Meet-in-the-Middle Subset Sums' },
  'number-of-lines-to-write-string': { number: 806, title: 'Number of Lines To Write String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Line Width Packing with Word Wrapping Overflow' },
  'max-increase-to-keep-city-skyline': { number: 807, title: 'Max Increase to Keep City Skyline', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Row and Column Maximum Upper Bound Grid Difference Sum' },
  'soup-servings': { number: 808, title: 'Soup Servings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Four-Way Recursive DP with Large-N Asymptotic Convergence Threshold' },
  'expressive-words': { number: 809, title: 'Expressive Words', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Run-Length Group Matching with Stretchy Repetition Rules' },
  'chalkboard-xor-game': { number: 810, title: 'Chalkboard XOR Game', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitwise XOR Parity Invariants in Two-Player Normal Play Games' },
  'subdomain-visit-count': { number: 811, title: 'Subdomain Visit Count', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Hierarchical Domain Suffix Decomposition and Count Aggregation' },
  'largest-triangle-area': { number: 812, title: 'Largest Triangle Area', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Shoelace Formula Across Triplet Coordinate Combinations' },
  'largest-sum-of-averages': { number: 813, title: 'Largest Sum of Averages', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Sum Partitioning DP Optimizing Average Sums across K Groups' },
  'binary-tree-pruning': { number: 814, title: 'Binary Tree Pruning', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Bottom-Up Subtree Pruning Detaching Zero Leaves' },
  'bus-routes': { number: 815, title: 'Bus Routes', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bipartite Route-Stop BFS Finding Minimal Route Transfers' },
  'ambiguous-coordinates': { number: 816, title: 'Ambiguous Coordinates', difficulty: 'Medium', category: 'Algorithms', twist_type: 'String Split Cartesian Product with Decimal Placement Validation' },
  'linked-list-components': { number: 817, title: 'Linked List Components', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Linear Pointer Traversal Counting Connected Component Boundaries' },
  'race-car': { number: 818, title: 'Race Car', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Position DP Choosing Direct Acceleration versus Reverse Deceleration' },
  'most-common-word': { number: 819, title: 'Most Common Word', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Punctuation Sanitization and Banned Word Frequency Filtering' },
  'short-encoding-of-words': { number: 820, title: 'Short Encoding of Words', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Suffix Deduplication by Discarding Proper Suffix Substrings' },
  'shortest-distance-to-a-character': { number: 821, title: 'Shortest Distance to a Character', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pass Forward and Backward Scanning Distance Minimization' },
  'card-flipping-game': { number: 822, title: 'Card Flipping Game', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Same-Face Card Disqualification and Minimum Valid Face Value' },
  'binary-trees-with-factors': { number: 823, title: 'Binary Trees With Factors', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Divisor DP Multiplying Factor Subtree Combinations' },
  'goat-latin': { number: 824, title: 'Goat Latin', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Vowel-Consonant Word Rules with 1-Indexed Suffix Appending' },
  'friends-of-appropriate-ages': { number: 825, title: 'Friends Of Appropriate Ages', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Age Frequency Bucketing and Valid Mutual Age Range Counting' },
  'most-profit-assigning-work': { number: 826, title: 'Most Profit Assigning Work', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pointer Monotonic Max Profit Tracking for Sorted Worker Capacities' },
  'making-a-large-island': { number: 827, title: 'Making A Large Island', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Connected Component Labeling and Zero Cell Island Merging' },
  'count-unique-characters-of-all-substrings-of-a-given-string': { number: 828, title: 'Count Unique Characters of All Substrings of a Given String', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Contribution Principle Across Adjacent Identical Character Boundaries' },
  'consecutive-numbers-sum': { number: 829, title: 'Consecutive Numbers Sum', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Algebraic Remainder Factoring over Consecutive Term Lengths' },
  'masking-personal-information': { number: 831, title: 'Masking Personal Information', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Email Normalization versus Variable Country Code Phone Masking' },
  'flipping-an-image': { number: 832, title: 'Flipping an Image', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Simultaneous Horizontal Row Reversal and Bit Inversion' },
  'find-and-replace-in-string': { number: 833, title: 'Find And Replace in String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Source Substring Matching and Disjoint Replacement Reconstruction' },
  'image-overlap': { number: 835, title: 'Image Overlap', difficulty: 'Medium', category: 'Algorithms', twist_type: '2D Translation Vector Frequency Counting of Set Pixel Pairs' },
  'rectangle-overlap': { number: 836, title: 'Rectangle Overlap', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Axis-Aligned 1D Interval Overlap Conjunction Test' },
  'new-21-game': { number: 837, title: 'New 21 Game', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sliding Window Probability DP Maintaining Running Window Sums' },
  'push-dominoes': { number: 838, title: 'Push Dominoes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Net Force Distance Comparison Between Inward and Outward Dominoes' },
  'similar-string-groups': { number: 839, title: 'Similar String Groups', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Swap Distance Adjacency Testing and Disjoint Set Forest Merging' },
  'split-array-into-fibonacci-sequence': { number: 842, title: 'Split Array into Fibonacci Sequence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Backtracking Prefix Integer Verification with 32-Bit Overflow Bounds' },
  'longest-mountain-in-array': { number: 845, title: 'Longest Mountain in Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Peak Identification with Up and Down Monotonic Expansion' },
  'hand-of-straights': { number: 846, title: 'Hand of Straights', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Minimum Card Grouping with Consecutive Frequency Depletion' },
  'maximize-distance-to-closest-person': { number: 849, title: 'Maximize Distance to Closest Person', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Boundary Seat Spans versus Interior Midpoint Distance Maximization' },
  'rectangle-area-ii': { number: 850, title: 'Rectangle Area II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Coordinate Slicing with 1D Vertical Interval Merging' },
  'peak-index-in-a-mountain-array': { number: 852, title: 'Peak Index in a Mountain Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search Slope Direction Evaluation on Unimodal Mountain' },
  'k-similar-strings': { number: 854, title: 'K-Similar Strings', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Targeted Mismatch Branching BFS with Direct Swap Pruning' },
  'score-of-parentheses': { number: 856, title: 'Score of Parentheses', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Nesting Depth Bit Shifting on Immediate Parenthesis Pairs' },
  'minimum-cost-to-hire-k-workers': { number: 857, title: 'Minimum Cost to Hire K Workers', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Wage-to-Quality Ratio Sorting with Bounded Max-Heap of Qualities' },
  'mirror-reflection': { number: 858, title: 'Mirror Reflection', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Unfolded Grid Ray Geometry with Parity Reduction' },
  'buddy-strings': { number: 859, title: 'Buddy Strings', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Identical String Duplicate Character Check versus Two Mismatch Swap' },
  'lemonade-change': { number: 860, title: 'Lemonade Change', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Ten and Five Dollar Denomination Preservation' },
  'score-after-flipping-matrix': { number: 861, title: 'Score After Flipping Matrix', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Leading Bit Normalization and Independent Column Sum Maximization' },
  'all-nodes-distance-k-in-binary-tree': { number: 863, title: 'All Nodes Distance K in Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bidirectional Parent Mapping with Bounded Radial Graph Traversal' },
  'shortest-path-to-get-all-keys': { number: 864, title: 'Shortest Path to Get All Keys', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Multi-State Bitmask BFS over Grid Positions and Collected Keys' },
  'smallest-subtree-with-all-the-deepest-nodes': { number: 865, title: 'Smallest Subtree with all the Deepest Nodes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Simultaneous Subtree Depth and Common Deepest Node Tracking' },
  'prime-palindrome': { number: 866, title: 'Prime Palindrome', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Odd-Length Palindrome Root Generation with Primality Testing' },
  'binary-gap': { number: 868, title: 'Binary Gap', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Consecutive Set Bit Index Difference Tracking' },
  'reordered-power-of-2': { number: 869, title: 'Reordered Power of 2', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Digit Signature Matching Against Powers of Two' },
  'advantage-shuffle': { number: 870, title: 'Advantage Shuffle', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Two-Pointer Match with Smallest Beating Element Assignment' },
  'minimum-number-of-refueling-stops': { number: 871, title: 'Minimum Number of Refueling Stops', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy Max-Heap Fuel Selection at Reachable Stations' },
  'leaf-similar-trees': { number: 872, title: 'Leaf-Similar Trees', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Depth-First Leaf Value Sequence Comparison' },
  'length-of-longest-fibonacci-subsequence': { number: 873, title: 'Length of Longest Fibonacci Subsequence', difficulty: 'Medium', category: 'Algorithms', twist_type: '2D Transition Mapping on Fibonacci Value Pairs' },
  'walking-robot-simulation': { number: 874, title: 'Walking Robot Simulation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Directional State Stepping with Obstacle Hash Set Checking' },
  'stone-game': { number: 877, title: 'Stone Game', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Minimax DP Game Theory with First-Player Parity Advantage' },
  'nth-magical-number': { number: 878, title: 'Nth Magical Number', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Binary Search on Value Range with Inclusion-Exclusion LCM Counting' },
  'decoded-string-at-index': { number: 880, title: 'Decoded String at Index', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Reverse Decoded Length Reduction with Modulo Arithmetic' },
  'boats-to-save-people': { number: 881, title: 'Boats to Save People', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Two-Pointer Heavy and Light Pairing' },
  'reachable-nodes-in-subdivided-graph': { number: 882, title: 'Reachable Nodes In Subdivided Graph', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dijkstra Shortest Path with Fractional Edge Subdivision Counting' },
  'projection-area-of-3d-shapes': { number: 883, title: 'Projection Area of 3D Shapes', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Top-Down Non-Zero Count with Row and Column Maxima Projections' },
  'uncommon-words-from-two-sentences': { number: 884, title: 'Uncommon Words from Two Sentences', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single Joint Frequency Counting for Unique Words Across Sentences' },
  'spiral-matrix-iii': { number: 885, title: 'Spiral Matrix III', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Expanding Step Spiral Simulation with In-Bounds Coordinate Collection' },
  'super-egg-drop': { number: 887, title: 'Super Egg Drop', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Inverted Step DP with Binomial Coefficient Moves Formulation' },
  'fair-candy-swap': { number: 888, title: 'Fair Candy Swap', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Target Difference Search via Hash Set Lookup' },
  'construct-binary-tree-from-preorder-and-postorder-traversal': { number: 889, title: 'Construct Binary Tree from Preorder and Postorder Traversal', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Subtree Partitioning via Left Child Index in Postorder Traversal' },
  'find-and-replace-pattern': { number: 890, title: 'Find and Replace Pattern', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bijection Mapping Verification Between Word and Pattern Characters' },
  'sum-of-subsequence-widths': { number: 891, title: 'Sum of Subsequence Widths', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sorted Contribution Counting with Precomputed Powers of Two' },
  'surface-area-of-3d-shapes': { number: 892, title: 'Surface Area of 3D Shapes', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Cube Face Summation with Adjacent Height Contact Subtraction' },
  'groups-of-special-equivalent-strings': { number: 893, title: 'Groups of Special-Equivalent Strings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Even and Odd Index Character Frequency Canonical Signature' },
  'all-possible-full-binary-trees': { number: 894, title: 'All Possible Full Binary Trees', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Memoized Cartesian Product of Left and Right Full Binary Subtrees' },
  'monotonic-array': { number: 896, title: 'Monotonic Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single-Pass Non-Decreasing and Non-Increasing Directional Verification' },
  'increasing-order-search-tree': { number: 897, title: 'Increasing Order Search Tree', difficulty: 'Easy', category: 'Algorithms', twist_type: 'In-Order Traversal Pointer Re-Linking into Right-Skewed BST' },
  'bitwise-ors-of-subarrays': { number: 898, title: 'Bitwise ORs of Subarrays', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Rolling Set Union of Prefix Bitwise ORs with Distinct Value Bounds' },
  'orderly-queue': { number: 899, title: 'Orderly Queue', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Booth Lexicographical Minimum Rotation versus Permutation Sorting Dichotomy' },
  'numbers-at-most-n-given-digit-set': { number: 902, title: 'Numbers At Most N Given Digit Set', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Digit DP Prefix Matching with Strict Equality Branching' },
  'valid-permutations-for-di-sequence': { number: 903, title: 'Valid Permutations for DI Sequence', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Prefix DP with Running Prefix Sum Transition Optimization' },
  'sort-array-by-parity': { number: 905, title: 'Sort Array By Parity', difficulty: 'Easy', category: 'Algorithms', twist_type: 'In-Place Two-Pointer Partitioning on Element Parity' },
  'super-palindromes': { number: 906, title: 'Super Palindromes', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Numeric Half-Root Palindrome Generation with Square Palindrome Verification' },
  'smallest-range-i': { number: 908, title: 'Smallest Range I', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Extremum Difference Shrinkage by Maximum Bounded Perturbation' },
  'snakes-and-ladders': { number: 909, title: 'Snakes and Ladders', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Boustrophedon Grid Board Flattening with Breadth-First Search Traversal' },
  'smallest-range-ii': { number: 910, title: 'Smallest Range II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Array Pivot Partitioning with Extremum Comparison' },
  'sort-an-array': { number: 912, title: 'Sort an Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'In-Place Heap Sort with Max-Heap Sifting' },
  'cat-and-mouse': { number: 913, title: 'Cat and Mouse', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Minimax Backward Induction Game States with Degree Degeneracy Queue' },
  'x-of-a-kind-in-a-deck-of-cards': { number: 914, title: 'X of a Kind in a Deck of Cards', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Card Frequency Greatest Common Divisor Reduction' },
  'partition-array-into-disjoint-intervals': { number: 915, title: 'Partition Array into Disjoint Intervals', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Running Prefix Maximum Tracking with Re-Partition Triggering' },
  'word-subsets': { number: 916, title: 'Word Subsets', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Maximal Component Character Multiplicity Vector Verification' },
  'reverse-only-letters': { number: 917, title: 'Reverse Only Letters', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pointer Inward Scan Skipping Non-Alphabetical Characters' },
  'number-of-music-playlists': { number: 920, title: 'Number of Music Playlists', difficulty: 'Hard', category: 'Algorithms', twist_type: '2D Dynamic Programming Distinguishing New Songs from Replayed Songs' },
  'sort-array-by-parity-ii': { number: 922, title: 'Sort Array By Parity II', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pointer Even and Odd Index Parity Correction' },
  '3sum-with-multiplicity': { number: 923, title: '3Sum With Multiplicity', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Frequency Combination Counting on Distinct Value Triplets' },
  'minimize-malware-spread': { number: 924, title: 'Minimize Malware Spread', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Disjoint Set Component Sizing with Unique Infection Source Identification' },
  'long-pressed-name': { number: 925, title: 'Long Pressed Name', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pointer Character Repetition Run-Length Alignment' },
  'flip-string-to-monotone-increasing': { number: 926, title: 'Flip String to Monotone Increasing', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dynamic Programming Tracking Ones Seen versus Minimum Flips' },
  'three-equal-parts': { number: 927, title: 'Three Equal Parts', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bit Distribution Slicing by One-Third Total Ones with Suffix Trailing Zeros' },
  'minimize-malware-spread-ii': { number: 928, title: 'Minimize Malware Spread II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Clean Component Reachability Attribution from Independent Infection Sources' },
  'unique-email-addresses': { number: 929, title: 'Unique Email Addresses', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Local Name Filtering with Disjoint Domain Normalization' },
  'binary-subarrays-with-sum': { number: 930, title: 'Binary Subarrays With Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Exact Subarray Sum Difference Reduction via At-Most Sliding Window' },
  'beautiful-array': { number: 932, title: 'Beautiful Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Parity Divide-and-Conquer Mapping Avoiding Arithmetic Progressions' },
  'knight-dialer': { number: 935, title: 'Knight Dialer', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Cyclic Phone Pad Directed Transition Counting with Modular Summation' },
  'stamping-the-sequence': { number: 936, title: 'Stamping The Sequence', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Reverse Target Window Unstamping with Flexible Wildcard Placeholders' },
  'reorder-data-in-log-files': { number: 937, title: 'Reorder Data in Log Files', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Letter and Digit Log Discrimination with Multi-Key Tiebreaking' },
  'range-sum-of-bst': { number: 938, title: 'Range Sum of BST', difficulty: 'Easy', category: 'Algorithms', twist_type: 'BST Ordering Property Range-Pruned Recursive Summation' },
  'minimum-area-rectangle': { number: 939, title: 'Minimum Area Rectangle', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Opposite Diagonal Pair Hash Set Membership Verification' },
  'distinct-subsequences-ii': { number: 940, title: 'Distinct Subsequences II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dynamic Programming Tracking Duplicate Ending Character Contributions' },
  'valid-mountain-array': { number: 941, title: 'Valid Mountain Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pointer Inward Climbing Convergence and Non-Boundary Peak Test' },
  'di-string-match': { number: 942, title: 'DI String Match', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Extreme Available Integer Placement on Increase-Decrease Signatures' },
  'delete-columns-to-make-sorted': { number: 944, title: 'Delete Columns to Make Sorted', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Column-Wise Independent Adjacent Monotonicity Verification' },
  'minimum-increment-to-make-array-unique': { number: 945, title: 'Minimum Increment to Make Array Unique', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Adjacent Element Collision Incrementation with Running Sum' },
  'most-stones-removed-with-same-row-or-column': { number: 947, title: 'Most Stones Removed with Same Row or Column', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Row and Column Coordinate Bipartite Graph Connected Component Reduction' },
  'bag-of-tokens': { number: 948, title: 'Bag of Tokens', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pointer Sorted Token Trading Between Smallest Cost and Largest Power' },
  'largest-time-for-given-digits': { number: 949, title: 'Largest Time for Given Digits', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Exhaustive Permutation Search for Valid 24-Hour Maximum Minutes' },
  'reveal-cards-in-increasing-order': { number: 950, title: 'Reveal Cards In Increasing Order', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Double-Ended Queue Simulation on Card Indices' },
  'flip-equivalent-binary-trees': { number: 951, title: 'Flip Equivalent Binary Trees', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Subtree Symmetry and Flip Branching Recursive Invariance' },
  'largest-component-size-by-common-factor': { number: 952, title: 'Largest Component Size by Common Factor', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Prime Factor Disjoint Set Forest Merging with Component Sizing' },
  'verifying-an-alien-dictionary': { number: 953, title: 'Verifying an Alien Dictionary', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Custom Alphabet Precedence Order Adjacent Pair Verification' },
  'array-of-doubled-pairs': { number: 954, title: 'Array of Doubled Pairs', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Absolute Magnitude Frequency Depletion Greedy Pairing' },
  'delete-columns-to-make-sorted-ii': { number: 955, title: 'Delete Columns to Make Sorted II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Sorted Monotonicity Tracking with Selective Column Retention' },
  'tallest-billboard': { number: 956, title: 'Tallest Billboard', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Support Height Difference State Dynamic Programming' },
  'prison-cells-after-n-days': { number: 957, title: 'Prison Cells After N Days', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Finite State Cycle Detection with Modulo Period Skipping' },
  'check-completeness-of-a-binary-tree': { number: 958, title: 'Check Completeness of a Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Level-Order Breadth-First Search Null Sentinel Gap Detection' },
  'regions-cut-by-slashes': { number: 959, title: 'Regions Cut By Slashes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Grid Cell Four-Quadrant Disjoint Set Triangulation' },
  'delete-columns-to-make-sorted-iii': { number: 960, title: 'Delete Columns to Make Sorted III', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Simultaneous Multi-String Column Longest Increasing Subsequence DP' },
  'n-repeated-element-in-size-2n-array': { number: 961, title: 'N-Repeated Element in Size 2N Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Pigeonhole Principle Bounded Offset Adjacent Element Equality Check' },
  'minimum-area-rectangle-ii': { number: 963, title: 'Minimum Area Rectangle II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Congruent Bisecting Diagonals Grouping for Rotated Rectangles' },
  'univalued-binary-tree': { number: 965, title: 'Univalued Binary Tree', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Full Tree Depth Traversal with Early-Exit Single Target Equality Check' },
  'vowel-spellchecker': { number: 966, title: 'Vowel Spellchecker', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Exact Case and Devoweled Three-Tier Cascade Hash Map Lookup' },
  'numbers-with-same-consecutive-differences': { number: 967, title: 'Numbers With Same Consecutive Differences', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Digit-Wise Breadth-First Frontier Extension with Absolute Difference' },
  'binary-tree-cameras': { number: 968, title: 'Binary Tree Cameras', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Post-Order Bottom-Up Three-State Greedy Camera Placement' },
  'pancake-sorting': { number: 969, title: 'Pancake Sorting', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Step Suffix Element Placement via Front and Target Prefix Reversals' },
  'powerful-integers': { number: 970, title: 'Powerful Integers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Exponential Bounded Power Generation with Base One Edge Handling' },
  'flip-binary-tree-to-match-preorder-traversal': { number: 971, title: 'Flip Binary Tree To Match Preorder Traversal', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Voyage Preorder Alignment with Deterministic Child Flipping' },
  'k-closest-points-to-origin': { number: 973, title: 'K Closest Points to Origin', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Euclidean Squared Distance Quickselect Partitioning' },
  'largest-perimeter-triangle': { number: 976, title: 'Largest Perimeter Triangle', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Descending Sorted Adjacent Triplet Triangle Inequality Test' },
  'longest-turbulent-subarray': { number: 978, title: 'Longest Turbulent Subarray', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Alternating Sign Comparison Dynamic Window Tracking' },
  'distribute-coins-in-binary-tree': { number: 979, title: 'Distribute Coins in Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Tree Subtree Balance Edge Flow Accumulation' },
  'unique-paths-iii': { number: 980, title: 'Unique Paths III', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Hamiltonian Grid Path Backtracking with Walkable Cell Exhaustion Check' },
  'triples-with-bitwise-and-equal-to-zero': { number: 982, title: 'Triples with Bitwise AND Equal To Zero', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Pairwise Bitwise AND Frequency Precomputation with Triplet Accumulation' },
  'string-without-aaa-or-bbb': { number: 984, title: 'String Without AAA or BBB', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Majority Character Appending with Consecutive Run Guardrails' },
  'sum-of-even-numbers-after-queries': { number: 985, title: 'Sum of Even Numbers After Queries', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Running Even Sum Maintenance with Parity Delta Updates' },
  'interval-list-intersections': { number: 986, title: 'Interval List Intersections', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pointer Two-List Earliest Endpoint Advancement' },
  'vertical-order-traversal-of-a-binary-tree': { number: 987, title: 'Vertical Order Traversal of a Binary Tree', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Coordinate Assignment with Multi-Tier Column Row Value Sorting' },
  'smallest-string-starting-from-leaf': { number: 988, title: 'Smallest String Starting From Leaf', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Root-to-Leaf Path Reversal with Lexicographical Minimum Tracking' },
  'add-to-array-form-of-integer': { number: 989, title: 'Add to Array-Form of Integer', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Right-to-Left Arithmetic Carry Absorption Simulation' },
  'satisfiability-of-equality-equations': { number: 990, title: 'Satisfiability of Equality Equations', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pass Equality Disjoint Set Union and Inequality Contradiction Test' },
  'broken-calculator': { number: 991, title: 'Broken Calculator', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Reverse Greedy Arithmetic with Parity-Based Deterministic Halving' },
  'subarrays-with-k-different-integers': { number: 992, title: 'Subarrays with K Different Integers', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Exact-K via Upper Bound Difference with Dynamic Sliding Window' },
  'minimum-number-of-k-consecutive-bit-flips': { number: 995, title: 'Minimum Number of K Consecutive Bit Flips', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy Leftmost Inversion with Sliding Parity Difference Tracking' },
  'number-of-squareful-arrays': { number: 996, title: 'Number of Squareful Arrays', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Permutation Backtracking with Square Sum Pruning and Duplicate Skipping' },
  'maximum-binary-tree-ii': { number: 998, title: 'Maximum Binary Tree II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Recursive Cartesian Tree Insertion Down Right Spine' },
  'available-captures-for-rook': { number: 999, title: 'Available Captures for Rook', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Orthogonal Ray Casting with Obstacle and Target Collision' },
  'grid-illumination': { number: 1001, title: 'Grid Illumination', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Coordinate Projection Hashing with Local Lamp Extinguishment' },
  'find-common-characters': { number: 1002, title: 'Find Common Characters', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Alphabet Multiset Intersection via Elementwise Minimum Frequency' },
  'maximize-sum-of-array-after-k-negations': { number: 1005, title: 'Maximize Sum Of Array After K Negations', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Negative Inversion with Smallest Magnitude Parity Cancellation' },
  'clumsy-factorial': { number: 1006, title: 'Clumsy Factorial', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Cyclic Arithmetic Operator Precedence with Stack Evaluation' },
  'minimum-domino-rotations-for-equal-row': { number: 1007, title: 'Minimum Domino Rotations For Equal Row', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Candidate Target Rotation Test on Domino Halves' },
  'construct-binary-search-tree-from-preorder-traversal': { number: 1008, title: 'Construct Binary Search Tree from Preorder Traversal', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single-Pass Preorder Tree Reconstruction with Recursive Upper Bound' },
  'complement-of-base-10-integer': { number: 1009, title: 'Complement of Base 10 Integer', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bitmask Inversion via Significant Bit All-Ones Mask' },
  'pairs-of-songs-with-total-durations-divisible-by-60': { number: 1010, title: 'Pairs of Songs With Total Durations Divisible by 60', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Sum Modulo 60 Remainder Bucket Counting' },
  'numbers-with-repeated-digits': { number: 1012, title: 'Numbers With Repeated Digits', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Complementary Digit Permutation Counting of Unique-Digit Numbers' },
  'partition-array-into-three-parts-with-equal-sum': { number: 1013, title: 'Partition Array Into Three Parts With Equal Sum', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Prefix Slice Accumulation Matching Target Third' },
  'best-sightseeing-pair': { number: 1014, title: 'Best Sightseeing Pair', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Index-Decoupled Dynamic Programming with Running Maximum Prefix Term' },
  'smallest-integer-divisible-by-k': { number: 1015, title: 'Smallest Integer Divisible by K', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Modular Repunit Remainder Simulation with Pigeonhole Termination' },
  'binary-string-with-substrings-representing-1-to-n': { number: 1016, title: 'Binary String With Substrings Representing 1 To N', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Subsegment Suffix Halving Check and Substring Verification' },
  'convert-to-base-2': { number: 1017, title: 'Convert to Base -2', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Negabinary Radix Arithmetic with Non-Negative Remainder Normalization' },
  'binary-prefix-divisible-by-5': { number: 1018, title: 'Binary Prefix Divisible By 5', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Streaming Modular Double-and-Add Remainder Tracking' },
  'number-of-enclaves': { number: 1020, title: 'Number of Enclaves', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Perimeter-Seeded Flood Fill Elimination of Boundary-Connected Land' },
  'sum-of-root-to-leaf-binary-numbers': { number: 1022, title: 'Sum of Root To Leaf Binary Numbers', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Top-Down Bitshift Path Accumulation on Binary Leaves' },
  'camelcase-matching': { number: 1023, title: 'Camelcase Matching', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pointer Subsequence Matching with Strict Uppercase Preservation' },
  'video-stitching': { number: 1024, title: 'Video Stitching', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Interval Coverage with Farthest Horizon Extension' },
  'divisor-game': { number: 1025, title: 'Divisor Game', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Parity-Preserving Subtraction Invariant in Combinatorial Game' },
  'maximum-difference-between-node-and-ancestor': { number: 1026, title: 'Maximum Difference Between Node and Ancestor', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Top-Down Range Min-Max Propagation Across Root-to-Leaf Paths' },
  'longest-arithmetic-subsequence': { number: 1027, title: 'Longest Arithmetic Subsequence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dynamic Programming Indexed by Endpoint and Common Difference' },
  'recover-a-tree-from-preorder-traversal': { number: 1028, title: 'Recover a Tree From Preorder Traversal', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Depth-Dash Parsing with Monotonic Ancestor Stack Reconstruction' },
  'two-city-scheduling': { number: 1029, title: 'Two City Scheduling', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Opportunity Cost Ranking by City Cost Differential' },
  'matrix-cells-in-distance-order': { number: 1030, title: 'Matrix Cells in Distance Order', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Radial Manhattan Distance Sorting from Center Coordinates' },
  'maximum-sum-of-two-non-overlapping-subarrays': { number: 1031, title: 'Maximum Sum of Two Non-Overlapping Subarrays', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual-Order Prefix Sum Sliding Window with Running Maximum Term' },
  'moving-stones-until-consecutive': { number: 1033, title: 'Moving Stones Until Consecutive', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Three-Stone Number Line Gap Analysis and Geometric Invariants' },
  'coloring-a-border': { number: 1034, title: 'Coloring A Border', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Component Flood Fill with Deferred Border Coordinate Recoloring' },
  'uncrossed-lines': { number: 1035, title: 'Uncrossed Lines', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Non-Crossing Line Isomorphism to Longest Common Subsequence' },
  'escape-a-large-maze': { number: 1036, title: 'Escape a Large Maze', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bidirectional Bounded-Area Breadth-First Search on Infinite Grid' },
  'valid-boomerang': { number: 1037, title: 'Valid Boomerang', difficulty: 'Easy', category: 'Algorithms', twist_type: '2D Cross Product Determinant for Non-Collinear Distinct Points' },
  'binary-search-tree-to-greater-sum-tree': { number: 1038, title: 'Binary Search Tree to Greater Sum Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Reverse In-Order Traversal with Running Suffix Key Accumulation' },
  'moving-stones-until-consecutive-ii': { number: 1040, title: 'Moving Stones Until Consecutive II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Flank Vacancy Discard Extremes and Size-N Window Packing' },
  'robot-bounded-in-circle': { number: 1041, title: 'Robot Bounded In Circle', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Orientation Vector and Origin Displacement Periodic Cycle Test' },
  'flower-planting-with-no-adjacent': { number: 1042, title: 'Flower Planting With No Adjacent', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy 4-Coloring on Degree-Bounded Graph' },
  'partition-array-for-maximum-sum': { number: 1043, title: 'Partition Array for Maximum Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: '1D Dynamic Programming over Variable K-Length Slices' },
  'longest-duplicate-substring': { number: 1044, title: 'Longest Duplicate Substring', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Binary Search on Answer Length with Rabin-Karp Rolling Hash' },
  'last-stone-weight': { number: 1046, title: 'Last Stone Weight', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Max Priority Queue Simulation of Pairwise Smashing' },
  'longest-string-chain': { number: 1048, title: 'Longest String Chain', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Length-Sorted Dynamic Programming with Single Character Deletion Predecessors' },
  'height-checker': { number: 1051, title: 'Height Checker', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Reference Sorted Array Elementwise Comparison' },
  'grumpy-bookstore-owner': { number: 1052, title: 'Grumpy Bookstore Owner', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Baseline Non-Grumpy Sum with Fixed Window Customer Recovery' },
  'previous-permutation-with-one-swap': { number: 1053, title: 'Previous Permutation With One Swap', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Rightmost Inversion Point with Largest Smaller Leftmost Swap' },
  'distant-barcodes': { number: 1054, title: 'Distant Barcodes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Frequency-Sorted Interleaved Even-Odd Placement' },
  'shortest-way-to-form-string': { number: 1055, title: 'Shortest Way to Form String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Sequential Subsequence Matching Across Source Cycles' },
  'confusing-number': { number: 1056, title: 'Confusing Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Rotational Digit Mapping and Reversal Difference Verification' },
  'campus-bikes': { number: 1057, title: 'Campus Bikes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bucket-Sorted Manhattan Distance Pairing with Tie-Breaking Priority' },
  'minimize-rounding-error-to-meet-target': { number: 1058, title: 'Minimize Rounding Error to Meet Target', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Fractional Rounding Up by Smallest Error Gap' },
  'all-paths-from-source-lead-to-destination': { number: 1059, title: 'All Paths from Source Lead to Destination', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Directed Cycle Detection and Out-Degree Zero Terminal Validation' },
  'missing-element-in-sorted-array': { number: 1060, title: 'Missing Element in Sorted Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search on Missing Number Deficit Gap' },
  'lexicographically-smallest-equivalent-string': { number: 1061, title: 'Lexicographically Smallest Equivalent String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Disjoint Set Union with Lexicographical Minimum Representative' },
  'longest-repeating-substring': { number: 1062, title: 'Longest Repeating Substring', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search on Substring Length with Rabin-Karp Rolling Hash' },
  'number-of-valid-subarrays': { number: 1063, title: 'Number of Valid Subarrays', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Monotonic Stack Right-Bound Counting of Strictly Dominant Spans' },
  'fixed-point': { number: 1064, title: 'Fixed Point', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Binary Search with Earliest Index Preference on Sorted Identity Array' },
  'index-pairs-of-a-string': { number: 1065, title: 'Index Pairs of a String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Trie-Based Multi-Word Prefix Match Spanning Intervals' },
  'campus-bikes-ii': { number: 1066, title: 'Campus Bikes II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bitmask Dynamic Programming for Bipartite Minimum Weight Matching' },
  'digit-count-in-range': { number: 1067, title: 'Digit Count in Range', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Digit DP Counting Occurrences of Target Digit Across Prefix Ranges' },
  'greatest-common-divisor-of-strings': { number: 1071, title: 'Greatest Common Divisor of Strings', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Periodic Substring GCD String Concatenation Invariant' },
  'flip-columns-for-maximum-number-of-equal-rows': { number: 1072, title: 'Flip Columns For Maximum Number of Equal Rows', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Canonical Row Inversion Signature Frequency Bucketing' },
  'adding-two-negabinary-numbers': { number: 1073, title: 'Adding Two Negabinary Numbers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Base -2 Carry Arithmetic with Inverted Carry Overflows' },
  'number-of-submatrices-that-sum-to-target': { number: 1074, title: 'Number of Submatrices That Sum to Target', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Column-Span Prefix Sum 2D Compression to 1D Two-Sum Target Subarrays' },
  'occurrences-after-bigram': { number: 1078, title: 'Occurrences After Bigram', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Sequential Word Bigram Matching in Space-Separated Text' },
  'letter-tile-possibilities': { number: 1079, title: 'Letter Tile Possibilities', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Multiset Character Backtracking Permutation Generation' },
  'insufficient-nodes-in-root-to-leaf-paths': { number: 1080, title: 'Insufficient Nodes in Root to Leaf Paths', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Subtree Pruning Based on Path Sum Threshold' },
  'smallest-subsequence-of-distinct-characters': { number: 1081, title: 'Smallest Subsequence of Distinct Characters', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Stack Greedy Character Placement with Suffix Frequency Tracking' },
  'sum-of-digits-in-the-minimum-number': { number: 1085, title: 'Sum of Digits in the Minimum Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Linear Minimum Element Digit Sum Parity Check' },
  'high-five': { number: 1086, title: 'High Five', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Per-Student Top Five Score Sorting and Integer Truncation Average' },
  'brace-expansion': { number: 1087, title: 'Brace Expansion', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Lexicographically Sorted Cartesian Product Backtracking' },
  'confusing-number-ii': { number: 1088, title: 'Confusing Number II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Recursive Strobogrammatic Number Generation with Inversion Comparison' },
  'duplicate-zeros': { number: 1089, title: 'Duplicate Zeros', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pass In-Place Array Shift from Right Bound' },
  'largest-values-from-labels': { number: 1090, title: 'Largest Values From Labels', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Descending Value Accumulation with Label Quota Capping' },
  'shortest-common-supersequence': { number: 1092, title: 'Shortest Common Supersequence', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Longest Common Subsequence Table Backtracking Reconstruction' },
  'statistics-from-a-large-sample': { number: 1093, title: 'Statistics from a Large Sample', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Histogram Bucket Sweep for Summary Statistics and Exact Median Ranks' },
  'car-pooling': { number: 1094, title: 'Car Pooling', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Difference Array Timeline Sweep for Vehicle Capacity Enforcement' },
  'brace-expansion-ii': { number: 1096, title: 'Brace Expansion II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Recursive Set Evaluation with Cartesian Product and Comma Union Precedence' },
  'two-sum-less-than-k': { number: 1099, title: 'Two Sum Less Than K', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Sorted Array Two-Pointer Convergence Below Target Sum' },
  'find-k-length-substrings-with-no-repeated-characters': { number: 1100, title: 'Find K-Length Substrings With No Repeated Characters', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fixed-Length Sliding Window with Unique Character Set Verification' },
  'the-earliest-moment-when-everyone-become-friends': { number: 1101, title: 'The Earliest Moment When Everyone Become Friends', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Chronological Event Sorting with DSU Component Reduction' },
  'path-with-maximum-minimum-value': { number: 1102, title: 'Path With Maximum Minimum Value', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Max-Priority Queue Dijkstra Bottleneck Search' },
  'distribute-candies-to-people': { number: 1103, title: 'Distribute Candies to People', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Round-Robin Arithmetic Progression Simulation with Modulo Wrapping' },
  'path-in-zigzag-labelled-binary-tree': { number: 1104, title: 'Path In Zigzag Labelled Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Depth Bit Calculation with Inverted Complement Parent Formula' },
  'filling-bookcase-shelves': { number: 1105, title: 'Filling Bookcase Shelves', difficulty: 'Medium', category: 'Algorithms', twist_type: '1D Dynamic Programming over Contiguous Shelf Partitions' },
  'parsing-a-boolean-expression': { number: 1106, title: 'Parsing A Boolean Expression', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Parentheses Stack Parsing with Prefix Operator Resolution' },
  'defanging-an-ip-address': { number: 1108, title: 'Defanging an IP Address', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Standard String Replacement of Periods with Bracketed Periods' },
  'corporate-flight-bookings': { number: 1109, title: 'Corporate Flight Bookings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Difference Array Range Update with Linear Prefix Accumulation' },
  'delete-nodes-and-return-forest': { number: 1110, title: 'Delete Nodes And Return Forest', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Tree Pruning with Disconnected Child Root Promotion' },
  'maximum-nesting-depth-of-two-valid-parentheses-strings': { number: 1111, title: 'Maximum Nesting Depth of Two Valid Parentheses Strings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Depth Parity Alternation Modulo 2 to Halve Maximum Nesting' },
  'number-of-days-in-a-month': { number: 1118, title: 'Number of Days in a Month', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Gregorian Calendar Leap Year Divisibility and Month Lookup' },
  'remove-vowels-from-a-string': { number: 1119, title: 'Remove Vowels from a String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Character Filter Omitting Lowercase English Vowels' },
  'maximum-average-subtree': { number: 1120, title: 'Maximum Average Subtree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Subtree Sum and Count Pairwise Aggregation' },
  'divide-array-into-increasing-sequences': { number: 1121, title: 'Divide Array Into Increasing Sequences', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sorted Frequency Bottleneck vs Length Capacity Inequality' },
  'relative-sort-array': { number: 1122, title: 'Relative Sort Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Counting Sort Bucket Ordering Guided by Reference Array' },
  'lowest-common-ancestor-of-deepest-leaves': { number: 1123, title: 'Lowest Common Ancestor of Deepest Leaves', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Post-Order Depth Comparison to Identify Deepest Common Ancestor' },
  'longest-well-performing-interval': { number: 1124, title: 'Longest Well-Performing Interval', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Transformed Prefix Sum with Earliest Occurrence Index Lookup' },
  'smallest-sufficient-team': { number: 1125, title: 'Smallest Sufficient Team', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitmask Dynamic Programming over Required Skills' },
  'number-of-equivalent-domino-pairs': { number: 1128, title: 'Number of Equivalent Domino Pairs', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Canonical Ordered Pair Hashing with Combinatorial Counting' },
  'minimum-cost-tree-from-leaf-values': { number: 1130, title: 'Minimum Cost Tree From Leaf Values', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic Stack Pairing Elements with Smaller Neighbor' },
  'maximum-of-absolute-value-expression': { number: 1131, title: 'Maximum of Absolute Value Expression', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Manhattan Distance 4-Sign Expansion Extremum' },
  'largest-unique-number': { number: 1133, title: 'Largest Unique Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Frequency Counting with Highest Single Occurrence Scan' },
  'armstrong-number': { number: 1134, title: 'Armstrong Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Digit Extraction with Power Sum Equality Verification' },
  'connecting-cities-with-minimum-cost': { number: 1135, title: 'Connecting Cities With Minimum Cost', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Kruskal Algorithm with Disjoint Set Union' },
  'parallel-courses': { number: 1136, title: 'Parallel Courses', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Kahn Topological Sort with Longest Path Level Counting' },
  'alphabet-board-path': { number: 1138, title: 'Alphabet Board Path', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Coordinate Movement Ordering to Safely Navigate Past Z' },
  'largest-1-bordered-square': { number: 1139, title: 'Largest 1-Bordered Square', difficulty: 'Medium', category: 'Algorithms', twist_type: '2D Consecutive Ones Matrix with Outer Border Verification' },
  'stone-game-ii': { number: 1140, title: 'Stone Game II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Minimax Dynamic Programming with Suffix Sums' },
  'decrease-elements-to-make-array-zigzag': { number: 1144, title: 'Decrease Elements To Make Array Zigzag', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Independent Even and Odd Valley Reduction Comparison' },
  'binary-tree-coloring-game': { number: 1145, title: 'Binary Tree Coloring Game', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Subtree Size Partitioning Around Chosen First Node' },
  'longest-chunked-palindrome-decomposition': { number: 1147, title: 'Longest Chunked Palindrome Decomposition', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy Rolling Prefix and Suffix Decomposition Matching' },
  'check-if-a-number-is-majority-element-in-a-sorted-array': { number: 1150, title: 'Check If a Number Is Majority Element in a Sorted Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Binary Search First Occurrence with Majority Offset Check' },
  'minimum-swaps-to-group-all-1s-together': { number: 1151, title: 'Minimum Swaps to Group All 1s Together', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fixed-Length Sliding Window Counting Zero Inversions' },
  'analyze-user-website-visit-pattern': { number: 1152, title: 'Analyze User Website Visit Pattern', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Timestamp Sorting with 3-Sequence Combinatorial Aggregation' },
  'string-transforms-into-another-string': { number: 1153, title: 'String Transforms Into Another String', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Character Mapping Directed Graph Cycle and Available Node Detection' },
  'day-of-the-year': { number: 1154, title: 'Day of the Year', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Calendar Leap Year Prefix Sum of Days in Previous Months' },
  'swap-for-longest-repeated-character-substring': { number: 1156, title: 'Swap For Longest Repeated Character Substring', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Run-Length Segment Merging with External Spare Character Swap' },
  'find-words-that-can-be-formed-by-characters': { number: 1160, title: 'Find Words That Can Be Formed by Characters', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Character Frequency Verification against Fixed Inventory' },
  'maximum-level-sum-of-a-binary-tree': { number: 1161, title: 'Maximum Level Sum of a Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Breadth-First Level Traversal with Running Max Sum Selection' },
  'last-substring-in-lexicographical-order': { number: 1163, title: 'Last Substring in Lexicographical Order', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Two-Pointer Suffix Comparison with Skip Optimizations' },
  'single-row-keyboard': { number: 1165, title: 'Single-Row Keyboard', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Sequential Index Distance Summation on Linear Key Layout' },
  'minimum-cost-to-connect-sticks': { number: 1167, title: 'Minimum Cost to Connect Sticks', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Min-Heap Greedy Huffman Combination' },
  'optimize-water-distribution-in-a-village': { number: 1168, title: 'Optimize Water Distribution in a Village', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Virtual Well Node Conversion to Minimum Spanning Tree' },
  'invalid-transactions': { number: 1169, title: 'Invalid Transactions', difficulty: 'Medium', category: 'Algorithms', twist_type: 'City Conflict Within 60-Minute Window and Amount Exceedance' },
  'compare-strings-by-frequency-of-the-smallest-character': { number: 1170, title: 'Compare Strings by Frequency of the Smallest Character', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search Count Greater Frequencies after Suffix Array Sort' },
  'remove-zero-sum-consecutive-nodes-from-linked-list': { number: 1171, title: 'Remove Zero Sum Consecutive Nodes from Linked List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Sum Latest Node Mapping with Intermediate Node Splicing' },
  'prime-arrangements': { number: 1175, title: 'Prime Arrangements', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Prime Count Factorial Modulo 10^9 + 7 Permutation' },
  'diet-plan-performance': { number: 1176, title: 'Diet Plan Performance', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Fixed-Size K-Window Sum Comparison Against Calorie Thresholds' },
  'can-make-palindrome-from-substring': { number: 1177, title: 'Can Make Palindrome from Substring', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix XOR Bitmask Parity with Replacement Bound Check' },
  'number-of-valid-words-for-each-puzzle': { number: 1178, title: 'Number of Valid Words for Each Puzzle', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Puzzle Bitmask Submask Enumeration with Required First Character' },
  'count-substrings-with-only-one-distinct-letter': { number: 1180, title: 'Count Substrings with Only One Distinct Letter', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Consecutive Character Run-Length Triangular Summation' },
  'before-and-after-puzzle': { number: 1181, title: 'Before and After Puzzle', difficulty: 'Medium', category: 'Algorithms', twist_type: 'First and Last Word Matching with Lexicographical Sorting' },
  'shortest-distance-to-target-color': { number: 1182, title: 'Shortest Distance to Target Color', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Precomputed Nearest Left and Right Distance Arrays' },
  'maximum-number-of-ones': { number: 1183, title: 'Maximum Number of Ones', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sub-Square Modulo Position Frequency Sorting with Greedy Assignment' },
  'distance-between-bus-stops': { number: 1184, title: 'Distance Between Bus Stops', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Clockwise vs Counterclockwise Circular Route Comparison' },
  'day-of-the-week': { number: 1185, title: 'Day of the Week', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Tomohiko Sakamoto Algorithm for Day of Week Calculation' },
  'make-array-strictly-increasing': { number: 1187, title: 'Make Array Strictly Increasing', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dynamic State Compression with Binary Search Replacement' },
  'maximum-number-of-balloons': { number: 1189, title: 'Maximum Number of Balloons', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Character Frequency Bottleneck Division' },
  'k-concatenation-maximum-sum': { number: 1191, title: 'K-Concatenation Maximum Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Kadane Maximum Subarray with Total Sum Multipliers Modulo 10^9 + 7' },
  'how-many-apples-can-you-put-into-the-basket': { number: 1196, title: 'How Many Apples Can You Put into the Basket', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Lightest First Knapsack within Capacity 5000' },
  'minimum-knight-moves': { number: 1197, title: 'Minimum Knight Moves', difficulty: 'Medium', category: 'Algorithms', twist_type: 'First Quadrant Symmetry with Memoized Greedy BFS' },
  'find-smallest-common-element-in-all-rows': { number: 1198, title: 'Find Smallest Common Element in All Rows', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Row Binary Search for Smallest First Row Match' },
  'minimum-time-to-build-blocks': { number: 1199, title: 'Minimum Time to Build Blocks', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Reverse Huffman Min-Heap Pairwise Merging' },
  'minimum-absolute-difference': { number: 1200, title: 'Minimum Absolute Difference', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Adjacent Pair Scanning on Sorted Elements' },
  'ugly-number-iii': { number: 1201, title: 'Ugly Number III', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search on Answer using Inclusion-Exclusion LCM Count' },
  'smallest-string-with-swaps': { number: 1202, title: 'Smallest String With Swaps', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Disjoint Set Union Connected Components with Lexicographical Placement' },
  'sort-items-by-groups-respecting-dependencies': { number: 1203, title: 'Sort Items by Groups Respecting Dependencies', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Two-Level Topological Sorting on Groups and Items' },
  'unique-number-of-occurrences': { number: 1207, title: 'Unique Number of Occurrences', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Frequency Distribution Cardinality Uniqueness Check' },
  'intersection-of-three-sorted-arrays': { number: 1213, title: 'Intersection of Three Sorted Arrays', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Synchronized Three-Pointer Scanning on Sorted Arrays' },
  'two-sum-bsts': { number: 1214, title: 'Two Sum BSTs', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Tree Binary Search Tree Inorder Matching' },
  'stepping-numbers': { number: 1215, title: 'Stepping Numbers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Breadth-First Digit Branching within Range' },
  'valid-palindrome-iii': { number: 1216, title: 'Valid Palindrome III', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Longest Palindromic Subsequence with Edit Distance K' },
  'minimum-cost-to-move-chips-to-the-same-position': { number: 1217, title: 'Minimum Cost to Move Chips to The Same Position', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Parity Counting of Even and Odd Coin Positions' },
  'longest-arithmetic-subsequence-of-given-difference': { number: 1218, title: 'Longest Arithmetic Subsequence of Given Difference', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Hash Map Dynamic Programming on Difference Transition' },
  'path-with-maximum-gold': { number: 1219, title: 'Path with Maximum Gold', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Backtracking DFS Gold Gathering with Grid Cell Restoral' },
  'count-vowels-permutation': { number: 1220, title: 'Count Vowels Permutation', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Matrix Exponentiation or Linear State DP for Directed Vowel Graph' },
  'split-a-string-in-balanced-strings': { number: 1221, title: 'Split a String in Balanced Strings', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Running Balance Counter Resetting to Zero' },
  'queens-that-can-attack-the-king': { number: 1222, title: 'Queens That Can Attack the King', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Raycasting in Eight Directions from King Coordinates' },
  'dice-roll-simulation': { number: 1223, title: 'Dice Roll Simulation', difficulty: 'Hard', category: 'Algorithms', twist_type: 'State DP Tracking Last Face and Consecutive Roll Count' },
  'maximum-equal-frequency': { number: 1224, title: 'Maximum Equal Frequency', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Prefix Frequency Table and Frequency-of-Frequencies Count' },
  'airplane-seat-assignment-probability': { number: 1227, title: 'Airplane Seat Assignment Probability', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Recursive Probability Derivation Constant Result' },
  'missing-number-in-arithmetic-progression': { number: 1228, title: 'Missing Number in Arithmetic Progression', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Arithmetic Progression Common Difference and Binary Search' },
  'meeting-scheduler': { number: 1229, title: 'Meeting Scheduler', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pointer Interval Overlap Intersection Check' },
  'toss-strange-coins': { number: 1230, title: 'Toss Strange Coins', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dynamic Programming Coin Toss Probability Transition' },
  'divide-chocolate': { number: 1231, title: 'Divide Chocolate', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Binary Search on Sweetness Threshold with Greedy Chunk Splitting' },
  'check-if-it-is-a-straight-line': { number: 1232, title: 'Check If It Is a Straight Line', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Cross-Multiplication Slope Collinearity Verification' },
  'remove-sub-folders-from-the-filesystem': { number: 1233, title: 'Remove Sub-Folders from the Filesystem', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Lexicographical Path Sorting with Prefix Slash Matching' },
  'replace-the-substring-for-balanced-string': { number: 1234, title: 'Replace the Substring for Balanced String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sliding Window Frequency Excess Balancing' },
  'circular-permutation-in-binary-representation': { number: 1238, title: 'Circular Permutation in Binary Representation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Gray Code Generation with Bitwise XOR Shift' },
  'maximum-length-of-a-concatenated-string-with-unique-characters': { number: 1239, title: 'Maximum Length of a Concatenated String with Unique Characters', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bitmask DFS Backtracking on Distinct Characters' },
  'array-transformation': { number: 1243, title: 'Array Transformation', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Simulation of Simultaneous Array Cell Increments and Decrements' },
  'tree-diameter': { number: 1245, title: 'Tree Diameter', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-Pass BFS or Postorder DFS Deepest Node Search' },
  'palindrome-removal': { number: 1246, title: 'Palindrome Removal', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Interval Dynamic Programming with Outer Matching Subproblems' },
  'minimum-swaps-to-make-strings-equal': { number: 1247, title: 'Minimum Swaps to Make Strings Equal', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Pairwise XY and YX Mismatch Counting' },
  'count-number-of-nice-subarrays': { number: 1248, title: 'Count Number of Nice Subarrays', difficulty: 'Medium', category: 'Algorithms', twist_type: 'At Most K Sliding Window Difference on Parity' },
  'check-if-it-is-a-good-array': { number: 1250, title: 'Check If It Is a Good Array', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bézout Identity and Greatest Common Divisor Reduction' },
  'cells-with-odd-values-in-a-matrix': { number: 1252, title: 'Cells with Odd Values in a Matrix', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Row and Column Increment Parity Counting' },
  'reconstruct-a-2-row-binary-matrix': { number: 1253, title: 'Reconstruct a 2-Row Binary Matrix', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Column Partitioning by Colsum Values 2, 1, and 0' },
  'number-of-closed-islands': { number: 1254, title: 'Number of Closed Islands', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Boundary Flood Fill Elimination Followed by Closed Component Count' },
  'maximum-score-words-formed-by-letters': { number: 1255, title: 'Maximum Score Words Formed by Letters', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Subsets Backtracking with Letter Inventory Deduction' },
  'encode-number': { number: 1256, title: 'Encode Number', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Offset Representation of Integer N Plus 1' },
  'smallest-common-region': { number: 1257, title: 'Smallest Common Region', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Parent Map Traversal to Lowest Common Ancestor' },
  'synonymous-sentences': { number: 1258, title: 'Synonymous Sentences', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Disjoint Set Union Synonym Grouping with Backtracking Expansion' },
  'handshakes-that-dont-cross': { number: 1259, title: 'Handshakes That Don\'t Cross', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Catalan Number Dynamic Programming on Non-Crossing Chords' },
  'shift-2d-grid': { number: 1260, title: 'Shift 2D Grid', difficulty: 'Easy', category: 'Algorithms', twist_type: '1D Index Mapping with Modulo Arithmetic' },
  'minimum-time-visiting-all-points': { number: 1266, title: 'Minimum Time Visiting All Points', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Chebyshev Distance Metric Summation Across Sequential Points' },
  'count-servers-that-communicate': { number: 1267, title: 'Count Servers that Communicate', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Row and Column Server Counts with Multi-Server Condition' },
  'search-suggestions-system': { number: 1268, title: 'Search Suggestions System', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Array Binary Search Prefix Window Slicing' },
  'number-of-ways-to-stay-in-the-same-place-after-some-steps': { number: 1269, title: 'Number of Ways to Stay in the Same Place After Some Steps', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bounded Dynamic Programming with Boundary Clamping' },
  'hexspeak': { number: 1271, title: 'Hexspeak', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Hexadecimal Conversion with Letter Substitution' },
  'remove-interval': { number: 1272, title: 'Remove Interval', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Interval Clipping and Segment Splitting' },
  'delete-tree-nodes': { number: 1273, title: 'Delete Tree Nodes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Postorder Tree Aggregation of Node Values and Subtree Sizes' },
  'find-winner-on-a-tic-tac-toe-game': { number: 1275, title: 'Find Winner on a Tic Tac Toe Game', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Line Sum Simulation on 3x3 Grid' },
  'number-of-burgers-with-no-waste-of-ingredients': { number: 1276, title: 'Number of Burgers with No Waste of Ingredients', difficulty: 'Medium', category: 'Algorithms', twist_type: 'System of Linear Equations Exact Integer Solution Check' },
  'count-square-submatrices-with-all-ones': { number: 1277, title: 'Count Square Submatrices with All Ones', difficulty: 'Medium', category: 'Algorithms', twist_type: '2D Dynamic Programming Bottom-Right Corner Accumulation' },
  'palindrome-partitioning-iii': { number: 1278, title: 'Palindrome Partitioning III', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Precomputed Palindrome Cost with Dynamic Programming Partitioning' },
  'subtract-the-product-and-sum-of-digits-of-an-integer': { number: 1281, title: 'Subtract the Product and Sum of Digits of an Integer', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Digit Extraction Product and Sum Difference' },
  'group-the-people-given-the-group-size-they-belong-to': { number: 1282, title: 'Group the People Given the Group Size They Belong To', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bucket Grouping with Batch Chunking' },
  'find-the-smallest-divisor-given-a-threshold': { number: 1283, title: 'Find the Smallest Divisor Given a Threshold', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search on Divisor with Ceiling Sum Monotonicity' },
  'minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix': { number: 1284, title: 'Minimum Number of Flips to Convert Binary Matrix to Zero Matrix', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitmask BFS Shortest Path to Zero State' },
  'element-appearing-more-than-25-in-sorted-array': { number: 1287, title: 'Element Appearing More Than 25% In Sorted Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Quarter Offset Scanning on Non-Decreasing Sequence' },
  'remove-covered-intervals': { number: 1288, title: 'Remove Covered Intervals', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Custom Sort with Descending End Tie-Break and Running Max' },
  'minimum-falling-path-sum-ii': { number: 1289, title: 'Minimum Falling Path Sum II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Top-Two Minimum State DP Row Transition' },
  'convert-binary-number-in-a-linked-list-to-integer': { number: 1290, title: 'Convert Binary Number in a Linked List to Integer', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Horner Rule Left Shift Bitwise Accumulation' },
  'sequential-digits': { number: 1291, title: 'Sequential Digits', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fixed Digits Sequence Sliding Window Generation' },
  'maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold': { number: 1292, title: 'Maximum Side Length of a Square with Sum Less than or Equal to Threshold', difficulty: 'Medium', category: 'Algorithms', twist_type: '2D Prefix Sums with Binary Search on Side Length' },
  'shortest-path-in-a-grid-with-obstacles-elimination': { number: 1293, title: 'Shortest Path in a Grid with Obstacles Elimination', difficulty: 'Hard', category: 'Algorithms', twist_type: '3D State BFS with Obstacle Elimination Budget' },
  'find-numbers-with-even-number-of-digits': { number: 1295, title: 'Find Numbers with Even Number of Digits', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Base 10 Digit Count Parity Evaluation' },
  'divide-array-in-sets-of-k-consecutive-numbers': { number: 1296, title: 'Divide Array in Sets of K Consecutive Numbers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Smallest Key Consecutive Frequency Subtraction' },
  'maximum-number-of-occurrences-of-a-substring': { number: 1297, title: 'Maximum Number of Occurrences of a Substring', difficulty: 'Medium', category: 'Algorithms', twist_type: 'MinSize Fixed Sliding Window Frequency Tracking' },
  'maximum-candies-you-can-get-from-boxes': { number: 1298, title: 'Maximum Candies You Can Get from Boxes', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Event-Driven BFS Dependency Resolution on Box Keys' },
  'replace-elements-with-greatest-element-on-right-side': { number: 1299, title: 'Replace Elements with Greatest Element on Right Side', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Right-to-Left Reverse Running Maximum Pass' },
  'sum-of-mutated-array-closest-to-target': { number: 1300, title: 'Sum of Mutated Array Closest to Target', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search on Threshold with Sum Monotonicity' },
  'number-of-paths-with-max-score': { number: 1301, title: 'Number of Paths with Max Score', difficulty: 'Hard', category: 'Algorithms', twist_type: '2D DP Backward Traversal with Modular Path Count' },
  'deepest-leaves-sum': { number: 1302, title: 'Deepest Leaves Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Breadth-First Level Traversal with Final Level Sum' },
  'find-n-unique-integers-sum-up-to-zero': { number: 1304, title: 'Find N Unique Integers Sum up to Zero', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Symmetric Opposite Pair Generation with Zero Parity' },
  'all-elements-in-two-binary-search-trees': { number: 1305, title: 'All Elements in Two Binary Search Trees', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual BST Inorder Traversals with Two-Pointer Linear Merge' },
  'jump-game-iii': { number: 1306, title: 'Jump Game III', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Directed Graph BFS Reachability with Cycle Pruning' },
  'decrypt-string-from-alphabet-to-integer-mapping': { number: 1309, title: 'Decrypt String from Alphabet to Integer Mapping', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Forward Scan with Two-Character Pound Lookahead' },
  'xor-queries-of-a-subarray': { number: 1310, title: 'XOR Queries of a Subarray', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Bitwise XOR Array Constant Time Range Queries' },
  'get-watched-videos-by-your-friends': { number: 1311, title: 'Get Watched Videos by Your Friends', difficulty: 'Medium', category: 'Algorithms', twist_type: 'K-Hop BFS Level Graph Cutoff with Compound Frequency Sorting' },
  'minimum-insertion-steps-to-make-a-string-palindrome': { number: 1312, title: 'Minimum Insertion Steps to Make a String Palindrome', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Longest Palindromic Subsequence Dual Reduction via LCS' },
  'decompress-run-length-encoded-list': { number: 1313, title: 'Decompress Run-Length Encoded List', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Stride Frequency Pair Array Unpacking' },
  'sum-of-nodes-with-even-valued-grandparent': { number: 1315, title: 'Sum of Nodes with Even-Valued Grandparent', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Recursive Tree DFS with Ancestor Parity Propagation' },
  'distinct-echo-substrings': { number: 1316, title: 'Distinct Echo Substrings', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Length-Based Window Equality Search with Unique Set' },
  'convert-integer-to-the-sum-of-two-no-zero-integers': { number: 1317, title: 'Convert Integer to the Sum of Two No-Zero Integers', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Complement Partitioning with Digit Zero Exclusion' },
  'minimum-flips-to-make-a-or-b-equal-to-c': { number: 1318, title: 'Minimum Flips to Make a OR b Equal to c', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bitwise Independence Analysis Across 32 Bit Positions' },
  'number-of-operations-to-make-network-connected': { number: 1319, title: 'Number of Operations to Make Network Connected', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Disjoint Set Union Connected Components Deficit' },
  'minimum-distance-to-type-a-word-using-two-fingers': { number: 1320, title: 'Minimum Distance to Type a Word Using Two Fingers', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Two-Finger Coordinate DP Anchoring Other Hand Position' },
  'maximum-69-number': { number: 1323, title: 'Maximum 69 Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy Leftmost Significant Digit 6 to 9 Flip' },
  'print-words-vertically': { number: 1324, title: 'Print Words Vertically', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Character Matrix Transposition with Trailing Space Trimming' },
  'delete-leaves-with-a-given-value': { number: 1325, title: 'Delete Leaves With a Given Value', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bottom-Up Postorder Cascading Leaf Node Pruning' },
  'minimum-number-of-taps-to-open-to-water-a-garden': { number: 1326, title: 'Minimum Number of Taps to Open to Water a Garden', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Interval Coverage Reduction to Jump Game II Greedy Expansion' },
  'break-a-palindrome': { number: 1328, title: 'Break a Palindrome', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Lexicographical Greedy First Non-A Replacement in First Half' },
  'sort-the-matrix-diagonally': { number: 1329, title: 'Sort the Matrix Diagonally', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Diagonal Grouping by Row Minus Col Key and In-Place Insertion' },
  'rank-transform-of-an-array': { number: 1331, title: 'Rank Transform of an Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Coordinate Compression via Sorted Unique Element Ranking' },
  'remove-palindromic-subsequences': { number: 1332, title: 'Remove Palindromic Subsequences', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Letter Alphabet Palindromic Subsequence Upper Bound of 2' },
  'filter-restaurants-by-vegan-friendly-price-and-distance': { number: 1333, title: 'Filter Restaurants by Vegan-Friendly, Price and Distance', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Multi-Field Predicate Filtering with Rating-ID Compound Sort' },
  'minimum-difficulty-of-a-job-schedule': { number: 1335, title: 'Minimum Difficulty of a Job Schedule', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Day Partitioning Dynamic Programming with Monotonic Daily Maximums' },
  'the-k-weakest-rows-in-a-matrix': { number: 1337, title: 'The K Weakest Rows in a Matrix', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Binary Search Soldier Count with Row Index Tie-Breaking' },
  'reduce-array-size-to-the-half': { number: 1338, title: 'Reduce Array Size to The Half', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Highest Frequency Set Elimination' },
  'maximum-product-of-splitted-binary-tree': { number: 1339, title: 'Maximum Product of Splitted Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Postorder Subtree Sum Recording with Edge Cut Maximization' },
  'jump-game-v': { number: 1340, title: 'Jump Game V', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Memoized DFS over Decreasing Height Directed Acyclic Graph' },
  'number-of-steps-to-reduce-a-number-to-zero': { number: 1342, title: 'Number of Steps to Reduce a Number to Zero', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bitwise Parity Simulation of Halving and Decrementing' },
  'angle-between-hands-of-a-clock': { number: 1344, title: 'Angle Between Hands of a Clock', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Continuous Hand Progression with Reflex Angle Minimization' },
  'jump-game-iv': { number: 1345, title: 'Jump Game IV', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Breadth-First Search with Equal-Value Bucket Clearing' },
  'check-if-n-and-its-double-exist': { number: 1346, title: 'Check If N and Its Double Exist', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single-Pass Set Lookup with Zero Self-Pairing Avoidance' },
  'minimum-number-of-steps-to-make-two-strings-anagram': { number: 1347, title: 'Minimum Number of Steps to Make Two Strings Anagram', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Character Frequency Positive Discrepancy Summation' },
  'count-negative-numbers-in-a-sorted-matrix': { number: 1351, title: 'Count Negative Numbers in a Sorted Matrix', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Staircase Saddleback Traversal on Monotonic Rows and Columns' },
  'maximum-number-of-events-that-can-be-attended': { number: 1353, title: 'Maximum Number of Events That Can Be Attended', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Earliest Deadline Event Attendance with Min-Heap' },
  'construct-target-array-with-multiple-sums': { number: 1354, title: 'Construct Target Array with Multiple Sums', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Reverse Euclidean Modulo Reduction on Maximum Element' },
  'sort-integers-by-the-number-of-1-bits': { number: 1356, title: 'Sort Integers by The Number of 1 Bits', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bit Count Primary Sort with Integer Value Secondary Sort' },
  'number-of-substrings-containing-all-three-characters': { number: 1358, title: 'Number of Substrings Containing All Three Characters', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Three-Character Last Seen Minimum Index Substring Counting' },
  'count-all-valid-pickup-and-delivery-options': { number: 1359, title: 'Count All Valid Pickup and Delivery Options', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Permutation Placement Product with Modular Arithmetic' },
  'number-of-days-between-two-dates': { number: 1360, title: 'Number of Days Between Two Dates', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Days Since Anchor Epoch with Leap Year Adjustments' },
  'validate-binary-tree-nodes': { number: 1361, title: 'Validate Binary Tree Nodes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'In-Degree Single-Root Check with Cycle Detection' },
  'closest-divisors': { number: 1362, title: 'Closest Divisors', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Square Root Factorization of Successor Integers' },
  'largest-multiple-of-three': { number: 1363, title: 'Largest Multiple of Three', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Digit Modulo 3 Remainder Bucket Pruning' },
  'how-many-numbers-are-smaller-than-the-current-number': { number: 1365, title: 'How Many Numbers Are Smaller Than the Current Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Frequency Prefix Count Coordinate Compression' },
  'rank-teams-by-votes': { number: 1366, title: 'Rank Teams by Votes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Position-By-Position Vote Vector Lexicographical Sorting' },
  'linked-list-in-binary-tree': { number: 1367, title: 'Linked List in Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Downward Tree Path Pattern Matching' },
  'increasing-decreasing-string': { number: 1370, title: 'Increasing Decreasing String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Alternating Ascending and Descending Character Frequency Consumption' },
  'find-the-longest-substring-containing-vowels-in-even-counts': { number: 1371, title: 'Find the Longest Substring Containing Vowels in Even Counts', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Parity Bitmask State Recording with Earliest Index' },
  'longest-zigzag-path-in-a-binary-tree': { number: 1372, title: 'Longest Zigzag Path in a Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Directional State DFS Tracking Zigzag Path Length' },
  'maximum-sum-bst-in-binary-tree': { number: 1373, title: 'Maximum Sum BST in Binary Tree', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bottom-Up Postorder BST Validation with Subtree Sum' },
  'generate-a-string-with-characters-that-have-odd-counts': { number: 1374, title: 'Generate a String with Characters That Have Odd Counts', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Parity Partitioning into One or Two Distinct Characters' },
  'number-of-times-binary-string-is-prefix-aligned': { number: 1375, title: 'Number of Times Binary String Is Prefix Aligned', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Running Maximum Index Comparison Against Step Number' },
  'time-needed-to-inform-all-employees': { number: 1376, title: 'Time Needed to Inform All Employees', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Subordinate Hierarchy DFS Computing Maximum Path Latency' },
  'frog-position-after-t-seconds': { number: 1377, title: 'Frog Position After T Seconds', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Tree Breadth-First Probability Propagation with Trapped State' },
  'lucky-numbers-in-a-matrix': { number: 1380, title: 'Lucky Numbers in a Matrix', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Row Minima and Column Maxima Set Intersection' },
  'balance-a-binary-search-tree': { number: 1382, title: 'Balance a Binary Search Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'In-Order Traversal Flattening and Recursive Median Tree Rebuilding' },
  'maximum-performance-of-a-team': { number: 1383, title: 'Maximum Performance of a Team', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Descending Efficiency Sort with Min-Heap Speed Window' },
  'find-the-distance-value-between-two-arrays': { number: 1385, title: 'Find the Distance Value Between Two Arrays', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Binary Search Neighbor Proximity Checking' },
  'cinema-seat-allocation': { number: 1386, title: 'Cinema Seat Allocation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Reserved Seat Row Bitmask Compaction and Sparse Counting' },
  'sort-integers-by-the-power-value': { number: 1387, title: 'Sort Integers by the Power Value', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Collatz Power Recurrence Caching with Multi-Level Sort' },
  'pizza-with-3n-slices': { number: 1388, title: 'Pizza with 3n Slices', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Circular Array k-Element Non-Adjacent DP Reduction' },
  'create-target-array-in-the-given-order': { number: 1389, title: 'Create Target Array in the Given Order', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Sequential Array Index Shift Simulation' },
  'four-divisors': { number: 1390, title: 'Four Divisors', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Square Root Factorization with Early Count Pruning' },
  'check-if-there-is-a-valid-path-in-a-grid': { number: 1391, title: 'Check if There is a Valid Path in a Grid', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bidirectional Street Port Reciprocal Connectivity Traversal' },
  'find-lucky-integer-in-an-array': { number: 1394, title: 'Find Lucky Integer in an Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Frequency Count Matching Element Value Maximization' },
  'count-number-of-teams': { number: 1395, title: 'Count Number of Teams', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Middle Soldier Pivot with Left and Right Rating Products' },
  'count-largest-group': { number: 1399, title: 'Count Largest Group', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Decimal Digit Sum Bucket Frequency Grouping' },
  'construct-k-palindrome-strings': { number: 1400, title: 'Construct K Palindrome Strings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Odd Frequency Character Count Upper and Lower Bounds' },
  'circle-and-rectangle-overlapping': { number: 1401, title: 'Circle and Rectangle Overlapping', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Coordinate Clamping to Rectangle with Squared Distance Check' },
  'reducing-dishes': { number: 1402, title: 'Reducing Dishes', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Descending Satisfaction Greedy Prefix Accumulation' },
  'minimum-subsequence-in-non-increasing-order': { number: 1403, title: 'Minimum Subsequence in Non Increasing Order', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Descending Greedy Prefix Sum Exceeding Remainder' },
  'number-of-steps-to-reduce-a-number-in-binary-representation-to-one': { number: 1404, title: 'Number of Steps to Reduce a Number in Binary Representation to One', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Right-To-Left Binary Stream Simulation with Carry Tracking' },
  'longest-happy-string': { number: 1405, title: 'Longest Happy String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dominant Frequency Greedy Selection with Double Character Avoidance' },
  'stone-game-iii': { number: 1406, title: 'Stone Game III', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bottom-Up Minimax Score Differential Dynamic Programming' },
  'string-matching-in-an-array': { number: 1408, title: 'String Matching in an Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Exhaustive Pairwise Substring Containment Search' },
  'queries-on-a-permutation-with-key': { number: 1409, title: 'Queries on a Permutation with Key', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Linear Move-To-Front Permutation Query Simulation' },
  'html-entity-parser': { number: 1410, title: 'HTML Entity Parser', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single-Pass Non-Cascading Token Entity Replacement' },
  'number-of-ways-to-paint-n-3-grid': { number: 1411, title: 'Number of Ways to Paint N × 3 Grid', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Two-Pattern State Recurrence with Modular Transitions' },
  'minimum-value-to-get-positive-step-by-step-sum': { number: 1413, title: 'Minimum Value to Get Positive Step by Step Sum', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Running Prefix Sum Valley Inversion' },
  'find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k': { number: 1414, title: 'Find the Minimum Number of Fibonacci Numbers Whose Sum Is k', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Zeckendorf Greedy Largest Fibonacci Subtraction' },
  'the-k-th-lexicographical-string-of-all-happy-strings-of-length-n': { number: 1415, title: 'The k-th Lexicographical String of All Happy Strings of Length n', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Branch Size Mathematical Lexicographical Construction' },
  'restore-the-array': { number: 1416, title: 'Restore the Array', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Suffix Dynamic Programming with Bounded Integer Window' },
  'reformat-the-string': { number: 1417, title: 'Reformat the String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Letter and Digit Bipartition with Interleaved Reassembly' },
  'maximum-score-after-splitting-a-string': { number: 1422, title: 'Maximum Score After Splitting a String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-Pass Left Zero and Right One Running Score Maximization' },
  'maximum-points-you-can-obtain-from-cards': { number: 1423, title: 'Maximum Points You Can Obtain from Cards', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Complementary Sliding Window Minimum Subarray Sum' },
  'diagonal-traverse-ii': { number: 1424, title: 'Diagonal Traverse II', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Diagonal Index Grouping with Reverse Order Insertion' },
  'kids-with-the-greatest-number-of-candies': { number: 1431, title: 'Kids With the Greatest Number of Candies', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Maximum Element Comparison with Candy Offset' },
  'max-difference-you-can-get-from-changing-an-integer': { number: 1432, title: 'Max Difference You Can Get From Changing an Integer', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Digit Substitution for Extremal Values' },
  'check-if-a-string-can-break-another-string': { number: 1433, title: 'Check If a String Can Break Another String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted Character Order Pairwise Domination Check' },
  'destination-city': { number: 1436, title: 'Destination City', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Outgoing Edge Hash Set Complement Identification' },
  'check-if-all-1s-are-at-least-length-k-places-away': { number: 1437, title: 'Check If All 1\'s Are at Least Length K Places Away', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Consecutive Set Bit Index Distance Validation' },
  'longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit': { number: 1438, title: 'Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual Monotonic Deque Sliding Window Extremes' },
  'find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows': { number: 1439, title: 'Find the Kth Smallest Sum of a Matrix With Sorted Rows', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Row-by-Row Min-Heap Top-K Sum Accumulation' },
  'build-an-array-with-stack-operations': { number: 1441, title: 'Build an Array With Stack Operations', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Stream Target Matching with Push and Pop Simulation' },
  'count-triplets-that-can-form-two-arrays-of-equal-xor': { number: 1442, title: 'Count Triplets That Can Form Two Arrays of Equal XOR', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix XOR Equality Counting Over Subarray Spans' },
  'minimum-time-to-collect-all-apples-in-a-tree': { number: 1443, title: 'Minimum Time to Collect All Apples in a Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Postorder Tree DFS Apple Path Cost Accumulation' },
  'number-of-ways-of-cutting-a-pizza': { number: 1444, title: 'Number of Ways of Cutting a Pizza', difficulty: 'Hard', category: 'Algorithms', twist_type: '2D Suffix Apple Count with Memoized DP Partition' },
  'consecutive-characters': { number: 1446, title: 'Consecutive Characters', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single-Pass Consecutive Equal Character Run Counting' },
  'simplified-fractions': { number: 1447, title: 'Simplified Fractions', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pairwise GCD Coprimality Fraction Enumeration' },
  'count-good-nodes-in-binary-tree': { number: 1448, title: 'Count Good Nodes in Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Root-to-Node Preorder Traversal Tracking Path Maximum' },
  'form-largest-integer-with-digits-that-add-up-to-target': { number: 1449, title: 'Form Largest Integer With Digits That Add up to Target', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Unbounded Knapsack DP with Lexicographical String Maximization' },
  'number-of-students-doing-homework-at-a-given-time': { number: 1450, title: 'Number of Students Doing Homework at a Given Time', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Interval Interval Inclusion Query Point Counting' },
  'rearrange-words-in-a-sentence': { number: 1451, title: 'Rearrange Words in a Sentence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Stable Length Sort with Sentence Capitalization' },
  'people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list': { number: 1452, title: 'People Whose List of Favorite Companies Is Not a Subset of Another List', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bitset and Hash Set Subset Containment Verification' },
  'check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence': { number: 1455, title: 'Check If a Word Occurs As a Prefix of Any Word in a Sentence', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Tokenized String Prefix Matching with 1-Based Index' },
  'maximum-number-of-vowels-in-a-substring-of-given-length': { number: 1456, title: 'Maximum Number of Vowels in a Substring of Given Length', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Fixed-Length Sliding Window Vowel Count Maximization' },
  'pseudo-palindromic-paths-in-a-binary-tree': { number: 1457, title: 'Pseudo-Palindromic Paths in a Binary Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bitmask Parity Tracking in Root-to-Leaf Tree DFS' },
  'max-dot-product-of-two-subsequences': { number: 1458, title: 'Max Dot Product of Two Subsequences', difficulty: 'Hard', category: 'Algorithms', twist_type: '2D Non-Empty Subsequence Maximum Dot Product DP' },
  'make-two-arrays-equal-by-reversing-subarrays': { number: 1460, title: 'Make Two Arrays Equal by Reversing Subarrays', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Multiset Frequency Matching via Hash Map or Array Sort' },
  'check-if-a-string-contains-all-binary-codes-of-size-k': { number: 1461, title: 'Check If a String Contains All Binary Codes of Size K', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Rolling Hash Set Substring Diversity Verification' },
  'course-schedule-iv': { number: 1462, title: 'Course Schedule IV', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Floyd-Warshall Reachability Closure Over DAG' },
  'maximum-product-of-two-elements-in-an-array': { number: 1464, title: 'Maximum Product of Two Elements in an Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Top-Two Largest Values Single-Pass Tracking' },
  'maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts': { number: 1465, title: 'Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Maximum Consecutive Gap Product with Modulo Arithmetic' },
  'reorder-routes-to-make-all-paths-lead-to-the-city-zero': { number: 1466, title: 'Reorder Routes to Make All Paths Lead to the City Zero', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Outward Tree Traversal Counting Divergent Edges' },
  'shuffle-the-array': { number: 1470, title: 'Shuffle the Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Interleaved Two-Pointer Element Alternation' },
  'the-k-strongest-values-in-an-array': { number: 1471, title: 'The k Strongest Values in an Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Median Deviation Custom Comparator Sorting' },
  'paint-house-iii': { number: 1473, title: 'Paint House III', difficulty: 'Hard', category: 'Algorithms', twist_type: '3D State DP Tracking Houses, Neighborhoods, and Colors' },
  'find-two-non-overlapping-sub-arrays-each-with-target-sum': { number: 1477, title: 'Find Two Non-overlapping Sub-arrays Each With Target Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Sum Hash Map with Min-Length Left Suffix Tracking' },
  'allocate-mailboxes': { number: 1478, title: 'Allocate Mailboxes', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Precomputed Median Segment Costs with DP Partition' },
  'running-sum-of-1d-array': { number: 1480, title: 'Running Sum of 1d Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'In-Place Forward Running Prefix Accumulation' },
  'least-number-of-unique-integers-after-k-removals': { number: 1481, title: 'Least Number of Unique Integers after K Removals', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Ascending Frequency Greedy Elimination of Elements' },
  'minimum-number-of-days-to-make-m-bouquets': { number: 1482, title: 'Minimum Number of Days to Make m Bouquets', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search on Monotonic Answer with Adjacent Flower Check' },
  'xor-operation-in-an-array': { number: 1486, title: 'XOR Operation in an Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bitwise XOR Linear Sequence Accumulation' },
  'making-file-names-unique': { number: 1487, title: 'Making File Names Unique', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Amortized Suffix Index Counter Hash Table' },
  'avoid-flood-in-the-city': { number: 1488, title: 'Avoid Flood in The City', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Sunny Day Binary Search Matching Lake Rains' },
  'find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree': { number: 1489, title: 'Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Kruskal Baseline with Edge Exclusion and Forced Inclusion' },
  'average-salary-excluding-the-minimum-and-maximum-salary': { number: 1491, title: 'Average Salary Excluding the Minimum and Maximum Salary', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single-Pass Min-Max Reduction and Floating Average' },
  'the-kth-factor-of-n': { number: 1492, title: 'The kth Factor of n', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sequential Divisibility Verification with Early Exit' },
  'longest-subarray-of-1s-after-deleting-one-element': { number: 1493, title: 'Longest Subarray of 1\'s After Deleting One Element', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dynamic Sliding Window Constrained to Single Zero' },
  'parallel-courses-ii': { number: 1494, title: 'Parallel Courses II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitmask Dynamic Programming Over Independent Course Subsets' },
  'path-crossing': { number: 1496, title: 'Path Crossing', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Coordinate Hash Set Collision Verification' },
  'check-if-array-pairs-are-divisible-by-k': { number: 1497, title: 'Check If Array Pairs Are Divisible by k', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Modulo Remainder Complement Frequency Matching' },
  'number-of-subsequences-that-satisfy-the-given-sum-condition': { number: 1498, title: 'Number of Subsequences That Satisfy the Given Sum Condition', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sort and Two-Pointer Power-of-Two Subset Counting' },
  'max-value-of-equation': { number: 1499, title: 'Max Value of Equation', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Monotonic Deque Sliding Window Linear Optimization' },
  'can-make-arithmetic-progression-from-sequence': { number: 1502, title: 'Can Make Arithmetic Progression From Sequence', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Sort and Uniform Adjacent Difference Validation' },
  'last-moment-before-all-ants-fall-out-of-a-plank': { number: 1503, title: 'Last Moment Before All Ants Fall Out of a Plank', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Collision Invariance Reducing to Maximum Edge Distance' },
  'count-submatrices-with-all-ones': { number: 1504, title: 'Count Submatrices With All Ones', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Horizontal Consecutive Count Aggregation with Upward Column Scan' },
  'minimum-possible-integer-after-at-most-k-adjacent-swaps-on-digits': { number: 1505, title: 'Minimum Possible Integer After at Most K Adjacent Swaps On Digits', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy Digit Queue with Fenwick Displacement Offset' },
  'reformat-date': { number: 1507, title: 'Reformat Date', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Token Parsing and Zero-Padded ISO Date Assembly' },
  'range-sum-of-sorted-subarray-sums': { number: 1508, title: 'Range Sum of Sorted Subarray Sums', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Exhaustive Subarray Sum Generation and Segment Slice Summation' },
  'minimum-difference-between-largest-and-smallest-value-in-three-moves': { number: 1509, title: 'Minimum Difference Between Largest and Smallest Value in Three Moves', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Extreme Value Boundary Truncation Comparison' },
  'stone-game-iv': { number: 1510, title: 'Stone Game IV', difficulty: 'Hard', category: 'Algorithms', twist_type: '1D Dynamic Programming Transitions to Losing Opponent States' },
  'number-of-good-pairs': { number: 1512, title: 'Number of Good Pairs', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Frequency Counting with Combinations Formula c*(c-1)/2' },
  'number-of-substrings-with-only-1s': { number: 1513, title: 'Number of Substrings With Only 1s', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single-Pass Consecutive Run Length Streak Accumulation' },
  'path-with-maximum-probability': { number: 1514, title: 'Path with Maximum Probability', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dijkstra Multiplicative Path Probability Optimization with Max-Heap' },
  'water-bottles': { number: 1518, title: 'Water Bottles', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Consumption and Empty Bottle Exchange Simulation' },
  'number-of-nodes-in-the-sub-tree-with-the-same-label': { number: 1519, title: 'Number of Nodes in the Sub-Tree With the Same Label', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bottom-Up Postorder Frequency Vector Aggregation' },
  'maximum-number-of-non-overlapping-substrings': { number: 1520, title: 'Maximum Number of Non-Overlapping Substrings', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Self-Contained Character Interval Expansion with Earliest Finish Scheduling' },
  'find-a-value-of-a-mysterious-function-closest-to-target': { number: 1521, title: 'Find a Value of a Mysterious Function Closest to Target', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Rolling Monotonic Set of 30-Bit Bitwise AND Prefix Values' },
  'count-odd-numbers-in-an-interval-range': { number: 1523, title: 'Count Odd Numbers in an Interval Range', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Closed-Form Interval Parity Prefix Subtraction' },
  'number-of-sub-arrays-with-odd-sum': { number: 1524, title: 'Number of Sub-arrays With Odd Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix Sum Parity Frequency Difference Tracking' },
  'number-of-good-ways-to-split-a-string': { number: 1525, title: 'Number of Good Ways to Split a String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix and Suffix Distinct Character Count Equivalence' },
  'minimum-number-of-increments-on-subarrays-to-form-a-target-array': { number: 1526, title: 'Minimum Number of Increments on Subarrays to Form a Target Array', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy Adjacent Profile Elevation Counting' },
  'shuffle-string': { number: 1528, title: 'Shuffle String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Direct Target Index Coordinate Mapping Placement' },
  'minimum-suffix-flips': { number: 1529, title: 'Minimum Suffix Flips', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Left-to-Right State Parity Flip Counter' },
  'number-of-good-leaf-nodes-pairs': { number: 1530, title: 'Number of Good Leaf Nodes Pairs', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Postorder Leaf Distance Collection with LCA Pair Counting' },
  'string-compression-ii': { number: 1531, title: 'String Compression II', difficulty: 'Hard', category: 'Algorithms', twist_type: '2D DP with Selective Deletion and Compressed Chunk Anchoring' },
  'count-good-triplets': { number: 1534, title: 'Count Good Triplets', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Exhaustive Triplet Verification with Intermediate Early Pruning' },
  'find-the-winner-of-an-array-game': { number: 1535, title: 'Find the Winner of an Array Game', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Linear Pass Current Winner and Consecutive Win Streak Tracking' },
  'minimum-swaps-to-arrange-a-binary-grid': { number: 1536, title: 'Minimum Swaps to Arrange a Binary Grid', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Trailing Zero Target Extraction with Greedy Inversion Bubbling' },
  'get-the-maximum-score': { number: 1537, title: 'Get the Maximum Score', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Two-Pointer Merge Synchronizing Maximum Path Sums at Shared Intersections' },
  'kth-missing-positive-number': { number: 1539, title: 'Kth Missing Positive Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Binary Search on Monotonic Missing Count Relation' },
  'can-convert-string-in-k-moves': { number: 1540, title: 'Can Convert String in K Moves', difficulty: 'Medium', category: 'Algorithms', twist_type: '26-Modular Shift Frequency Bounding Formula' },
  'minimum-insertions-to-balance-a-parentheses-string': { number: 1541, title: 'Minimum Insertions to Balance a Parentheses String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Lookahead Parsing with Unmatched Open and Double Close Balancing' },
  'find-longest-awesome-substring': { number: 1542, title: 'Find Longest Awesome Substring', difficulty: 'Hard', category: 'Algorithms', twist_type: '10-Bit Prefix Parity Mask Tracking for Palindrome Rearrangement' },
  'find-kth-bit-in-nth-binary-string': { number: 1545, title: 'Find Kth Bit in Nth Binary String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Recursive Midpoint Symmetry with Bit Inversion' },
  'maximum-number-of-non-overlapping-subarrays-with-sum-equals-target': { number: 1546, title: 'Maximum Number of Non-Overlapping Subarrays With Sum Equals Target', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy Earliest Prefix Sum Target Detection with State Reset' },
  'minimum-cost-to-cut-a-stick': { number: 1547, title: 'Minimum Cost to Cut a Stick', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Interval Dynamic Programming Over Augmented Cut Boundaries' },
  'three-consecutive-odds': { number: 1550, title: 'Three Consecutive Odds', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single-Pass Three-Element Odd Parity Window Verification' },
  'minimum-operations-to-make-array-equal': { number: 1551, title: 'Minimum Operations to Make Array Equal', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Closed-Form Symmetric Displacement Formula n*n//4' },
  'magnetic-force-between-two-balls': { number: 1552, title: 'Magnetic Force Between Two Balls', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary Search on Feasible Distance with Greedy Placement Oracle' },
  'minimum-number-of-days-to-eat-n-oranges': { number: 1553, title: 'Minimum Number of Days to Eat N Oranges', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sparse Memoized Logarithmic Division DP' },
  'thousand-separator': { number: 1556, title: 'Thousand Separator', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Right-to-Left Triplet Grouping with Dot Insertion' },
  'minimum-number-of-vertices-to-reach-all-nodes': { number: 1557, title: 'Minimum Number of Vertices to Reach All Nodes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'DAG In-Degree Zero Node Filter' },
  'minimum-numbers-of-function-calls-to-make-target-array': { number: 1558, title: 'Minimum Numbers of Function Calls to Make Target Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Total Set Bits Plus Maximum Bit Length Stride' },
  'detect-cycles-in-2d-grid': { number: 1559, title: 'Detect Cycles in 2D Grid', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Parent-Tracked DFS Flood Fill Cycle Detection' },
  'most-visited-sector-in-a-circular-track': { number: 1560, title: 'Most Visited Sector in  a Circular Track', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Circular Loop Cancellation Extracting Net Interval' },
  'maximum-number-of-coins-you-can-get': { number: 1561, title: 'Maximum Number of Coins You Can Get', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Descending Sort Triplet Allocation Reserving Smallest for Bob' },
  'find-latest-group-of-size-m': { number: 1562, title: 'Find Latest Group of Size M', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Segment Boundary Length Tracking with Dynamic Size-M Counter' },
  'stone-game-v': { number: 1563, title: 'Stone Game V', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Interval DP Maximizing Retained Segment with Range Sum Checks' },
  'detect-pattern-of-length-m-repeated-k-or-more-times': { number: 1566, title: 'Detect Pattern of Length M Repeated K or More Times', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Adjacent Stride Matching for Consecutive Pattern Repetitions' },
  'maximum-length-of-subarray-with-positive-product': { number: 1567, title: 'Maximum Length of Subarray With Positive Product', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Kadane Sign Tracking for Positive and Negative Subarray Products' },
  'matrix-diagonal-sum': { number: 1572, title: 'Matrix Diagonal Sum', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single-Loop Dual Diagonal Summation with Odd Center Deduplication' },
  'number-of-ways-to-split-a-string': { number: 1573, title: 'Number of Ways to Split a String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Combinatorial Multiplication of Zero Gaps Between Equal One Thirds' },
  'shortest-subarray-to-be-removed-to-make-array-sorted': { number: 1574, title: 'Shortest Subarray to be Removed to Make Array Sorted', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix and suffix monotonicity bounds with two-pointer merging' },
  'count-all-possible-routes': { number: 1575, title: 'Count All Possible Routes', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Memoized dynamic programming over (city, fuel) states' },
  'replace-all-s-to-avoid-consecutive-repeating-characters': { number: 1576, title: 'Replace All ?\'s to Avoid Consecutive Repeating Characters', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy pigeonhole candidate testing using letters a, b, c' },
  'number-of-ways-where-square-of-number-is-equal-to-product-of-two-numbers': { number: 1577, title: 'Number of Ways Where Square of Number Is Equal to Product of Two Numbers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pairwise product hash map counting matching squared elements' },
  'minimum-time-to-make-rope-colorful': { number: 1578, title: 'Minimum Time to Make Rope Colorful', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy block aggregation retaining maximum time per contiguous color group' },
  'remove-max-number-of-edges-to-keep-graph-fully-traversable': { number: 1579, title: 'Remove Max Number of Edges to Keep Graph Fully Traversable', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dual DSU prioritizing shared Type 3 edges before Type 1 and Type 2 edges' },
  'special-positions-in-a-binary-matrix': { number: 1582, title: 'Special Positions in a Binary Matrix', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Row and column sum vectors precalculation for O(1) special cell verification' },
  'count-unhappy-friends': { number: 1583, title: 'Count Unhappy Friends', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Rank matrix lookup and cross-pair mutual preference verification' },
  'check-if-string-is-transformable-with-substring-sort-operations': { number: 1585, title: 'Check If String Is Transformable With Substring Sort Operations', difficulty: 'Hard', category: 'Algorithms', twist_type: '10-digit ordered queues tracking smaller digit left-inversion blocking' },
  'sum-of-all-odd-length-subarrays': { number: 1588, title: 'Sum of All Odd Length Subarrays', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Combinatorial frequency counting of element appearances in odd subarrays' },
  'maximum-sum-obtained-of-any-permutation': { number: 1589, title: 'Maximum Sum Obtained of Any Permutation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Difference array frequency accumulation with rearrangement inequality sorting' },
  'make-sum-divisible-by-p': { number: 1590, title: 'Make Sum Divisible by P', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix sum modular remainder tracking with shortest interval minimization' },
  'strange-printer-ii': { number: 1591, title: 'Strange Printer II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Color bounding boxes with Kahn topological sort' },
  'rearrange-spaces-between-words': { number: 1592, title: 'Rearrange Spaces Between Words', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Count total spaces and integer division distribution' },
  'split-a-string-into-the-max-number-of-unique-substrings': { number: 1593, title: 'Split a String Into the Max Number of Unique Substrings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Backtracking with visited substrings set' },
  'maximum-non-negative-product-in-a-matrix': { number: 1594, title: 'Maximum Non Negative Product in a Matrix', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual min-max grid dynamic programming' },
  'minimum-cost-to-connect-two-groups-of-points': { number: 1595, title: 'Minimum Cost to Connect Two Groups of Points', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitmask dynamic programming with greedy base case' },
  'crawler-log-folder': { number: 1598, title: 'Crawler Log Folder', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Bounded integer depth simulation' },
  'maximum-profit-of-operating-a-centennial-wheel': { number: 1599, title: 'Maximum Profit of Operating a Centennial Wheel', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Simulation of wheel rotations and customer queue' },
  'maximum-number-of-achievable-transfer-requests': { number: 1601, title: 'Maximum Number of Achievable Transfer Requests', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitmask power set validation' },
  'alert-using-same-key-card-three-or-more-times-in-a-one-hour-period': { number: 1604, title: 'Alert Using Same Key-Card Three or More Times in a One Hour Period', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Group minutes by person and check 3-entry window' },
  'find-valid-matrix-given-row-and-column-sums': { number: 1605, title: 'Find Valid Matrix Given Row and Column Sums', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy minimum capacity assignment' },
  'find-servers-that-handled-most-number-of-requests': { number: 1606, title: 'Find Servers That Handled Most Number of Requests', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Min-heap for busy servers and bisect on available list' },
  'special-array-with-x-elements-greater-than-or-equal-x': { number: 1608, title: 'Special Array With X Elements Greater Than or Equal X', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Reverse sort boundary inspection' },
  'even-odd-tree': { number: 1609, title: 'Even Odd Tree', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Breadth first search level order traversal with parity and monotonicity checks' },
  'maximum-number-of-visible-points': { number: 1610, title: 'Maximum Number of Visible Points', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Polar angle conversion with circular sliding window' },
  'minimum-one-bit-operations-to-make-integers-zero': { number: 1611, title: 'Minimum One Bit Operations to Make Integers Zero', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Inverse Gray code bitwise reduction' },
  'maximal-network-rank': { number: 1615, title: 'Maximal Network Rank', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Degree count with adjacency matrix check' },
  'split-two-strings-to-make-palindrome': { number: 1616, title: 'Split Two Strings to Make Palindrome', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two pointer inward scan with middle palindrome validation' },
  'count-subtrees-with-max-distance-between-cities': { number: 1617, title: 'Count Subtrees With Max Distance Between Cities', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitmask subset enumeration with tree connectivity verification' },
  'mean-of-array-after-removing-some-elements': { number: 1619, title: 'Mean of Array After Removing Some Elements', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Sort and slice 5 percent extremes' },
  'coordinate-with-maximum-network-quality': { number: 1620, title: 'Coordinate With Maximum Network Quality', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Grid search over all integer coordinates' },
  'number-of-sets-of-k-non-overlapping-line-segments': { number: 1621, title: 'Number of Sets of K Non-Overlapping Line Segments', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Combinatorial binomial coefficient mapping' },
  'largest-substring-between-two-equal-characters': { number: 1624, title: 'Largest Substring Between Two Equal Characters', difficulty: 'Easy', category: 'Algorithms', twist_type: 'First appearance index tracking' },
  'lexicographically-smallest-string-after-applying-operations': { number: 1625, title: 'Lexicographically Smallest String After Applying Operations', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Breadth-first search over reachable string configurations' },
  'best-team-with-no-conflicts': { number: 1626, title: 'Best Team With No Conflicts', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sort by age then score with quadratic maximum sum subsequence dynamic programming' },
  'graph-connectivity-with-threshold': { number: 1627, title: 'Graph Connectivity With Threshold', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sieve multiple connections with Disjoint Set Union' },
  'slowest-key': { number: 1629, title: 'Slowest Key', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Linear pass tracking maximum duration and tie-break' },
  'arithmetic-subarrays': { number: 1630, title: 'Arithmetic Subarrays', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Slice, sort, and verify adjacent differences' },
  'path-with-minimum-effort': { number: 1631, title: 'Path With Minimum Effort', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dijkstra priority queue for minimax edge effort' },
  'rank-transform-of-a-matrix': { number: 1632, title: 'Rank Transform of a Matrix', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Value grouping with DSU on row and column indices' },
  'sort-array-by-increasing-frequency': { number: 1636, title: 'Sort Array by Increasing Frequency', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Frequency hash map with compound sort key' },
  'widest-vertical-area-between-two-points-containing-no-points': { number: 1637, title: 'Widest Vertical Area Between Two Points Containing No Points', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Sort x coordinates and find maximum adjacent gap' },
  'count-substrings-that-differ-by-one-character': { number: 1638, title: 'Count Substrings That Differ by One Character', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pairwise starting index extension with mismatch counter' },
  'number-of-ways-to-form-a-target-string-given-a-dictionary': { number: 1639, title: 'Number of Ways to Form a Target String Given a Dictionary', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Column frequency precomputation with 1D dynamic programming' },
  'check-array-formation-through-concatenation': { number: 1640, title: 'Check Array Formation Through Concatenation', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Hash map lookup on piece leading elements' },
  'count-sorted-vowel-strings': { number: 1641, title: 'Count Sorted Vowel Strings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Combinatorial closed form stars and bars' },
  'furthest-building-you-can-reach': { number: 1642, title: 'Furthest Building You Can Reach', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Min-heap tracking top jumps for ladders and brick substitution' },
  'kth-smallest-instructions': { number: 1643, title: 'Kth Smallest Instructions', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Combinatorial path counting digit by digit' },
  'get-maximum-in-generated-array': { number: 1646, title: 'Get Maximum in Generated Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Direct recurrence generation in linear array' },
  'minimum-deletions-to-make-character-frequencies-unique': { number: 1647, title: 'Minimum Deletions to Make Character Frequencies Unique', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy frequency reduction with hash set' },
  'sell-diminishing-valued-colored-balls': { number: 1648, title: 'Sell Diminishing-Valued Colored Balls', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary search on ball price threshold with arithmetic series summation' },
  'create-sorted-array-through-instructions': { number: 1649, title: 'Create Sorted Array through Instructions', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Binary Indexed Tree dynamic prefix queries' },
  'defuse-the-bomb': { number: 1652, title: 'Defuse the Bomb', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Circular sliding window summation' },
  'minimum-deletions-to-make-string-balanced': { number: 1653, title: 'Minimum Deletions to Make String Balanced', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single-pass dynamic programming tracking b count' },
  'minimum-jumps-to-reach-home': { number: 1654, title: 'Minimum Jumps to Reach Home', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Breadth-first search with upper bounded coordinate space' },
  'distribute-repeating-integers': { number: 1655, title: 'Distribute Repeating Integers', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Descending quantity allocation with frequency backtracking' },
  'determine-if-two-strings-are-close': { number: 1657, title: 'Determine if Two Strings Are Close', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Character set and sorted frequency distribution comparison' },
  'minimum-operations-to-reduce-x-to-zero': { number: 1658, title: 'Minimum Operations to Reduce X to Zero', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Inverted sliding window for target sum' },
  'maximize-grid-happiness': { number: 1659, title: 'Maximize Grid Happiness', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Profile dynamic programming with ternary state memoization' },
  'check-if-two-string-arrays-are-equivalent': { number: 1662, title: 'Check If Two String Arrays are Equivalent', difficulty: 'Easy', category: 'Algorithms', twist_type: 'String join equality check' },
  'smallest-string-with-a-given-numeric-value': { number: 1663, title: 'Smallest String With A Given Numeric Value', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy right-to-left excess absorption' },
  'ways-to-make-a-fair-array': { number: 1664, title: 'Ways to Make a Fair Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Running prefix and suffix parity sum maintenance' },
  'minimum-initial-energy-to-finish-tasks': { number: 1665, title: 'Minimum Initial Energy to Finish Tasks', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy ordering by descending minimum minus actual energy difference' },
  'maximum-repeating-substring': { number: 1668, title: 'Maximum Repeating Substring', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Iterative string multiplication check' },
  'merge-in-between-linked-lists': { number: 1669, title: 'Merge In Between Linked Lists', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pointer rewiring at boundary indices' },
  'minimum-number-of-removals-to-make-mountain-array': { number: 1671, title: 'Minimum Number of Removals to Make Mountain Array', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dual LIS using binary search and peak maximization' },
  'richest-customer-wealth': { number: 1672, title: 'Richest Customer Wealth', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Row summation and maximum extraction' },
  'find-the-most-competitive-subsequence': { number: 1673, title: 'Find the Most Competitive Subsequence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Monotonic stack with remaining capacity boundary check' },
  'minimum-moves-to-make-array-complementary': { number: 1674, title: 'Minimum Moves to Make Array Complementary', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Difference array event tracking over feasible target sums' },
  'minimize-deviation-in-array': { number: 1675, title: 'Minimize Deviation in Array', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Max-heap with initial odd doubling and iterative halving' },
  'goal-parser-interpretation': { number: 1678, title: 'Goal Parser Interpretation', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single-pass string parsing' },
  'max-number-of-k-sum-pairs': { number: 1679, title: 'Max Number of K-Sum Pairs', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sort with two-pointer opposite convergence' },
  'concatenation-of-consecutive-binary-numbers': { number: 1680, title: 'Concatenation of Consecutive Binary Numbers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bit shift accumulation with power of two bit length tracking' },
  'minimum-incompatibility': { number: 1681, title: 'Minimum Incompatibility', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitmask DP with valid subset precomputation' },
  'count-the-number-of-consistent-strings': { number: 1684, title: 'Count the Number of Consistent Strings', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Character set containment check' },
  'sum-of-absolute-differences-in-a-sorted-array': { number: 1685, title: 'Sum of Absolute Differences in a Sorted Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix and suffix algebraic sum decomposition' },
  'stone-game-vi': { number: 1686, title: 'Stone Game VI', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy sorting by combined stone value sum' },
  'delivering-boxes-from-storage-to-ports': { number: 1687, title: 'Delivering Boxes from Storage to Ports', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sliding window dynamic programming on port transition differences' },
  'count-of-matches-in-tournament': { number: 1688, title: 'Count of Matches in Tournament', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single elimination match count formula n - 1' },
  'partitioning-into-minimum-number-of-deci-binary-numbers': { number: 1689, title: 'Partitioning Into Minimum Number Of Deci-Binary Numbers', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Maximum digit extraction' },
  'stone-game-vii': { number: 1690, title: 'Stone Game VII', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Interval dynamic programming with prefix range sum queries' },
  'maximum-height-by-stacking-cuboids': { number: 1691, title: 'Maximum Height by Stacking Cuboids', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Dimension sorting with quadratic weighted LIS dynamic programming' },
  'reformat-phone-number': { number: 1694, title: 'Reformat Phone Number', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Filter digits and group into chunks of 3 and 2' },
  'maximum-erasure-value': { number: 1695, title: 'Maximum Erasure Value', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two pointer sliding window with unique elements set' },
  'checking-existence-of-edge-length-limited-paths': { number: 1697, title: 'Checking Existence of Edge Length Limited Paths', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Offline query sorting with incremental DSU edge insertion' },
  'number-of-students-unable-to-eat-lunch': { number: 1700, title: 'Number of Students Unable to Eat Lunch', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Student preference counting against sandwich stack' },
  'average-waiting-time': { number: 1701, title: 'Average Waiting Time', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Event-driven idle time progression' },
  'maximum-binary-string-after-change': { number: 1702, title: 'Maximum Binary String After Change', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy zero counting and direct reconstruction' },
  'minimum-adjacent-swaps-for-k-consecutive-ones': { number: 1703, title: 'Minimum Adjacent Swaps for K Consecutive Ones', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Index shift transformation with median prefix sums' },
  'determine-if-string-halves-are-alike': { number: 1704, title: 'Determine if String Halves Are Alike', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Two-half vowel counter comparison' },
  'maximum-number-of-eaten-apples': { number: 1705, title: 'Maximum Number of Eaten Apples', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy earliest deadline first with min-heap' },
  'where-will-the-ball-fall': { number: 1706, title: 'Where Will the Ball Fall', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Simulation of individual ball trajectories' },
  'maximum-xor-with-an-element-from-array': { number: 1707, title: 'Maximum XOR With an Element From Array', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Offline query processing with binary bitwise prefix tree' },
  'maximum-units-on-a-truck': { number: 1710, title: 'Maximum Units on a Truck', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy selection sorted by units per box descending' },
  'count-good-meals': { number: 1711, title: 'Count Good Meals', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bounded power of two complement lookup with frequency map' },
  'ways-to-split-array-into-three-subarrays': { number: 1712, title: 'Ways to Split Array Into Three Subarrays', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix sum inequalities with binary search bounds' },
  'minimum-operations-to-make-a-subsequence': { number: 1713, title: 'Minimum Operations to Make a Subsequence', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Index mapping reduction to patience sorting LIS' },
  'calculate-money-in-leetcode-bank': { number: 1716, title: 'Calculate Money in LeetCode Bank', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Arithmetic progression closed form formula' },
  'maximum-score-from-removing-substrings': { number: 1717, title: 'Maximum Score From Removing Substrings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-pass greedy stack removal' },
  'construct-the-lexicographically-largest-valid-sequence': { number: 1718, title: 'Construct the Lexicographically Largest Valid Sequence', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Descending value backtracking with distance placement' },
  'decode-xored-array': { number: 1720, title: 'Decode XORed Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Prefix bitwise XOR sequential reconstruction' },
  'minimize-hamming-distance-after-swap-operations': { number: 1722, title: 'Minimize Hamming Distance After Swap Operations', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Union-find component grouping with multiset frequency intersection' },
  'find-minimum-time-to-finish-all-jobs': { number: 1723, title: 'Find Minimum Time to Finish All Jobs', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Backtracking with descending job sort and symmetry breaking' },
  'number-of-rectangles-that-can-form-the-largest-square': { number: 1725, title: 'Number Of Rectangles That Can Form The Largest Square', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single-pass maximum side tracking and count reset' },
  'tuple-with-same-product': { number: 1726, title: 'Tuple with Same Product', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pair product frequency mapping with combinatorial multiplication' },
  'largest-submatrix-with-rearrangements': { number: 1727, title: 'Largest Submatrix With Rearrangements', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Vertical consecutive ones accumulation with row height sorting' },
  'shortest-path-to-get-food': { number: 1730, title: 'Shortest Path to Get Food', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Breadth-first search from starting cell to nearest food cell' },
  'find-the-highest-altitude': { number: 1732, title: 'Find the Highest Altitude', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Running prefix sum maximum tracking' },
  'minimum-number-of-people-to-teach': { number: 1733, title: 'Minimum Number of People to Teach', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Disconnected friendship user collection and optimal language selection' },
  'decode-xored-permutation': { number: 1734, title: 'Decode XORed Permutation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Total XOR cancellation with odd-index encoded summation' },
  'latest-time-by-replacing-hidden-digits': { number: 1736, title: 'Latest Time by Replacing Hidden Digits', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy maximum digit replacement per clock position' },
  'change-minimum-characters-to-satisfy-one-of-three-conditions': { number: 1737, title: 'Change Minimum Characters to Satisfy One of Three Conditions', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Alphabet frequency prefix sums for three boundary conditions' },
  'find-kth-largest-xor-coordinate-value': { number: 1738, title: 'Find Kth Largest XOR Coordinate Value', difficulty: 'Medium', category: 'Algorithms', twist_type: '2D prefix XOR computation followed by value sorting' },
  'building-boxes': { number: 1739, title: 'Building Boxes', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Tetrahedral pyramid capacity search with triangular increments' },
  'maximum-number-of-balls-in-a-box': { number: 1742, title: 'Maximum Number of Balls in a Box', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Digit sum bucket counting' },
  'restore-the-array-from-adjacent-pairs': { number: 1743, title: 'Restore the Array From Adjacent Pairs', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Graph degree endpoint identification and linear path traversal' },
  'can-you-eat-your-favorite-candy-on-your-favorite-day': { number: 1744, title: 'Can You Eat Your Favorite Candy on Your Favorite Day?', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix sum candy interval overlap testing' },
  'palindrome-partitioning-iv': { number: 1745, title: 'Palindrome Partitioning IV', difficulty: 'Hard', category: 'Algorithms', twist_type: '2D palindrome dynamic programming precomputation and dual cut enumeration' },
  'maximum-subarray-sum-after-one-operation': { number: 1746, title: 'Maximum Subarray Sum After One Operation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-state Kadane dynamic programming' },
  'sum-of-unique-elements': { number: 1748, title: 'Sum of Unique Elements', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Frequency map tally of single-occurrence elements' },
  'minimum-length-of-string-after-deleting-similar-ends': { number: 1750, title: 'Minimum Length of String After Deleting Similar Ends', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Two-pointer opposite inward contraction' },
  'maximum-number-of-events-that-can-be-attended-ii': { number: 1751, title: 'Maximum Number of Events That Can Be Attended II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'End-time sorted 2D dynamic programming with binary search predecessor lookup' },
  'check-if-array-is-sorted-and-rotated': { number: 1752, title: 'Check if Array Is Sorted and Rotated', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Circular drop count evaluation' },
  'maximum-score-from-removing-stones': { number: 1753, title: 'Maximum Score From Removing Stones', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dominant pile closed-form mathematical bound' },
  'largest-merge-of-two-strings': { number: 1754, title: 'Largest Merge of Two Strings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy suffix comparison and leading character selection' },
  'closest-subsequence-sum': { number: 1755, title: 'Closest Subsequence Sum', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Meet-in-the-middle subset generation with binary search' },
  'minimum-changes-to-make-alternating-binary-string': { number: 1758, title: 'Minimum Changes To Make Alternating Binary String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single pass parity mismatch counting' },
  'count-number-of-homogenous-substrings': { number: 1759, title: 'Count Number of Homogenous Substrings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Running streak length incremental summation modulo 10^9 + 7' },
  'minimum-limit-of-balls-in-a-bag': { number: 1760, title: 'Minimum Limit of Balls in a Bag', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary search on monotonic bag size threshold' },
  'minimum-degree-of-a-connected-trio-in-a-graph': { number: 1761, title: 'Minimum Degree of a Connected Trio in a Graph', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Adjacency matrix edge-based connected trio enumeration' },
  'buildings-with-an-ocean-view': { number: 1762, title: 'Buildings With an Ocean View', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Right-to-left maximum height suffix scan' },
  'longest-nice-substring': { number: 1763, title: 'Longest Nice Substring', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Divide and conquer splitting around unpaired case characters' },
  'form-array-by-concatenating-subarrays-of-another-array': { number: 1764, title: 'Form Array by Concatenating Subarrays of Another Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy sequential subarray subsegment matching' },
  'map-of-highest-peak': { number: 1765, title: 'Map of Highest Peak', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Multi-source breadth-first search height assignment' },
  'merge-strings-alternately': { number: 1768, title: 'Merge Strings Alternately', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Alternating index character accumulation' },
  'minimum-number-of-operations-to-move-all-balls-to-each-box': { number: 1769, title: 'Minimum Number of Operations to Move All Balls to Each Box', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix and suffix running distance sweep' },
  'maximum-score-from-performing-multiplication-operations': { number: 1770, title: 'Maximum Score from Performing Multiplication Operations', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bottom-up dynamic programming over operation steps and left selections' },
  'maximize-palindrome-length-from-subsequences': { number: 1771, title: 'Maximize Palindrome Length From Subsequences', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Combined longest palindromic subsequence DP with boundary crossing verification' },
  'sort-features-by-popularity': { number: 1772, title: 'Sort Features by Popularity', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Unique response word frequency hashing and stable sorting' },
  'count-items-matching-a-rule': { number: 1773, title: 'Count Items Matching a Rule', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Attribute index mapping and linear matching filter' },
  'closest-dessert-cost': { number: 1774, title: 'Closest Dessert Cost', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Backtracking search over ternary topping selections' },
  'equal-sum-arrays-with-minimum-number-of-operations': { number: 1775, title: 'Equal Sum Arrays With Minimum Number of Operations', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy bucketed maximum gain selection' },
  'car-fleet-ii': { number: 1776, title: 'Car Fleet II', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Right-to-left monotonic stack collision analysis' },
  'find-nearest-point-that-has-the-same-x-or-y-coordinate': { number: 1779, title: 'Find Nearest Point That Has the Same X or Y Coordinate', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Linear scan tracking minimum Manhattan distance' },
  'check-if-number-is-a-sum-of-powers-of-three': { number: 1780, title: 'Check if Number is a Sum of Powers of Three', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Base 3 digit inspection' },
  'sum-of-beauty-of-all-substrings': { number: 1781, title: 'Sum of Beauty of All Substrings', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Incremental 26-element character frequency array' },
  'count-pairs-of-nodes': { number: 1782, title: 'Count Pairs of Nodes', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sorted degree two-pointer sweep with shared edge correction' },
  'check-if-binary-string-has-at-most-one-segment-of-ones': { number: 1784, title: 'Check if Binary String Has at Most One Segment of Ones', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Discontinuous segment transition detection' },
  'minimum-elements-to-add-to-form-a-given-sum': { number: 1785, title: 'Minimum Elements to Add to Form a Given Sum', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Closed-form ceiling division on 64-bit absolute sum difference' },
  'number-of-restricted-paths-from-first-to-last-node': { number: 1786, title: 'Number of Restricted Paths From First to Last Node', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dijkstra shortest path with memoized DAG path counting' },
  'maximize-the-beauty-of-the-garden': { number: 1788, title: 'Maximize the Beauty of the Garden', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Positive prefix sums with first occurrence boundary hashing' },
  'check-if-one-string-swap-can-make-strings-equal': { number: 1790, title: 'Check if One String Swap Can Make Strings Equal', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Mismatched index parity check and crossed character comparison' },
  'find-center-of-star-graph': { number: 1791, title: 'Find Center of Star Graph', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Common node intersection between first two star edges' },
  'maximum-average-pass-ratio': { number: 1792, title: 'Maximum Average Pass Ratio', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Max-heap on incremental pass ratio gain per student' },
  'maximum-score-of-a-good-subarray': { number: 1793, title: 'Maximum Score of a Good Subarray', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Monotonic two-pointer expansion from k maximizing minimum value' },
  'count-pairs-of-equal-substrings-with-minimum-difference': { number: 1794, title: 'Count Pairs of Equal Substrings With Minimum Difference', difficulty: 'Medium', category: 'Algorithms', twist_type: 'First occurrence of a and last occurrence of b index difference' },
  'second-largest-digit-in-a-string': { number: 1796, title: 'Second Largest Digit in a String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Tracking top two distinct numerical digits' },
  'maximum-number-of-consecutive-values-you-can-make': { number: 1798, title: 'Maximum Number of Consecutive Values You Can Make', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy reachability interval extension on sorted coins' },
  'maximize-score-after-n-operations': { number: 1799, title: 'Maximize Score After N Operations', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bitmask dynamic programming with memoized gcd pairing' },
  'maximum-ascending-subarray-sum': { number: 1800, title: 'Maximum Ascending Subarray Sum', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Running accumulator with reset on non-ascending steps' },
  'number-of-orders-in-the-backlog': { number: 1801, title: 'Number of Orders in the Backlog', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual priority queues for matching buy and sell order prices' },
  'maximum-value-at-a-given-index-in-a-bounded-array': { number: 1802, title: 'Maximum Value at a Given Index in a Bounded Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary search over peak value with arithmetic progression sum' },
  'count-pairs-with-xor-in-a-range': { number: 1803, title: 'Count Pairs With XOR in a Range', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Binary 0-1 trie with prefix range subtraction' },
  'number-of-different-integers-in-a-string': { number: 1805, title: 'Number of Different Integers in a String', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Delimiter transformation with stripped leading zeros set' },
  'minimum-number-of-operations-to-reinitialize-a-permutation': { number: 1806, title: 'Minimum Number of Operations to Reinitialize a Permutation', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Tracking index 1 modular cycle doubling' },
  'evaluate-the-bracket-pairs-of-a-string': { number: 1807, title: 'Evaluate the Bracket Pairs of a String', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single-pass bracket parser with hash map lookup' },
  'maximize-number-of-nice-divisors': { number: 1808, title: 'Maximize Number of Nice Divisors', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Partitioning into factors of 3 with modular exponentiation' },
  'determine-color-of-a-chessboard-square': { number: 1812, title: 'Determine Color of a Chessboard Square', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Character offset parity evaluation' },
  'sentence-similarity-iii': { number: 1813, title: 'Sentence Similarity III', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Dual end word array matching with two pointers' },
  'count-nice-pairs-in-an-array': { number: 1814, title: 'Count Nice Pairs in an Array', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Algebraic difference grouping with frequency combinations' },
  'maximum-number-of-groups-getting-fresh-donuts': { number: 1815, title: 'Maximum Number of Groups Getting Fresh Donuts', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Greedy remainder pairing with memoized frequency state search' },
  'truncate-sentence': { number: 1816, title: 'Truncate Sentence', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Word splitting and array slicing' },
  'finding-the-users-active-minutes': { number: 1817, title: 'Finding the Users Active Minutes', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Hash map of sets with frequency bucket collection' },
  'minimum-absolute-sum-difference': { number: 1818, title: 'Minimum Absolute Sum Difference', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Binary search over sorted array for nearest element' },
  'number-of-different-subsequences-gcds': { number: 1819, title: 'Number of Different Subsequences GCDs', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Harmonic series traversal checking gcd of present multiples' },
  'maximum-number-of-accepted-invitations': { number: 1820, title: 'Maximum Number of Accepted Invitations', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Bipartite maximum matching via augmenting path DFS' },
  'sign-of-the-product-of-an-array': { number: 1822, title: 'Sign of the Product of an Array', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Negative count parity and zero detection' },
  'find-the-winner-of-the-circular-game': { number: 1823, title: 'Find the Winner of the Circular Game', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Iterative Josephus recurrence' },
  'minimum-sideway-jumps': { number: 1824, title: 'Minimum Sideway Jumps', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Rolling 3-lane dynamic programming with obstacle invalidation' },
  'minimum-operations-to-make-the-array-increasing': { number: 1827, title: 'Minimum Operations to Make the Array Increasing', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Greedy linear pass with target increment' },
  'queries-on-number-of-points-inside-a-circle': { number: 1828, title: 'Queries on Number of Points Inside a Circle', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Pairwise squared Euclidean distance evaluation' },
  'maximum-xor-for-each-query': { number: 1829, title: 'Maximum XOR for Each Query', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Rolling prefix exclusive-or with bit mask inversion' },
  'minimum-number-of-operations-to-make-string-sorted': { number: 1830, title: 'Minimum Number of Operations to Make String Sorted', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Multiset lexicographical permutation rank with modular inverse' },
  'check-if-the-sentence-is-pangram': { number: 1832, title: 'Check if the Sentence Is Pangram', difficulty: 'Easy', category: 'Algorithms', twist_type: '26-letter bitmask or set cardinality check' },
  'maximum-ice-cream-bars': { number: 1833, title: 'Maximum Ice Cream Bars', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Greedy purchasing on sorted costs' },
  'single-threaded-cpu': { number: 1834, title: 'Single-Threaded CPU', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Min-heap priority scheduler with arrival sorting' },
  'find-xor-sum-of-all-pairs-bitwise-and': { number: 1835, title: 'Find XOR Sum of All Pairs Bitwise AND', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Distributive property of AND over XOR with cumulative reductions' },
  'sum-of-digits-in-base-k': { number: 1837, title: 'Sum of Digits in Base K', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Iterative base conversion modulo summation' },
  'frequency-of-the-most-frequent-element': { number: 1838, title: 'Frequency of the Most Frequent Element', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sorted array sliding window with running sum' },
  'longest-substring-of-all-vowels-in-order': { number: 1839, title: 'Longest Substring of All Vowels in Order', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Single pass contiguous run and vowel transition counting' },
  'maximum-building-height': { number: 1840, title: 'Maximum Building Height', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Bidirectional slope relaxation with triangular peak evaluation' },
  'next-palindrome-using-same-digits': { number: 1842, title: 'Next Palindrome Using Same Digits', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Next permutation on palindrome first half' },
  'replace-all-digits-with-characters': { number: 1844, title: 'Replace All Digits with Characters', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Odd index character code point shifting' },
  'maximum-element-after-decreasing-and-rearranging': { number: 1846, title: 'Maximum Element After Decreasing and Rearranging', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Sort and greedy growth clamping' },
  'closest-room': { number: 1847, title: 'Closest Room', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Offline query sorting with ordered set binary search' },
  'minimum-distance-to-the-target-element': { number: 1848, title: 'Minimum Distance to the Target Element', difficulty: 'Easy', category: 'Algorithms', twist_type: 'Single linear pass tracking minimum absolute distance' },
  'splitting-a-string-into-descending-consecutive-values': { number: 1849, title: 'Splitting a String Into Descending Consecutive Values', difficulty: 'Medium', category: 'Algorithms', twist_type: 'Prefix branching with deterministic recursive descent' },
  'minimum-adjacent-swaps-to-reach-the-kth-smallest-number': { number: 1850, title: 'Minimum Adjacent Swaps to Reach the Kth Smallest Number', difficulty: 'Medium', category: 'Algorithms', twist_type: 'K-step next permutation with greedy adjacent swap counting' },
  'minimum-interval-to-include-each-query': { number: 1851, title: 'Minimum Interval to Include Each Query', difficulty: 'Hard', category: 'Algorithms', twist_type: 'Sorted query line sweep with min-heap for shortest active interval' },
  'distinct-numbers-in-each-subarray': { number: 1852, title: "Distinct Numbers in Each Subarray", difficulty: 'Medium', category: 'Algorithms', twist_type: "Sliding window with hash map frequency count" },
  'maximum-population-year': { number: 1854, title: "Maximum Population Year", difficulty: 'Easy', category: 'Algorithms', twist_type: "Difference array prefix sum coordinate sweep" },
  'maximum-distance-between-a-pair-of-values': { number: 1855, title: "Maximum Distance Between a Pair of Values", difficulty: 'Medium', category: 'Algorithms', twist_type: "Two pointer non-decreasing coordinate scan" },
  'maximum-subarray-min-product': { number: 1856, title: "Maximum Subarray Min-Product", difficulty: 'Medium', category: 'Algorithms', twist_type: "Monotonic stack for minimum boundary with prefix sums" },
  'largest-color-value-in-a-directed-graph': { number: 1857, title: "Largest Color Value in a Directed Graph", difficulty: 'Hard', category: 'Algorithms', twist_type: "Kahn topological sort with DP color frequency propagation" },
  'longest-word-with-all-prefixes': { number: 1858, title: "Longest Word With All Prefixes", difficulty: 'Medium', category: 'Algorithms', twist_type: "Trie prefix tree with lexicographical tie-breaking" },
  'sorting-the-sentence': { number: 1859, title: "Sorting the Sentence", difficulty: 'Easy', category: 'Algorithms', twist_type: "String token splitting and numeric suffix sorting" },
  'incremental-memory-leak': { number: 1860, title: "Incremental Memory Leak", difficulty: 'Medium', category: 'Algorithms', twist_type: "Greedy simulation of memory allocation over time" },
  'rotating-the-box': { number: 1861, title: "Rotating the Box", difficulty: 'Medium', category: 'Algorithms', twist_type: "Gravity simulation with two pointers and 90-degree matrix rotation" },
  'sum-of-floored-pairs': { number: 1862, title: "Sum of Floored Pairs", difficulty: 'Hard', category: 'Algorithms', twist_type: "Frequency prefix sums and harmonic quotient range queries" },
  'sum-of-all-subset-xor-totals': { number: 1863, title: "Sum of All Subset XOR Totals", difficulty: 'Easy', category: 'Algorithms', twist_type: "Bitwise bit-contribution calculation or recursion" },
  'minimum-number-of-swaps-to-make-the-binary-string-alternating': { number: 1864, title: "Minimum Number of Swaps to Make the Binary String Alternating", difficulty: 'Medium', category: 'Algorithms', twist_type: "Mismatch counting against target alternating patterns" },
  'number-of-ways-to-rearrange-sticks-with-k-sticks-visible': { number: 1866, title: "Number of Ways to Rearrange Sticks With K Sticks Visible", difficulty: 'Hard', category: 'Algorithms', twist_type: "Stirling numbers of the first kind dynamic programming" },
  'product-of-two-run-length-encoded-arrays': { number: 1868, title: "Product of Two Run-Length Encoded Arrays", difficulty: 'Medium', category: 'Algorithms', twist_type: "Two pointer segment intersection run-length compression" },
  'longer-contiguous-segments-of-ones-than-zeros': { number: 1869, title: "Longer Contiguous Segments of Ones than Zeros", difficulty: 'Easy', category: 'Algorithms', twist_type: "Single pass maximum contiguous segment comparison" },
  'minimum-speed-to-arrive-on-time': { number: 1870, title: "Minimum Speed to Arrive on Time", difficulty: 'Medium', category: 'Algorithms', twist_type: "Binary search on speed with ceiling time accumulation" },
  'jump-game-vii': { number: 1871, title: "Jump Game VII", difficulty: 'Medium', category: 'Algorithms', twist_type: "Sliding window reachable count with dynamic programming" },
  'stone-game-viii': { number: 1872, title: "Stone Game VIII", difficulty: 'Hard', category: 'Algorithms', twist_type: "Prefix sum dynamic programming with suffix maximum optimization" },
  'minimize-product-sum-of-two-arrays': { number: 1874, title: "Minimize Product Sum of Two Arrays", difficulty: 'Medium', category: 'Algorithms', twist_type: "Greedy opposite sorting dot product minimization" },
  'substrings-of-size-three-with-distinct-characters': { number: 1876, title: "Substrings of Size Three with Distinct Characters", difficulty: 'Easy', category: 'Algorithms', twist_type: "Fixed-size sliding window distinct character check" },
  'minimize-maximum-pair-sum-in-array': { number: 1877, title: "Minimize Maximum Pair Sum in Array", difficulty: 'Medium', category: 'Algorithms', twist_type: "Greedy two pointer pairing on sorted array" },
  'get-biggest-three-rhombus-sums-in-a-grid': { number: 1878, title: "Get Biggest Three Rhombus Sums in a Grid", difficulty: 'Medium', category: 'Algorithms', twist_type: "Diagonal prefix sums with rhombus perimeter exploration" },
  'minimum-xor-sum-of-two-arrays': { number: 1879, title: "Minimum XOR Sum of Two Arrays", difficulty: 'Hard', category: 'Algorithms', twist_type: "Bitmask dynamic programming over permutation assignments" },
  'check-if-word-equals-summation-of-two-words': { number: 1880, title: "Check if Word Equals Summation of Two Words", difficulty: 'Easy', category: 'Algorithms', twist_type: "Character to digit string conversion and arithmetic check" },
  'maximum-value-after-insertion': { number: 1881, title: "Maximum Value After Insertion", difficulty: 'Medium', category: 'Algorithms', twist_type: "Greedy sign-aware first mismatch digit insertion" },
  'process-tasks-using-servers': { number: 1882, title: "Process Tasks Using Servers", difficulty: 'Medium', category: 'Algorithms', twist_type: "Dual priority queues for available and busy servers" },
  'minimum-skips-to-arrive-at-meeting-on-time': { number: 1883, title: "Minimum Skips to Arrive at Meeting On Time", difficulty: 'Hard', category: 'Algorithms', twist_type: "Scaled integer distance dynamic programming over skips" },
  'egg-drop-with-2-eggs-and-n-floors': { number: 1884, title: "Egg Drop With 2 Eggs and N Floors", difficulty: 'Medium', category: 'Algorithms', twist_type: "Triangular number arithmetic or dynamic programming" },
  'count-pairs-in-two-arrays': { number: 1885, title: "Count Pairs in Two Arrays", difficulty: 'Medium', category: 'Algorithms', twist_type: "Difference array sorting and two pointer count accumulation" },
  'determine-whether-matrix-can-be-obtained-by-rotation': { number: 1886, title: "Determine Whether Matrix Can Be Obtained By Rotation", difficulty: 'Easy', category: 'Algorithms', twist_type: "Four 90-degree matrix rotations comparison" },
  'reduction-operations-to-make-the-array-elements-equal': { number: 1887, title: "Reduction Operations to Make the Array Elements Equal", difficulty: 'Medium', category: 'Algorithms', twist_type: "Sorted frequency prefix rank accumulation" },
  'minimum-number-of-flips-to-make-the-binary-string-alternating': { number: 1888, title: "Minimum Number of Flips to Make the Binary String Alternating", difficulty: 'Medium', category: 'Algorithms', twist_type: "Doubled string sliding window mismatch tracking" },
  'minimum-space-wasted-from-packaging': { number: 1889, title: "Minimum Space Wasted From Packaging", difficulty: 'Hard', category: 'Algorithms', twist_type: "Sorted box binary search and prefix sum space evaluation" },
  'cutting-ribbons': { number: 1891, title: "Cutting Ribbons", difficulty: 'Medium', category: 'Algorithms', twist_type: "Binary search on length with piece count verification" },
  'check-if-all-the-integers-in-a-range-are-covered': { number: 1893, title: "Check if All the Integers in a Range Are Covered", difficulty: 'Easy', category: 'Algorithms', twist_type: "Difference array prefix sweep or boolean coverage" },
  'find-the-student-that-will-replace-the-chalk': { number: 1894, title: "Find the Student that Will Replace the Chalk", difficulty: 'Medium', category: 'Algorithms', twist_type: "Modulo total chalk reduction and prefix subtraction" },
  'largest-magic-square': { number: 1895, title: "Largest Magic Square", difficulty: 'Medium', category: 'Algorithms', twist_type: "2D prefix sums for row, column, and diagonal validation" },
  'minimum-cost-to-change-the-final-value-of-expression': { number: 1896, title: "Minimum Cost to Change the Final Value of Expression", difficulty: 'Hard', category: 'Algorithms', twist_type: "Stack-based parsing evaluating value and flip-cost pairs" },
  'redistribute-characters-to-make-all-strings-equal': { number: 1897, title: "Redistribute Characters to Make All Strings Equal", difficulty: 'Easy', category: 'Algorithms', twist_type: "Character frequency array and divisibility check" },
  'maximum-number-of-removable-characters': { number: 1898, title: "Maximum Number of Removable Characters", difficulty: 'Medium', category: 'Algorithms', twist_type: "Binary search on removal count with subsequence check" },
  'merge-triplets-to-form-target-triplet': { number: 1899, title: "Merge Triplets to Form Target Triplet", difficulty: 'Medium', category: 'Algorithms', twist_type: "Greedy coordinate matching across non-exceeding triplets" },
  'the-earliest-and-latest-rounds-where-players-compete': { number: 1900, title: "The Earliest and Latest Rounds Where Players Compete", difficulty: 'Hard', category: 'Algorithms', twist_type: "Tournament state memoization over player ranks" },
  'find-a-peak-element-ii': { number: 1901, title: "Find a Peak Element II", difficulty: 'Medium', category: 'Algorithms', twist_type: "Binary search over rows with column maximum finding" },
  'depth-of-bst-given-insertion-order': { number: 1902, title: "Depth of BST Given Insertion Order", difficulty: 'Medium', category: 'Algorithms', twist_type: "Ordered predecessor and successor depth propagation" },
  'largest-odd-number-in-string': { number: 1903, title: "Largest Odd Number in String", difficulty: 'Easy', category: 'Algorithms', twist_type: "Reverse scan for the rightmost odd digit" },
  'the-number-of-full-rounds-you-have-played': { number: 1904, title: "The Number of Full Rounds You Have Played", difficulty: 'Medium', category: 'Algorithms', twist_type: "Minute conversion and quarter-hour boundary alignment" },
  'count-sub-islands': { number: 1905, title: "Count Sub Islands", difficulty: 'Medium', category: 'Algorithms', twist_type: "DFS flood fill validating grid1 containment" },
  'minimum-absolute-difference-queries': { number: 1906, title: "Minimum Absolute Difference Queries", difficulty: 'Medium', category: 'Algorithms', twist_type: "Prefix frequency matrix answering queries in O(100) steps" },
  'game-of-nim': { number: 1908, title: "Game of Nim", difficulty: 'Medium', category: 'Algorithms', twist_type: "Bitwise exclusive-or nim-sum calculation" },
  'remove-one-element-to-make-the-array-strictly-increasing': { number: 1909, title: "Remove One Element to Make the Array Strictly Increasing", difficulty: 'Easy', category: 'Algorithms', twist_type: "Single-pass greedy inversion tracking" },
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

export const KNOWN_SLUG_ALIASES = {
  'classes-with-at-least-5-students': 'classes-more-than-5-students'
};

export function resolveProblemSlug(query, index = null, catalog = null) {
  if (query === null || query === undefined) return null;
  const q = String(query).trim();
  if (!q) return null;

  // 0. Known slug alias check (e.g. historical LeetCode renamed slugs)
  if (KNOWN_SLUG_ALIASES[q]) {
    return KNOWN_SLUG_ALIASES[q];
  }
  const cleanCandidate = q.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (KNOWN_SLUG_ALIASES[cleanCandidate]) {
    return KNOWN_SLUG_ALIASES[cleanCandidate];
  }

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

export const REMOTE_DATASET_BASE_URL = 'https://raw.githubusercontent.com/RijulSitpure/Asymptote/main/dist-dataset';
export const STORAGE_KEY_OTA_DATASET_V2 = 'asymptote_ota_dataset_v2';

/**
 * Calculates SHA-256 hash across Browser, Web Worker, and Node.js environments.
 */
export async function computeSha256(text) {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  try {
    const crypto = await import('node:crypto');
    return crypto.createHash('sha256').update(text).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Creates an in-memory fallback dataset derived from embedded CURATED_PROBLEMS_META.
 * Guarantees the serverless engine can always initialize even in extreme offline,
 * missing-file, or unbundled environments.
 */
export function createEmbeddedFallbackDataset() {
  const shards = {
    algorithms: { domain: 'algorithms', patterns: [], problems: [] },
    database: { domain: 'database', patterns: [], problems: [] },
    pandas: { domain: 'pandas', patterns: [], problems: [] },
    shell: { domain: 'shell', patterns: [], problems: [] },
    concurrency: { domain: 'concurrency', patterns: [], problems: [] },
    javascript: { domain: 'javascript', patterns: [], problems: [] }
  };

  const bySlug = {};
  const byNumber = {};
  const index = { bySlug, byNumber };

  for (const [slug, meta] of Object.entries(CURATED_PROBLEMS_META || {})) {
    const cat = (meta.category || 'Algorithms').toLowerCase();
    const domainKey = shards[cat] ? cat : 'algorithms';
    const num = meta.number;
    const entry = {
      slug,
      number: num,
      category: meta.category || 'Algorithms',
      patterns: meta.twist_type ? [meta.twist_type] : [],
      shard: `${domainKey}.json`
    };
    bySlug[slug] = entry;
    if (num) {
      byNumber[String(num)] = slug;
    }
    const prob = {
      slug,
      number: num,
      title: meta.title || slug,
      difficulty: meta.difficulty || 'Medium',
      category: meta.category || 'Algorithms',
      patterns: meta.twist_type ? [meta.twist_type] : [],
      twist_type: meta.twist_type || '',
      review: { status: 'tested' },
      verified: 1,
      hints: [
        { level: 1, title: 'Pattern Recognition', text: `Identify the underlying algorithmic pattern for ${meta.title || slug}: ${meta.twist_type || meta.category}.` },
        { level: 2, title: 'Complexity Budget', text: `Target the optimal time and space complexity for ${meta.title || slug}.` },
        { level: 3, title: 'Core Invariant', text: `Maintain key invariants and edge case protections for ${meta.title || slug}.` },
        { level: 4, title: 'Implementation Blueprint', text: `Apply the canonical algorithm to solve ${meta.title || slug}.` }
      ],
      solutions: []
    };
    shards[domainKey].problems.push(prob);
  }

  const manifest = {
    version: '2.0.0',
    datasetVersion: 'embedded-fallback',
    contentHash: 'fallback',
    generatedAt: new Date().toISOString(),
    totalPatterns: 0,
    totalProblems: Object.keys(bySlug).length,
    totalCatalogProblems: 0,
    checksums: {}
  };

  return {
    manifest,
    index,
    catalog: [],
    shards,
    ...shards,
    isFallback: true
  };
}

/**
 * Multi-tier resilient dataset loader:
 * 1. Immediately loads cached verified OTA dataset from storage if available.
 * 2. Attempts to load bundled dataset files from localBaseUrl.
 * 3. Falls back to fetching remote dataset from REMOTE_DATASET_BASE_URL if local fails.
 * 4. Falls back to embedded in-memory fallback dataset if all fetches fail.
 */
export async function loadDatasetFromFetch(baseUrl = '/data', storage = null) {
  // 1. Check storage for verified OTA dataset cache
  if (storage && typeof storage.get === 'function') {
    try {
      const cached = await storage.get(STORAGE_KEY_OTA_DATASET_V2);
      if (cached && cached.manifest && cached.shards) {
        return {
          manifest: cached.manifest,
          index: cached.index,
          catalog: cached.catalog || [],
          shards: cached.shards,
          ...cached.shards,
          isOta: true
        };
      }
    } catch {
      // Gracefully continue to bundled fetch on storage failure
    }
  }

  // 2. Load bundled files from baseUrl
  const cleanBase = baseUrl.replace(/\/+$/, '');
  try {
    let manifestRes = await fetch(`${cleanBase}/dataset-metadata.json`).catch(() => null);
    if (!manifestRes || !manifestRes.ok) {
      manifestRes = await fetch(`${cleanBase}/dataset-manifest.json`).catch(() => null);
    }
    if (!manifestRes || !manifestRes.ok) {
      manifestRes = await fetch(`${cleanBase}/manifest.json`).catch(() => null);
    }
    const [indexRes, catalogRes] = await Promise.all([
      fetch(`${cleanBase}/index.json`),
      fetch(`${cleanBase}/catalog.json`).catch(() => null)
    ]);
    if (!manifestRes || !manifestRes.ok || !indexRes || !indexRes.ok) {
      throw new Error(`Local dataset fetch returned ${manifestRes?.status}/${indexRes?.status}`);
    }
    const manifest = await manifestRes.json();
    const index = await indexRes.json();
    const catalog = catalogRes && catalogRes.ok ? await catalogRes.json() : [];

    const domains = ['algorithms', 'database', 'pandas', 'shell', 'concurrency', 'javascript'];
    const shardPromises = domains.map(async (d) => {
      const res = await fetch(`${cleanBase}/${d}.json`);
      if (!res.ok) throw new Error(`Shard ${d}.json returned status ${res.status}`);
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
  } catch (_localErr) {
    // 3. Fallback: Try fetching from REMOTE_DATASET_BASE_URL if available
    try {
      const remoteBase = REMOTE_DATASET_BASE_URL.replace(/\/+$/, '');
      let remoteManifestRes = await fetch(`${remoteBase}/dataset-metadata.json`, { cache: 'no-cache' }).catch(() => null);
      if (!remoteManifestRes || !remoteManifestRes.ok) {
        remoteManifestRes = await fetch(`${remoteBase}/dataset-manifest.json`, { cache: 'no-cache' }).catch(() => null);
      }
      if (!remoteManifestRes || !remoteManifestRes.ok) {
        remoteManifestRes = await fetch(`${remoteBase}/manifest.json`, { cache: 'no-cache' }).catch(() => null);
      }
      const remoteIndexRes = await fetch(`${remoteBase}/index.json`, { cache: 'no-cache' }).catch(() => null);
      if (remoteManifestRes && remoteManifestRes.ok && remoteIndexRes && remoteIndexRes.ok) {
        const manifest = await remoteManifestRes.json();
        const index = await remoteIndexRes.json();
        const catalogRes = await fetch(`${remoteBase}/catalog.json`).catch(() => null);
        const catalog = catalogRes && catalogRes.ok ? await catalogRes.json() : [];

        const domains = ['algorithms', 'database', 'pandas', 'shell', 'concurrency', 'javascript'];
        const shardPromises = domains.map(async (d) => {
          const res = await fetch(`${remoteBase}/${d}.json`);
          const data = await res.json();
          return [d, data];
        });
        const shardEntries = await Promise.all(shardPromises);
        const shards = Object.fromEntries(shardEntries);

        const dataset = {
          manifest,
          index,
          catalog,
          shards,
          ...shards,
          isRemoteFallback: true
        };

        if (storage && typeof storage.set === 'function') {
          storage.set(STORAGE_KEY_OTA_DATASET_V2, { manifest, index, catalog, shards }).catch(() => {});
        }

        return dataset;
      }
    } catch {
      // Remote fetch failed or offline; continue to tier 4
    }

    // 4. Final offline fallback: In-memory fallback dataset using embedded CURATED_PROBLEMS_META
    return createEmbeddedFallbackDataset();
  }
}

export async function loadDatasetFromFs(dataDir = null) {
  if (typeof process === 'undefined' || !process.versions?.node) {
    throw new Error('loadDatasetFromFs is only available in Node.js environments');
  }
  const fs = await import('node:fs');
  const path = await import('node:path');
  const resolvedDir = dataDir || path.resolve(process.cwd(), 'extension', 'data');

  let manifestPath = path.join(resolvedDir, 'dataset-metadata.json');
  if (!fs.existsSync(manifestPath)) {
    manifestPath = path.join(resolvedDir, 'dataset-manifest.json');
  }
  if (!fs.existsSync(manifestPath)) {
    manifestPath = path.join(resolvedDir, 'manifest.json');
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
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
      base_template_java: p.base_template_java || '',
      base_template_js: p.base_template_js || '',
      base_template_ts: p.base_template_ts || '',
      base_template_sql: p.base_template_sql || '',
      base_template_sh: p.base_template_sh || '',
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
      base_template_java: p.base_template_java || '',
      base_template_js: p.base_template_js || '',
      base_template_ts: p.base_template_ts || '',
      base_template_sql: p.base_template_sql || '',
      base_template_sh: p.base_template_sh || '',
      twists: Array.isArray(p.twists) ? p.twists : []
    };
  }

  let activeManifest = dataset.manifest || null;
  let activeIndex = dataset.index || null;
  let activeCatalog = dataset.catalog || null;

  // Hot-apply OTA updates in memory
  function applyOtaDataset(otaData) {
    if (!otaData) return;
    if (otaData.manifest) {
      activeManifest = otaData.manifest;
    }
    if (otaData.index) {
      activeIndex = otaData.index;
    }
    if (otaData.catalog) {
      activeCatalog = otaData.catalog;
    }
    if (otaData.shards && typeof otaData.shards === 'object') {
      for (const d of domains) {
        const shard = otaData.shards[d];
        if (shard && Array.isArray(shard.patterns)) {
          for (const p of shard.patterns) {
            if (p && p.id) {
              const norm = normalizePattern(p);
              patternsById.set(p.id, norm);
              const pIdx = normalizedPatterns.findIndex(x => x.id === p.id);
              if (pIdx !== -1) normalizedPatterns[pIdx] = norm;
              else normalizedPatterns.push(norm);
            }
          }
        }
        if (shard && Array.isArray(shard.problems)) {
          for (const prob of shard.problems) {
            if (prob && prob.slug) {
              curatedProblemsBySlug.set(prob.slug, prob);
              const cIdx = rawCuratedProblems.findIndex(x => x.slug === prob.slug);
              if (cIdx !== -1) rawCuratedProblems[cIdx] = prob;
              else rawCuratedProblems.push(prob);
            }
          }
        }
      }
    }
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
    store.get(STORAGE_KEY_OTA_DATASET_V2).then(otaV2 => {
      if (otaV2) {
        applyOtaDataset(otaV2);
      } else {
        store.get('asymptote_ota_dataset').then(legacy => {
          if (legacy) applyOtaDataset(legacy);
        }).catch(() => {});
      }
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

    getActiveManifest() {
      return activeManifest;
    },

    getActiveDatasetVersion() {
      return activeManifest?.datasetVersion || '1.0.0';
    },

    async checkAndSyncRemoteDataset({
      remoteBaseUrl = REMOTE_DATASET_BASE_URL,
      force = false,
      timeoutMs = 5000
    } = {}) {
      try {
        const cleanBase = String(remoteBaseUrl).replace(/\/+$/, '');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        let manifestRes;
        try {
          manifestRes = await fetch(`${cleanBase}/dataset-metadata.json`, {
            signal: controller.signal,
            cache: 'no-cache'
          });
          if (!manifestRes.ok) {
            manifestRes = await fetch(`${cleanBase}/dataset-manifest.json`, {
              signal: controller.signal,
              cache: 'no-cache'
            });
          }
          if (!manifestRes.ok) {
            manifestRes = await fetch(`${cleanBase}/manifest.json`, {
              signal: controller.signal,
              cache: 'no-cache'
            });
          }
        } catch {
          clearTimeout(timeoutId);
          return { updated: false, reason: 'network_offline' };
        }
        clearTimeout(timeoutId);

        if (!manifestRes.ok) {
          return { updated: false, reason: `http_${manifestRes.status}` };
        }

        const remoteManifest = await manifestRes.json();
        if (!remoteManifest || !remoteManifest.checksums) {
          return { updated: false, reason: 'invalid_remote_manifest' };
        }

        const localChecksums = activeManifest?.checksums || {};
        const remoteChecksums = remoteManifest.checksums || {};

        const changedFiles = [];
        for (const [file, remoteHash] of Object.entries(remoteChecksums)) {
          if (localChecksums[file] !== remoteHash || force) {
            changedFiles.push(file);
          }
        }

        if (changedFiles.length === 0 && remoteManifest.datasetVersion === activeManifest?.datasetVersion && !force) {
          return { updated: false, reason: 'up_to_date' };
        }

        const updatedShards = { ...(dataset.shards || {}) };
        let updatedIndex = activeIndex;
        let updatedCatalog = activeCatalog;
        const downloadedProblems = [];
        const downloadedPatterns = [];

        for (const file of changedFiles) {
          const shardCtrl = new AbortController();
          const shardTimeout = setTimeout(() => shardCtrl.abort(), timeoutMs);
          let res;
          try {
            res = await fetch(`${cleanBase}/${file}`, {
              signal: shardCtrl.signal,
              cache: 'no-cache'
            });
          } catch {
            clearTimeout(shardTimeout);
            return { updated: false, reason: `fetch_failed_${file}` };
          }
          clearTimeout(shardTimeout);

          if (!res.ok) continue;
          const text = await res.text();

          const expectedHash = remoteChecksums[file];
          if (expectedHash) {
            const actualHash = await computeSha256(text);
            if (actualHash && actualHash !== expectedHash) {
              continue;
            }
          }

          let parsed;
          try {
            parsed = JSON.parse(text);
          } catch {
            continue;
          }

          if (file === 'index.json') {
            updatedIndex = parsed;
          } else if (file === 'catalog.json') {
            updatedCatalog = parsed;
          } else {
            const domainKey = file.replace('.json', '');
            updatedShards[domainKey] = parsed;
            if (Array.isArray(parsed.problems)) {
              downloadedProblems.push(...parsed.problems);
            }
            if (Array.isArray(parsed.patterns)) {
              downloadedPatterns.push(...parsed.patterns);
            }
          }
        }

        const otaDataset = {
          manifest: remoteManifest,
          index: updatedIndex,
          catalog: updatedCatalog,
          shards: updatedShards,
          problems: downloadedProblems,
          patterns: downloadedPatterns,
          updatedAt: new Date().toISOString()
        };

        if (store) {
          await store.set(STORAGE_KEY_OTA_DATASET_V2, otaDataset);
        }

        activeManifest = remoteManifest;
        activeIndex = updatedIndex;
        activeCatalog = updatedCatalog;
        applyOtaDataset(otaDataset);

        return {
          updated: true,
          version: remoteManifest.datasetVersion,
          changedFiles,
          newProblemsCount: downloadedProblems.length
        };
      } catch (err) {
        return { updated: false, reason: 'sync_error', error: err.message };
      }
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

        const resolvedSlug = resolveProblemSlug(key, dataset.index, rawCatalog)
          || (state.slug ? resolveProblemSlug(state.slug, dataset.index, rawCatalog) : null)
          || (state.titleSlug ? resolveProblemSlug(state.titleSlug, dataset.index, rawCatalog) : null)
          || (numVal !== null ? resolveProblemSlug(numVal, dataset.index, rawCatalog) : null)
          || key;

        if (numVal === null) {
          const cat = catalogBySlug.get(resolvedSlug);
          if (cat?.n) numVal = cat.n;
        }

        userStateBySlug.set(resolvedSlug, state);
        userStateBySlug.set(key, state);
        if (state.slug) userStateBySlug.set(state.slug, state);
        if (numVal !== null) {
          userStateByNumber.set(numVal, state);
          userStateByNumber.set(String(numVal), state);
          const canonicalByNum = resolveProblemSlug(numVal, dataset.index, rawCatalog);
          if (canonicalByNum) {
            userStateBySlug.set(canonicalByNum, state);
          }
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

        const resolvedSlug = resolveProblemSlug(key, dataset.index, rawCatalog)
          || (userState.slug ? resolveProblemSlug(userState.slug, dataset.index, rawCatalog) : null)
          || (userState.titleSlug ? resolveProblemSlug(userState.titleSlug, dataset.index, rawCatalog) : null)
          || (parsedNum !== null ? resolveProblemSlug(parsedNum, dataset.index, rawCatalog) : null)
          || key;

        const catalogEntry = catalogBySlug.get(resolvedSlug)
          || (parsedNum !== null ? catalogByNumber.get(parsedNum) : null);

        const number = parsedNum || catalogEntry?.n || null;

        // Skip if already handled in curated problems or handled earlier
        if (
          curatedProblemsBySlug.has(resolvedSlug) ||
          curatedProblemsBySlug.has(key) ||
          handledSlugs.has(resolvedSlug) ||
          handledSlugs.has(key) ||
          handledNumbers.has(key) ||
          (number !== null && (handledNumbers.has(number) || handledNumbers.has(String(number)))) ||
          (parsedNum !== null && (handledNumbers.has(parsedNum) || handledNumbers.has(String(parsedNum))))
        ) {
          continue;
        }

        handledSlugs.add(resolvedSlug);
        handledSlugs.add(key);
        if (number !== null) {
          handledNumbers.add(number);
          handledNumbers.add(String(number));
        }
        if (parsedNum !== null) {
          handledNumbers.add(parsedNum);
          handledNumbers.add(String(parsedNum));
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
        hints: rawHints,
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
        let slug = rawSlug 
          ? resolveProblemSlug(rawSlug, dataset.index, rawCatalog) 
          : (numberCandidate ? resolveProblemSlug(numberCandidate, dataset.index, rawCatalog) : null);

        if (numberCandidate && (!slug || !curatedProblemsBySlug.has(slug))) {
          const num = parseInt(String(numberCandidate), 10);
          if (!isNaN(num)) {
            const curatedItem = rawCuratedProblems.find(cp => cp.number === num);
            const catalogItem = catalogByNumber.get(num);
            if (curatedItem?.slug) {
              slug = curatedItem.slug;
            } else if (catalogItem?.s && (!slug || slug === rawSlug)) {
              slug = catalogItem.s;
            }
          }
        }
        if (!slug) continue;

        if (rawSlug && slug !== rawSlug && userProblems[rawSlug]) {
          delete userProblems[rawSlug];
        }

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

        let canonicalSlug = resolveProblemSlug(key, dataset.index, rawCatalog)
          || (data.slug ? resolveProblemSlug(data.slug, dataset.index, rawCatalog) : null)
          || (data.titleSlug ? resolveProblemSlug(data.titleSlug, dataset.index, rawCatalog) : null)
          || key;

        const numCand = data.number || data.frontend_id || data.id || (/^\d+$/.test(key) ? key : null);
        if (numCand && (!canonicalSlug || !curatedProblemsBySlug.has(canonicalSlug))) {
          const num = parseInt(String(numCand), 10);
          if (!isNaN(num)) {
            const curatedItem = rawCuratedProblems.find(cp => cp.number === num);
            const catalogItem = catalogByNumber.get(num);
            if (curatedItem?.slug) {
              canonicalSlug = curatedItem.slug;
            } else if (catalogItem?.s && canonicalSlug === key) {
              canonicalSlug = catalogItem.s;
            }
          }
        }

        if (canonicalSlug !== key && mergedProblems[key]) {
          delete mergedProblems[key];
        }

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
    KNOWN_SLUG_ALIASES,
    GENERIC_HINT_TITLES,
    CATEGORY_PEDAGOGICAL_ORDER,
    PATTERN_PEDAGOGICAL_ORDER,
    CURATED_PROBLEMS_META
  };
}
