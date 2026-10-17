#!/usr/bin/env python3
import json
import os
import re
import sys
import time
import random
import heapq
from collections import deque

def load_problem():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base_dir, '..', '..', 'problems', 'minimum-cost-to-make-at-least-one-valid-path-in-a-grid.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    hint4 = prob['hints'][3]['text']
    m = re.search(r'```python\n(.*?)\n```', hint4, re.DOTALL)
    if not m:
        raise ValueError("Could not extract Python code block from Hint 4")
    return m.group(1)

def reference_min_cost(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])
    dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    dist = [[float('inf')] * n for _ in range(m)]
    dist[0][0] = 0
    pq = [(0, 0, 0)]
    while pq:
        cost, r, c = heapq.heappop(pq)
        if r == m - 1 and c == n - 1:
            return cost
        if cost > dist[r][c]:
            continue
        for d, (dr, dc) in enumerate(dirs, 1):
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                w = 0 if grid[r][c] == d else 1
                if cost + w < dist[nr][nc]:
                    dist[nr][nc] = cost + w
                    heapq.heappush(pq, (cost + w, nr, nc))
    return int(dist[m - 1][n - 1])

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)

    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code exactly"

    scope = {}
    exec(sol_code, scope)
    SolutionClass = scope['Solution']
    solver = SolutionClass()

    # Fixed edge cases
    fixed_cases = [
        ([[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1], [2, 2, 2, 2]], 3),
        ([[1, 1, 3], [3, 2, 2], [1, 1, 4]], 0),
        ([[1, 2], [4, 3]], 1),
        ([[1]], 0),
        ([[2]], 0),
        ([[1, 1, 1]], 0),
        ([[2, 2, 2]], 2),
        ([[3], [3], [3]], 0),
        ([[4], [4], [4]], 2)
    ]

    for grid, expected in fixed_cases:
        actual = solver.minCost(grid)
        ref = reference_min_cost(grid)
        assert actual == expected, f"Failed on {grid}: expected {expected}, got {actual}"
        assert ref == expected, f"Reference mismatch on {grid}: expected {expected}, got {ref}"

    # Seeded random tests against Dijkstra reference
    rng = random.Random(42)
    random_cases_passed = 0
    for _ in range(40):
        rows = rng.randint(2, 10)
        cols = rng.randint(2, 10)
        grid = [[rng.randint(1, 4) for _ in range(cols)] for _ in range(rows)]
        ref = reference_min_cost(grid)
        actual = solver.minCost(grid)
        assert actual == ref, f"Random test failed: expected {ref}, got {actual}"
        random_cases_passed += 1

    # Timing benchmark
    sizes = [(10, 10), (30, 30), (70, 70)]
    timings = []
    for r, c in sizes:
        grid = [[rng.randint(1, 4) for _ in range(c)] for _ in range(r)]
        t0 = time.perf_counter()
        _ = solver.minCost(grid)
        t1 = time.perf_counter()
        timings.append((r, c, (t1 - t0) * 1000))

    # Max-size test: 100x100 grid (10,000 cells, true LeetCode maximum)
    max_grid = [[rng.randint(1, 4) for _ in range(100)] for _ in range(100)]
    t0 = time.perf_counter()
    max_res = solver.minCost(max_grid)
    t1 = time.perf_counter()
    max_ms = (t1 - t0) * 1000
    assert max_res >= 0

    timing_str = ", ".join([f"{r}x{c}: {ms:.3f}ms" for r, c, ms in timings])
    print(f"✓ Minimum Cost Valid Path Grid: {len(fixed_cases)} fixed cases, {random_cases_passed} random cases passed. Hint 4 code verified.")
    print(f"  Timing growth: {timing_str} (linear in cells O(M * N))")
    print(f"  Max-size test (100x100 grid): {max_ms:.2f}ms")

if __name__ == '__main__':
    main()
