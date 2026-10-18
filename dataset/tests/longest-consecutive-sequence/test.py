#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'longest-consecutive-sequence.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_longest_consecutive(nums):
    if not nums: return 0
    s = sorted(set(nums))
    longest = 1
    curr = 1
    for i in range(1, len(s)):
        if s[i] == s[i - 1] + 1:
            curr += 1
            longest = max(longest, curr)
        else:
            curr = 1
    return longest

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [100, 4, 200, 1, 3, 2],
        [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
        [],
        [1],
        [1, 2, 0, 1],
        [-1, -2, -3, 0]
    ]
    for nums in fixed:
        assert solver.longestConsecutive(nums) == ref_longest_consecutive(nums)

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(0, 100)
        nums = [rng.randint(-50, 50) for _ in range(sz)]
        assert solver.longestConsecutive(nums) == ref_longest_consecutive(nums)

    # Max-size test: N = 100,000
    big = list(range(100000))
    rng.shuffle(big)
    t0 = time.perf_counter()
    ans = solver.longestConsecutive(big)
    t1 = time.perf_counter()
    assert ans == 100000
    print(f"✓ Longest Consecutive Sequence: fixed and 50 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
