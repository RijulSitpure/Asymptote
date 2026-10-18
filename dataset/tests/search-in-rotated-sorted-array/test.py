#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'search-in-rotated-sorted-array.json'), 'r') as f:
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
        ([4, 5, 6, 7, 0, 1, 2], 0, 4),
        ([4, 5, 6, 7, 0, 1, 2], 3, -1),
        ([1], 0, -1),
        ([1], 1, 0),
        ([3, 1], 1, 1),
        ([5, 1, 3], 5, 0),
        ([5, 1, 3], 3, 2),
        ([4, 5, 6, 7, 8, 1, 2, 3], 8, 4)
    ]
    for nums, target, exp in fixed:
        assert solver.search(nums, target) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(1, 50)
        vals = sorted(list(set(rng.randint(-500, 500) for _ in range(sz))))
        rot = rng.randint(0, len(vals) - 1)
        rotated = vals[rot:] + vals[:rot]
        target = rng.choice(rotated) if rng.random() < 0.6 else rng.randint(-600, 600)
        exp = rotated.index(target) if target in rotated else -1
        assert solver.search(rotated, target) == exp

    # Large test: N = 20,000
    big = list(range(20000))
    big_rot = big[12345:] + big[:12345]
    t0 = time.perf_counter()
    idx = solver.search(big_rot, 500)
    t1 = time.perf_counter()
    assert big_rot[idx] == 500
    assert solver.search(big_rot, -999) == -1
    print(f"✓ Search in Rotated Sorted Array: fixed, 50 random, and N=20k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
