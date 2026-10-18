#!/usr/bin/env python3
import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'pacific-atlantic-water-flow.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
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
