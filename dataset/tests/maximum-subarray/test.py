#!/usr/bin/env python3
import json
import os
import re
import sys
import time
import random

def load_problem():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base_dir, '..', '..', 'problems', 'maximum-subarray.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    hint4 = prob['hints'][3]['text']
    m = re.search(r'```python\n(.*?)\n```', hint4, re.DOTALL)
    if not m:
        raise ValueError("Could not extract Python code block from Hint 4")
    return m.group(1)

def reference_max_sub_array(nums: list[int]) -> int:
    n = len(nums)
    best = -float('inf')
    for i in range(n):
        running = 0
        for j in range(i, n):
            running += nums[j]
            if running > best:
                best = running
    return best

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)

    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code exactly"

    scope = {}
    exec(sol_code, scope)
    SolutionClass = scope['Solution']
    solver = SolutionClass()

    # Fixed edge cases
    fixed_cases = [
        ([-2, 1, -3, 4, -1, 2, 1, -5, 4], 6),
        ([1], 1),
        ([5, 4, -1, 7, 8], 23),
        ([-1], -1),
        ([-100, -2, -30, -5], -2),
        ([0, 0, 0], 0),
        ([-10000, 10000, -10000, 10000], 10000)
    ]

    for nums, expected in fixed_cases:
        actual = solver.maxSubArray(nums)
        ref = reference_max_sub_array(nums)
        assert actual == expected, f"Failed on {nums}: expected {expected}, got {actual}"
        assert ref == expected, f"Reference mismatch on {nums}: expected {expected}, got {ref}"

    # Seeded random tests
    rng = random.Random(42)
    random_cases_passed = 0
    for _ in range(60):
        size = rng.randint(1, 80)
        nums = [rng.randint(-500, 500) for _ in range(size)]
        expected = reference_max_sub_array(nums)
        actual = solver.maxSubArray(nums)
        assert actual == expected, f"Random test failed: expected {expected}, got {actual}"
        random_cases_passed += 1

    # Timing benchmark
    sizes = [100, 1000, 10000]
    timings = []
    for s in sizes:
        test_nums = [rng.randint(-100, 100) for _ in range(s)]
        t0 = time.perf_counter()
        _ = solver.maxSubArray(test_nums)
        t1 = time.perf_counter()
        timings.append((s, (t1 - t0) * 1000))

    timing_str = ", ".join([f"N={s}: {ms:.3f}ms" for s, ms in timings])
    print(f"✓ Maximum Subarray: {len(fixed_cases)} fixed cases, {random_cases_passed} random cases passed. Hint 4 code verified.")
    print(f"  Timing growth: {timing_str} (linear O(N))")

if __name__ == '__main__':
    main()
