#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'trapping-rain-water.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_trap(height):
    if not height: return 0
    n = len(height)
    l_max = [0] * n
    r_max = [0] * n
    l_max[0] = height[0]
    for i in range(1, n): l_max[i] = max(l_max[i - 1], height[i])
    r_max[n - 1] = height[n - 1]
    for i in range(n - 2, -1, -1): r_max[i] = max(r_max[i + 1], height[i])
    water = 0
    for i in range(n):
        water += max(0, min(l_max[i], r_max[i]) - height[i])
    return water

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], 6),
        ([4, 2, 0, 3, 2, 5], 9),
        ([], 0),
        ([1], 0),
        ([2, 0, 2], 2),
        ([5, 4, 3, 2, 1], 0),
        ([1, 2, 3, 4, 5], 0)
    ]
    for h, exp in fixed:
        assert solver.trap(h) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(0, 50)
        h = [rng.randint(0, 30) for _ in range(sz)]
        assert solver.trap(h) == ref_trap(h)

    # Max-size test: N = 20,000
    big_h = [rng.randint(0, 1000) for _ in range(20000)]
    t0 = time.perf_counter()
    ans = solver.trap(big_h)
    t1 = time.perf_counter()
    assert ans == ref_trap(big_h)
    print(f"✓ Trapping Rain Water: fixed and 50 random cases passed. Max size N=20k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
