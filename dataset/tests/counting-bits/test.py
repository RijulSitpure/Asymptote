#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'counting-bits.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_count_bits(n):
    return [bin(x).count('1') for x in range(n + 1)]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (2, [0, 1, 1]),
        (5, [0, 1, 1, 2, 1, 2]),
        (0, [0]),
        (1, [0, 1]),
        (8, [0, 1, 1, 2, 1, 2, 2, 3, 1])
    ]

    for n, exp in fixed:
        ans = solver.countBits(n)
        assert ans == exp, f"Failed on n={n}: expected {exp}, got {ans}"

    for n in range(50):
        assert solver.countBits(n) == ref_count_bits(n)

    # Scale test: n = 100,000
    t0 = time.perf_counter()
    ans = solver.countBits(100000)
    t1 = time.perf_counter()
    assert len(ans) == 100001
    assert ans[100000] == bin(100000).count('1')
    print(f"✓ Counting Bits: fixed and random cases passed. Scale (N=100k): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
