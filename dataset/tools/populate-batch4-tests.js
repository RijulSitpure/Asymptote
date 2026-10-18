import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

const TESTS = {
  'number-of-islands': `#!/usr/bin/env python3
import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'number-of-islands.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_num_islands(grid):
    if not grid or not grid[0]: return 0
    g = [row[:] for row in grid]
    m, n = len(g), len(g[0])
    count = 0
    for r in range(m):
        for c in range(n):
            if g[r][c] == '1':
                count += 1
                q = [(r, c)]
                g[r][c] = '0'
                while q:
                    cr, cc = q.pop()
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr, nc = cr + dr, cc + dc
                        if 0 <= nr < m and 0 <= nc < n and g[nr][nc] == '1':
                            g[nr][nc] = '0'
                            q.append((nr, nc))
    return count

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([
            ["1","1","1","1","0"],
            ["1","1","0","1","0"],
            ["1","1","0","0","0"],
            ["0","0","0","0","0"]
        ], 1),
        ([
            ["1","1","0","0","0"],
            ["1","1","0","0","0"],
            ["0","0","1","0","0"],
            ["0","0","0","1","1"]
        ], 3),
        ([["0"]], 0),
        ([["1"]], 1),
        ([["1","0"],["0","1"]], 2),
        ([["1","1"],["1","1"]], 1),
        ([], 0)
    ]

    for g, exp in fixed:
        ans = solver.numIslands(copy.deepcopy(g))
        assert ans == exp, f"Failed on fixed: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        m = rng.randint(2, 10)
        n = rng.randint(2, 10)
        g = [[rng.choice(['0', '1']) for _ in range(n)] for _ in range(m)]
        exp = ref_num_islands(g)
        ans = solver.numIslands(copy.deepcopy(g))
        assert ans == exp, f"Failed on random grid: expected {exp}, got {ans}"

    # Scale test: 50x50 grid
    g_large = [[rng.choice(['0', '1']) for _ in range(50)] for _ in range(50)]
    t0 = time.perf_counter()
    _ = solver.numIslands(copy.deepcopy(g_large))
    t1 = time.perf_counter()
    print(f"✓ Number of Islands: fixed and 25 random cases passed. Scale (50x50): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'clone-graph': `#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'clone-graph.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def adj_to_graph(adj):
    if not adj: return None
    nodes = {i + 1: Node(i + 1) for i in range(len(adj))}
    for i, nbrs in enumerate(adj):
        nodes[i + 1].neighbors = [nodes[n] for n in nbrs]
    return nodes[1]

def graph_to_adj(node):
    if not node: return []
    visited = {}
    def dfs(curr):
        if curr.val in visited: return
        visited[curr.val] = curr
        for nbr in curr.neighbors:
            dfs(nbr)
    dfs(node)
    adj = [[] for _ in range(len(visited))]
    for val in sorted(visited.keys()):
        adj[val - 1] = [nbr.val for nbr in visited[val].neighbors]
    return adj

def get_all_nodes(node):
    if not node: return set()
    visited = set()
    def dfs(curr):
        if curr in visited: return
        visited.add(curr)
        for nbr in curr.neighbors:
            dfs(nbr)
    dfs(node)
    return visited

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'Node': Node, 'Optional': Optional}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [[2,4],[1,3],[2,4],[1,3]],
        [[]],
        [],
        [[2],[1]],
        [[2,3],[1,3],[1,2]]
    ]

    for adj in fixed:
        orig = adj_to_graph(adj)
        cloned = solver.cloneGraph(orig)
        assert graph_to_adj(cloned) == adj, f"Topology mismatch for {adj}"
        if orig:
            orig_nodes = get_all_nodes(orig)
            clone_nodes = get_all_nodes(cloned)
            # Verify deep copy (no shared node instances)
            assert len(orig_nodes.intersection(clone_nodes)) == 0, "Clone graph returned shared node references"

    # Scale test: 50 nodes cycle
    adj50 = []
    for i in range(1, 51):
        prev = 50 if i == 1 else i - 1
        nxt = 1 if i == 50 else i + 1
        adj50.append([prev, nxt])
    orig50 = adj_to_graph(adj50)
    t0 = time.perf_counter()
    cloned50 = solver.cloneGraph(orig50)
    t1 = time.perf_counter()
    assert graph_to_adj(cloned50) == adj50
    print(f"✓ Clone Graph: fixed cases and deep copy checks passed. Scale (50 nodes): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'rotting-oranges': `#!/usr/bin/env python3
import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'rotting-oranges.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_oranges(grid):
    g = [row[:] for row in grid]
    m, n = len(g), len(g[0])
    fresh = sum(row.count(1) for row in g)
    if fresh == 0: return 0
    q = [(r, c) for r in range(m) for c in range(n) if g[r][c] == 2]
    minutes = 0
    while q and fresh > 0:
        minutes += 1
        nxt = []
        for r, c in q:
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and g[nr][nc] == 1:
                    g[nr][nc] = 2
                    fresh -= 1
                    nxt.append((nr, nc))
        q = nxt
    return minutes if fresh == 0 else -1

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([[2,1,1],[1,1,0],[0,1,1]], 4),
        ([[2,1,1],[0,1,1],[1,0,1]], -1),
        ([[0,2]], 0),
        ([[1]], -1),
        ([[0]], 0),
        ([[2,2],[1,1],[0,0],[2,0]], 1)
    ]

    for g, exp in fixed:
        ans = solver.orangesRotting(copy.deepcopy(g))
        assert ans == exp, f"Failed on fixed: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        m = rng.randint(2, 8)
        n = rng.randint(2, 8)
        g = [[rng.choice([0, 1, 2]) for _ in range(n)] for _ in range(m)]
        exp = ref_oranges(g)
        ans = solver.orangesRotting(copy.deepcopy(g))
        assert ans == exp, f"Failed on random: expected {exp}, got {ans}"

    # Scale test: 10x10 grid
    g_large = [[rng.choice([1, 2]) for _ in range(10)] for _ in range(10)]
    t0 = time.perf_counter()
    _ = solver.orangesRotting(copy.deepcopy(g_large))
    t1 = time.perf_counter()
    print(f"✓ Rotting Oranges: fixed and 25 random cases passed. Scale (10x10): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'pacific-atlantic-water-flow': `#!/usr/bin/env python3
import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'pacific-atlantic-water-flow.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def norm_cells(cells):
    return sorted([list(c) for c in cells])

def ref_pacific_atlantic(heights):
    if not heights or not heights[0]: return []
    m, n = len(heights), len(heights[0])
    pac, atl = set(), set()
    def dfs(r, c, vis):
        vis.add((r, c))
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in vis and heights[nr][nc] >= heights[r][c]:
                dfs(nr, nc, vis)
    for c in range(n):
        dfs(0, c, pac)
        dfs(m - 1, c, atl)
    for r in range(m):
        dfs(r, 0, pac)
        dfs(r, n - 1, atl)
    return norm_cells(pac & atl)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [
            [1,2,2,3,5],
            [3,2,3,4,4],
            [2,4,5,3,1],
            [6,7,1,4,5],
            [5,1,1,2,4]
        ],
        [[1]],
        [[2,2],[2,2]],
        [[1,2,3],[8,9,4],[7,6,5]]
    ]

    for h in fixed:
        ans = norm_cells(solver.pacificAtlantic(copy.deepcopy(h)))
        exp = ref_pacific_atlantic(h)
        assert ans == exp, f"Failed on fixed: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(20):
        m = rng.randint(2, 6)
        n = rng.randint(2, 6)
        h = [[rng.randint(1, 20) for _ in range(n)] for _ in range(m)]
        ans = norm_cells(solver.pacificAtlantic(copy.deepcopy(h)))
        exp = ref_pacific_atlantic(h)
        assert ans == exp, f"Failed on random grid: expected {exp}, got {ans}"

    # Scale test: 30x30 grid
    h30 = [[rng.randint(1, 100) for _ in range(30)] for _ in range(30)]
    t0 = time.perf_counter()
    _ = solver.pacificAtlantic(copy.deepcopy(h30))
    t1 = time.perf_counter()
    print(f"✓ Pacific Atlantic Water Flow: fixed and 20 random cases passed. Scale (30x30): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'course-schedule': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'course-schedule.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_can_finish(numCourses, prerequisites):
    adj = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses
    for c, p in prerequisites:
        adj[p].append(c)
        indegree[c] += 1
    q = [i for i in range(numCourses) if indegree[i] == 0]
    taken = 0
    while q:
        curr = q.pop()
        taken += 1
        for nxt in adj[curr]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)
    return taken == numCourses

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (2, [[1, 0]], True),
        (2, [[1, 0], [0, 1]], False),
        (1, [], True),
        (3, [[0, 1], [0, 2], [1, 2]], True),
        (3, [[0, 1], [1, 2], [2, 0]], False),
        (4, [[1, 0], [2, 0], [3, 1], [3, 2]], True)
    ]

    for num, prereqs, exp in fixed:
        ans = solver.canFinish(num, [list(p) for p in prereqs])
        assert ans == exp, f"Failed on num={num}, prereqs={prereqs}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        n = rng.randint(2, 15)
        # Random DAG or cyclic graph
        prereqs = []
        for i in range(n):
            for j in range(n):
                if i != j and rng.random() < 0.2:
                    prereqs.append([i, j])
        exp = ref_can_finish(n, prereqs)
        ans = solver.canFinish(n, [list(p) for p in prereqs])
        assert ans == exp, f"Failed on random graph: expected {exp}, got {ans}"

    # Scale test: 500 courses chain
    chain = [[i, i - 1] for i in range(1, 500)]
    t0 = time.perf_counter()
    ans = solver.canFinish(500, chain)
    t1 = time.perf_counter()
    assert ans is True
    print(f"✓ Course Schedule: fixed and 25 random graphs passed. Scale (500 courses): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'redundant-connection': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'redundant-connection.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_redundant(edges):
    parent = list(range(len(edges) + 1))
    def find(i):
        if parent[i] != i:
            parent[i] = find(parent[i])
        return parent[i]
    for u, v in edges:
        ru, rv = find(u), find(v)
        if ru == rv: return [u, v]
        parent[ru] = rv
    return []

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([[1,2],[1,3],[2,3]], [2,3]),
        ([[1,2],[2,3],[3,4],[1,4],[1,5]], [1,4]),
        ([[1,2],[2,3],[1,3]], [1,3])
    ]

    for edges, exp in fixed:
        ans = solver.findRedundantConnection([list(e) for e in edges])
        assert ans == exp, f"Failed on {edges}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        n = rng.randint(4, 25)
        tree_edges = [[i, rng.randint(1, i - 1)] for i in range(2, n + 1)]
        u, v = rng.sample(range(1, n + 1), 2)
        while [min(u, v), max(u, v)] in [[min(a, b), max(a, b)] for a, b in tree_edges]:
            u, v = rng.sample(range(1, n + 1), 2)
        edges = tree_edges + [[u, v]]
        exp = ref_redundant(edges)
        ans = solver.findRedundantConnection([list(e) for e in edges])
        assert ans == exp, f"Failed on random tree + cycle edge: expected {exp}, got {ans}"

    # Scale test: 1,000 edges
    n1000 = 1000
    chain = [[i, i + 1] for i in range(1, n1000)]
    chain.append([1, n1000])
    t0 = time.perf_counter()
    ans = solver.findRedundantConnection(chain)
    t1 = time.perf_counter()
    assert ans == [1, n1000]
    print(f"✓ Redundant Connection: fixed and 25 random graphs passed. Scale (1k edges): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'climbing-stairs': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'climbing-stairs.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_climb(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (1, 1), (2, 2), (3, 3), (4, 5), (5, 8), (10, 89), (45, 1836311903)
    ]

    for n, exp in fixed:
        ans = solver.climbStairs(n)
        assert ans == exp, f"Failed on n={n}: expected {exp}, got {ans}"

    for n in range(1, 46):
        assert solver.climbStairs(n) == ref_climb(n)

    t0 = time.perf_counter()
    _ = solver.climbStairs(45)
    t1 = time.perf_counter()
    print(f"✓ Climbing Stairs: all 45 inputs verified in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'house-robber': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'house-robber.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_rob(nums):
    r1, r2 = 0, 0
    for n in nums:
        r1, r2 = r2, max(r2, r1 + n)
    return r2

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 3, 1], 4),
        ([2, 7, 9, 3, 1], 12),
        ([0], 0),
        ([2, 1, 1, 2], 4),
        ([100], 100),
        ([2, 1], 2),
        ([1, 2], 2)
    ]

    for nums, exp in fixed:
        ans = solver.rob(list(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 40)
        nums = [rng.randint(0, 100) for _ in range(sz)]
        exp = ref_rob(nums)
        ans = solver.rob(list(nums))
        assert ans == exp

    # Scale test: 10,000 houses
    big = [rng.randint(0, 500) for _ in range(10000)]
    t0 = time.perf_counter()
    _ = solver.rob(big)
    t1 = time.perf_counter()
    print(f"✓ House Robber: fixed and 30 random cases passed. Scale (10k houses): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'coin-change': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'coin-change.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a >= c:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != float('inf') else -1

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 5], 11, 3),
        ([2], 3, -1),
        ([1], 0, 0),
        ([1], 1, 1),
        ([1, 3, 4, 5], 7, 2),
        ([2, 5, 10, 1], 27, 4)
    ]

    for coins, amt, exp in fixed:
        ans = solver.coinChange(list(coins), amt)
        assert ans == exp, f"Failed on coins={coins}, amount={amt}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        c_count = rng.randint(1, 5)
        coins = sorted(list(set(rng.randint(1, 15) for _ in range(c_count))))
        amt = rng.randint(0, 80)
        exp = ref_coin_change(coins, amt)
        ans = solver.coinChange(list(coins), amt)
        assert ans == exp, f"Failed on coins={coins}, amount={amt}: expected {exp}, got {ans}"

    # Scale test: amount = 5,000
    t0 = time.perf_counter()
    ans = solver.coinChange([1, 2, 5], 5000)
    t1 = time.perf_counter()
    assert ans == 1000
    print(f"✓ Coin Change: fixed and 25 random cases passed. Scale (amount=5000): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'longest-increasing-subsequence': `#!/usr/bin/env python3
import json, os, re, random, time, bisect

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'longest-increasing-subsequence.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_lis(nums):
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails): tails.append(x)
        else: tails[idx] = x
    return len(tails)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'bisect': bisect}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([10, 9, 2, 5, 3, 7, 101, 18], 4),
        ([0, 1, 0, 3, 2, 3], 4),
        ([7, 7, 7, 7, 7, 7, 7], 1),
        ([1], 1),
        ([4, 10, 4, 3, 8, 9], 3),
        ([1, 3, 6, 7, 9, 4, 10, 5, 6], 6)
    ]

    for nums, exp in fixed:
        ans = solver.lengthOfLIS(list(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 50)
        nums = [rng.randint(-500, 500) for _ in range(sz)]
        exp = ref_lis(nums)
        ans = solver.lengthOfLIS(list(nums))
        assert ans == exp

    # Scale test: N = 2,500
    big = [rng.randint(-10000, 10000) for _ in range(2500)]
    t0 = time.perf_counter()
    ans = solver.lengthOfLIS(big)
    t1 = time.perf_counter()
    assert ans == ref_lis(big)
    print(f"✓ Longest Increasing Subsequence: fixed and 30 random cases passed. Scale (2.5k nums): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'word-break': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'word-break.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_word_break(s, wordDict):
    words = set(wordDict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[n]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("leetcode", ["leet", "code"], True),
        ("applepenapple", ["apple", "pen"], True),
        ("catsandog", ["cats", "dog", "sand", "and", "cat"], False),
        ("a", ["a"], True),
        ("a", ["b"], False),
        ("aaaaaaa", ["aaaa", "aaa"], True)
    ]

    for s, w_dict, exp in fixed:
        ans = solver.wordBreak(s, list(w_dict))
        assert ans == exp, f"Failed on s={s}, words={w_dict}: expected {exp}, got {ans}"

    rng = random.Random(42)
    letters = 'abcd'
    for _ in range(25):
        w_dict = list(set(''.join(rng.choice(letters) for _ in range(rng.randint(1, 4))) for _ in range(8)))
        s_len = rng.randint(1, 15)
        s = ''.join(rng.choice(letters) for _ in range(s_len))
        exp = ref_word_break(s, w_dict)
        ans = solver.wordBreak(s, list(w_dict))
        assert ans == exp, f"Failed on random s={s}: expected {exp}, got {ans}"

    # Scale test
    s_scale = "a" * 299 + "b"
    words_scale = ["a", "aa", "aaa", "aaaa"]
    t0 = time.perf_counter()
    ans = solver.wordBreak(s_scale, words_scale)
    t1 = time.perf_counter()
    assert ans is False
    print(f"✓ Word Break: fixed and 25 random cases passed. Scale (N=300): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'partition-equal-subset-sum': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'partition-equal-subset-sum.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_partition(nums):
    total = sum(nums)
    if total % 2 != 0: return False
    target = total // 2
    dp = {0}
    for n in nums:
        next_dp = set(dp)
        for t in dp:
            if t + n == target: return True
            if t + n < target: next_dp.add(t + n)
        dp = next_dp
    return target in dp

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 5, 11, 5], True),
        ([1, 2, 3, 5], False),
        ([1, 1], True),
        ([2, 2, 2, 2], True),
        ([100], False),
        ([1, 2, 5], False)
    ]

    for nums, exp in fixed:
        ans = solver.canPartition(list(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        sz = rng.randint(2, 20)
        nums = [rng.randint(1, 30) for _ in range(sz)]
        exp = ref_partition(nums)
        ans = solver.canPartition(list(nums))
        assert ans == exp

    # Scale test: 100 elements
    nums100 = [2] * 100
    t0 = time.perf_counter()
    ans = solver.canPartition(nums100)
    t1 = time.perf_counter()
    assert ans is True
    print(f"✓ Partition Equal Subset Sum: fixed and 25 random cases passed. Scale (100 nums): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'unique-paths': `#!/usr/bin/env python3
import json, os, re, random, time, math

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'unique-paths.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_unique_paths(m, n):
    return math.comb(m + n - 2, m - 1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (3, 7, 28),
        (3, 2, 3),
        (1, 1, 1),
        (1, 10, 1),
        (10, 1, 1),
        (3, 3, 6),
        (7, 3, 28)
    ]

    for m, n, exp in fixed:
        ans = solver.uniquePaths(m, n)
        assert ans == exp, f"Failed on m={m}, n={n}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        m = rng.randint(1, 20)
        n = rng.randint(1, 20)
        exp = ref_unique_paths(m, n)
        ans = solver.uniquePaths(m, n)
        assert ans == exp, f"Failed on m={m}, n={n}: expected {exp}, got {ans}"

    # Scale test: 50x50
    t0 = time.perf_counter()
    ans = solver.uniquePaths(50, 50)
    t1 = time.perf_counter()
    assert ans == ref_unique_paths(50, 50)
    print(f"✓ Unique Paths: fixed and 25 random cases passed. Scale (50x50): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'longest-common-subsequence': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'longest-common-subsequence.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("abcde", "ace", 3),
        ("abc", "abc", 3),
        ("abc", "def", 0),
        ("ezupkr", "ubmrapg", 2),
        ("oxcp", "qrsvwf", 0),
        ("a", "a", 1)
    ]

    for t1, t2, exp in fixed:
        ans = solver.longestCommonSubsequence(t1, t2)
        assert ans == exp, f"Failed on '{t1}', '{t2}': expected {exp}, got {ans}"

    rng = random.Random(42)
    letters = 'abcdef'
    for _ in range(25):
        s1 = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 20)))
        s2 = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 20)))
        exp = ref_lcs(s1, s2)
        ans = solver.longestCommonSubsequence(s1, s2)
        assert ans == exp, f"Failed on '{s1}', '{s2}': expected {exp}, got {ans}"

    # Scale test: 300x300
    big1 = ''.join(rng.choice(letters) for _ in range(300))
    big2 = ''.join(rng.choice(letters) for _ in range(300))
    t0 = time.perf_counter()
    ans = solver.longestCommonSubsequence(big1, big2)
    t1 = time.perf_counter()
    assert ans == ref_lcs(big1, big2)
    print(f"✓ Longest Common Subsequence: fixed and 25 random cases passed. Scale (300x300): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'jump-game': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'jump-game.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_can_jump(nums):
    max_reach = 0
    for i, n in enumerate(nums):
        if i > max_reach: return False
        max_reach = max(max_reach, i + n)
        if max_reach >= len(nums) - 1: return True
    return True

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([2, 3, 1, 1, 4], True),
        ([3, 2, 1, 0, 4], False),
        ([0], True),
        ([2, 0, 0], True),
        ([1, 0, 1, 0], False),
        ([1, 1, 1, 1], True)
    ]

    for nums, exp in fixed:
        ans = solver.canJump(list(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 50)
        nums = [rng.randint(0, 5) for _ in range(sz)]
        exp = ref_can_jump(nums)
        ans = solver.canJump(list(nums))
        assert ans == exp

    # Scale test: 50,000 jumps
    big = [1] * 50000
    t0 = time.perf_counter()
    ans = solver.canJump(big)
    t1 = time.perf_counter()
    assert ans is True
    print(f"✓ Jump Game: fixed and 30 random cases passed. Scale (50k elements): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'merge-intervals': `#!/usr/bin/env python3
import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'merge-intervals.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_merge(intervals):
    if not intervals: return []
    intervals = sorted([list(x) for x in intervals], key=lambda x: x[0])
    merged = [intervals[0]]
    for curr in intervals[1:]:
        prev = merged[-1]
        if curr[0] <= prev[1]:
            prev[1] = max(prev[1], curr[1])
        else:
            merged.append(curr)
    return merged

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([[1,3],[2,6],[8,10],[15,18]], [[1,6],[8,10],[15,18]]),
        ([[1,4],[4,5]], [[1,5]]),
        ([[1,4],[2,3]], [[1,4]]),
        ([[1,4]], [[1,4]]),
        ([], []),
        ([[1,4],[0,4]], [[0,4]]),
        ([[1,4],[0,0]], [[0,0],[1,4]])
    ]

    for intervals, exp in fixed:
        ans = solver.merge(copy.deepcopy(intervals))
        assert ans == exp, f"Failed on {intervals}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        n = rng.randint(1, 20)
        intervals = []
        for _ in range(n):
            s = rng.randint(0, 50)
            e = s + rng.randint(0, 20)
            intervals.append([s, e])
        exp = ref_merge(intervals)
        ans = solver.merge(copy.deepcopy(intervals))
        assert ans == exp, f"Failed on {intervals}: expected {exp}, got {ans}"

    # Scale test: 10,000 intervals
    big = []
    for _ in range(10000):
        s = rng.randint(0, 100000)
        big.append([s, s + rng.randint(0, 100)])
    t0 = time.perf_counter()
    ans = solver.merge(copy.deepcopy(big))
    t1 = time.perf_counter()
    assert len(ans) <= len(big)
    print(f"✓ Merge Intervals: fixed and 30 random cases passed. Scale (10k intervals): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'non-overlapping-intervals': `#!/usr/bin/env python3
import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'non-overlapping-intervals.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_erase(intervals):
    if not intervals: return 0
    intervals = sorted([list(x) for x in intervals], key=lambda x: x[1])
    count = 0
    prev_end = intervals[0][1]
    for i in range(1, len(intervals)):
        if intervals[i][0] < prev_end:
            count += 1
        else:
            prev_end = intervals[i][1]
    return count

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([[1,2],[2,3],[3,4],[1,3]], 1),
        ([[1,2],[1,2],[1,2]], 2),
        ([[1,2],[2,3]], 0),
        ([[1,100],[11,22],[1,11],[2,12]], 2),
        ([], 0),
        ([[1,2]], 0)
    ]

    for intervals, exp in fixed:
        ans = solver.eraseOverlapIntervals(copy.deepcopy(intervals))
        assert ans == exp, f"Failed on {intervals}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        n = rng.randint(1, 20)
        intervals = []
        for _ in range(n):
            s = rng.randint(0, 50)
            e = s + rng.randint(1, 20)
            intervals.append([s, e])
        exp = ref_erase(intervals)
        ans = solver.eraseOverlapIntervals(copy.deepcopy(intervals))
        assert ans == exp, f"Failed on {intervals}: expected {exp}, got {ans}"

    # Scale test: 10,000 intervals
    big = []
    for _ in range(10000):
        s = rng.randint(0, 100000)
        big.append([s, s + rng.randint(1, 100)])
    t0 = time.perf_counter()
    ans = solver.eraseOverlapIntervals(copy.deepcopy(big))
    t1 = time.perf_counter()
    assert ans == ref_erase(big)
    print(f"✓ Non-overlapping Intervals: fixed and 30 random cases passed. Scale (10k intervals): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`,

  'counting-bits': `#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'counting-bits.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_count_bits(n):
    return [bin(x).count('1') for x in range(n + 1)]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (2, [0, 1, 1]),
        (5, [0, 1, 1, 2, 1, 2]),
        (0, [0]),
        (1, [0, 1]),
        (8, [0, 1, 1, 2, 1, 2, 2, 3, 1])
    ]

    for n, exp in fixed:
        ans = solver.countBits(n)
        assert ans == exp, f"Failed on n={n}: expected {exp}, got {ans}"

    for n in range(50):
        assert solver.countBits(n) == ref_count_bits(n)

    # Scale test: n = 100,000
    t0 = time.perf_counter()
    ans = solver.countBits(100000)
    t1 = time.perf_counter()
    assert len(ans) == 100001
    assert ans[100000] == bin(100000).count('1')
    print(f"✓ Counting Bits: fixed and random cases passed. Scale (N=100k): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
`
};

export function writeBatch4Tests() {
  const testsDir = path.join(rootDir, 'dataset', 'tests');
  for (const [slug, testScript] of Object.entries(TESTS)) {
    const slugDir = path.join(testsDir, slug);
    fs.mkdirSync(slugDir, { recursive: true });
    const targetFile = path.join(slugDir, 'test.py');
    fs.writeFileSync(targetFile, testScript, { encoding: 'utf8', mode: 0o755 });
    console.log(`✓ Wrote ${targetFile}`);
  }
  console.log(`✓ Successfully generated ${Object.keys(TESTS).length} test.py files for Batch 4`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeBatch4Tests();
}
