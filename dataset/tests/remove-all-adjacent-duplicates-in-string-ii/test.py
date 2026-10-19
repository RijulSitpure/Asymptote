import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'remove-all-adjacent-duplicates-in-string-ii.json')
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
        ("abcd", 2, "abcd"),
        ("deeedbbcccbdaa", 3, "aa"),
        ("pbbcggttciiippooaais", 2, "ps"),
        ("aaabbb", 3, "")
    ]
    for s, k, exp in fixed:
        res = solver.removeDuplicates(s, k)
        assert res == exp, f"Failed on {s}, {k}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        s = "".join(rng.choice(['a', 'b', 'c']) for _ in range(rng.randint(1, 40)))
        k = rng.randint(2, 4)
        # reference
        cur = s
        changed = True
        while changed:
            changed = False
            for ch in ['a', 'b', 'c']:
                sub = ch * k
                if sub in cur:
                    cur = cur.replace(sub, "")
                    changed = True
                    break
        assert solver.removeDuplicates(s, k) == cur

    # Scale test
    big_s = "a" * 50000 + "b" * 50000
    t0 = time.perf_counter()
    res = solver.removeDuplicates(big_s, 2)
    t1 = time.perf_counter()
    assert res == ""
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
