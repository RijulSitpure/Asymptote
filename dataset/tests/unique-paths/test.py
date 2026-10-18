#!/usr/bin/env python3
import json, os, re, random, time, math

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'unique-paths.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
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
