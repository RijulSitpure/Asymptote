import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'maximum-nesting-depth-of-the-parentheses.json')
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
        ("(1+(2*3)+((8)/4))+1", 3),
        ("(1)+((2))+(((3)))", 3),
        ("1+(2*3)/(2-1)", 1),
        ("1", 0),
        ("", 0)
    ]
    for s, exp in fixed:
        res = solver.maxDepth(s)
        assert res == exp, f"Failed on {s}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        d = rng.randint(0, 10)
        s = "(" * d + "x" + ")" * d
        assert solver.maxDepth(s) == d

    # Scale test
    big_s = "(" * 25000 + ")" * 25000
    t0 = time.perf_counter()
    res = solver.maxDepth(big_s)
    t1 = time.perf_counter()
    assert res == 25000
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
