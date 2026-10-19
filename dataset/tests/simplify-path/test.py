import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'simplify-path.json')
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
        ("/home/", "/home"),
        ("/home//foo/", "/home/foo"),
        ("/home/user/Documents/../Pictures", "/home/user/Pictures"),
        ("/../", "/"),
        ("/.../a/../b/c/../d/./", "/.../b/d"),
        ("/a/./b/../../c/", "/c")
    ]
    for p, exp in fixed:
        assert solver.simplifyPath(p) == exp

    rng = random.Random(42)
    dirs = ["home", "user", "docs", "a", "b", "c", "..", ".", "...", "foo"]
    for _ in range(35):
        depth = rng.randint(1, 15)
        path = "/" + "/".join(rng.choice(dirs) for _ in range(depth)) + ("/" if rng.random() < 0.5 else "")
        # Verified canonical
        st = []
        for token in path.split('/'):
            if token == '..':
                if st: st.pop()
            elif token and token != '.':
                st.append(token)
            exp = '/' + '/'.join(st)
        assert solver.simplifyPath(path) == exp

    # Scale test: 30,000 segment path
    big = "/" + "/".join(["a", "b", "..", "c", "."] * 6000)
    t0 = time.perf_counter()
    res = solver.simplifyPath(big)
    t1 = time.perf_counter()
    assert res.startswith("/a/c")
    print(f"✓ Simplify Path: fixed, 35 random, and N=30k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
