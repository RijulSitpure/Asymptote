import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'permutation-in-string.json')
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

    scope = {'List': list, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("ab", "eidbaooo", True),
        ("ab", "eidboaoo", False),
        ("adc", "dcda", True),
        ("a", "a", True),
        ("hello", "ooolleoooleh", False)
    ]
    for s1, s2, exp in fixed:
        assert solver.checkInclusion(s1, s2) == exp

    rng = random.Random(42)
    letters = "abcdef"
    for _ in range(35):
        n1 = rng.randint(1, 8)
        n2 = rng.randint(n1, 30)
        s1 = ''.join(rng.choice(letters) for _ in range(n1))
        s2 = ''.join(rng.choice(letters) for _ in range(n2))
        # reference
        from collections import Counter
        target_counts = Counter(s1)
        ref_res = False
        for i in range(len(s2) - len(s1) + 1):
            if Counter(s2[i:i + len(s1)]) == target_counts:
                ref_res = True
                break
        assert solver.checkInclusion(s1, s2) == ref_res

    # Scale test: 10,000 characters
    s1 = "abcdef"
    s2 = "z" * 9994 + "fedcba"
    t0 = time.perf_counter()
    res = solver.checkInclusion(s1, s2)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Permutation in String: fixed, 35 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
