import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'valid-perfect-square.json')
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

    fixed = [(16, True), (14, False), (1, True), (4, True), (9, True), (8, False)]
    for num, exp in fixed:
        assert solver.isPerfectSquare(num) == exp

    rng = random.Random(42)
    for _ in range(35):
        root = rng.randint(1, 1000)
        assert solver.isPerfectSquare(root * root) is True
        if root > 1:
            assert solver.isPerfectSquare(root * root + 1) is False

    # Scale test: 2^31 - 1
    t0 = time.perf_counter()
    res = solver.isPerfectSquare(2147483647)
    t1 = time.perf_counter()
    assert res is False
    print(f"✓ Valid Perfect Square: fixed, 35 random, and 2^31-1 passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
