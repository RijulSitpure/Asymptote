#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'binary-search.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([-1, 0, 3, 5, 9, 12], 9, 4),
        ([-1, 0, 3, 5, 9, 12], 2, -1),
        ([5], 5, 0),
        ([5], -5, -1),
        ([], 1, -1),
        ([1, 2], 1, 0),
        ([1, 2], 2, 1),
        ([1, 2], 3, -1)
    ]
    for nums, target, exp in fixed:
        assert solver.search(nums, target) == exp

    rng = random.Random(42)
    for _ in range(50):
        n = rng.randint(1, 100)
        nums = sorted(list(set(rng.randint(-500, 500) for _ in range(n))))
        if rng.random() < 0.5 and nums:
            target = rng.choice(nums)
            exp = nums.index(target)
        else:
            target = rng.randint(-600, 600)
            exp = nums.index(target) if target in nums else -1
        assert solver.search(nums, target) == exp

    # Large test: N = 50,000
    big = list(range(50000))
    t0 = time.perf_counter()
    ans = solver.search(big, 49999)
    t1 = time.perf_counter()
    assert ans == 49999
    assert solver.search(big, -1) == -1
    print(f"✓ Binary Search: fixed, 50 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
