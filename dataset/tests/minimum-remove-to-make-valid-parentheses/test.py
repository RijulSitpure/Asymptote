import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'minimum-remove-to-make-valid-parentheses.json')
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
        ("lee(t(c)o)de)", "lee(t(c)o)de"),
        ("a)b(c)d", "ab(c)d"),
        ("))((", ""),
        ("(a(b(c)d)", "a(b(c)d)"),
        ("abc", "abc")
    ]
    for s, exp in fixed:
        res = solver.minRemoveToMakeValid(s)
        # Note: multiple valid answers may exist; verify validity and length
        assert len(res) == len(exp)
        # Verify valid parentheses
        bal = 0
        valid = True
        for ch in res:
            if ch == '(': bal += 1
            elif ch == ')':
                bal -= 1
                if bal < 0: valid = False; break
        assert valid and bal == 0

    rng = random.Random(42)
    for _ in range(35):
        s = "".join(rng.choice(['(', ')', 'x', 'y']) for _ in range(rng.randint(1, 40)))
        res = solver.minRemoveToMakeValid(s)
        bal = 0
        valid = True
        for ch in res:
            if ch == '(': bal += 1
            elif ch == ')':
                bal -= 1
                if bal < 0: valid = False; break
        assert valid and bal == 0

    # Scale test
    big_s = "(" * 20000 + "x" + ")" * 20000
    t0 = time.perf_counter()
    res = solver.minRemoveToMakeValid(big_s)
    t1 = time.perf_counter()
    assert res == big_s
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
