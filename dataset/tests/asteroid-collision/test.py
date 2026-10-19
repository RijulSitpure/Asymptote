import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'asteroid-collision.json')
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
        ([5, 10, -5], [5, 10]),
        ([8, -8], []),
        ([10, 2, -5], [10]),
        ([-2, -1, 1, 2], [-2, -1, 1, 2]),
        ([-2, -2, 1, -2], [-2, -2, -2]),
        ([1, -2, -2, -2], [-2, -2, -2])
    ]
    for ast, exp in fixed:
        res = solver.asteroidCollision(ast)
        assert res == exp, f"Failed on {ast}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(2, 30)
        ast = [rng.choice([-1, 1]) * rng.randint(1, 100) for _ in range(sz)]
        res = solver.asteroidCollision(ast)
        assert isinstance(res, list)

    # Scale test
    big_ast = [10] * 50000 + [-10] * 50000
    t0 = time.perf_counter()
    res = solver.asteroidCollision(big_ast)
    t1 = time.perf_counter()
    assert res == []
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
