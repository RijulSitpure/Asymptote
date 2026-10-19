import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'check-if-word-is-valid-after-substitutions.json')
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
        ("aabcbc", True),
        ("abcabcababcc", True),
        ("abccba", False),
        ("cababc", False),
        ("abc", True),
        ("a", False)
    ]
    for s, exp in fixed:
        res = solver.isValid(s)
        assert res == exp, f"Failed on {s}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        # generate valid by insertion
        cur = ""
        for _ in range(rng.randint(1, 15)):
            pos = rng.randint(0, len(cur))
            cur = cur[:pos] + "abc" + cur[pos:]
        assert solver.isValid(cur) is True

    # Scale test
    big_s = "abc" * 20000
    t0 = time.perf_counter()
    res = solver.isValid(big_s)
    t1 = time.perf_counter()
    assert res is True
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
