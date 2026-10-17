#!/usr/bin/env python3
import json
import os
import re
import sys
import time
import random

def load_problem():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base_dir, '..', '..', 'problems', 'burst-balloons.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    hint4 = prob['hints'][3]['text']
    m = re.search(r'```python\n(.*?)\n```', hint4, re.DOTALL)
    if not m:
        raise ValueError("Could not extract Python code block from Hint 4")
    return m.group(1)

def reference_max_coins(nums: list[int]) -> int:
    memo = {}
    def solve(curr_tuple):
        if not curr_tuple:
            return 0
        if curr_tuple in memo:
            return memo[curr_tuple]
        ans = 0
        m = len(curr_tuple)
        for i in range(m):
            left_val = curr_tuple[i - 1] if i > 0 else 1
            right_val = curr_tuple[i + 1] if i < m - 1 else 1
            gain = left_val * curr_tuple[i] * right_val
            remaining = curr_tuple[:i] + curr_tuple[i + 1:]
            candidate = gain + solve(remaining)
            if candidate > ans:
                ans = candidate
        memo[curr_tuple] = ans
        return ans
    return solve(tuple(nums))

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
        ([3, 1, 5, 8], 167),
        ([1, 5], 10),
        ([7], 7),
        ([], 0),
        ([0], 0),
        ([1, 1, 1, 1], 4),
        ([9, 76, 64], 44416)
    ]

    for nums, expected in fixed_cases:
        actual = solver.maxCoins(list(nums))
        ref = reference_max_coins(list(nums))
        assert actual == expected, f"Failed on {nums}: expected {expected}, got {actual}"
        assert ref == expected, f"Reference mismatch on {nums}: expected {expected}, got {ref}"

    # Seeded random tests against forward-time reference
    rng = random.Random(42)
    random_cases_passed = 0
    for i in range(40):
        size = rng.randint(1, 10)
        if i % 3 == 0:
            # Explicitly include zeros in input
            nums = [rng.choice([0, rng.randint(0, 15)]) for _ in range(size)]
        else:
            nums = [rng.randint(0, 20) for _ in range(size)]
        expected = reference_max_coins(nums)
        actual = solver.maxCoins(nums)
        assert actual == expected, f"Random test failed on {nums}: expected {expected}, got {actual}"
        random_cases_passed += 1

    # Timing benchmark
    sizes = [15, 30, 60]
    timings = []
    for s in sizes:
        test_nums = [rng.randint(1, 100) for _ in range(s)]
        t0 = time.perf_counter()
        _ = solver.maxCoins(test_nums)
        t1 = time.perf_counter()
        timings.append((s, (t1 - t0) * 1000))

    # Max-size test: N = 300 (timing only, true LeetCode maximum)
    max_nums = [rng.randint(1, 100) for _ in range(300)]
    t0 = time.perf_counter()
    max_coins = solver.maxCoins(max_nums)
    t1 = time.perf_counter()
    max_ms = (t1 - t0) * 1000
    assert max_coins > 0

    timing_str = ", ".join([f"N={s}: {ms:.3f}ms" for s, ms in timings])
    print(f"✓ Burst Balloons: {len(fixed_cases)} fixed cases, {random_cases_passed} random cases passed. Hint 4 code verified.")
    print(f"  Timing growth: {timing_str} (cubic O(N^3))")
    print(f"  Max-size test (N=300): {max_ms:.2f}ms")

if __name__ == '__main__':
    main()
