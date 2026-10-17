#!/usr/bin/env python3
import json
import os
import re
import sys
import time
import random

def load_problem():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base_dir, '..', '..', 'problems', 'daily-temperatures.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    hint4 = prob['hints'][3]['text']
    m = re.search(r'```python\n(.*?)\n```', hint4, re.DOTALL)
    if not m:
        raise ValueError("Could not extract Python code block from Hint 4")
    return m.group(1)

def reference_daily_temperatures(temperatures: list[int]) -> list[int]:
    n = len(temperatures)
    res = [0] * n
    for i in range(n):
        for j in range(i + 1, n):
            if temperatures[j] > temperatures[i]:
                res[i] = j - i
                break
    return res

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
        ([73, 74, 75, 71, 69, 72, 76, 73], [1, 1, 4, 2, 1, 1, 0, 0]),
        ([30, 40, 50, 60], [1, 1, 1, 0]),
        ([30, 60, 90], [1, 1, 0]),
        ([90, 80, 70, 60], [0, 0, 0, 0]),
        ([50], [0]),
        ([70, 70, 70, 70], [0, 0, 0, 0]),
        ([30, 30, 30, 100], [3, 2, 1, 0]),
        ([100, 30, 30, 30], [0, 0, 0, 0])
    ]

    for temps, expected in fixed_cases:
        actual = solver.dailyTemperatures(temps)
        ref = reference_daily_temperatures(temps)
        assert actual == expected, f"Failed on {temps}: expected {expected}, got {actual}"
        assert ref == expected, f"Reference mismatch on {temps}: expected {expected}, got {ref}"

    # Seeded random tests against reference
    rng = random.Random(42)
    random_cases_passed = 0
    for _ in range(50):
        size = rng.randint(1, 100)
        temps = [rng.randint(30, 100) for _ in range(size)]
        expected = reference_daily_temperatures(temps)
        actual = solver.dailyTemperatures(temps)
        assert actual == expected, f"Random test failed on size {size}: expected {expected[:10]}, got {actual[:10]}"
        random_cases_passed += 1

    # Timing benchmark
    sizes = [100, 1000, 10000]
    timings = []
    for s in sizes:
        test_temps = [rng.randint(30, 100) for _ in range(s)]
        t0 = time.perf_counter()
        _ = solver.dailyTemperatures(test_temps)
        t1 = time.perf_counter()
        timings.append((s, (t1 - t0) * 1000))

    timing_str = ", ".join([f"N={s}: {ms:.3f}ms" for s, ms in timings])
    print(f"✓ Daily Temperatures: {len(fixed_cases)} fixed cases, {random_cases_passed} random cases passed. Hint 4 code verified.")
    print(f"  Timing growth: {timing_str} (linear O(N))")

if __name__ == '__main__':
    main()
