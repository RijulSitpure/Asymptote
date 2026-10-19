import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'remove-outermost-parentheses.json')
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

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("(()())(())", "()()()"),
        ("(()())(())(()(()))", "()()()()(())"),
        ("()()", ""),
        ("", "")
    ]
    for s, exp in fixed:
        res = solver.removeOuterParentheses(s)
        assert res == exp, f"Failed on {s}: expected {exp}, got {res}"

    # Random test
    def make_prim(d, rng):
        if d <= 1: return "()"
        inner = "".join(make_prim(d - 1, rng) for _ in range(rng.randint(1, 3)))
        return f"({inner})"

    rng = random.Random(42)
    for _ in range(35):
        prims = [make_prim(rng.randint(1, 4), rng) for _ in range(rng.randint(1, 5))]
        s = "".join(prims)
        exp = "".join(p[1:-1] for p in prims)
        assert solver.removeOuterParentheses(s) == exp

    # Scale test
    big_s = "(()())" * 20000
    t0 = time.perf_counter()
    res = solver.removeOuterParentheses(big_s)
    t1 = time.perf_counter()
    assert res == "()()" * 20000
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
