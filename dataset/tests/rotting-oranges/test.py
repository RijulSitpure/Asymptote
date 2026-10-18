#!/usr/bin/env python3
import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'rotting-oranges.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
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
