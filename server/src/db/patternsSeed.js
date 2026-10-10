/**
 * Curated Algorithmic Patterns Taxonomy
 * Special focus on Graph, Dynamic Programming, Graph + DP, Monotonic Structures, and Tree Algorithms.
 */

export const PATTERNS = [
  {
    id: "graph-dp-dag",
    category: "Graph + DP",
    title: "DAG Longest / Shortest Path (Topological Sort + DP)",
    difficulty: "Medium-Hard",
    short_description: "Dynamic programming on Directed Acyclic Graphs. Since there are no cycles, processing nodes in topological order allows linear time subproblem memoization.",
    mental_triggers: [
      "Directed graph explicitly or implicitly with NO cycles (DAG)",
      "Strictly increasing sequences on grids or graphs (inherent DAG property)",
      "Task dependencies, prerequisites with rewards or durations",
      "Finding longest path (NP-hard on general graphs, but O(V+E) on DAGs!)"
    ],
    constraint_signals: [
      "V, E <= 10^5 (linear time O(V+E) needed)",
      "Grid N, M <= 200 with strictly increasing values (guarantees no cycles)"
    ],
    complexity: "Time: O(V + E) | Space: O(V)",
    base_template_py: `from collections import defaultdict, deque

def longest_path_dag(n, edges, weights):
    # 1. Build adjacency list and compute in-degrees
    adj = defaultdict(list)
    in_degree = [0] * n
    for u, v, w in edges:
        adj[u].append((v, w))
        in_degree[v] += 1

    # 2. Kahn's Algorithm for Topological Order
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
    base_template_cpp: `#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int longestPathDAG(int n, vector<vector<int>>& edges) {
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
        title: "Twist 1: Memoized DFS instead of Kahn's queue",
        explanation: "When graph is an implicit grid where cells can only move to higher neighbors (e.g. LC 329 Longest Increasing Path), a simple @lru_cache DFS is cleaner than building an explicit graph.",
        delta: "State: dfs(r, c) = 1 + max(dfs(nr, nc) for valid increasing neighbors). Memoization acts as the topological sort."
      },
      {
        title: "Twist 2: Path tracking with node frequency counts",
        explanation: "Track character frequencies along the longest path (e.g. LC 1857).",
        delta: "DP state expands from scalar max to dp[node][char_idx] (size 26)."
      }
    ]
  },
  {
    id: "graph-dp-k-steps",
    category: "Graph + DP",
    title: "Constrained Steps / Layered Graph DP",
    difficulty: "Medium-Hard",
    short_description: "Finding optimal path subject to a maximum step count K, time limit T, or edge threshold. Standard Dijkstra fails because a longer path with fewer steps might be optimal.",
    mental_triggers: [
      "'At most K stops', 'in at most T seconds', 'using at most E flights'",
      "Graph has cycles and positive or negative weights",
      "Subproblem state must track BOTH (current_node, steps_taken)"
    ],
    constraint_signals: [
      "K <= 100 or T <= 1000 with N <= 1000",
      "Bellman-Ford O(K * E) or DP O(K * N) is well within limit"
    ],
    complexity: "Time: O(K * E) | Space: O(N) using 2-row rolling array",
    base_template_py: `def findCheapestPrice(n, flights, src, dst, k):
    # Bellman-Ford layer relaxation
    # dist[node] stores min cost with at most 'step' flights
    dist = [float('inf')] * n
    dist[src] = 0

    # We can take at most k + 1 edges
    for step in range(k + 1):
        temp = list(dist)  # CRITICAL: clone to prevent cascading in same round!
        for u, v, price in flights:
            if dist[u] != float('inf') and dist[u] + price < temp[v]:
                temp[v] = dist[u] + price
        dist = temp

    return dist[dst] if dist[dst] != float('inf') else -1`,
    base_template_cpp: `int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    vector<int> dist(n, 1e9);
    dist[src] = 0;
    for (int i = 0; i <= k; ++i) {
        vector<int> temp = dist; // prevents using updated values in same step
        for (auto& f : flights) {
            int u = f[0], v = f[1], w = f[2];
            if (dist[u] != 1e9 && dist[u] + w < temp[v]) {
                temp[v] = dist[u] + w;
            }
        }
        dist = temp;
    }
    return dist[dst] >= 1e9 ? -1 : dist[dst];
}`,
    twists: [
      {
        title: "Twist 1: Priority Queue with state (stops, cost, node)",
        explanation: "Dijkstra variant where visited array tracks visited[node][stops] to prune redundant suboptimal states.",
        delta: "Keep min_stops_seen[node] so you only push to heap if stops < min_stops_seen[node]."
      },
      {
        title: "Twist 2: Time limit T with node passing fees",
        explanation: "Edge weights are travel time; node costs are monetary fees (e.g. LC 1928).",
        delta: "DP state: dp[time][node] = minimum fee to reach node at exact time t."
      }
    ]
  },
  {
    id: "graph-bitmask-all-nodes",
    category: "Graph + DP",
    title: "Graph Traversal with Bitmask State (TSP / All Nodes)",
    difficulty: "Hard",
    short_description: "Shortest path or minimum cost to visit all nodes, collect all keys, or find Hamiltonian path. Uses bitmask to compress visited subset into an integer.",
    mental_triggers: [
      "Constraint N is small (N <= 15 or N <= 20)",
      "'Visit every node at least once', 'collect all keys/gems', 'Traveling Salesperson (TSP)'",
      "Revisiting nodes is allowed (cycles permissible)"
    ],
    constraint_signals: [
      "N <= 15 -> 2^N <= 32768, (2^N * N) states fits easily in memory/time",
      "Key count K <= 6 on a grid (grid bitmask BFS)"
    ],
    complexity: "Time: O(N * 2^N) or O(V * 2^K) | Space: O(N * 2^N)",
    base_template_py: `from collections import deque

def shortestPathLength(graph):
    n = len(graph)
    target_mask = (1 << n) - 1
    
    # State in queue: (current_node, visited_mask, distance)
    # Start BFS from EVERY node simultaneously with its own bit set
    queue = deque([(i, 1 << i, 0) for i in range(n)])
    visited = set([(i, 1 << i) for i in range(n)])

    while queue:
        node, mask, dist = queue.popleft()
        if mask == target_mask:
            return dist
        
        for neighbor in graph[node]:
            next_mask = mask | (1 << neighbor)
            if (neighbor, next_mask) not in visited:
                visited.add((neighbor, next_mask))
                queue.append((neighbor, next_mask, dist + 1))
                
    return 0`,
    base_template_cpp: `int shortestPathLength(vector<vector<int>>& graph) {
    int n = graph.size(), target = (1 << n) - 1;
    queue<tuple<int, int, int>> q;
    vector<vector<bool>> visited(n, vector<bool>(1 << n, false));
    for (int i = 0; i < n; ++i) {
        q.push({i, 1 << i, 0});
        visited[i][1 << i] = true;
    }
    while (!q.empty()) {
        auto [u, mask, dist] = q.front(); q.pop();
        if (mask == target) return dist;
        for (int v : graph[u]) {
            int next_mask = mask | (1 << v);
            if (!visited[v][next_mask]) {
                visited[v][next_mask] = true;
                q.push({v, next_mask, dist + 1});
            }
        }
    }
    return 0;
}`,
    twists: [
      {
        title: "Twist 1: Grid BFS with Keys & Locks",
        explanation: "Grid with lowercase keys 'a'-'f' and uppercase locks 'A'-'F' (e.g. LC 864).",
        delta: "State: (r, c, keys_bitmask). Moving to locked door requires (keys_mask & (1 << lock_idx)) != 0."
      },
      {
        title: "Twist 2: Weighted edges TSP with min-cost",
        explanation: "Instead of unweighted BFS, use DP table: dp[mask][last_node] = min cost to visit subset mask ending at last_node."
      }
    ]
  },
  {
    id: "graph-tree-rerooting",
    category: "Graph + DP",
    title: "Tree DP / All-Directions Re-rooting DP",
    difficulty: "Hard",
    short_description: "Calculate an aggregate property (like sum of distances or tree height) for EVERY possible root in O(N) time. Done using 2 DFS passes: Bottom-Up then Top-Down.",
    mental_triggers: [
      "Given an unrooted tree with N nodes",
      "'For each node i from 0 to N-1, find [aggregate value] if node i is the root'",
      "Brute force would be N * O(N) = O(N^2), which TLEs when N = 10^5"
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
        adj[u].append(v)
        adj[v].append(u)

    count = [1] * n  # Subtree node count
    res = [0] * n

    # Pass 1: Post-order DFS (bottom-up) rooted arbitrarily at 0
    def dfs_bottom_up(node, parent):
        for neighbor in adj[node]:
            if neighbor != parent:
                dfs_bottom_up(neighbor, node)
                count[node] += count[neighbor]
                res[node] += res[neighbor] + count[neighbor]

    # Pass 2: Pre-order DFS (top-down rerooting)
    def dfs_reroot(node, parent):
        for neighbor in adj[node]:
            if neighbor != parent:
                # When moving root from 'node' to 'neighbor':
                # 'neighbor' subtree gets closer by 1 (count[neighbor] nodes)
                # Rest of tree (n - count[neighbor]) gets further by 1
                res[neighbor] = res[node] - count[neighbor] + (n - count[neighbor])
                dfs_reroot(neighbor, node)

    dfs_bottom_up(0, -1)
    dfs_reroot(0, -1)
    return res`,
    base_template_cpp: `// 2-pass O(N) Re-rooting Tree DP
void dfs1(int u, int p, vector<vector<int>>& adj, vector<int>& cnt, vector<int>& ans) {
    cnt[u] = 1;
    for (int v : adj[u]) {
        if (v == p) continue;
        dfs1(v, u, adj, cnt, ans);
        cnt[u] += cnt[v];
        ans[u] += ans[v] + cnt[v];
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
        explanation: "Find roots that minimize tree height (e.g. LC 310). Can also be solved by trimming leaves layer by layer.",
        delta: "Trim degree 1 leaves iteratively until 1 or 2 nodes remain."
      },
      {
        title: "Twist 2: Re-rooting with directed edge reversals",
        explanation: "Count edges that need to be reversed so all nodes are reachable from root (e.g. LC 2581).",
        delta: "When moving root from u to v, only the direct edge (u, v) changes validity."
      }
    ]
  },
  {
    id: "graph-01-bfs",
    category: "Graph Traversal",
    title: "0/1 BFS (Double-Ended Queue Shortest Path)",
    difficulty: "Medium",
    short_description: "Shortest path on a graph where edge weights are ONLY 0 or 1. Runs in O(V + E) time, beating Dijkstra's O((V+E) log V).",
    mental_triggers: [
      "Grid or graph where moving in original/free direction costs 0, but turning/changing costs 1",
      "'Minimum cost to reach corner', 'minimum obstacles to remove'",
      "Dijkstra feels too slow or overkill"
    ],
    constraint_signals: [
      "Grid M, N <= 1000 (total cells 10^6 -> log(V) causes TLE)",
      "Edge weights strictly restricted to {0, 1}"
    ],
    complexity: "Time: O(V + E) | Space: O(V)",
    base_template_py: `from collections import deque

def zeroOneBFS(grid):
    rows, cols = len(grid), len(grid[0])
    dist = [[float('inf')] * cols for _ in range(rows)]
    dist[0][0] = 0
    dq = deque([(0, 0)])

    while dq:
        r, c = dq.popleft()
        
        for nr, nc, weight in get_neighbors_with_weights(r, c):
            if dist[r][c] + weight < dist[nr][nc]:
                dist[nr][nc] = dist[r][c] + weight
                if weight == 0:
                    dq.appendleft((nr, nc))  # 0-weight goes to FRONT
                else:
                    dq.append((nr, nc))      # 1-weight goes to BACK

    return dist[rows-1][cols-1]`,
    base_template_cpp: `int zeroOneBFS(int m, int n, vector<vector<int>>& grid) {
    deque<pair<int, int>> dq;
    vector<vector<int>> dist(m, vector<int>(n, 1e9));
    dist[0][0] = 0;
    dq.push_front({0, 0});
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
    twists: [
      {
        title: "Twist 1: Obstacle Removal on Grid",
        explanation: "Empty cell = 0 cost, Obstacle cell = 1 cost (e.g. LC 2290).",
        delta: "Weight is simply grid[nr][nc]."
      },
      {
        title: "Twist 2: Direction Arrows Modification",
        explanation: "Following existing cell arrow costs 0; modifying arrow direction costs 1 (e.g. LC 1368)."
      }
    ]
  },
  {
    id: "dp-interval",
    category: "Dynamic Programming",
    title: "Interval / Range DP",
    difficulty: "Medium-Hard",
    short_description: "Subproblems are defined by continuous intervals [i, j]. Solved by iterating over interval lengths from smallest to largest and choosing an optimal split point k.",
    mental_triggers: [
      "'Merge adjacent elements', 'Burst balloons', 'Palindromic substrings'",
      "Action on element k depends on boundary elements i and j",
      "Cost is accumulated by combining two sub-ranges [i, k] and [k+1, j]"
    ],
    constraint_signals: [
      "N <= 400 or N <= 500 (O(N^3) time complexity fits: 400^3 ≈ 6.4 * 10^7)"
    ],
    complexity: "Time: O(N^3) | Space: O(N^2)",
    base_template_py: `def interval_dp(nums):
    n = len(nums)
    dp = [[0] * n for _ in range(n)]

    # 1. Iterate over interval length L from 1 to n
    for length in range(1, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if length == 1:
                dp[i][j] = base_case(i)
                continue
            
            # 2. Iterate split point k in [i, j)
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k + 1][j] + combine_cost(i, k, j)
                dp[i][j] = min(dp[i][j], cost)

    return dp[0][n - 1]`,
    base_template_cpp: `int intervalDP(vector<int>& nums) {
    int n = nums.size();
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 2; len <= n; ++len) {
        for (int i = 0; i <= n - len; ++i) {
            int j = i + len - 1;
            dp[i][j] = 1e9;
            for (int k = i; k < j; ++k) {
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + cost(i, k, j));
            }
        }
    }
    return dp[0][n-1];
}`,
    twists: [
      {
        title: "Twist 1: Reverse Thinking (Burst Balloons)",
        explanation: "Instead of choosing which balloon to burst first, choose which balloon k is burst LAST in range [i, j]! (LC 312)",
        delta: "Subproblems dp[i][k] and dp[k][j] stay independent because boundary balloons i and j remain intact."
      },
      {
        title: "Twist 2: K-element merges (Stones)",
        explanation: "Merge exactly K adjacent piles into 1 (LC 1000). Length must reduce by (K - 1) each step."
      }
    ]
  },
  {
    id: "dp-state-machine",
    category: "Dynamic Programming",
    title: "State Machine DP",
    difficulty: "Medium",
    short_description: "At each step, the system transitions between 2-4 distinct mutually exclusive states (e.g. Hold, Sold, Cooldown, Reset).",
    mental_triggers: [
      "Stock trading with restrictions (cooldown, transaction fee, max K transactions)",
      "Cannot do action X two days in a row",
      "Mutually exclusive operational modes"
    ],
    constraint_signals: [
      "N <= 10^5 (linear O(N) pass, O(1) space using rolling variables)"
    ],
    complexity: "Time: O(N) | Space: O(1)",
    base_template_py: `def maxProfitWithCooldown(prices):
    # States:
    # hold: currently owning stock
    # sold: just sold today (cannot buy tomorrow)
    # rest: ready to buy
    hold = -float('inf')
    sold = 0
    rest = 0

    for p in prices:
        prev_hold = hold
        prev_sold = sold
        prev_rest = rest
        
        hold = max(prev_hold, prev_rest - p)
        sold = prev_hold + p
        rest = max(prev_rest, prev_sold)

    return max(sold, rest)`,
    base_template_cpp: `int maxProfitWithCooldown(vector<int>& prices) {
    int hold = -1e9, sold = 0, rest = 0;
    for (int p : prices) {
        int prev_hold = hold, prev_sold = sold, prev_rest = rest;
        hold = max(prev_hold, prev_rest - p);
        sold = prev_hold + p;
        rest = max(prev_rest, prev_sold);
    }
    return max(sold, rest);
}`,
    twists: [
      {
        title: "Twist 1: Transaction Fee",
        explanation: "Subtract fee during buy or sell step (e.g. LC 714).",
        delta: "hold = max(hold, rest - price - fee)."
      },
      {
        title: "Twist 2: At most K transactions",
        explanation: "Expand states to an array of K slots (LC 188): buy[k] and sell[k]."
      }
    ]
  },
  {
    id: "stack-monotonic-next-greater",
    category: "Stacks & Queues",
    title: "Monotonic Stack (Next / Previous Greater Element)",
    difficulty: "Medium-Hard",
    short_description: "Maintains elements in strictly increasing or decreasing order. Finding the next/previous greater or smaller element in O(N) time.",
    mental_triggers: [
      "'Next warmer day', 'First element to the right greater than X'",
      "Histogram rectangles, trapping rain water",
      "Finding subarray boundaries where element X is the minimum/maximum"
    ],
    constraint_signals: [
      "N <= 10^5 (O(N^2) nested loop TLEs, requires single O(N) stack pass)"
    ],
    complexity: "Time: O(N) | Space: O(N)",
    base_template_py: `def nextGreaterElements(nums):
    n = len(nums)
    res = [-1] * n
    stack = []  # stores indices, monotonic decreasing stack

    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            res[idx] = nums[i]
        stack.append(i)

    return res`,
    base_template_cpp: `vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, -1);
    stack<int> st; // stores indices
    for (int i = 0; i < n; ++i) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            res[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return res;
}`,
    twists: [
      {
        title: "Twist 1: Largest Rectangle in Histogram",
        explanation: "Popping an index determines the HEIGHT, current index is the RIGHT boundary, new stack top is the LEFT boundary! (LC 84)",
        delta: "Width = (i - stack[-1] - 1). Area = height * width."
      },
      {
        title: "Twist 2: Circular Array",
        explanation: "Iterate 2 * N times using index % N (e.g. LC 503)."
      }
    ]
  },
  {
    id: "two-pointers-window-dynamic",
    category: "Two Pointers",
    title: "Dynamic Sliding Window (Shrink on Invalid)",
    difficulty: "Medium",
    short_description: "Expand the right pointer to include elements, and shrink the left pointer as soon as the window condition is violated.",
    mental_triggers: [
      "'Longest substring with at most K distinct characters'",
      "'Minimum window substring containing all characters of T'",
      "Contiguous subarray with monotonic property (all positive numbers)"
    ],
    constraint_signals: [
      "N <= 10^5 (Two pointers guarantees each element pushed/popped at most once -> O(N))"
    ],
    complexity: "Time: O(N) | Space: O(K) alphabet size",
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
    base_template_cpp: `// Dynamic Sliding window template
