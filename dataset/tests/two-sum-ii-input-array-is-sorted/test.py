#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'two-sum-ii-input-array-is-sorted.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_two_sum(numbers, target):
    n = len(numbers)
    for i in range(n):
        for j in range(i + 1, n):
            if numbers[i] + numbers[j] == target:
                return [i + 1, j + 1]
    return []

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([2, 7, 11, 15], 9, [1, 2]),
        ([2, 3, 4], 6, [1, 3]),
        ([-1, 0], -1, [1, 2]),
        ([0, 0, 3, 4], 0, [1, 2]),
        ([-5, -3, 0, 2, 4, 6, 8], 5, [2, 7])
    ]
    for nums, target, exp in fixed:
        ans = solver.twoSum(nums, target)
        assert ans == exp or (nums[ans[0]-1] + nums[ans[1]-1] == target and ans[0] < ans[1])

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(2, 50)
        nums = sorted([rng.randint(-200, 200) for _ in range(sz)])
        i1, i2 = rng.sample(range(sz), 2)
        if i1 > i2: i1, i2 = i2, i1
        target = nums[i1] + nums[i2]
        ans = solver.twoSum(nums, target)
        assert len(ans) == 2 and ans[0] < ans[1]
        assert nums[ans[0]-1] + nums[ans[1]-1] == target

    # Max-size test: N = 30,000
    big_nums = list(range(-15000, 15000))
    t0 = time.perf_counter()
    ans = solver.twoSum(big_nums, 20000)
    t1 = time.perf_counter()
    assert big_nums[ans[0]-1] + big_nums[ans[1]-1] == 20000
    print(f"✓ Two Sum II: fixed and 50 random cases passed. Max size N=30k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
