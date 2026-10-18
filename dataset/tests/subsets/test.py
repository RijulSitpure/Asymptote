#!/usr/bin/env python3
import json, os, re, random, time, itertools

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'subsets.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def norm_subsets(subs):
    return sorted([sorted(list(s)) for s in subs])

def ref_subsets(nums):
    res = []
    for r in range(len(nums) + 1):
        for combo in itertools.combinations(nums, r):
            res.append(list(combo))
    return res

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [1, 2, 3],
        [0],
        [],
        [1, 2],
        [-1, 0, 1]
    ]

    for nums in fixed:
        ans = norm_subsets(solver.subsets(nums))
        exp = norm_subsets(ref_subsets(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        sz = rng.randint(1, 8)
        nums = sorted(list(set(rng.randint(-50, 50) for _ in range(sz))))
        ans = norm_subsets(solver.subsets(nums))
        exp = norm_subsets(ref_subsets(nums))
        assert ans == exp

    # Scale test: N = 10 (1024 subsets)
    nums10 = list(range(10))
    t0 = time.perf_counter()
    ans = solver.subsets(nums10)
    t1 = time.perf_counter()
    assert len(ans) == 1024
    print(f"✓ Subsets: fixed and 25 random cases passed. Scale (N=10 -> 1024 subsets): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
