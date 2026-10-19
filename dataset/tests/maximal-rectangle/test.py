import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'maximal-rectangle.json')
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
        ([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]], 6),
        ([["0"]], 0),
        ([["1"]], 1),
        ([["0","0"],["0","0"]], 0),
        ([["1","1"],["1","1"]], 4)
    ]
    for mat, exp in fixed:
        res = solver.maximalRectangle(mat)
        assert res == exp, f"Failed on {mat}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(25):
        r = rng.randint(1, 10)
        c = rng.randint(1, 10)
        mat = [[rng.choice(["0", "1"]) for _ in range(c)] for _ in range(r)]
        res = solver.maximalRectangle(mat)
        assert isinstance(res, int) and res >= 0

    # Scale test
    big_mat = [["1"] * 100 for _ in range(100)]
    t0 = time.perf_counter()
    res = solver.maximalRectangle(big_mat)
    t1 = time.perf_counter()
    assert res == 10000
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
