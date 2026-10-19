import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'valid-parenthesis-string.json')
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
        ("()", True),
        ("(*)", True),
        ("(*))", True),
        (")", False),
        ("(", False),
        ("(((******))", True),
        ("(*()", True)
    ]
    for s, exp in fixed:
        res = solver.checkValidString(s)
        assert res == exp, f"Failed on {s}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 25)
        s = ''.join(rng.choice(['(', ')', '*']) for _ in range(sz))
        # brute force check
        def check(idx, count):
            if count < 0: return False
            if idx == len(s): return count == 0
            if s[idx] == '(': return check(idx + 1, count + 1)
            if s[idx] == ')': return check(idx + 1, count - 1)
            return check(idx + 1, count + 1) or check(idx + 1, count - 1) or check(idx + 1, count)
        exp = check(0, 0)
        assert solver.checkValidString(s) == exp

    # Scale test
    big_s = "(" * 50000 + "*" * 50000 + ")" * 50000
    t0 = time.perf_counter()
    res = solver.checkValidString(big_s)
    t1 = time.perf_counter()
    assert res is True
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
