#!/usr/bin/env python3
import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'number-of-islands.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
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
