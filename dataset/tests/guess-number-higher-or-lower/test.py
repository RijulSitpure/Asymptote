import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'guess-number-higher-or-lower.json')
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

    scope = {'List': list, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    current_pick = 6
    def mock_guess(num):
        if num == current_pick: return 0
        elif num > current_pick: return -1
        else: return 1

    scope['guess'] = mock_guess
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [(10, 6), (1, 1), (2, 1), (2, 2)]
    for n, pick in fixed:
        current_pick = pick
        assert solver.guessNumber(n) == pick

    rng = random.Random(42)
    for _ in range(35):
        n = rng.randint(1, 10000)
        pick = rng.randint(1, n)
        current_pick = pick
        assert solver.guessNumber(n) == pick

    # Scale test: 2^31 - 1
    current_pick = 1234567890
    t0 = time.perf_counter()
    res = solver.guessNumber(2147483647)
    t1 = time.perf_counter()
    assert res == 1234567890
    print(f"✓ Guess Number Higher or Lower: fixed, 35 random, and N=2^31-1 passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