int lengthOfLongestSubstringKDistinct(string s, int k) {
    unordered_map<char, int> count;
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.size(); ++right) {
        count[s[right]]++;
        while (count.size() > k) {
            if (--count[s[left]] == 0) count.erase(s[left]);
            left++;
        }
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
    twists: [
      {
        title: "Twist 1: Exact K count -> atMost(K) - atMost(K-1)",
        explanation: "Counting subarrays with EXACTLY K distinct elements (LC 992).",
        delta: "Return countAtMost(k) - countAtMost(k - 1)."
      }
    ]
  },
  {
    id: "binary-search-answer",
    category: "Binary Search",
    title: "Binary Search on Answer Space (Feasibility Invariant)",
    difficulty: "Medium",
    short_description: "When direct optimization is hard, check if guessing the answer X allows an easy greedy feasibility check isValid(X). Monotonicity guarantees binary search works.",
    mental_triggers: [
      "'Minimize the maximum...', 'Maximize the minimum...'",
      "Output is an integer bounded in a known range [low, high]",
      "If condition holds for X, it trivially holds for all values > X (or < X)"
    ],
    constraint_signals: [
      "Range up to 10^9 or 10^14 (log2(10^14) ≈ 47 iterations -> lightning fast)"
    ],
    complexity: "Time: O(N * log(Range)) | Space: O(1)",
    base_template_py: `def shipWithinDays(weights, days):
    def canShip(capacity):
        needed_days = 1
        current_load = 0
        for w in weights:
            if current_load + w > capacity:
                needed_days += 1
                current_load = 0
            current_load += w
        return needed_days <= days

    left, right = max(weights), sum(weights)
    ans = right

    while left <= right:
        mid = (left + right) // 2
        if canShip(mid):
            ans = mid
            right = mid - 1  # try smaller capacity
        else:
            left = mid + 1   # capacity too small, must increase

    return ans`,
    base_template_cpp: `int shipWithinDays(vector<int>& weights, int days) {
    auto canShip = [&](int cap) {
        int d = 1, cur = 0;
        for (int w : weights) {
            if (cur + w > cap) { d++; cur = 0; }
            cur += w;
        }
        return d <= days;
    };
    int low = *max_element(weights.begin(), weights.end());
    int high = accumulate(weights.begin(), weights.end(), 0);
    int ans = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canShip(mid)) { ans = mid; high = mid - 1; }
        else { low = mid + 1; }
    }
    return ans;
}`,
    twists: [
      {
        title: "Twist 1: Floating point precision",
        explanation: "Binary search until high - low < 1e-5 (e.g. geometric centers, speed ratios).",
        delta: "Run fixed 60 iterations: for _ in range(60): mid = (low + high) / 2."
      }
    ]
  }
];
