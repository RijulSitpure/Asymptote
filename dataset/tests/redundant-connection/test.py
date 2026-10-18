#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'redundant-connection.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
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
