#!/usr/bin/env python3
import json
import os
import re
import sys
import time
import random
import itertools
from collections import deque

def load_problem():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base_dir, '..', '..', 'problems', 'shortest-path-visiting-all-nodes.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    hint4 = prob['hints'][3]['text']
    m = re.search(r'```python\n(.*?)\n```', hint4, re.DOTALL)
    if not m:
        raise ValueError("Could not extract Python code block from Hint 4")
    return m.group(1)

def reference_shortest_path(graph: list[list[int]]) -> int:
    n = len(graph)
    if n <= 1:
        return 0

    # 1. All-pairs shortest path distance matrix using BFS
    dist = [[float('inf')] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
        q = deque([i])
        while q:
            u = q.popleft()
            for v in graph[u]:
                if dist[i][v] == float('inf'):
                    dist[i][v] = dist[i][u] + 1
                    q.append(v)

    # 2. Held-Karp dynamic programming reference
    dp = {}
    for i in range(n):
        dp[(1 << i, i)] = 0

    for mask in range(1, 1 << n):
        for u in range(n):
            if not (mask & (1 << u)):
                continue
            cur = dp.get((mask, u), float('inf'))
            if cur == float('inf'):
                continue
            for v in range(n):
                if not (mask & (1 << v)):
                    nmask = mask | (1 << v)
                    cost = cur + dist[u][v]
                    if cost < dp.get((nmask, v), float('inf')):
                        dp[(nmask, v)] = cost

    target = (1 << n) - 1
    return min(dp.get((target, u), float('inf')) for u in range(n))

def generate_random_connected_graph(n: int, rng: random.Random) -> list[list[int]]:
    if n <= 1:
        return [[]]
    nodes = list(range(n))
    rng.shuffle(nodes)
    adj = {i: set() for i in range(n)}
    for i in range(1, n):
        u = nodes[i]
        v = rng.choice(nodes[:i])
        adj[u].add(v)
        adj[v].add(u)

    extra = rng.randint(0, n)
    for _ in range(extra):
        u = rng.randint(0, n - 1)
        v = rng.randint(0, n - 1)
        if u != v:
            adj[u].add(v)
            adj[v].add(u)

    return [sorted(list(adj[i])) for i in range(n)]

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
        ([[1, 2, 3], [0], [0], [0]], 4),
        ([[1], [0, 2, 4], [1, 3, 4], [2], [1, 2]], 4),
        ([[]], 0),
        ([[1], [0]], 1),
        ([[1, 2], [0, 2], [0, 1]], 2),
        ([[1], [0, 2], [1, 3], [2, 4], [3]], 4)  # 5-node linear path
    ]

    for graph, expected in fixed_cases:
        actual = solver.shortestPathLength(graph)
        ref = reference_shortest_path(graph)
        assert actual == expected, f"Failed on {graph}: expected {expected}, got {actual}"
        assert ref == expected, f"Reference mismatch on {graph}: expected {expected}, got {ref}"

    # Seeded random tests: connected graphs against DP reference for n up to 10
    rng = random.Random(42)
    random_cases_passed = 0
    for _ in range(35):
        n = rng.randint(2, 10)
        graph = generate_random_connected_graph(n, rng)
        ref = reference_shortest_path(graph)
        actual = solver.shortestPathLength(graph)
        assert actual == ref, f"Random test failed on N={n}: expected {ref}, got {actual}"
        random_cases_passed += 1

    # Max-size test: N = 12 (true LeetCode maximum)
    max_graph = generate_random_connected_graph(12, rng)
    t0 = time.perf_counter()
    max_ans = solver.shortestPathLength(max_graph)
    t1 = time.perf_counter()
    max_ms = (t1 - t0) * 1000
    assert max_ans >= 11 and max_ans <= 24

    # Timing benchmark across sizes
    sizes = [4, 8, 12]
    timings = []
    for n in sizes:
        graph = generate_random_connected_graph(n, rng)
        t0 = time.perf_counter()
        _ = solver.shortestPathLength(graph)
        t1 = time.perf_counter()
        timings.append((n, (t1 - t0) * 1000))

    timing_str = ", ".join([f"N={n}: {ms:.3f}ms" for n, ms in timings])
    print(f"✓ Shortest Path Visiting All Nodes: {len(fixed_cases)} fixed cases, {random_cases_passed} random cases passed. Hint 4 code verified.")
    print(f"  Timing growth: {timing_str} (O(N^2 * 2^N))")
    print(f"  Max-size test (N=12): {max_ms:.2f}ms")

if __name__ == '__main__':
    main()
