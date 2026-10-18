#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'container-with-most-water.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_max_area(height):
    max_w = 0
    n = len(height)
    for i in range(n):
        for j in range(i + 1, n):
            max_w = max(max_w, (j - i) * min(height[i], height[j]))
    return max_w

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 8, 6, 2, 5, 4, 8, 3, 7], 49),
        ([1, 1], 1),
        ([4, 3, 2, 1, 4], 16),
        ([1, 2, 1], 2),
        ([2, 3, 4, 5, 18, 17, 6], 17)
    ]
    for h, exp in fixed:
        assert solver.maxArea(h) == exp

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(2, 40)
        h = [rng.randint(1, 100) for _ in range(sz)]
        assert solver.maxArea(h) == ref_max_area(h)

    # Max-size test: N = 100,000
    big_h = [i for i in range(100000)]
    t0 = time.perf_counter()
    ans = solver.maxArea(big_h)
    t1 = time.perf_counter()
    assert ans > 0
    print(f"✓ Container With Most Water: fixed and 40 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
