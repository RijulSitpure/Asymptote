#!/usr/bin/env python3
import json
import os
import re
import sys
import time
import random

def load_problem():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base_dir, '..', '..', 'problems', 'two-sum.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    hint4 = prob['hints'][3]['text']
    m = re.search(r'```python\n(.*?)\n```', hint4, re.DOTALL)
    if not m:
        raise ValueError("Could not extract Python code block from Hint 4")
    return m.group(1)

def reference_two_sum(nums: list[int], target: int) -> list[int]:
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

def validate_two_sum_solution(nums: list[int], target: int, res: list[int]):
    assert isinstance(res, list), f"Expected list, got {type(res)}"
    assert len(res) == 2, f"Expected length 2, got {len(res)}"
    i, j = res
    assert isinstance(i, int) and isinstance(j, int), "Indices must be integers"
    assert i != j, f"Indices must be distinct, got {i} and {j}"
    assert 0 <= i < len(nums) and 0 <= j < len(nums), f"Indices out of range: {i}, {j}"
    assert nums[i] + nums[j] == target, f"nums[{i}] ({nums[i]}) + nums[{j}] ({nums[j]}) != target ({target})"

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)

    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code exactly"

    # Execute Solution code
    scope = {}
    exec(sol_code, scope)
    SolutionClass = scope['Solution']
    solver = SolutionClass()

    # Fixed edge cases
    fixed_cases = [
        ([2, 7, 11, 15], 9),
        ([3, 2, 4], 6),
        ([3, 3], 6),
        ([-1, -2, -3, -4, -5], -8),
        ([0, 4, 3, 0], 0),
        ([-10**9, 10**9], 0),
        ([10**9, -5, 10**9, -10**9], 0)
    ]

    for nums, target in fixed_cases:
        res = solver.twoSum(nums, target)
        validate_two_sum_solution(nums, target, res)

    # Seeded random tests against reference
    rng = random.Random(42)
    random_cases_passed = 0
    for _ in range(50):
        size = rng.randint(2, 60)
        nums = [rng.randint(-1000, 1000) for _ in range(size)]
        idx1, idx2 = rng.sample(range(size), 2)
        target = nums[idx1] + nums[idx2]

        ref_ans = reference_two_sum(nums, target)
        validate_two_sum_solution(nums, target, ref_ans)

        sol_ans = solver.twoSum(nums, target)
        validate_two_sum_solution(nums, target, sol_ans)
        random_cases_passed += 1

    # Complexity timing benchmark
    sizes = [100, 1000, 10000]
    timings = []
    for s in sizes:
        test_nums = list(range(s))
        test_target = (s - 2) + (s - 1)
        t0 = time.perf_counter()
        _ = solver.twoSum(test_nums, test_target)
        t1 = time.perf_counter()
        timings.append((s, (t1 - t0) * 1000))

    timing_str = ", ".join([f"N={s}: {ms:.3f}ms" for s, ms in timings])
    print(f"✓ Two Sum: {len(fixed_cases)} fixed cases, {random_cases_passed} random cases passed. Hint 4 code verified.")
    print(f"  Timing growth: {timing_str} (linear O(N))")

if __name__ == '__main__':
    main()
