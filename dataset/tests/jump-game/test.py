#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'jump-game.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_can_jump(nums):
    max_reach = 0
    for i, n in enumerate(nums):
        if i > max_reach: return False
        max_reach = max(max_reach, i + n)
        if max_reach >= len(nums) - 1: return True
    return True

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([2, 3, 1, 1, 4], True),
        ([3, 2, 1, 0, 4], False),
        ([0], True),
        ([2, 0, 0], True),
        ([1, 0, 1, 0], False),
        ([1, 1, 1, 1], True)
    ]

    for nums, exp in fixed:
        ans = solver.canJump(list(nums))
        assert ans == exp, f"Failed on {nums}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 50)
        nums = [rng.randint(0, 5) for _ in range(sz)]
        exp = ref_can_jump(nums)
        ans = solver.canJump(list(nums))
        assert ans == exp

    # Scale test: 50,000 jumps
    big = [1] * 50000
    t0 = time.perf_counter()
    ans = solver.canJump(big)
    t1 = time.perf_counter()
    assert ans is True
    print(f"✓ Jump Game: fixed and 30 random cases passed. Scale (50k elements): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
