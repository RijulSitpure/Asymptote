#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'coin-change.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a >= c:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != float('inf') else -1

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 5], 11, 3),
        ([2], 3, -1),
        ([1], 0, 0),
        ([1], 1, 1),
        ([1, 3, 4, 5], 7, 2),
        ([2, 5, 10, 1], 27, 4)
    ]

    for coins, amt, exp in fixed:
        ans = solver.coinChange(list(coins), amt)
        assert ans == exp, f"Failed on coins={coins}, amount={amt}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        c_count = rng.randint(1, 5)
        coins = sorted(list(set(rng.randint(1, 15) for _ in range(c_count))))
        amt = rng.randint(0, 80)
        exp = ref_coin_change(coins, amt)
        ans = solver.coinChange(list(coins), amt)
        assert ans == exp, f"Failed on coins={coins}, amount={amt}: expected {exp}, got {ans}"

    # Scale test: amount = 5,000
    t0 = time.perf_counter()
    ans = solver.coinChange([1, 2, 5], 5000)
    t1 = time.perf_counter()
    assert ans == 1000
    print(f"✓ Coin Change: fixed and 25 random cases passed. Scale (amount=5000): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
