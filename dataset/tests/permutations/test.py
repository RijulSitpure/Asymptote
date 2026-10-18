#!/usr/bin/env python3
import json, os, re, random, time, itertools

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'permutations.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def norm_perms(perms):
    return sorted([list(p) for p in perms])

def ref_permute(nums):
    return [list(p) for p in itertools.permutations(nums)]

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
        [0, 1],
        [1],
        [-1, 2, 0],
        [4, 3, 2, 1]
    ]

    for nums in fixed:
        ans = norm_perms(solver.permute(list(nums)))
        exp = norm_perms(ref_permute(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        sz = rng.randint(1, 5)
        nums = rng.sample(range(-50, 50), sz)
        ans = norm_perms(solver.permute(list(nums)))
        exp = norm_perms(ref_permute(nums))
        assert ans == exp

    # Scale test: N = 7 (5040 permutations)
    nums7 = list(range(7))
    t0 = time.perf_counter()
    ans = solver.permute(nums7)
    t1 = time.perf_counter()
    assert len(ans) == 5040
    print(f"✓ Permutations: fixed and 25 random cases passed. Scale (N=7 -> 5040 perms): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
