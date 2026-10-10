/**
 * Curated Problem Seed with Socratic Progressive Hints, Triggers, and Twists
 */

export const PROBLEMS = [
  {
    frontend_id: "787",
    title: "Cheapest Flights Within K Stops",
    title_slug: "cheapest-flights-within-k-stops",
    difficulty: "Medium",
    pattern_id: "graph-dp-k-steps",
    twist_type: "Bounded Edge Count (Bellman-Ford / DP state expansion)",
    constraints: "n <= 100, flights.length <= (n * (n - 1) / 2), 0 <= src, dst < n, 0 <= k < n",
    summary: "There are n cities connected by some number of flights. Given flights, src, dst, and k, return the cheapest price from src to dst with at most k stops. If no route exists, return -1.",
    trigger_clues: [
      "Constraint 'at most k stops' prevents standard Dijkstra directly without state expansion",
      "Notice k is small (k <= 100), making Bellman-Ford O(k * E) extremely fast",
      "Graph has positive weights and possible cycles"
    ],
    hints_progressive: [
      {
        level: 1,
        title: "The Core Recognition Clue",
        content: "Why does standard Dijkstra fail if you only track visited[node]? Because an earlier path to node X might cost less money but consume 4 stops, blocking a slightly more expensive 1-stop path that could have reached the destination within K stops! Thus, the subproblem must account for step count."
      },
      {
        level: 2,
        title: "State & Space Formulation",
        content: "What does 'at most K stops' mean? It means taking at most (K + 1) flight edges. This matches the Bellman-Ford formulation: after iteration 'i', dist[u] represents the cheapest cost to reach node u using at most 'i' edges."
      },
      {
        level: 3,
        title: "The Invariant & Pitfall to Avoid",
        content: "CRITICAL PITFALL: When relaxing edges in step i, you MUST use the distances from step (i - 1), NOT the ones updated in step i! Otherwise, a flight from A -> B and B -> C could be traversed in the SAME step, consuming 2 edges in 1 round. Always clone dist before relaxing: temp = list(dist)."
      },
      {
        level: 4,
        title: "Code Skeleton",
        content: `dist = [inf] * n
dist[src] = 0

for _ in range(k + 1):
    temp = list(dist) # snapshot previous round
    for u, v, price in flights:
        if dist[u] != inf and dist[u] + price < temp[v]:
            temp[v] = dist[u] + price
    dist = temp

return dist[dst] if dist[dst] != inf else -1`
      }
    ],
    solution_python: `class Solution:
    def findCheapestPrice(self, n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
        dist = [float('inf')] * n
        dist[src] = 0

        for _ in range(k + 1):
            temp = list(dist)
            for u, v, price in flights:
                if dist[u] != float('inf') and dist[u] + price < temp[v]:
                    temp[v] = dist[u] + price
            dist = temp

        return dist[dst] if dist[dst] != float('inf') else -1`,
    is_solved: 1,
    solved_at: "2026-10-09T18:20:00.000Z",
    user_notes: "Remember to clone dist to temp every round to prevent cascading edges in a single step!",
    user_rating: 4,
    review_needed: 0
  },
  {
    frontend_id: "329",
    title: "Longest Increasing Path in a Matrix",
    title_slug: "longest-increasing-path-in-a-matrix",
    difficulty: "Hard",
    pattern_id: "graph-dp-dag",
    twist_type: "Implicit DAG on 2D Matrix (Strict Ordering eliminates cycles)",
    constraints: "m == matrix.length, n == matrix[i].length, 1 <= m, n <= 200, 0 <= matrix[i][j] <= 2^31 - 1",
    summary: "Given an m x n integers matrix, return the length of the longest increasing path in matrix. You may move in four directions (up, down, left, right).",
    trigger_clues: [
      "Strictly increasing: matrix[nr][nc] > matrix[r][c] guarantees NO CYCLES (a cycle would require x1 < x2 < ... < x1, impossible!)",
      "A directed graph without cycles is a DAG!",
      "Longest path in a DAG can be solved in O(V + E) with memoized DFS."
    ],
    hints_progressive: [
      {
        level: 1,
        title: "The Core Recognition Clue",
        content: "Notice the word 'strictly increasing'. Can you ever loop back to a cell you already visited? No! Because every step strictly increases the cell value. That means this matrix is an IMPLICIT Directed Acyclic Graph (DAG) with M * N nodes."
      },
      {
        level: 2,
        title: "Subproblem & State Formulation",
        content: "Define dfs(r, c) = the length of the longest increasing path starting at cell (r, c). Because there are no cycles, the subproblem depends ONLY on cells with strictly larger values."
      },
      {
        level: 3,
        title: "Transition Recurrence",
        content: "For cell (r, c), check all 4 neighbors (nr, nc). If matrix[nr][nc] > matrix[r][c], path length is 1 + dfs(nr, nc). If no neighbor is larger, the base case is 1. Memoize this: dp[r][c] = 1 + max([0] + [dfs(nr, nc) for valid neighbors])."
      },
      {
        level: 4,
        title: "Code Skeleton",
        content: `@cache
def dfs(r, c):
    ans = 1
    for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
        nr, nc = r + dr, c + dc
        if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
            ans = max(ans, 1 + dfs(nr, nc))
    return ans

return max(dfs(r, c) for r in range(m) for c in range(n))`
      }
    ],
    solution_python: `from functools import cache

class Solution:
    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:
        if not matrix or not matrix[0]:
            return 0
        m, n = len(matrix), len(matrix[0])

        @cache
        def dfs(r, c):
            best = 1
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                    best = max(best, 1 + dfs(nr, nc))
            return best

        return max(dfs(r, c) for r in range(m) for c in range(n))`,
    is_solved: 1,
    solved_at: "2026-10-08T14:15:00.000Z",
    user_notes: "Strictly increasing property implies DAG, which means zero cycles and straightforward memoization.",
    user_rating: 5,
    review_needed: 0
  },
  {
    frontend_id: "847",
    title: "Shortest Path Visiting All Nodes",
    title_slug: "shortest-path-visiting-all-nodes",
    difficulty: "Hard",
    pattern_id: "graph-bitmask-all-nodes",
    twist_type: "State Bitmask BFS (Node revisiting allowed)",
    constraints: "n == graph.length, 1 <= n <= 12, 0 <= graph[i].length < n",
    summary: "You have an undirected, connected graph of n nodes. Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.",
    trigger_clues: [
      "Constraint n <= 12 is the dead giveaway! 2^12 = 4096 states.",
      "'Visits every node' means we need to know WHICH nodes have been visited so far.",
      "Revisiting nodes is allowed, so simple visited[node] fails. State must be (node, visited_bitmask)."
    ],
    hints_progressive: [
      {
        level: 1,
        title: "The Constraint Secret",
        content: "Look at N: N is between 1 and 12. Whenever N <= 15 and the problem asks to visit all nodes, think BITMASK DP or Multi-source BFS with Bitmask. 2^12 = 4096. Total states = 12 * 4096 ≈ 4.9 * 10^4."
      },
      {
        level: 2,
        title: "BFS State Representation",
        content: "Why BFS? Because edge weights are all 1! In an unweighted graph, standard BFS finds the shortest path. We want the shortest steps to reach mask = (1 << n) - 1. Queue elements should be: (node, bitmask, distance)."
      },
      {
        level: 3,
        title: "Multi-Source Initialization",
        content: "The problem states you can START at ANY node! So initialize the BFS queue by pushing (i, 1 << i, 0) for every node i from 0 to n-1. Visited set will record (node, mask)."
      },
      {
        level: 4,
        title: "Code Skeleton",
        content: `target = (1 << n) - 1
q = deque([(i, 1 << i, 0) for i in range(n)])
seen = set([(i, 1 << i) for i in range(n)])

while q:
    u, mask, dist = q.popleft()
    if mask == target: return dist
    for v in graph[u]:
        nmask = mask | (1 << v)
        if (v, nmask) not in seen:
            seen.add((v, nmask))
            q.append((v, nmask, dist + 1))`
      }
    ],
    solution_python: `from collections import deque

class Solution:
    def shortestPathLength(self, graph: list[list[int]]) -> int:
        n = len(graph)
        target = (1 << n) - 1
        queue = deque([(i, 1 << i, 0) for i in range(n)])
        visited = set([(i, 1 << i) for i in range(n)])

        while queue:
            node, mask, dist = queue.popleft()
            if mask == target:
                return dist
            for neighbor in graph[node]:
                next_mask = mask | (1 << neighbor)
                if (neighbor, next_mask) not in visited:
                    visited.add((neighbor, next_mask))
                    queue.append((neighbor, next_mask, dist + 1))
        return 0`,
    is_solved: 0,
    solved_at: null,
    user_notes: "",
    user_rating: 0,
    review_needed: 1
  },
  {
    frontend_id: "312",
    title: "Burst Balloons",
    title_slug: "burst-balloons",
    difficulty: "Hard",
    pattern_id: "dp-interval",
    twist_type: "Reverse Order Thinking (Choose LAST burst balloon in interval)",
    constraints: "n == nums.length, 1 <= n <= 300, 0 <= nums[i] <= 100",
    summary: "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it. Bursting balloon i gives nums[i-1] * nums[i] * nums[i+1] coins. Find the maximum coins you can collect by bursting balloons wisely.",
    trigger_clues: [
      "Constraint n <= 300 screams O(N^3) Interval DP!",
      "Bursting an element joins its left and right neighbors (boundary interaction)",
      "Reverse logic: picking which balloon to burst FIRST causes subproblems to interact; picking which balloon bursts LAST makes subproblems independent!"
    ],
    hints_progressive: [
      {
        level: 1,
        title: "The Forward Trap vs Reverse Insight",
        content: "If you pick which balloon to burst FIRST in range [i, j], the remaining balloons on the left and right now become adjacent to each other! Their future coins depend on what happens on the other side. This destroys subproblem independence! What if we invert time and pick which balloon is burst LAST?"
      },
      {
        level: 2,
        title: "The Independence Invariant",
        content: "If balloon k is burst LAST in range (i, j), then during the entire process of bursting other balloons in (i, k) and (k, j), balloon k, balloon i, and balloon j remain unburst! That means the subproblems (i, k) and (k, j) are completely independent!"
      },
      {
        level: 3,
        title: "Recurrence Relation",
        content: "Pad array with 1 at both ends: nums = [1] + nums + [1]. dp[i][j] = max coins from bursting all balloons strictly BETWEEN i and j. dp[i][j] = max_{k=i+1}^{j-1} (dp[i][k] + dp[k][j] + nums[i] * nums[k] * nums[j])."
      },
      {
        level: 4,
        title: "Code Skeleton",
        content: `nums = [1] + nums + [1]
n = len(nums)
dp = [[0] * n for _ in range(n)]

for length in range(2, n): # window size
    for left in range(0, n - length):
        right = left + length
        for k in range(left + 1, right):
            coins = dp[left][k] + dp[k][right] + nums[left] * nums[k] * nums[right]
            dp[left][right] = max(dp[left][right], coins)

return dp[0][n - 1]`
      }
    ],
    solution_python: `class Solution:
    def maxCoins(self, nums: list[int]) -> int:
        nums = [1] + [x for x in nums if x > 0] + [1]
        n = len(nums)
        dp = [[0] * n for _ in range(n)]

        for length in range(2, n):
            for left in range(n - length):
                right = left + length
                for k in range(left + 1, right):
                    coins = dp[left][k] + dp[k][right] + nums[left] * nums[k] * nums[right]
                    if coins > dp[left][right]:
                        dp[left][right] = coins

        return dp[0][n - 1]`,
    is_solved: 0,
    solved_at: null,
    user_notes: "",
    user_rating: 0,
    review_needed: 1
  },
  {
    frontend_id: "834",
    title: "Sum of Distances in Tree",
    title_slug: "sum-of-distances-in-tree",
    difficulty: "Hard",
    pattern_id: "graph-tree-rerooting",
    twist_type: "2-Pass Rerooting DP (Subtree Size Delta Accounting)",
    constraints: "n <= 3 * 10^4, edges.length == n - 1",
    summary: "There is an undirected connected tree with n nodes labeled from 0 to n - 1. Return an array ans of length n where ans[i] is the sum of the distances between the ith node and all other nodes in the tree.",
    trigger_clues: [
      "Constraint N = 3 * 10^4. Running BFS from each node takes O(N^2) ≈ 9 * 10^8 operations (TLE).",
      "We need answers for ALL nodes as root.",
      "Moving root across an edge (u -> v) shifts distances systematically."
    ],
    hints_progressive: [
      {
        level: 1,
        title: "The Delta Observation",
        content: "Suppose you know ans[u] (the sum of distances when u is the root). If you shift the root across edge (u, v) to v: What happens to the distances? Every node in v's subtree gets 1 step CLOSER to the root! Every other node (N - count[v]) gets 1 step FURTHER!"
      },
      {
        level: 2,
        title: "The Formula",
        content: "ans[v] = ans[u] - count[v] + (N - count[v]) = ans[u] + N - 2 * count[v]. Where count[v] is the number of nodes in v's subtree when rooted at 0."
      },
      {
        level: 3,
        title: "The 2-Pass Strategy",
        content: "Pass 1 (Post-order / Bottom-Up): Root the tree arbitrarily at node 0. Compute count[i] for every subtree and ans[0] (distances from node 0). Pass 2 (Pre-order / Top-Down): Traverse down from node 0 and propagate ans[v] using the formula."
      },
      {
        level: 4,
        title: "Code Skeleton",
        content: `def dfs_base(u, p):
    for v in adj[u]:
        if v != p:
            dfs_base(v, u)
            count[u] += count[v]
            ans[u] += ans[v] + count[v]

def dfs_reroot(u, p):
    for v in adj[u]:
        if v != p:
            ans[v] = ans[u] - count[v] + (n - count[v])
            dfs_reroot(v, u)`
      }
    ],
    solution_python: `class Solution:
    def sumOfDistancesInTree(self, n: int, edges: list[list[int]]) -> list[int]:
        from collections import defaultdict
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        count = [1] * n
        ans = [0] * n

        def dfs1(u, p):
            for v in adj[u]:
                if v != p:
                    dfs1(v, u)
                    count[u] += count[v]
                    ans[u] += ans[v] + count[v]

        def dfs2(u, p):
            for v in adj[u]:
                if v != p:
                    ans[v] = ans[u] - count[v] + (n - count[v])
                    dfs2(v, u)

        dfs1(0, -1)
        dfs2(0, -1)
        return ans`,
    is_solved: 0,
    solved_at: null,
    user_notes: "",
    user_rating: 0,
    review_needed: 1
  },
  {
    frontend_id: "1368",
    title: "Minimum Cost to Make at Least One Valid Path in a Grid",
    title_slug: "minimum-cost-to-make-at-least-one-valid-path-in-a-grid",
    difficulty: "Hard",
    pattern_id: "graph-01-bfs",
    twist_type: "0/1 BFS Deque Optimization (Cost 0 vs Cost 1)",
    constraints: "m == grid.length, n == grid[i].length, 1 <= m, n <= 100",
    summary: "Given an m x n grid, each cell has a sign pointing right, left, lower, or upper. You can modify sign at cost 1. Return the minimum cost to make at least one valid path from (0,0) to (m-1, n-1).",
    trigger_clues: [
      "Edge weights are only 0 (following existing sign) or 1 (modifying sign)",
      "Dijkstra runs in O(V log V), but 0/1 BFS runs in O(V) using a Deque!",
      "Whenever edge weights are binary {0, 1}, 0/1 BFS is the golden standard."
    ],
    hints_progressive: [
      {
        level: 1,
        title: "Recognizing 0/1 Cost",
        content: "If moving from (r, c) to (nr, nc) aligns with grid[r][c]'s direction, cost is 0. If you change the direction, cost is 1. All edges have weight 0 or 1. This is a classic 0/1 BFS."
      },
      {
        level: 2,
        title: "Deque Mechanism",
        content: "In BFS, queue elements are sorted by distance. If an edge has weight 0, the neighbor has the SAME distance as the current node, so push it to the FRONT of the deque! If weight 1, push it to the BACK. This maintains monotonic order without a heap!"
      },
      {
        level: 3,
        title: "Early Termination",
        content: "The first time you pop (m - 1, n - 1) from the front of the deque, its distance is guaranteed to be minimal."
      },
      {
        level: 4,
        title: "Code Skeleton",
        content: `dq = deque([(0, 0, 0)]) # (r, c, cost)
dist = [[inf] * n for _ in range(m)]
dist[0][0] = 0

while dq:
    r, c, cost = dq.popleft()
    if r == m - 1 and c == n - 1: return cost
    for d, (dr, dc) in enumerate(dirs, 1):
        nr, nc = r + dr, c + dc
        if 0 <= nr < m and 0 <= nc < n:
            weight = 0 if grid[r][c] == d else 1
            if cost + weight < dist[nr][nc]:
                dist[nr][nc] = cost + weight
                if weight == 0: dq.appendleft((nr, nc, cost))
                else: dq.append((nr, nc, cost + 1))`
      }
    ],
    solution_python: `from collections import deque

class Solution:
    def minCost(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        dist = [[float('inf')] * n for _ in range(m)]
        dist[0][0] = 0
        dq = deque([(0, 0, 0)])

        while dq:
            r, c, cost = dq.popleft()
            if r == m - 1 and c == n - 1:
                return cost
            if cost > dist[r][c]:
                continue
            for d, (dr, dc) in enumerate(dirs, 1):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    weight = 0 if grid[r][c] == d else 1
                    if cost + weight < dist[nr][nc]:
                        dist[nr][nc] = cost + weight
                        if weight == 0:
                            dq.appendleft((nr, nc, cost))
                        else:
                            dq.append((nr, nc, cost + 1))
        return dist[m-1][n-1]`,
    is_solved: 0,
    solved_at: null,
    user_notes: "",
    user_rating: 0,
    review_needed: 1
  },
  {
    frontend_id: "739",
    title: "Daily Temperatures",
    title_slug: "daily-temperatures",
    difficulty: "Medium",
    pattern_id: "stack-monotonic-next-greater",
    twist_type: "Index Distance instead of Value (Monotonic Decreasing Stack)",
    constraints: "1 <= temperatures.length <= 10^5, 30 <= temperatures[i] <= 100",
    summary: "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.",
    trigger_clues: [
      "Constraint N = 10^5 means O(N^2) nested loop fails",
      "'Next warmer day' is the classic Next Greater Element problem",
      "Store indices on the stack so you can compute distance: i - prev_idx"
    ],
    hints_progressive: [
      {
        level: 1,
        title: "Recognizing Monotonic Stack",
        content: "Any question asking 'for each element, find the first element to its right that is greater/smaller' is solvable in O(N) using a Monotonic Stack."
      },
      {
        level: 2,
        title: "Stack Invariant",
        content: "Maintain a stack of indices with decreasing temperatures. When a warmer day arrives, it acts as the 'next warmer day' for everything smaller currently on top of the stack!"
      },
      {
        level: 3,
        title: "Index Distance",
        content: "Pop the index prev_i. The waiting days is simply i - prev_i. Put answer[prev_i] = i - prev_i."
      },
      {
        level: 4,
        title: "Code Skeleton",
        content: `n = len(temperatures)
res = [0] * n
stack = [] # stores indices

for i, temp in enumerate(temperatures):
    while stack and temp > temperatures[stack[-1]]:
        prev = stack.pop()
        res[prev] = i - prev
    stack.append(i)

return res`
      }
    ],
    solution_python: `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        n = len(temperatures)
        res = [0] * n
        stack = []

        for i, t in enumerate(temperatures):
            while stack and t > temperatures[stack[-1]]:
                prev_idx = stack.pop()
                res[prev_idx] = i - prev_idx
            stack.append(i)

        return res`,
    is_solved: 1,
    solved_at: "2026-10-07T10:00:00.000Z",
    user_notes: "Store indices in monotonic decreasing stack so the answer is just i - stack.pop().",
    user_rating: 5,
    review_needed: 0
  }
];
