import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'reverse-substrings-between-each-pair-of-parentheses.json')
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
        ("(abcd)", "dcba"),
        ("(u(love)i)", "iloveu"),
        ("(ed(et(oc))el)", "leetcode"),
        ("a(bcdefghijkl(mno)p)q", "apmnolkjihgfedcbq"),
        ("hello", "hello")
    ]
    for s, exp in fixed:
        res = solver.reverseParentheses(s)
        assert res == exp, f"Failed on {s}: expected {exp}, got {res}"

    # Simulation reference
    def ref(st):
        s_arr = []
        for ch in st:
            if ch == ')':
                tmp = []
                while s_arr and s_arr[-1] != '(':
                    tmp.append(s_arr.pop())
                s_arr.pop() # pop '('
                s_arr.extend(tmp)
            else:
                s_arr.append(ch)
        return "".join(s_arr)

    rng = random.Random(42)
    for _ in range(35):
        def make_expr(d):
            if d <= 0: return rng.choice(['a', 'b', 'c', 'xy'])
            inner = "".join(make_expr(d - 1) for _ in range(rng.randint(1, 3)))
            return f"({inner})"
        s = make_expr(rng.randint(1, 4))
        assert solver.reverseParentheses(s) == ref(s)

    # Scale test
    big_s = "(" * 1000 + "a" * 500 + ")" * 1000
    t0 = time.perf_counter()
    res = solver.reverseParentheses(big_s)
    t1 = time.perf_counter()
    assert res == "a" * 500
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
