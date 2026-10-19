import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'longest-valid-parentheses.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def naive_longest(s):
    n = len(s)
    max_len = 0
    for i in range(n):
        bal = 0
        for j in range(i, n):
            bal += 1 if s[j] == '(' else -1
            if bal < 0: break
            if bal == 0:
                max_len = max(max_len, j - i + 1)
    return max_len

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("(()", 2),
        (")()())", 4),
        ("", 0),
        ("()(()", 2),
        ("()()", 4),
        ("((()))", 6)
    ]
    for s, exp in fixed:
        assert solver.longestValidParentheses(s) == exp

    rng = random.Random(42)
    for _ in range(35):
        l = rng.randint(0, 30)
        s = ''.join(rng.choice(['(', ')']) for _ in range(l))
        assert solver.longestValidParentheses(s) == naive_longest(s)

    # Scale test: 30,000 chars
    big = "()" * 15000
    t0 = time.perf_counter()
    ans = solver.longestValidParentheses(big)
    t1 = time.perf_counter()
    assert ans == 30000
    print(f"✓ Longest Valid Parentheses: fixed, 35 random, and N=30k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
