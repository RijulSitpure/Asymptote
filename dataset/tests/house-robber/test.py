#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'house-robber.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_rob(nums):
    r1, r2 = 0, 0
    for n in nums:
        r1, r2 = r2, max(r2, r1 + n)
    return r2

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 3, 1], 4),
        ([2, 7, 9, 3, 1], 12),
        ([0], 0),
        ([2, 1, 1, 2], 4),
        ([100], 100),
        ([2, 1], 2),
        ([1, 2], 2)
    ]

    for nums, exp in fixed:
        ans = solver.rob(list(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 40)
        nums = [rng.randint(0, 100) for _ in range(sz)]
        exp = ref_rob(nums)
        ans = solver.rob(list(nums))
        assert ans == exp

    # Scale test: 10,000 houses
    big = [rng.randint(0, 500) for _ in range(10000)]
    t0 = time.perf_counter()
    _ = solver.rob(big)
    t1 = time.perf_counter()
    print(f"✓ House Robber: fixed and 30 random cases passed. Scale (10k houses): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
