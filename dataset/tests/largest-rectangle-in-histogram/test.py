#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'largest-rectangle-in-histogram.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_largest_rectangle(heights):
    n = len(heights)
    max_area = 0
    for i in range(n):
        min_h = heights[i]
        for j in range(i, n):
            min_h = min(min_h, heights[j])
            max_area = max(max_area, min_h * (j - i + 1))
    return max_area

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([2, 1, 5, 6, 2, 3], 10),
        ([2, 4], 4),
        ([], 0),
        ([1], 1),
        ([5, 5, 5, 5], 20),
        ([1, 2, 3, 4, 5], 9),
        ([5, 4, 3, 2, 1], 9),
        ([0, 0, 0], 0)
    ]
    for h, exp in fixed:
        assert solver.largestRectangleArea(h) == exp

    rng = random.Random(42)
    for _ in range(40):
        n = rng.randint(1, 35)
        h = [rng.randint(0, 50) for _ in range(n)]
        assert solver.largestRectangleArea(h) == ref_largest_rectangle(h)

    # Max-size test: N = 20,000
    big_h = [rng.randint(0, 10000) for _ in range(20000)]
    t0 = time.perf_counter()
    ans = solver.largestRectangleArea(big_h)
    t1 = time.perf_counter()
    assert ans > 0
    print(f"✓ Largest Rectangle in Histogram: fixed, 40 random, and N=20k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
