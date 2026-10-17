/**
 * Curated Comprehensive Algorithmic Patterns Taxonomy (46 Patterns)
 * Covers every major category tested in LeetCode and technical interviews.
 */
import { sortPatternsByPedagogy } from './curriculum.js';

const RAW_PATTERNS = [
  // ==================== GRAPH + DP & ADVANCED GRAPH ====================
  {
    id: "graph-dp-dag",
    category: "Graph + DP",
    title: "DAG Longest / Shortest Path (Topological Sort + DP)",
    difficulty: "Medium-Hard",
    short_description: "Dynamic programming on Directed Acyclic Graphs. With no cycles, processing nodes in topological order allows O(V+E) linear subproblem memoization.",
    mental_triggers: [
      "Directed graph explicitly or implicitly with NO cycles (DAG)",
      "Strictly increasing sequences on grids or graphs (inherent DAG property)",
      "Task prerequisites with durations, parallel courses, course schedules",
      "Finding longest path (NP-hard on general graphs, but O(V+E) on DAGs!)"
    ],
    constraint_signals: [
      "V, E <= 10^5 (linear time O(V+E) needed)",
      "Grid N, M <= 200 with strictly increasing values (guarantees no cycles)"
    ],
    complexity: "Time: O(V + E) | Space: O(V)",
    base_template_py: `from collections import defaultdict, deque

def longest_path_dag(n, edges):
    adj = defaultdict(list)
    in_degree = [0] * n
    for u, v, w in edges:
        adj[u].append((v, w))
        in_degree[v] += 1

    queue = deque([i for i in range(n) if in_degree[i] == 0])
    dp = [0] * n  # dp[u] = max distance to node u

    while queue:
        u = queue.popleft()
        for v, w in adj[u]:
            dp[v] = max(dp[v], dp[u] + w)
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    return max(dp)`,
    base_template_cpp: `int longestPathDAG(int n, vector<vector<int>>& edges) {
    vector<vector<pair<int, int>>> adj(n);
    vector<int> inDegree(n, 0), dp(n, 0);
    for (auto& e : edges) {
        adj[e[0]].push_back({e[1], e[2]});
        inDegree[e[1]]++;
    }
    queue<int> q;
    for (int i = 0; i < n; ++i) if (inDegree[i] == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto& [v, w] : adj[u]) {
            dp[v] = max(dp[v], dp[u] + w);
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    return *max_element(dp.begin(), dp.end());
}`,
    twists: [
      {
        title: "Twist 1: Memoized DFS on implicit grid",
        explanation: "Grid cells can only move to strictly larger neighbor (e.g. LC 329). @cache acts as the topological sort.",
        delta: "dfs(r, c) = 1 + max(dfs(nr, nc) for larger neighbors)"
      },
      {
        title: "Twist 2: Path tracking with character frequencies",
        explanation: "Track character counts along the longest path (LC 1857). DP state expands to dp[node][char_idx]."
      }
    ]
  },
  {
    id: "graph-dp-k-steps",
    category: "Graph + DP",
    title: "Constrained Steps / Layered Graph DP",
    difficulty: "Medium-Hard",
    short_description: "Optimal path subject to at most K steps, edge threshold, or time limit. Standard Dijkstra fails because a shorter-edge path might cost more.",
    mental_triggers: [
      "'At most K stops', 'in at most T seconds', 'using at most E flights'",
      "Graph has cycles and positive or negative weights",
      "Subproblem state must track BOTH (current_node, steps_taken)"
    ],
    constraint_signals: [
      "K <= 100 or T <= 1000 with N <= 1000",
      "Bellman-Ford O(K * E) or DP O(K * N) is optimal"
    ],
    complexity: "Time: O(K * E) | Space: O(N) using rolling array",
    base_template_py: `def findCheapestPrice(n, flights, src, dst, k):
    dist = [float('inf')] * n
    dist[src] = 0

    for step in range(k + 1):
        temp = list(dist)  # snapshot previous round to avoid cascading
        for u, v, price in flights:
            if dist[u] != float('inf') and dist[u] + price < temp[v]:
                temp[v] = dist[u] + price
        dist = temp

    return dist[dst] if dist[dst] != float('inf') else -1`,
    base_template_cpp: `int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    vector<int> dist(n, 1e9);
    dist[src] = 0;
    for (int i = 0; i <= k; ++i) {
        vector<int> temp = dist;
        for (auto& f : flights) {
            int u = f[0], v = f[1], w = f[2];
            if (dist[u] != 1e9 && dist[u] + w < temp[v]) temp[v] = dist[u] + w;
        }
        dist = temp;
    }
    return dist[dst] >= 1e9 ? -1 : dist[dst];
}`,
    twists: [
      {
        title: "Twist 1: Priority Queue with state (stops, cost, node)",
        explanation: "Dijkstra variant tracking min_stops_seen[node] to prune redundant suboptimal states."
      },
      {
        title: "Twist 2: Time limit T with node passing fees",
        explanation: "Edge weights are travel time; node costs are monetary fees (LC 1928)."
      }
    ]
  },
  {
    id: "graph-bitmask-all-nodes",
    category: "Graph + DP",
    title: "Graph Traversal with Bitmask State (TSP / All Nodes)",
    difficulty: "Hard",
    short_description: "Shortest path or min-cost to visit all nodes, collect all keys, or find Hamiltonian path. Compresses visited subset into an integer bitmask.",
    mental_triggers: [
      "Constraint N is small (N <= 15 or N <= 20)",
      "'Visit every node at least once', 'collect all keys', 'Traveling Salesperson (TSP)'",
      "Revisiting nodes is allowed (cycles permissible)"
    ],
    constraint_signals: [
      "N <= 15 -> 2^N <= 32768, (2^N * N) states fits easily",
      "Key count K <= 6 on a grid (grid bitmask BFS)"
    ],
    complexity: "Time: O(N * 2^N) | Space: O(N * 2^N)",
    base_template_py: `from collections import deque

def shortestPathLength(graph):
    n = len(graph)
    target = (1 << n) - 1
    queue = deque([(i, 1 << i, 0) for i in range(n)])
    visited = set([(i, 1 << i) for i in range(n)])

    while queue:
        node, mask, dist = queue.popleft()
        if mask == target: return dist
        for v in graph[node]:
            next_mask = mask | (1 << v)
            if (v, next_mask) not in visited:
                visited.add((v, next_mask))
                queue.append((v, next_mask, dist + 1))
    return 0`,
    base_template_cpp: `int shortestPathLength(vector<vector<int>>& graph) {
    int n = graph.size(), target = (1 << n) - 1;
    queue<tuple<int, int, int>> q;
    vector<vector<bool>> vis(n, vector<bool>(1 << n, false));
    for (int i = 0; i < n; ++i) { q.push({i, 1 << i, 0}); vis[i][1 << i] = true; }
    while (!q.empty()) {
        auto [u, mask, dist] = q.front(); q.pop();
        if (mask == target) return dist;
        for (int v : graph[u]) {
            int nmask = mask | (1 << v);
            if (!vis[v][nmask]) { vis[v][nmask] = true; q.push({v, nmask, dist + 1}); }
        }
    }
    return 0;
}`,
    twists: [
      {
        title: "Twist 1: Grid BFS with Keys & Locks",
        explanation: "State: (r, c, keys_mask). Doors require corresponding key bit set (LC 864)."
      }
    ]
  },
  {
    id: "graph-tree-rerooting",
    category: "Graph + DP",
    title: "Tree DP / All-Directions Re-rooting DP",
    difficulty: "Hard",
    short_description: "Calculates an aggregate property (like sum of distances) for EVERY possible root in O(N) using 2 DFS passes: Bottom-Up then Top-Down.",
    mental_triggers: [
      "Given an unrooted tree with N nodes",
      "'For each node i, find [aggregate value] if node i is the root'",
      "Brute force would be N * O(N) = O(N^2) (TLE when N = 10^5)"
    ],
    constraint_signals: [
      "N <= 10^5 (requires O(N) two-pass solution)",
      "Edges = N - 1, connected and acyclic (Tree property)"
    ],
    complexity: "Time: O(N) | Space: O(N)",
    base_template_py: `def sumOfDistancesInTree(n, edges):
    from collections import defaultdict
    adj = defaultdict(list)
    for u, v in edges:
        adj[u].append(v); adj[v].append(u)

    count = [1] * n
    res = [0] * n

    def dfs1(u, p):
        for v in adj[u]:
            if v != p:
                dfs1(v, u)
                count[u] += count[v]
                res[u] += res[v] + count[v]

    def dfs2(u, p):
        for v in adj[u]:
            if v != p:
                res[v] = res[u] - count[v] + (n - count[v])
                dfs2(v, u)

    dfs1(0, -1)
    dfs2(0, -1)
    return res`,
    base_template_cpp: `void dfs1(int u, int p, vector<vector<int>>& adj, vector<int>& cnt, vector<int>& ans) {
    cnt[u] = 1;
    for (int v : adj[u]) {
        if (v == p) continue;
        dfs1(v, u, adj, cnt, ans);
        cnt[u] += cnt[v]; ans[u] += ans[v] + cnt[v];
    }
}
void dfs2(int u, int p, int n, vector<vector<int>>& adj, vector<int>& cnt, vector<int>& ans) {
    for (int v : adj[u]) {
        if (v == p) continue;
        ans[v] = ans[u] - cnt[v] + (n - cnt[v]);
        dfs2(v, u, n, adj, cnt, ans);
    }
}`,
    twists: [
      {
        title: "Twist 1: Minimum Height Trees (Centroids)",
        explanation: "Trimming degree-1 leaves iteratively until 1 or 2 center nodes remain (LC 310)."
      }
    ]
  },

  // ==================== DYNAMIC PROGRAMMING ====================
  {
    id: "dp-1d-fib-linear",
    category: "Dynamic Programming",
    title: "1D Linear DP / Sequence Decisions",
    difficulty: "Easy-Medium",
    short_description: "Decisions made sequentially along an array where state dp[i] depends only on a constant number of previous elements (e.g. i-1, i-2).",
    mental_triggers: [
      "'Cannot rob adjacent houses', 'Climbing stairs 1 or 2 steps', 'Decode ways'",
      "Maximizing/minimizing score choosing to take or skip element i"
    ],
    constraint_signals: ["N <= 10^5 (linear O(N) pass, O(1) space with rolling variables)"],
    complexity: "Time: O(N) | Space: O(1)",
    base_template_py: `def rob(nums):
    rob1, rob2 = 0, 0
    for n in nums:
        temp = max(n + rob1, rob2)
        rob1 = rob2
        rob2 = temp
    return rob2`,
    base_template_cpp: `int rob(vector<int>& nums) {
    int rob1 = 0, rob2 = 0;
    for (int n : nums) {
        int temp = max(n + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
    }
    return rob2;
}`,
    twists: [
      {
        title: "Twist 1: Circular Array (House Robber II)",
        explanation: "Houses arranged in a circle. Return max(rob(nums[1:]), rob(nums[:-1]))."
      }
    ]
  },
  {
    id: "dp-knapsack-variants",
    category: "Dynamic Programming",
    title: "0/1 & Unbounded Knapsack Variants",
    difficulty: "Medium",
    short_description: "Selecting items with weights and values to reach a target sum. 0/1 knapsack iterates backwards; Unbounded knapsack iterates forwards.",
    mental_triggers: [
      "'Partition array into equal sum subsets', 'Coin change', 'Target sum'",
      "Can each item be used once (0/1) or infinitely many times (Unbounded)?"
    ],
    constraint_signals: ["Target sum <= 10^4, N <= 1000 (O(N * Target) fits easily)"],
    complexity: "Time: O(N * Target) | Space: O(Target)",
    base_template_py: `def canPartition(nums):
    total = sum(nums)
    if total % 2 != 0: return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for num in nums:
        for j in range(target, num - 1, -1): # Backward loop for 0/1 Knapsack
            dp[j] = dp[j] or dp[j - num]
    return dp[target]`,
    base_template_cpp: `bool canPartition(vector<int>& nums) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if (total % 2) return false;
    int target = total / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int n : nums) {
        for (int j = target; j >= n; --j) dp[j] = dp[j] || dp[j - n];
    }
    return dp[target];
}`,
    twists: [
      {
        title: "Twist 1: Unbounded Knapsack (Coin Change)",
        explanation: "Loop forward: for j in range(coin, target + 1): dp[j] = min(dp[j], 1 + dp[j - coin])."
      }
    ]
  },
  {
    id: "dp-interval",
    category: "Dynamic Programming",
    title: "Interval / Range DP",
    difficulty: "Medium-Hard",
    short_description: "Subproblems defined by continuous intervals [i, j]. Solved by iterating over window lengths and testing split points k in O(N^3).",
    mental_triggers: [
      "'Merge adjacent elements', 'Burst balloons', 'Palindromic substrings'",
      "Cost is accumulated by combining two sub-ranges [i, k] and [k+1, j]"
    ],
    constraint_signals: ["N <= 400 or N <= 500 (O(N^3) complexity: 400^3 ≈ 6.4 * 10^7)"],
    complexity: "Time: O(N^3) | Space: O(N^2)",
    base_template_py: `def interval_dp(nums):
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + cost(i, k, j))
    return dp[0][n - 1]`,
    base_template_cpp: `int intervalDP(vector<int>& nums) {
    int n = nums.size();
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 2; len <= n; ++len) {
        for (int i = 0; i <= n - len; ++i) {
            int j = i + len - 1;
            dp[i][j] = 1e9;
            for (int k = i; k < j; ++k) dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + cost(i, k, j));
        }
    }
    return dp[0][n-1];
}`,
    twists: [
      {
        title: "Twist 1: Burst Balloons (Reverse Thinking)",
        explanation: "Choose which balloon k is burst LAST in range (i, j) to keep subproblems independent (LC 312)."
      }
    ]
  },
  {
    id: "dp-state-machine",
    category: "Dynamic Programming",
    title: "State Machine DP",
    difficulty: "Medium",
    short_description: "Transitions between 2-4 distinct mutually exclusive operational states (e.g. Hold, Sold, Cooldown, Reset).",
    mental_triggers: [
      "Stock trading with restrictions (cooldown, transaction fee, max K transactions)",
      "Cannot do action X two days in a row"
    ],
    constraint_signals: ["N <= 10^5 (linear O(N) pass, O(1) space)"],
    complexity: "Time: O(N) | Space: O(1)",
    base_template_py: `def maxProfitWithCooldown(prices):
    hold, sold, rest = -float('inf'), 0, 0
    for p in prices:
        prev_hold, prev_sold, prev_rest = hold, sold, rest
        hold = max(prev_hold, prev_rest - p)
        sold = prev_hold + p
        rest = max(prev_rest, prev_sold)
    return max(sold, rest)`,
    base_template_cpp: `int maxProfitWithCooldown(vector<int>& prices) {
    int hold = -1e9, sold = 0, rest = 0;
    for (int p : prices) {
        int ph = hold, ps = sold, pr = rest;
        hold = max(ph, pr - p); sold = ph + p; rest = max(pr, ps);
    }
    return max(sold, rest);
}`,
    twists: [
      {
        title: "Twist 1: Max K Transactions",
        explanation: "Expand states to array buy[k] and sell[k] (LC 188)."
      }
    ]
  },
  {
    id: "dp-grid-2d",
    category: "Dynamic Programming",
    title: "2D Grid DP / Matrix Paths",
    difficulty: "Medium",
    short_description: "Path counting or minimum cost traversal in 2D matrices moving only Right and Down.",
    mental_triggers: [
      "'Unique paths in grid with obstacles', 'Minimum path sum', 'Maximal square'",
      "Moves restricted to right and down (inherent DAG)"
    ],
    constraint_signals: ["M, N <= 200 (O(M * N) space can be reduced to O(N) rolling row)"],
    complexity: "Time: O(M * N) | Space: O(N)",
    base_template_py: `def minPathSum(grid):
    m, n = len(grid), len(grid[0])
    dp = [float('inf')] * (n + 1)
    dp[1] = 0
    for row in grid:
        for c in range(n):
            dp[c + 1] = row[c] + min(dp[c + 1], dp[c])
    return dp[n]`,
    base_template_cpp: `int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    vector<int> dp(n, 1e9);
    dp[0] = 0;
    for (int r = 0; r < m; ++r) {
        dp[0] += grid[r][0];
        for (int c = 1; c < n; ++c) {
            dp[c] = grid[r][c] + (r == 0 ? dp[c-1] : min(dp[c], dp[c-1]));
        }
    }
    return dp[n-1];
}`,
    twists: [
      {
        title: "Twist 1: Maximal Square",
        explanation: "dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1]) (LC 221)."
      }
    ]
  },
  {
    id: "dp-longest-common-subseq",
    category: "Dynamic Programming",
    title: "2-Sequence DP / LCS / Edit Distance",
    difficulty: "Medium-Hard",
    short_description: "Comparing two sequences s1 and s2 where dp[i][j] represents the result on prefixes s1[0..i] and s2[0..j].",
    mental_triggers: [
      "'Longest common subsequence', 'Edit distance', 'Interleaving string', 'Wildcard matching'"
    ],
    constraint_signals: ["Length M, N <= 1000 (O(M * N) operations fits well)"],
    complexity: "Time: O(M * N) | Space: O(min(M, N))",
    base_template_py: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [0] * (n + 1)
    for c1 in text1:
        prev_diag = 0
        for j, c2 in enumerate(text2):
            temp = dp[j + 1]
            if c1 == c2:
                dp[j + 1] = 1 + prev_diag
            else:
                dp[j + 1] = max(dp[j + 1], dp[j])
            prev_diag = temp
    return dp[n]`,
    base_template_cpp: `int longestCommonSubsequence(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (s1[i-1] == s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`,
    twists: [
      {
        title: "Twist 1: Edit Distance (Insert, Delete, Replace)",
        explanation: "dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + (0 if equal else 1)) (LC 72)."
      }
    ]
  },
  {
    id: "dp-bitmask",
    category: "Dynamic Programming",
    title: "Bitmask Subset DP",
    difficulty: "Hard",
    short_description: "Representing set of used elements as a bitmask integer. Iterating through subsets mask from 0 to (1<<N)-1.",
    mental_triggers: [
      "Constraint N is small (N <= 16)",
      "'Partition array into K equal sum subsets', 'Match elements with min cost'"
    ],
    constraint_signals: ["N <= 16 (2^16 = 65,536 states)"],
    complexity: "Time: O(N * 2^N) | Space: O(2^N)",
    base_template_py: `def canPartitionKSubsets(nums, k):
    total = sum(nums)
    if total % k != 0: return False
    target = total // k
    n = len(nums)
    dp = [-1] * (1 << n)
    dp[0] = 0

    for mask in range(1 << n):
        if dp[mask] == -1: continue
        for i in range(n):
            if not (mask & (1 << i)):
                if dp[mask] + nums[i] <= target:
                    next_mask = mask | (1 << i)
                    dp[next_mask] = (dp[mask] + nums[i]) % target
    return dp[(1 << n) - 1] == 0`,
    base_template_cpp: `// Bitmask DP template
bool canPartitionKSubsets(vector<int>& nums, int k) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if (total % k) return false;
    int target = total / k, n = nums.size();
    vector<int> dp(1 << n, -1);
    dp[0] = 0;
    for (int mask = 0; mask < (1 << n); ++mask) {
        if (dp[mask] == -1) continue;
        for (int i = 0; i < n; ++i) {
            if (!(mask & (1 << i)) && dp[mask] + nums[i] <= target) {
                dp[mask | (1 << i)] = (dp[mask] + nums[i]) % target;
            }
        }
    }
    return dp[(1 << n) - 1] == 0;
}`,
    twists: [
      {
        title: "Twist 1: Submask Enumeration O(3^N)",
        explanation: "Iterate through submasks: sub = (sub - 1) & mask."
      }
    ]
  },

  // ==================== ARRAYS, TWO POINTERS & SLIDING WINDOW ====================
  {
    id: "prefix-sum-hashmap",
    category: "Arrays & Hashing",
    title: "Prefix Sum + Hash Map (Zero/Target Subarray Sum)",
    difficulty: "Medium",
    short_description: "Count or find subarrays with exact sum K using prefix sums: sum(i, j) = prefix[j] - prefix[i-1] = K  =>  prefix[i-1] = prefix[j] - K.",
    mental_triggers: [
      "'Number of subarrays with sum equals K', 'Longest subarray with equal 0s and 1s'",
      "Array contains positive and negative integers (precludes sliding window!)"
    ],
    constraint_signals: ["N <= 10^5 (O(N) single pass using hash map)"],
    complexity: "Time: O(N) | Space: O(N)",
    base_template_py: `def subarraySum(nums, k):
    from collections import defaultdict
    counts = defaultdict(int)
    counts[0] = 1
    curr_sum = 0
    ans = 0
    for num in nums:
        curr_sum += num
        if (curr_sum - k) in counts:
            ans += counts[curr_sum - k]
        counts[curr_sum] += 1
    return ans`,
    base_template_cpp: `int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> counts;
    counts[0] = 1;
    int cur = 0, ans = 0;
    for (int n : nums) {
        cur += n;
        if (counts.count(cur - k)) ans += counts[cur - k];
        counts[cur]++;
    }
    return ans;
}`,
    twists: [
      {
        title: "Twist 1: Equal 0s and 1s",
        explanation: "Treat 0 as -1. The problem transforms to finding subarray sum equals 0 (LC 525)."
      },
      {
        title: "Twist 2: Subarray Sums Divisible by K",
        explanation: "Store prefix_sum % K in map (handle negative modulo: (cur % k + k) % k) (LC 974)."
      }
    ]
  },
  {
    id: "two-pointers-opposite",
    category: "Two Pointers",
    title: "Opposite Ends Two Pointers",
    difficulty: "Easy-Medium",
    short_description: "Two pointers starting at opposite ends (left = 0, right = n - 1) converging inward based on comparison with target.",
    mental_triggers: [
      "Sorted array with 'Find two elements summing to target' (Two Sum II)",
      "'Container with most water', 'Valid palindrome', 'Trapping rain water'"
    ],
    constraint_signals: ["Array is sorted or sorting is allowed in O(N log N)"],
    complexity: "Time: O(N) | Space: O(1)",
    base_template_py: `def maxArea(height):
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        h = min(height[left], height[right])
        max_water = max(max_water, h * (right - left))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water`,
    base_template_cpp: `int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1, ans = 0;
    while (left < right) {
        ans = max(ans, min(height[left], height[right]) * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    return ans;
}`,
    twists: [
      {
        title: "Twist 1: 3Sum / 4Sum",
        explanation: "Fix first element with loop, run opposite two pointers on remaining subarray with duplicate skipping (LC 15)."
      }
    ]
  },
  {
    id: "two-pointers-window-dynamic",
    category: "Two Pointers",
    title: "Dynamic Sliding Window (Shrink on Invalid)",
    difficulty: "Medium-Hard",
    short_description: "Expand right pointer to include elements, and shrink left pointer as soon as window condition is violated.",
    mental_triggers: [
      "'Longest substring with at most K distinct characters'",
      "'Minimum window substring containing all characters of T'",
      "Contiguous subarray with monotonic property"
    ],
    constraint_signals: ["N <= 10^5 (Two pointers guarantees each element moved at most twice -> O(N))"],
    complexity: "Time: O(N) | Space: O(K)",
    base_template_py: `def minWindow(s, t):
    from collections import Counter
    target = Counter(t)
    window = Counter()
    have, need = 0, len(target)
    res = (-1, -1)
    min_len = float('inf')
    left = 0

    for right, char in enumerate(s):
        window[char] += 1
        if char in target and window[char] == target[char]:
            have += 1
        while have == need:
            if (right - left + 1) < min_len:
                min_len = right - left + 1
                res = (left, right)
            window[s[left]] -= 1
            if s[left] in target and window[s[left]] < target[s[left]]:
                have -= 1
            left += 1
    return s[res[0]:res[1]+1] if min_len != float('inf') else ""`,
    base_template_cpp: `// Dynamic sliding window template
string minWindow(string s, string t) {
    vector<int> map(128, 0);
    for (char c : t) map[c]++;
    int count = t.size(), start = 0, minLen = INT_MAX, head = 0;
    for (int end = 0; end < s.size(); ++end) {
        if (map[s[end]]-- > 0) count--;
        while (count == 0) {
            if (end - start + 1 < minLen) { minLen = end - (head = start) + 1; }
            if (map[s[start++]]++ == 0) count++;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(head, minLen);
}`,
    twists: [
      {
        title: "Twist 1: Exactly K count",
        explanation: "Subarrays with exactly K elements = atMost(K) - atMost(K - 1) (LC 992)."
      }
    ]
  },
  {
    id: "sliding-window-fixed",
    category: "Two Pointers",
    title: "Fixed Size Sliding Window",
    difficulty: "Easy-Medium",
    short_description: "Window of strictly fixed length K sliding across array. Add incoming element at right, subtract outgoing element at left - k.",
    mental_triggers: [
      "'Find all anagrams of string P in string S'",
      "'Maximum average subarray of length K'",
      "'Permutation in string'"
    ],
    constraint_signals: ["Window size K is fixed constant"],
    complexity: "Time: O(N) | Space: O(1) or O(Alphabet)",
    base_template_py: `def findAnagrams(s, p):
    if len(p) > len(s): return []
    from collections import Counter
    p_count = Counter(p)
    s_count = Counter()
    k = len(p)
    res = []
    for i in range(len(s)):
        s_count[s[i]] += 1
        if i >= k:
            if s_count[s[i - k]] == 1: del s_count[s[i - k]]
            else: s_count[s[i - k]] -= 1
        if s_count == p_count: res.append(i - k + 1)
    return res`,
    base_template_cpp: `vector<int> findAnagrams(string s, string p) {
    if (p.size() > s.size()) return {};
    vector<int> pv(26, 0), sv(26, 0), res;
    for (char c : p) pv[c - 'a']++;
    for (int i = 0; i < s.size(); ++i) {
        sv[s[i] - 'a']++;
        if (i >= p.size()) sv[s[i - p.size()] - 'a']--;
        if (pv == sv) res.push_back(i - p.size() + 1);
    }
    return res;
}`,
    twists: []
  },
  {
    id: "two-pointers-fast-slow",
    category: "Two Pointers",
    title: "Fast & Slow Pointers (Floyd's Cycle Finding)",
    difficulty: "Medium",
    short_description: "Two pointers moving at different speeds (1 step vs 2 steps). If there is a cycle, they will collide.",
    mental_triggers: [
      "'Detect cycle in linked list', 'Find start of linked list cycle'",
      "'Find duplicate number without modifying array (array as linked list)', 'Happy number'"
    ],
    constraint_signals: ["O(1) space constraint with implicit or explicit cycle"],
    complexity: "Time: O(N) | Space: O(1)",
    base_template_py: `def findDuplicate(nums):
    # Floyd's Cycle Detection
    slow, fast = nums[0], nums[nums[0]]
    while slow != fast:
        slow = nums[slow]
        fast = nums[nums[fast]]
    slow = 0
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow`,
    base_template_cpp: `int findDuplicate(vector<int>& nums) {
    int slow = nums[0], fast = nums[nums[0]];
    while (slow != fast) { slow = nums[slow]; fast = nums[nums[fast]]; }
    slow = 0;
    while (slow != fast) { slow = nums[slow]; fast = nums[fast]; }
    return slow;
}`,
    twists: [
      {
        title: "Twist 1: Middle of Linked List",
        explanation: "When fast reaches end, slow is at exact midpoint (LC 876)."
      }
    ]
  },
  {
    id: "array-kadane",
    category: "Arrays & Hashing",
    title: "Kadane's Algorithm (Max Subarray)",
    difficulty: "Medium",
    short_description: "Computes maximum subarray sum in O(N) time and O(1) space by tracking current running sum and resetting if negative.",
    mental_triggers: [
      "'Maximum sum contiguous subarray', 'Maximum product subarray', 'Maximum circular subarray'"
    ],
    constraint_signals: ["N <= 10^5 (O(N) single pass)"],
    complexity: "Time: O(N) | Space: O(1)",
    base_template_py: `def maxSubArray(nums):
    max_so_far = nums[0]
    curr_max = nums[0]
    for n in nums[1:]:
        curr_max = max(n, curr_max + n)
        max_so_far = max(max_so_far, curr_max)
    return max_so_far`,
    base_template_cpp: `int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0], cur = nums[0];
    for (int i = 1; i < nums.size(); ++i) {
        cur = max(nums[i], cur + nums[i]);
        maxSoFar = max(maxSoFar, cur);
    }
    return maxSoFar;
}`,
    twists: [
      {
        title: "Twist 1: Max Product Subarray",
        explanation: "Maintain BOTH current max and current min because negative * negative = positive (LC 152)."
      }
    ]
  },

  // ==================== BINARY SEARCH ====================
  {
    id: "binary-search-answer",
    category: "Binary Search",
    title: "Binary Search on Answer Space (Feasibility Invariant)",
    difficulty: "Medium",
    short_description: "When direct optimization is hard, guess answer X in [low, high] and check if isValid(X) is monotonically true.",
    mental_triggers: [
      "'Minimize the maximum...', 'Maximize the minimum...'",
      "Output is an integer bounded in a known range [low, high]"
    ],
    constraint_signals: ["Range up to 10^9 or 10^14 (log2(10^14) ≈ 47 iterations)"],
    complexity: "Time: O(N * log(Range)) | Space: O(1)",
    base_template_py: `def shipWithinDays(weights, days):
    def canShip(cap):
        d, cur = 1, 0
        for w in weights:
            if cur + w > cap: d += 1; cur = 0
            cur += w
        return d <= days

    left, right = max(weights), sum(weights)
    ans = right
    while left <= right:
        mid = (left + right) // 2
        if canShip(mid):
            ans = mid
            right = mid - 1
        else:
            left = mid + 1
    return ans`,
    base_template_cpp: `int shipWithinDays(vector<int>& weights, int days) {
    auto ok = [&](int cap) {
        int d = 1, cur = 0;
        for (int w : weights) { if (cur + w > cap) { d++; cur = 0; } cur += w; }
        return d <= days;
    };
    int low = *max_element(weights.begin(), weights.end());
    int high = accumulate(weights.begin(), weights.end(), 0), ans = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (ok(mid)) { ans = mid; high = mid - 1; }
        else low = mid + 1;
    }
    return ans;
}`,
    twists: []
  },
  {
    id: "binary-search-rotated",
    category: "Binary Search",
    title: "Binary Search on Rotated Sorted Array",
    difficulty: "Medium",
    short_description: "At least one half [left, mid] or [mid, right] is guaranteed strictly sorted. Check if target lies in sorted half.",
    mental_triggers: [
      "'Array rotated at unknown pivot', 'Search in rotated sorted array', 'Find minimum in rotated array'"
    ],
    constraint_signals: ["O(log N) required on rotated array"],
    complexity: "Time: O(log N) | Space: O(1)",
    base_template_py: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target: return mid
        # Left half sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]: right = mid - 1
            else: left = mid + 1
        else: # Right half sorted
            if nums[mid] < target <= nums[right]: left = mid + 1
            else: right = mid - 1
    return -1`,
    base_template_cpp: `int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) return m;
        if (nums[l] <= nums[m]) {
            if (nums[l] <= target && target < nums[m]) r = m - 1;
            else l = m + 1;
        } else {
            if (nums[m] < target && target <= nums[r]) l = m + 1;
            else r = m - 1;
        }
    }
    return -1;
}`,
    twists: []
  },

  // ==================== STACKS & QUEUES ====================
  {
    id: "stack-monotonic-next-greater",
    category: "Stacks & Queues",
    title: "Monotonic Stack (Next / Prev Greater Element)",
    difficulty: "Medium-Hard",
    short_description: "Stack maintained in strictly increasing or decreasing order. Finds next/prev greater or smaller element in single O(N) pass.",
    mental_triggers: [
      "'Next warmer day', 'First element to right greater than X'",
      "Histogram rectangles, trapping rain water"
    ],
    constraint_signals: ["N <= 10^5 (O(N^2) brute force TLEs)"],
    complexity: "Time: O(N) | Space: O(N)",
    base_template_py: `def dailyTemperatures(temperatures):
    n = len(temperatures)
    res = [0] * n
    stack = []
    for i, t in enumerate(temperatures):
        while stack and t > temperatures[stack[-1]]:
            prev = stack.pop()
            res[prev] = i - prev
        stack.append(i)
    return res`,
    base_template_cpp: `vector<int> dailyTemperatures(vector<int>& t) {
    int n = t.size();
    vector<int> res(n, 0);
    stack<int> st;
    for (int i = 0; i < n; ++i) {
        while (!st.empty() && t[i] > t[st.top()]) {
            int p = st.top(); st.pop();
            res[p] = i - p;
        }
        st.push(i);
    }
    return res;
}`,
    twists: [
      {
        title: "Twist 1: Largest Rectangle in Histogram",
        explanation: "Popping an element determines its height; i is right boundary, new top is left boundary (LC 84)."
      }
    ]
  },
  {
    id: "queue-monotonic-sliding-window",
    category: "Stacks & Queues",
    title: "Monotonic Deque (Sliding Window Extremum)",
    difficulty: "Hard",
    short_description: "Double-ended queue maintaining indices with values in strictly decreasing order. Front of deque is window max in O(1).",
    mental_triggers: [
      "'Sliding window maximum in array of size K'",
      "'Constrained subsequence sum (LC 1425)', 'Shortest subarray with sum >= K (LC 862)'"
    ],
    constraint_signals: ["N <= 10^5 with sliding window extremum (O(N) overall)"],
    complexity: "Time: O(N) | Space: O(K)",
    base_template_py: `from collections import deque

def maxSlidingWindow(nums, k):
    dq = deque()
    res = []
    for i, n in enumerate(nums):
        while dq and nums[dq[-1]] < n: dq.pop()
        dq.append(i)
        if dq[0] == i - k: dq.popleft()
        if i >= k - 1: res.append(nums[dq[0]])
    return res`,
    base_template_cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> res;
    for (int i = 0; i < nums.size(); ++i) {
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (dq.front() == i - k) dq.pop_front();
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    return res;
}`,
    twists: []
  },
  {
    id: "stack-parentheses-parser",
    category: "Stacks & Queues",
    title: "Stack for Matching / Parsers / Calculators",
    difficulty: "Medium",
    short_description: "Using LIFO stack to match nested parentheses, evaluate expressions, or process backspace/collision events.",
    mental_triggers: [
      "'Valid parentheses', 'Basic calculator with + - * / and ()', 'Asteroid collision', 'Decode string'"
    ],
    constraint_signals: ["Nested structures with immediate precedence resolution"],
    complexity: "Time: O(N) | Space: O(N)",
    base_template_py: `def isValid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]: return False
        else:
            stack.append(char)
    return len(stack) == 0`,
    base_template_cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}`,
    twists: []
  },

  // ==================== TREES & BST ====================
  {
    id: "tree-dfs-subproblem",
    category: "Trees",
    title: "Tree DFS / Subtree Divide & Conquer",
    difficulty: "Medium",
    short_description: "Bottom-up recursion where each node computes an aggregate answer using results returned by its left and right subtrees.",
    mental_triggers: [
      "'Diameter of binary tree', 'Binary tree maximum path sum', 'Maximum depth', 'Check if balanced'"
    ],
    constraint_signals: ["Binary tree with N <= 10^5 nodes (O(N) single DFS traversal)"],
    complexity: "Time: O(N) | Space: O(Height)",
    base_template_py: `def maxPathSum(root):
    max_sum = -float('inf')
    def dfs(node):
        nonlocal max_sum
        if not node: return 0
        left = max(0, dfs(node.left))
        right = max(0, dfs(node.right))
        max_sum = max(max_sum, node.val + left + right)
        return node.val + max(left, right)
    dfs(root)
    return max_sum`,
    base_template_cpp: `int maxPathSum(TreeNode* root) {
    int ans = -1e9;
    auto dfs = [&](auto self, TreeNode* node) -> int {
        if (!node) return 0;
        int l = max(0, self(self, node->left));
        int r = max(0, self(self, node->right));
        ans = max(ans, node->val + l + r);
        return node->val + max(l, r);
    };
    dfs(dfs, root);
    return ans;
}`,
    twists: []
  },
  {
    id: "tree-bfs-level-order",
    category: "Trees",
    title: "Tree BFS / Level-Order Traversal",
    difficulty: "Easy-Medium",
    short_description: "Processing tree level by level using a FIFO queue. Captures width, rightmost view, or zigzag patterns.",
    mental_triggers: [
      "'Level order traversal', 'Binary tree right side view', 'Zigzag traversal'"
    ],
    constraint_signals: ["N <= 10^5 (queue size at most N/2 at leaves)"],
    complexity: "Time: O(N) | Space: O(N)",
    base_template_py: `from collections import deque

def rightSideView(root):
    if not root: return []
    res = []
    q = deque([root])
    while q:
        level_size = len(q)
        for i in range(level_size):
            node = q.popleft()
            if i == level_size - 1: res.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
    return res`,
    base_template_cpp: `vector<int> rightSideView(TreeNode* root) {
    if (!root) return {};
    vector<int> res;
    queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        for (int i = 0; i < sz; ++i) {
            auto node = q.front(); q.pop();
            if (i == sz - 1) res.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return res;
}`,
    twists: []
  },
  {
    id: "tree-bst-properties",
    category: "Trees",
    title: "Binary Search Tree (Inorder Sorted Property)",
    difficulty: "Medium",
    short_description: "Using BST property (left < node < right). Inorder traversal produces strictly ascending sorted order.",
    mental_triggers: [
      "'Validate Binary Search Tree', 'Kth smallest element in BST', 'LCA in BST'"
    ],
    constraint_signals: ["Search, insertion, or LCA in O(Height) time"],
    complexity: "Time: O(Height) to O(N) | Space: O(Height)",
    base_template_py: `def isValidBST(root):
    def validate(node, low, high):
        if not node: return True
        if not (low < node.val < high): return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
    return validate(root, -float('inf'), float('inf'))`,
    base_template_cpp: `bool isValidBST(TreeNode* root, long low = LONG_MIN, long high = LONG_MAX) {
    if (!root) return true;
    if (root->val <= low || root->val >= high) return false;
    return isValidBST(root->left, low, root->val) && isValidBST(root->right, root->val, high);
}`,
    twists: []
  },
  {
    id: "tree-trie-prefix",
    category: "Trees",
    title: "Trie (Prefix Tree) & Bitwise XOR Trie",
    difficulty: "Medium-Hard",
    short_description: "Tree structure where edges represent characters or bits. Fast prefix matching and maximum XOR queries in O(Length).",
    mental_triggers: [
      "'Implement autocomplete / prefix search', 'Word search in grid with dictionary (LC 212)'",
      "'Maximum XOR of two numbers in an array (LC 421)'"
    ],
    constraint_signals: ["Total characters <= 10^5; bit length = 31"],
    complexity: "Time: O(Length) per word | Space: O(Total Chars * Alphabet)",
    base_template_py: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self): self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children: node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True
    def startsWith(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True`,
    base_template_cpp: `struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};`,
    twists: [
      {
        title: "Twist 1: Binary Trie for Maximum XOR",
        explanation: "Store 32-bit integers in binary tree with branches 0 and 1. Greedily pick opposite bit (LC 421)."
      }
    ]
  },

  // ==================== HEAPS & PRIORITY QUEUES ====================
  {
    id: "heap-top-k-elements",
    category: "Heap / Priority Queue",
    title: "Top K Frequent / Kth Element (Min-Heap of Size K)",
    difficulty: "Medium",
    short_description: "Maintain a min-heap of size K. Smaller elements get popped, leaving the top K largest in O(N log K).",
    mental_triggers: [
      "'Kth largest element in array', 'Top K frequent elements', 'K closest points to origin'"
    ],
    constraint_signals: ["N <= 10^5, K << N (O(N log K) vastly beats O(N log N) sorting)"],
    complexity: "Time: O(N log K) | Space: O(K)",
    base_template_py: `import heapq

