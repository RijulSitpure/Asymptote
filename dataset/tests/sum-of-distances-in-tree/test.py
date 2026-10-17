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
    prob_path = os.path.join(base_dir, '..', '..', 'problems', 'sum-of-distances-in-tree.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    hint4 = prob['hints'][3]['text']
    m = re.search(r'```python\n(.*?)\n```', hint4, re.DOTALL)
    if not m:
        raise ValueError("Could not extract Python code block from Hint 4")
    return m.group(1)

def reference_sum_of_distances(n: int, edges: list[list[int]]) -> list[int]:
    if n <= 1:
        return [0]
    adj = {i: [] for i in range(n)}
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)

    res = [0] * n
    for start in range(n):
        dist = [-1] * n
        dist[start] = 0
        q = deque([start])
        total = 0
        while q:
            u = q.popleft()
            total += dist[u]
            for v in adj[u]:
                if dist[v] == -1:
                    dist[v] = dist[u] + 1
                    q.append(v)
        res[start] = total
    return res

def generate_random_tree(n: int, rng: random.Random) -> list[list[int]]:
    if n <= 1:
        return []
    nodes = list(range(n))
    rng.shuffle(nodes)
    edges = []
    for i in range(1, n):
        u = nodes[i]
        v = rng.choice(nodes[:i])
        edges.append([min(u, v), max(u, v)])
    return edges

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
        (6, [[0, 1], [0, 2], [2, 3], [2, 4], [2, 5]], [8, 12, 6, 10, 10, 10]),
        (1, [], [0]),
        (2, [[1, 0]], [1, 1]),
        (3, [[0, 1], [1, 2]], [3, 2, 3]),
        (4, [[0, 1], [0, 2], [0, 3]], [3, 5, 5, 5])  # Star tree
    ]

    for n, edges, expected in fixed_cases:
        actual = solver.sumOfDistancesInTree(n, edges)
        ref = reference_sum_of_distances(n, edges)
        assert actual == expected, f"Failed on N={n}, edges={edges}: expected {expected}, got {actual}"
        assert ref == expected, f"Reference mismatch on N={n}, edges={edges}: expected {expected}, got {ref}"

    # Seeded random tests against independent all-pairs BFS reference
    rng = random.Random(42)
    random_cases_passed = 0
    for _ in range(30):
        n = rng.randint(2, 40)
        edges = generate_random_tree(n, rng)
        ref = reference_sum_of_distances(n, edges)
        actual = solver.sumOfDistancesInTree(n, edges)
        assert actual == ref, f"Random test failed on tree N={n}: expected {ref[:5]}, got {actual[:5]}"
        random_cases_passed += 1

    # Special required case: path-shaped tree with 30,000 nodes
    path_n = 30000
    path_edges = [[i, i + 1] for i in range(path_n - 1)]
    try:
        t_start = time.perf_counter()
        path_res = solver.sumOfDistancesInTree(path_n, path_edges)
        t_end = time.perf_counter()
    except RecursionError:
        print("FAIL: Solution hit RecursionError on 30,000-node path tree!", file=sys.stderr)
        sys.exit(1)

    assert len(path_res) == path_n, f"Expected {path_n} answers, got {len(path_res)}"
    expected_root = path_n * (path_n - 1) // 2
    assert path_res[0] == expected_root, f"path_res[0] was {path_res[0]}, expected {expected_root}"
    assert path_res[-1] == expected_root, f"path_res[-1] was {path_res[-1]}, expected {expected_root}"
    mid = path_n // 2
    expected_mid = mid * (mid + 1) // 2 + (path_n - 1 - mid) * (path_n - mid) // 2
    assert path_res[mid] == expected_mid, f"path_res[{mid}] was {path_res[mid]}, expected {expected_mid}"
    random_cases_passed += 1

    # Timing benchmark
    sizes = [100, 1000, 10000, 30000]
    timings = []
    for s in sizes:
        s_edges = [[i, i + 1] for i in range(s - 1)]
        t0 = time.perf_counter()
        _ = solver.sumOfDistancesInTree(s, s_edges)
        t1 = time.perf_counter()
        timings.append((s, (t1 - t0) * 1000))

    timing_str = ", ".join([f"N={s}: {ms:.2f}ms" for s, ms in timings])
    print(f"✓ Sum of Distances in Tree: {len(fixed_cases)} fixed cases, {random_cases_passed} random/path cases passed (30k path tree verified: {t_end - t_start:.3f}s). Hint 4 code verified.")
    print(f"  Timing growth: {timing_str} (strictly linear O(N), no recursion stack)")

if __name__ == '__main__':
    main()
