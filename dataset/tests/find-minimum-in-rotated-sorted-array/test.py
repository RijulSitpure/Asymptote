#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'find-minimum-in-rotated-sorted-array.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 4, 5, 1, 2], 1),
        ([4, 5, 6, 7, 0, 1, 2], 0),
        ([11, 13, 15, 17], 11),
        ([1], 1),
        ([2, 1], 1),
        ([1, 2], 1)
    ]
    for nums, exp in fixed:
        assert solver.findMin(nums) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(1, 60)
        vals = sorted(list(set(rng.randint(-500, 500) for _ in range(sz))))
        rot = rng.randint(0, len(vals) - 1)
        rotated = vals[rot:] + vals[:rot]
        assert solver.findMin(rotated) == vals[0]

    # Max-size test: N = 20,000
    big = list(range(20000))
    big_rotated = big[7777:] + big[:7777]
    t0 = time.perf_counter()
    ans = solver.findMin(big_rotated)
    t1 = time.perf_counter()
    assert ans == 0
    print(f"✓ Find Minimum in Rotated Sorted Array: fixed, 50 random, and N=20k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
