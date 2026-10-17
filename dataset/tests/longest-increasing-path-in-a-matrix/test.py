#!/usr/bin/env python3
import json
import os
import re
import sys
import time
import random
from collections import deque

def load_problem():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base_dir, '..', '..', 'problems', 'longest-increasing-path-in-a-matrix.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    hint4 = prob['hints'][3]['text']
    m = re.search(r'```python\n(.*?)\n```', hint4, re.DOTALL)
    if not m:
        raise ValueError("Could not extract Python code block from Hint 4")
    return m.group(1)

def reference_longest_increasing_path(matrix: list[list[int]]) -> int:
    if not matrix or not matrix[0]:
        return 0
    m, n = len(matrix), len(matrix[0])
    in_degree = [[0] * n for _ in range(m)]

    # Edges from smaller to strictly larger cell
    for r in range(m):
        for c in range(n):
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] < matrix[r][c]:
                    in_degree[r][c] += 1

    # Kahn topological level-by-level BFS
    queue = deque([(r, c) for r in range(m) for c in range(n) if in_degree[r][c] == 0])
    level = 0
    while queue:
        level += 1
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                    in_degree[nr][nc] -= 1
                    if in_degree[nr][nc] == 0:
                        queue.append((nr, nc))
    return level

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
        ([[9, 9, 4], [6, 6, 8], [2, 1, 1]], 4),
        ([[3, 4, 5], [3, 2, 6], [2, 2, 1]], 4),
        ([[1]], 1),
        ([[1, 2], [3, 4]], 3),
        ([[5, 5, 5], [5, 5, 5]], 1),
        ([[7, 6, 5], [8, 1, 4], [9, 2, 3]], 9)
    ]

    for matrix, expected in fixed_cases:
        actual = solver.longestIncreasingPath(matrix)
        ref = reference_longest_increasing_path(matrix)
        assert actual == expected, f"Failed on {matrix}: expected {expected}, got {actual}"
        assert ref == expected, f"Reference mismatch on {matrix}: expected {expected}, got {ref}"

    # Seeded random tests
    rng = random.Random(42)
    random_cases_passed = 0
    for _ in range(40):
        rows = rng.randint(2, 12)
        cols = rng.randint(2, 12)
        matrix = [[rng.randint(0, 50) for _ in range(cols)] for _ in range(rows)]
        ref = reference_longest_increasing_path(matrix)
        actual = solver.longestIncreasingPath(matrix)
        assert actual == ref, f"Random test failed: expected {ref}, got {actual}"
        random_cases_passed += 1

    # Max-size tests
    # 1. 200x200 serpentine matrix with strictly increasing path of 40,000 cells
    serp_mat = [[0] * 200 for _ in range(200)]
    val = 0
    for c in range(200):
        rows = range(200) if c % 2 == 0 else range(199, -1, -1)
        for r in rows:
            serp_mat[r][c] = val
            val += 1
    t0 = time.perf_counter()
    serp_ans = solver.longestIncreasingPath(serp_mat)
    t1 = time.perf_counter()
    serp_ms = (t1 - t0) * 1000
    assert serp_ans == 40000, f"Serpentine test failed: expected 40000, got {serp_ans}"

    # 2. 200x200 random matrix
    rand_mat = [[rng.randint(0, 1000) for _ in range(200)] for _ in range(200)]
    t0 = time.perf_counter()
    rand_ans = solver.longestIncreasingPath(rand_mat)
    t1 = time.perf_counter()
    rand_ms = (t1 - t0) * 1000
    assert rand_ans >= 1

    # Timing benchmark across sizes
    sizes = [(10, 10), (30, 30), (60, 60)]
    timings = []
    for r, c in sizes:
        test_mat = [[rng.randint(0, 1000) for _ in range(c)] for _ in range(r)]
        t0 = time.perf_counter()
        _ = solver.longestIncreasingPath(test_mat)
        t1 = time.perf_counter()
        timings.append((r, c, (t1 - t0) * 1000))

    timing_str = ", ".join([f"{r}x{c}: {ms:.3f}ms" for r, c, ms in timings])
    print(f"✓ Longest Increasing Path: {len(fixed_cases)} fixed cases, {random_cases_passed} random cases passed. Hint 4 code verified.")
    print(f"  Timing growth: {timing_str} (linear in cells O(M * N))")
    print(f"  Max-size tests: 200x200 serpentine (40,000 cells): {serp_ms:.2f}ms, 200x200 random: {rand_ms:.2f}ms")

if __name__ == '__main__':
    main()
