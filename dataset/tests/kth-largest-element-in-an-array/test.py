#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'kth-largest-element-in-an-array.json'), 'r') as f:
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
        ([3, 2, 1, 5, 6, 4], 2, 5),
        ([3, 2, 3, 1, 2, 4, 5, 5, 6], 4, 4),
        ([1], 1, 1),
        ([-1, -1], 2, -1),
        ([-1, 2, 0], 1, 2),
        ([7, 6, 5, 4, 3, 2, 1], 5, 3)
    ]

    for nums, k, exp in fixed:
        ans = solver.findKthLargest(list(nums), k)
        assert ans == exp, f"Failed on nums={nums}, k={k}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(1, 100)
        nums = [rng.randint(-1000, 1000) for _ in range(sz)]
        k = rng.randint(1, sz)
        exp = sorted(nums, reverse=True)[k - 1]
        ans = solver.findKthLargest(list(nums), k)
        assert ans == exp, f"Failed on random test: expected {exp}, got {ans}"

    # Scale test: N = 50,000, k = 100
    big = [rng.randint(-100000, 100000) for _ in range(50000)]
    t0 = time.perf_counter()
    ans = solver.findKthLargest(big, 100)
    t1 = time.perf_counter()
    exp = sorted(big, reverse=True)[99]
    assert ans == exp
    print(f"✓ Kth Largest Element in an Array: fixed and 50 random cases passed. Scale (50k elements): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
