#!/usr/bin/env python3
import json, os, re, random, time, math

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'koko-eating-bananas.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_koko(piles, h):
    def feasible(k):
        return sum(math.ceil(p / k) for p in piles) <= h
    left, right = 1, max(piles)
    while left < right:
        mid = (left + right) // 2
        if feasible(mid):
            right = mid
        else:
            left = mid + 1
    return left

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 6, 7, 11], 8, 4),
        ([30, 11, 23, 4, 20], 5, 30),
        ([30, 11, 23, 4, 20], 6, 23),
        ([312884470], 312884469, 2),
        ([1, 1, 1, 1], 4, 1)
    ]
    for piles, h, exp in fixed:
        assert solver.minEatingSpeed(piles, h) == exp

    rng = random.Random(42)
    for _ in range(40):
        n = rng.randint(1, 25)
        piles = [rng.randint(1, 200) for _ in range(n)]
        h = rng.randint(n, n * 10)
        assert solver.minEatingSpeed(piles, h) == ref_koko(piles, h)

    # Max-size test: N = 10,000, h = 10^9
    big_piles = [rng.randint(1, 10**9) for _ in range(10000)]
    t0 = time.perf_counter()
    ans = solver.minEatingSpeed(big_piles, 10**9)
    t1 = time.perf_counter()
    assert ans >= 1
    print(f"✓ Koko Eating Bananas: fixed, 40 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
