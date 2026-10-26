import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'first-bad-version.json')
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

    scope = {'List': list, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    solver = scope['Solution']()

    current_bad = 4
    def mock_is_bad(v):
        return v >= current_bad

    scope['isBadVersion'] = mock_is_bad
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [(5, 4), (1, 1), (10, 1), (10, 10)]
    for n, bad in fixed:
        current_bad = bad
        assert solver.firstBadVersion(n) == bad

    rng = random.Random(42)
    for _ in range(35):
        n = rng.randint(1, 1000)
        bad = rng.randint(1, n)
        current_bad = bad
        assert solver.firstBadVersion(n) == bad

    # Scale test: 2^31 - 1
    current_bad = 1700000000
    t0 = time.perf_counter()
    res = solver.firstBadVersion(2147483647)
    t1 = time.perf_counter()
    assert res == 1700000000
    print(f"✓ First Bad Version: fixed, 35 random, and N=2^31-1 passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
