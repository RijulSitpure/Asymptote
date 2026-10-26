import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'get-equal-substrings-within-budget.json')
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

    fixed = [
        ("abcd", "bcdf", 3, 3),
        ("abcd", "cdef", 3, 1),
        ("abcd", "acde", 0, 1),
        ("a", "z", 25, 1),
        ("a", "z", 10, 0)
    ]
    for s, t, cost, exp in fixed:
        assert solver.equalSubstring(s, t, cost) == exp

    rng = random.Random(42)
    letters = "abcdefgh"
    for _ in range(35):
        sz = rng.randint(1, 35)
        s = ''.join(rng.choice(letters) for _ in range(sz))
        t = ''.join(rng.choice(letters) for _ in range(sz))
        cost = rng.randint(0, 30)
        # reference
        ref = 0
        for i in range(sz):
            cur = 0
            for j in range(i, sz):
                cur += abs(ord(s[j]) - ord(t[j]))
                if cur <= cost: ref = max(ref, j - i + 1)
                else: break
        assert solver.equalSubstring(s, t, cost) == ref

    # Scale test: 50,000 characters
    s = "a" * 50000
    t = "b" * 50000
    t0 = time.perf_counter()
    res = solver.equalSubstring(s, t, 100)
    t1 = time.perf_counter()
    assert res == 100
    print(f"✓ Get Equal Substrings Within Budget: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
