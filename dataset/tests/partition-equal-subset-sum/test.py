#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'partition-equal-subset-sum.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_partition(nums):
    total = sum(nums)
    if total % 2 != 0: return False
    target = total // 2
    dp = {0}
    for n in nums:
        next_dp = set(dp)
        for t in dp:
            if t + n == target: return True
            if t + n < target: next_dp.add(t + n)
        dp = next_dp
    return target in dp

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 5, 11, 5], True),
        ([1, 2, 3, 5], False),
        ([1, 1], True),
        ([2, 2, 2, 2], True),
        ([100], False),
        ([1, 2, 5], False)
    ]

    for nums, exp in fixed:
        ans = solver.canPartition(list(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        sz = rng.randint(2, 20)
        nums = [rng.randint(1, 30) for _ in range(sz)]
        exp = ref_partition(nums)
        ans = solver.canPartition(list(nums))
        assert ans == exp

    # Scale test: 100 elements
    nums100 = [2] * 100
    t0 = time.perf_counter()
    ans = solver.canPartition(nums100)
    t1 = time.perf_counter()
    assert ans is True
    print(f"✓ Partition Equal Subset Sum: fixed and 25 random cases passed. Scale (100 nums): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
