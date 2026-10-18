#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'best-time-to-buy-and-sell-stock.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_max_profit(prices):
    max_p = 0
    n = len(prices)
    for i in range(n):
        for j in range(i + 1, n):
            max_p = max(max_p, prices[j] - prices[i])
    return max_p

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([7, 1, 5, 3, 6, 4], 5),
        ([7, 6, 4, 3, 1], 0),
        ([1, 2], 1),
        ([2, 1], 0),
        ([3, 3, 3], 0),
        ([], 0),
        ([5], 0)
    ]
    for p, exp in fixed:
        assert solver.maxProfit(p) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(0, 50)
        p = [rng.randint(1, 200) for _ in range(sz)]
        assert solver.maxProfit(p) == ref_max_profit(p)

    # Max-size test: N = 100,000
    big_p = list(range(100000, 0, -1))
    big_p[50000] = 1
    t0 = time.perf_counter()
    ans = solver.maxProfit(big_p)
    t1 = time.perf_counter()
    assert ans == 49998
    print(f"✓ Best Time to Buy and Sell Stock: fixed and 50 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
