import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'minimum-add-to-make-parentheses-valid.json')
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
        ("())", 1),
        ("(((", 3),
        ("()", 0),
        ("()))((", 4),
        ("", 0)
    ]
    for s, exp in fixed:
        res = solver.minAddToMakeValid(s)
        assert res == exp, f"Failed on {s}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        s = ''.join(rng.choice(['(', ')']) for _ in range(rng.randint(1, 50)))
        # Reference count
        st = []
        for ch in s:
            if ch == '(': st.append(ch)
            elif st and st[-1] == '(': st.pop()
            else: st.append(ch)
        assert solver.minAddToMakeValid(s) == len(st)

    # Scale test
    big_s = "(((" * 20000 + ")))" * 10000
    t0 = time.perf_counter()
    res = solver.minAddToMakeValid(big_s)
    t1 = time.perf_counter()
    assert res == 30000
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
