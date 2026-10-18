#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'contains-duplicate.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_contains_duplicate(nums):
    return len(nums) != len(set(nums))

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 3, 1], True),
        ([1, 2, 3, 4], False),
        ([1, 1, 1, 3, 3, 4, 3, 2, 4, 2], True),
        ([], False),
        ([1], False),
        ([-10**9, 10**9, -10**9], True),
        ([0, 10**9, -10**9], False)
    ]
    for nums, exp in fixed:
        assert solver.containsDuplicate(nums) == exp, f"Failed on fixed: {nums}"

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(1, 100)
        nums = [rng.randint(-500, 500) for _ in range(sz)]
        exp = ref_contains_duplicate(nums)
        assert solver.containsDuplicate(nums) == exp

    # Max-size test: N = 100,000
    big = list(range(100000))
    t0 = time.perf_counter()
    res = solver.containsDuplicate(big)
    t1 = time.perf_counter()
    assert res is False
    print(f"✓ Contains Duplicate: fixed and 50 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
