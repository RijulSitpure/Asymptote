import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'remove-k-digits.json')
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
        ("1432219", 3, "1219"),
        ("10200", 1, "200"),
        ("10", 2, "0"),
        ("9", 1, "0"),
        ("112", 1, "11"),
        ("1234567890", 9, "0")
    ]
    for num, k, exp in fixed:
        res = solver.removeKdigits(num, k)
        assert res == exp, f"Failed on {num}, {k}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 20)
        num = "".join(str(rng.randint(0, 9)) for _ in range(sz))
        k = rng.randint(1, sz)
        res = solver.removeKdigits(num, k)
        assert len(res) <= sz - k + 1

    # Scale test
    big_num = "9" * 50000 + "1" * 50000
    t0 = time.perf_counter()
    res = solver.removeKdigits(big_num, 50000)
    t1 = time.perf_counter()
    assert res == "1" * 50000
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
