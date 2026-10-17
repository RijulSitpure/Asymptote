#!/usr/bin/env python3
import json
import os
import re
import sys
import time
import random
import heapq

def load_problem():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base_dir, '..', '..', 'problems', 'cheapest-flights-within-k-stops.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    hint4 = prob['hints'][3]['text']
    m = re.search(r'```python\n(.*?)\n```', hint4, re.DOTALL)
    if not m:
        raise ValueError("Could not extract Python code block from Hint 4")
    return m.group(1)

def reference_find_cheapest_price(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
    adj = {i: [] for i in range(n)}
    for u, v, w in flights:
        adj[u].append((v, w))
    pq = [(0, src, 0)]
    min_stops = {}
    while pq:
        cost, u, stops = heapq.heappop(pq)
        if u == dst:
            return cost
        if stops > k:
            continue
        if u in min_stops and min_stops[u] <= stops:
            continue
        min_stops[u] = stops
        for v, w in adj[u]:
            heapq.heappush(pq, (cost + w, v, stops + 1))
    return -1

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
        (4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1, 700),
        (3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1, 200),
        (3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0, 500),
        (2, [[0, 1, 10]], 0, 1, 0, 10),
        (3, [[0, 1, 10]], 0, 2, 1, -1),
        (4, [[0, 1, 1], [1, 2, 1], [2, 3, 1]], 0, 3, 1, -1),
        (4, [[0, 1, 1], [1, 2, 1], [2, 3, 1]], 0, 3, 2, 3)
    ]

    for n, flights, src, dst, k, expected in fixed_cases:
        actual = solver.findCheapestPrice(n, flights, src, dst, k)
        ref = reference_find_cheapest_price(n, flights, src, dst, k)
        assert actual == expected, f"Failed: expected {expected}, got {actual}"
        assert ref == expected, f"Reference mismatch: expected {expected}, got {ref}"

    # Seeded random tests against Dijkstra reference
    rng = random.Random(42)
    random_cases_passed = 0
    for i in range(60):
        n = rng.randint(4, 15)
        m = rng.randint(n - 1, n * 2)
        flights = []
        for _ in range(m):
            u = rng.randint(0, n - 1)
            v = rng.randint(0, n - 1)
            if u != v:
                w = rng.randint(10, 500)
                flights.append([u, v, w])
        src = rng.randint(0, n - 1)
        dst = rng.randint(0, n - 1)
        while dst == src:
            dst = rng.randint(0, n - 1)

        if i % 4 == 0:
            # Unreachable destination: remove all incoming edges to dst
            flights = [f for f in flights if f[1] != dst]

        if i % 3 == 0:
            k = 0  # Specifically test k = 0
        else:
            k = rng.randint(0, 5)

        ref = reference_find_cheapest_price(n, flights, src, dst, k)
        actual = solver.findCheapestPrice(n, flights, src, dst, k)
        assert actual == ref, f"Random test failed: expected {ref}, got {actual}"
        random_cases_passed += 1

    # Timing benchmark
    sizes = [(20, 10), (50, 20), (100, 30)]
    timings = []
    for n, k in sizes:
        flights = []
        for u in range(n - 1):
            flights.append([u, u + 1, 10])
            if u + 2 < n:
                flights.append([u, u + 2, 25])
        t0 = time.perf_counter()
        _ = solver.findCheapestPrice(n, flights, 0, n - 1, k)
        t1 = time.perf_counter()
        timings.append((n, k, (t1 - t0) * 1000))

    # Max-size test: V = 100, dense graph, k from 0 to 99
    v_max = 100
    dense_flights = []
    for u in range(v_max):
        for v in range(v_max):
            if u != v and (u + v) % 3 == 0:  # dense graph (~3300 edges)
                dense_flights.append([u, v, rng.randint(10, 500)])
    t0 = time.perf_counter()
    k_results = [solver.findCheapestPrice(v_max, dense_flights, 0, v_max - 1, test_k) for test_k in [0, 1, 10, 50, 99]]
    t1 = time.perf_counter()
    dense_ms = (t1 - t0) * 1000
    assert len(k_results) == 5

    timing_str = ", ".join([f"V={n},K={k}: {ms:.3f}ms" for n, k, ms in timings])
    print(f"✓ Cheapest Flights: {len(fixed_cases)} fixed cases, {random_cases_passed} random cases passed. Hint 4 code verified.")
    print(f"  Timing growth: {timing_str} (O(K * E))")
    print(f"  Max-size test (V=100, ~3300 edges, k in [0..99]): {dense_ms:.2f}ms")

if __name__ == '__main__':
    main()
