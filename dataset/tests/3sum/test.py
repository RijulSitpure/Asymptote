#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', '3sum.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_three_sum(nums):
    n = len(nums)
    seen = set()
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if nums[i] + nums[j] + nums[k] == 0:
                    seen.add(tuple(sorted([nums[i], nums[j], nums[k]])))
    return sorted(list(seen))

def normalize(triplets):
    return sorted([sorted(t) for t in triplets])

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [-1, 0, 1, 2, -1, -4],
        [0, 1, 1],
        [0, 0, 0],
        [-2, 0, 1, 1, 2],
        [-1, -1, 2, 2]
    ]
    for nums in fixed:
        assert normalize(solver.threeSum(nums)) == normalize(ref_three_sum(nums))

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(3, 20)
        nums = [rng.randint(-15, 15) for _ in range(sz)]
        assert normalize(solver.threeSum(nums)) == normalize(ref_three_sum(nums))

    # Max-size test: N = 1000
    big_nums = [rng.randint(-100, 100) for _ in range(1000)]
    t0 = time.perf_counter()
    ans = solver.threeSum(big_nums)
    t1 = time.perf_counter()
    for t in ans:
        assert sum(t) == 0
    print(f"✓ 3Sum: fixed and 30 random cases passed. Max size N=1k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