def findKthLargest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
    base_template_cpp: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int n : nums) {
        minHeap.push(n);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}`,
    twists: []
  },
  {
    id: "heap-two-heaps-median",
    category: "Heap / Priority Queue",
    title: "Two Heaps (Running Median of Stream)",
    difficulty: "Hard",
    short_description: "Split numbers into two halves: Max-Heap for lower half, Min-Heap for upper half. Keeps size balanced within 1.",
    mental_triggers: [
      "'Find median from data stream', 'Sliding window median'"
    ],
    constraint_signals: ["Continuous stream of numbers requiring O(log N) insert and O(1) median"],
    complexity: "Time: O(log N) per insert, O(1) findMedian | Space: O(N)",
    base_template_py: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = [] # max-heap (invert sign)
        self.large = [] # min-heap
    def addNum(self, num):
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))
    def findMedian(self):
        if len(self.small) > len(self.large): return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2.0`,
    base_template_cpp: `class MedianFinder {
    priority_queue<int> maxHeap;
    priority_queue<int, vector<int>, greater<int>> minHeap;
public:
    void addNum(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top()); maxHeap.pop();
        if (minHeap.size() > maxHeap.size()) { maxHeap.push(minHeap.top()); minHeap.pop(); }
    }
    double findMedian() {
        return maxHeap.size() > minHeap.size() ? maxHeap.top() : (maxHeap.top() + minHeap.top()) / 2.0;
    }
};`,
    twists: []
  },

  // ==================== BACKTRACKING ====================
  {
    id: "backtracking-subsets-perm",
    category: "Backtracking",
    title: "Backtracking (Subsets, Permutations & Pruning)",
    difficulty: "Medium",
    short_description: "Systematically builds candidates, recursing down, and backtracks upon exploring or encountering duplicates.",
    mental_triggers: [
      "'Find all subsets', 'Generate permutations', 'Combination sum', 'Duplicate elements allowed'"
    ],
    constraint_signals: ["N <= 15 for subsets (2^N); N <= 10 for permutations (N!)"],
    complexity: "Time: O(2^N) or O(N!) | Space: O(N)",
    base_template_py: `def subsetsWithDup(nums):
    nums.sort()
    res = []
    def backtrack(start, path):
        res.append(list(path))
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]: continue # Prune duplicates
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return res`,
    base_template_cpp: `void backtrack(int start, vector<int>& nums, vector<int>& path, vector<vector<int>>& res) {
    res.push_back(path);
    for (int i = start; i < nums.size(); ++i) {
        if (i > start && nums[i] == nums[i-1]) continue;
        path.push_back(nums[i]);
        backtrack(i + 1, nums, path, res);
        path.pop_back();
    }
}`,
    twists: []
  },
  {
    id: "backtracking-grid-dfs",
    category: "Backtracking",
    title: "Grid Backtracking (Word Search & N-Queens)",
    difficulty: "Medium-Hard",
    short_description: "Traversing grid or board, marking cell visited temporarily, exploring 4 directions, and restoring original cell value on return.",
    mental_triggers: [
      "'Word search in grid (LC 79)', 'N-Queens (LC 51)', 'Sudoku solver (LC 37)'"
    ],
    constraint_signals: ["Grid M, N <= 10; Word length <= 15"],
    complexity: "Time: O(M * N * 3^L) | Space: O(L)",
    base_template_py: `def exist(board, word):
    m, n = len(board), len(board[0])
    def dfs(r, c, k):
        if k == len(word): return True
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[k]: return False
        temp = board[r][c]
        board[r][c] = '#' # mark visited in-place
        res = any(dfs(r+dr, c+dc, k+1) for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)])
        board[r][c] = temp # backtrack restore
        return res
    return any(dfs(r, c, 0) for r in range(m) for c in range(n) if board[r][c] == word[0])`,
    base_template_cpp: `bool dfs(vector<vector<char>>& b, string& w, int r, int c, int k) {
    if (k == w.size()) return true;
    if (r < 0 || r >= b.size() || c < 0 || c >= b[0].size() || b[r][c] != w[k]) return false;
    char temp = b[r][c]; b[r][c] = '#';
    bool ok = dfs(b, w, r+1, c, k+1) || dfs(b, w, r-1, c, k+1) || dfs(b, w, r, c+1, k+1) || dfs(b, w, r, c-1, k+1);
    b[r][c] = temp;
    return ok;
}`,
    twists: []
  },

  // ==================== GRAPH TRAVERSAL & SHORTEST PATHS ====================
  {
    id: "graph-bfs-shortest-path",
    category: "Graph Traversal",
    title: "Multi-Source BFS / Unweighted Shortest Path",
    difficulty: "Medium",
    short_description: "Starting BFS from all sources simultaneously. Finds shortest step distance in unweighted graphs and grids in O(V+E).",
    mental_triggers: [
      "'Rotting oranges', '01 Matrix (distance to nearest 0)', 'Shortest path in binary matrix', 'Word ladder'"
    ],
    constraint_signals: ["Edges have uniform unit weight 1 (BFS guarantees shortest path)"],
    complexity: "Time: O(V + E) | Space: O(V)",
    base_template_py: `from collections import deque

def orangesRotting(grid):
    m, n = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 2: q.append((r, c))
            elif grid[r][c] == 1: fresh += 1
    mins = 0
    while q and fresh > 0:
        mins += 1
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2; fresh -= 1; q.append((nr, nc))
    return mins if fresh == 0 else -1`,
    base_template_cpp: `int orangesRotting(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size(), fresh = 0, mins = 0;
    queue<pair<int, int>> q;
    for (int r = 0; r < m; ++r)
        for (int c = 0; c < n; ++c) {
            if (grid[r][c] == 2) q.push({r, c});
            else if (grid[r][c] == 1) fresh++;
        }
    while (!q.empty() && fresh > 0) {
        mins++; int sz = q.size();
        while (sz--) {
            auto [r, c] = q.front(); q.pop();
            for (auto [dr, dc] : vector<pair<int, int>>{{-1,0}, {1,0}, {0,-1}, {0,1}}) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2; fresh--; q.push({nr, nc});
                }
            }
        }
    }
    return fresh == 0 ? mins : -1;
}`,
    twists: []
  },
  {
    id: "graph-topo-kahn",
    category: "Graph Traversal",
    title: "Topological Sort (Kahn's In-Degree) & Cycle Detection",
    difficulty: "Medium",
    short_description: "Computes in-degree for all vertices. Process degree 0 nodes in queue. If processed count < N, graph has a cycle.",
    mental_triggers: [
      "'Course Schedule I and II', 'Prerequisite order', 'Alien Dictionary', 'Detect directed cycle'"
    ],
    constraint_signals: ["Directed graph with dependency ordering"],
    complexity: "Time: O(V + E) | Space: O(V + E)",
    base_template_py: `from collections import defaultdict, deque

def findOrder(numCourses, prerequisites):
    adj = defaultdict(list)
    in_degree = [0] * numCourses
    for u, v in prerequisites:
        adj[v].append(u); in_degree[u] += 1
    q = deque([i for i in range(numCourses) if in_degree[i] == 0])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0: q.append(v)
    return order if len(order) == numCourses else []`,
    base_template_cpp: `vector<int> findOrder(int n, vector<vector<int>>& pre) {
    vector<vector<int>> adj(n);
    vector<int> deg(n, 0), order;
    for (auto& p : pre) { adj[p[1]].push_back(p[0]); deg[p[0]]++; }
    queue<int> q;
    for (int i = 0; i < n; ++i) if (deg[i] == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop(); order.push_back(u);
        for (int v : adj[u]) if (--deg[v] == 0) q.push(v);
    }
    return order.size() == n ? order : vector<int>{};
}`,
    twists: []
  },
  {
    id: "graph-dijkstra",
    category: "Graph Traversal",
    title: "Dijkstra's Shortest Path (Priority Queue)",
    difficulty: "Medium",
    short_description: "Shortest path on graphs with NON-NEGATIVE weights using min-heap priority queue in O((V + E) log V).",
    mental_triggers: [
      "'Network delay time', 'Path with minimum effort', 'Swim in rising water', 'Non-negative edge weights'"
    ],
    constraint_signals: ["Weights >= 0, V <= 10^4, E <= 10^5"],
    complexity: "Time: O((V + E) log V) | Space: O(V)",
    base_template_py: `import heapq
from collections import defaultdict

def networkDelayTime(times, n, k):
    adj = defaultdict(list)
    for u, v, w in times: adj[u].append((v, w))
    pq = [(0, k)]
    dist = {}
    while pq:
        d, u = heapq.heappop(pq)
        if u in dist: continue
        dist[u] = d
        for v, w in adj[u]:
            if v not in dist: heapq.heappush(pq, (d + w, v))
    return max(dist.values()) if len(dist) == n else -1`,
    base_template_cpp: `int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    vector<vector<pair<int, int>>> adj(n + 1);
    for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    vector<int> dist(n + 1, 1e9);
    dist[k] = 0; pq.push({0, k});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.push({dist[v], v}); }
        }
    }
    int ans = 0;
    for (int i = 1; i <= n; ++i) ans = max(ans, dist[i]);
    return ans >= 1e9 ? -1 : ans;
}`,
    twists: []
  },
  {
    id: "graph-01-bfs",
    category: "Graph Traversal",
    title: "0/1 BFS (Double-Ended Queue Shortest Path)",
    difficulty: "Medium",
    short_description: "Shortest path when edge weights are ONLY 0 or 1. Push 0-cost to front and 1-cost to back of Deque in O(V+E).",
    mental_triggers: [
      "Edge weights are strictly 0 and 1",
      "'Minimum cost to make valid path (LC 1368)', 'Minimum obstacle removal (LC 2290)'"
    ],
    constraint_signals: ["Grid M, N <= 1000 (total cells 10^6 -> log(V) heap overhead causes TLE)"],
    complexity: "Time: O(V + E) | Space: O(V)",
    base_template_py: `from collections import deque

def zeroOneBFS(grid):
    m, n = len(grid), len(grid[0])
    dist = [[float('inf')] * n for _ in range(m)]
    dist[0][0] = 0
    dq = deque([(0, 0)])
    while dq:
        r, c = dq.popleft()
        for nr, nc, w in get_neighbors(r, c):
            if dist[r][c] + w < dist[nr][nc]:
                dist[nr][nc] = dist[r][c] + w
                if w == 0: dq.appendleft((nr, nc))
                else: dq.append((nr, nc))
    return dist[m-1][n-1]`,
    base_template_cpp: `int zeroOneBFS(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    vector<vector<int>> dist(m, vector<int>(n, 1e9));
    dist[0][0] = 0; deque<pair<int, int>> dq; dq.push_front({0, 0});
    while (!dq.empty()) {
        auto [r, c] = dq.front(); dq.pop_front();
        for (auto [nr, nc, w] : getNeighbors(r, c)) {
            if (dist[r][c] + w < dist[nr][nc]) {
                dist[nr][nc] = dist[r][c] + w;
                if (w == 0) dq.push_front({nr, nc});
                else dq.push_back({nr, nc});
            }
        }
    }
    return dist[m-1][n-1];
}`,
    twists: []
  },
  {
    id: "graph-union-find-dsu",
    category: "Graph Traversal",
    title: "Disjoint Set Union (DSU / Kruskal MST)",
    difficulty: "Medium",
    short_description: "Tracks disjoint sets with near-O(1) find and union using Path Compression & Union by Rank.",
    mental_triggers: [
      "'Number of connected components / provinces', 'Redundant connection in graph'",
      "'Minimum spanning tree (Kruskal)', 'Offline connectivity queries'"
    ],
    constraint_signals: ["Dynamic edge addition and cycle detection in undirected graphs"],
    complexity: "Time: O(α(N)) ≈ O(1) per operation | Space: O(N)",
    base_template_py: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n
    def find(self, i):
        if self.parent[i] == i: return i
        self.parent[i] = self.find(self.parent[i]) # Path compression
        return self.parent[i]
    def union(self, i, j):
        root_i, root_j = self.find(i), self.find(j)
        if root_i != root_j:
            if self.rank[root_i] < self.rank[root_j]: root_i, root_j = root_j, root_i
            self.parent[root_j] = root_i
            self.rank[root_i] += self.rank[root_j]
            return True
        return False`,
    base_template_cpp: `struct DSU {
    vector<int> parent, rank;
    DSU(int n) : parent(n), rank(n, 1) { iota(parent.begin(), parent.end(), 0); }
    int find(int i) { return parent[i] == i ? i : parent[i] = find(parent[i]); }
    bool unite(int i, int j) {
        int r1 = find(i), r2 = find(j);
        if (r1 == r2) return false;
        if (rank[r1] < rank[r2]) swap(r1, r2);
        parent[r2] = r1; rank[r1] += rank[r2];
        return true;
    }
};`,
    twists: []
  },

  // ==================== GREEDY & INTERVALS ====================
  {
    id: "greedy-interval-scheduling",
    category: "Greedy & Intervals",
    title: "Interval Scheduling & Merging",
    difficulty: "Medium",
    short_description: "Sort intervals by start time (for merging) or end time (for non-overlapping selection). Process greedily in O(N log N).",
    mental_triggers: [
      "'Merge overlapping intervals', 'Non-overlapping intervals', 'Meeting rooms II', 'Minimum arrows to burst balloons'"
    ],
    constraint_signals: ["Intervals [start, end] with N <= 10^5"],
    complexity: "Time: O(N log N) | Space: O(N)",
    base_template_py: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    return merged`,
    base_template_cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    for (auto& iv : intervals) {
        if (merged.empty() || merged.back()[1] < iv[0]) merged.push_back(iv);
        else merged.back()[1] = max(merged.back()[1], iv[1]);
    }
    return merged;
}`,
    twists: []
  },
  {
    id: "bit-manipulation-tricks",
    category: "Bit Manipulation",
    title: "Bit Manipulation & XOR Invariants",
    difficulty: "Easy-Medium",
    short_description: "Using binary properties: x ^ x = 0, x & (x - 1) removes lowest set bit, (1 << i) tests bit i.",
    mental_triggers: [
      "'Single number where all others appear twice', 'Missing number', 'Count number of 1 bits', 'Power of two'"
    ],
    constraint_signals: ["O(1) extra space and linear O(N) time required"],
    complexity: "Time: O(N) or O(1) | Space: O(1)",
    base_template_py: `def singleNumber(nums):
    xor_sum = 0
    for n in nums: xor_sum ^= n
    return xor_sum`,
    base_template_cpp: `int singleNumber(vector<int>& nums) {
    int res = 0;
    for (int n : nums) res ^= n;
    return res;
}`,
    twists: []
  }
];

export const PATTERNS = sortPatternsByPedagogy(RAW_PATTERNS);
