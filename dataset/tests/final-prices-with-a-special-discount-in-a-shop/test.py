import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'final-prices-with-a-special-discount-in-a-shop.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
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

    scope = {'List': list}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([8, 4, 6, 2, 3], [4, 2, 4, 2, 3]),
        ([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]),
        ([10, 1, 1, 6], [9, 0, 1, 6]),
        ([5], [5])
    ]
    for prices, exp in fixed:
        res = solver.finalPrices(prices)
        assert res == exp, f"Failed on {prices}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 30)
        prices = [rng.randint(1, 100) for _ in range(sz)]
        exp = []
        for i in range(sz):
            disc = 0
            for j in range(i + 1, sz):
                if prices[j] <= prices[i]:
                    disc = prices[j]
                    break
            exp.append(prices[i] - disc)
        assert solver.finalPrices(prices) == exp

    # Scale test
    big_prices = [100] * 30000
    t0 = time.perf_counter()
    res = solver.finalPrices(big_prices)
    t1 = time.perf_counter()
    assert res[-1] == 100 and res[0] == 0
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
