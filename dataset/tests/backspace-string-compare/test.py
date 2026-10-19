import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'backspace-string-compare.json')
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
        ("ab#c", "ad#c", True),
        ("ab##", "c#d#", True),
        ("a#c", "b", False),
        ("y#fo##f", "y#f#o##f", True),
        ("###", "", True)
    ]
    for s, t, exp in fixed:
        res = solver.backspaceCompare(s, t)
        assert res == exp, f"Failed on {s}, {t}: expected {exp}, got {res}"

    def build(st):
        out = []
        for c in st:
            if c == '#':
                if out: out.pop()
            else:
                out.append(c)
        return ''.join(out)

    rng = random.Random(42)
    for _ in range(35):
        s = ''.join(rng.choice(['a', 'b', 'c', '#', '#']) for _ in range(rng.randint(1, 30)))
        t = ''.join(rng.choice(['a', 'b', 'c', '#', '#']) for _ in range(rng.randint(1, 30)))
        exp = build(s) == build(t)
        assert solver.backspaceCompare(s, t) == exp

    # Scale test
    big_s = "a#" * 50000 + "x"
    big_t = "b#" * 50000 + "x"
    t0 = time.perf_counter()
    res = solver.backspaceCompare(big_s, big_t)
    t1 = time.perf_counter()
    assert res is True
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
