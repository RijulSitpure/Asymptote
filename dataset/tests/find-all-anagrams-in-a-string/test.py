import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'find-all-anagrams-in-a-string.json')
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
        ("cbaebabacd", "abc", [0, 6]),
        ("abab", "ab", [0, 1, 2]),
        ("a", "b", []),
        ("a", "a", [0]),
        ("baa", "aa", [1])
    ]
    for s, p, exp in fixed:
        assert solver.findAnagrams(s, p) == exp

    rng = random.Random(42)
    letters = "abcde"
    for _ in range(35):
        np = rng.randint(1, 5)
        ns = rng.randint(np, 30)
        p = ''.join(rng.choice(letters) for _ in range(np))
        s = ''.join(rng.choice(letters) for _ in range(ns))
        # reference
        from collections import Counter
        target = Counter(p)
        ref = []
        for i in range(ns - np + 1):
            if Counter(s[i:i + np]) == target:
                ref.append(i)
        assert solver.findAnagrams(s, p) == ref

    # Scale test: 30,000 characters
    s = "a" * 30000
    p = "a" * 5
    t0 = time.perf_counter()
    res = solver.findAnagrams(s, p)
    t1 = time.perf_counter()
    assert len(res) == 29996
    print(f"✓ Find All Anagrams in a String: fixed, 35 random, and N=30k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
