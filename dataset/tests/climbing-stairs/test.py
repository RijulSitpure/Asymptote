#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'climbing-stairs.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_climb(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (1, 1), (2, 2), (3, 3), (4, 5), (5, 8), (10, 89), (45, 1836311903)
    ]

    for n, exp in fixed:
        ans = solver.climbStairs(n)
        assert ans == exp, f"Failed on n={n}: expected {exp}, got {ans}"

    for n in range(1, 46):
        assert solver.climbStairs(n) == ref_climb(n)

    t0 = time.perf_counter()
    _ = solver.climbStairs(45)
    t1 = time.perf_counter()
    print(f"✓ Climbing Stairs: all 45 inputs verified in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
