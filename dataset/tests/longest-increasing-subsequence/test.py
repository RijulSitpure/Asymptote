#!/usr/bin/env python3
import json, os, re, random, time, bisect

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'longest-increasing-subsequence.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_lis(nums):
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails): tails.append(x)
        else: tails[idx] = x
    return len(tails)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'bisect': bisect}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([10, 9, 2, 5, 3, 7, 101, 18], 4),
        ([0, 1, 0, 3, 2, 3], 4),
        ([7, 7, 7, 7, 7, 7, 7], 1),
        ([1], 1),
        ([4, 10, 4, 3, 8, 9], 3),
        ([1, 3, 6, 7, 9, 4, 10, 5, 6], 6)
    ]

    for nums, exp in fixed:
        ans = solver.lengthOfLIS(list(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 50)
        nums = [rng.randint(-500, 500) for _ in range(sz)]
        exp = ref_lis(nums)
        ans = solver.lengthOfLIS(list(nums))
        assert ans == exp

    # Scale test: N = 2,500
    big = [rng.randint(-10000, 10000) for _ in range(2500)]
    t0 = time.perf_counter()
    ans = solver.lengthOfLIS(big)
    t1 = time.perf_counter()
    assert ans == ref_lis(big)
    print(f"✓ Longest Increasing Subsequence: fixed and 30 random cases passed. Scale (2.5k nums): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
