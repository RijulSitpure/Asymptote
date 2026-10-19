import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'make-the-string-great.json')
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
        ("leEeetcode", "leetcode"),
        ("abBAcC", ""),
        ("s", "s"),
        ("Pp", ""),
        ("", "")
    ]
    for s, exp in fixed:
        res = solver.makeGood(s)
        assert res == exp, f"Failed on {s}: expected {exp}, got {res}"

    rng = random.Random(42)
    letters = "aAbBcC"
    for _ in range(35):
        s = "".join(rng.choice(letters) for _ in range(rng.randint(1, 30)))
        # reference
        cur = list(s)
        changed = True
        while changed:
            changed = False
            for i in range(len(cur) - 1):
                if abs(ord(cur[i]) - ord(cur[i + 1])) == 32:
                    cur = cur[:i] + cur[i + 2:]
                    changed = True
                    break
        assert solver.makeGood(s) == "".join(cur)

    # Scale test
    big_s = "aA" * 25000 + "b" * 1000
    t0 = time.perf_counter()
    res = solver.makeGood(big_s)
    t1 = time.perf_counter()
    assert res == "b" * 1000
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
