#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'combination-sum.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def norm_combos(combos):
    return sorted([sorted(list(c)) for c in combos])

def ref_combination_sum(candidates, target):
    res = []
    def backtrack(idx, rem, path):
        if rem == 0:
            res.append(list(path))
            return
        if rem < 0:
            return
        for i in range(idx, len(candidates)):
            path.append(candidates[i])
            backtrack(i, rem - candidates[i], path)
            path.pop()
    backtrack(0, target, [])
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
        ([2, 3, 6, 7], 7),
        ([2, 3, 5], 8),
        ([2], 1),
        ([1], 2),
        ([7, 3, 2], 18)
    ]

    for cands, target in fixed:
        ans = norm_combos(solver.combinationSum(list(cands), target))
        exp = norm_combos(ref_combination_sum(list(cands), target))
        assert ans == exp, f"Failed on {cands}, {target}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        sz = rng.randint(1, 5)
        cands = sorted(list(set(rng.randint(2, 15) for _ in range(sz))))
        target = rng.randint(4, 25)
        ans = norm_combos(solver.combinationSum(list(cands), target))
        exp = norm_combos(ref_combination_sum(list(cands), target))
        assert ans == exp

    # Scale test
    t0 = time.perf_counter()
    _ = solver.combinationSum([2, 3, 5, 7], 30)
    t1 = time.perf_counter()
    print(f"✓ Combination Sum: fixed and 25 random cases passed. Scale (target=30): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
