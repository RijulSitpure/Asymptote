import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'longest-substring-with-at-least-k-repeating-characters.json')
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
        ("aaabb", 3, 3),
        ("ababbc", 2, 5),
        ("a", 1, 1),
        ("a", 2, 0),
        ("weitong", 2, 0)
    ]
    for s, k, exp in fixed:
        assert solver.longestSubstring(s, k) == exp

    rng = random.Random(42)
    letters = "abc"
    for _ in range(30):
        n = rng.randint(1, 20)
        s = ''.join(rng.choice(letters) for _ in range(n))
        k = rng.randint(1, 5)
        # reference
        from collections import Counter
        ref = 0
        for i in range(n):
            for j in range(i + 1, n + 1):
                sub = s[i:j]
                c = Counter(sub)
                if all(v >= k for v in c.values()):
                    ref = max(ref, j - i)
        assert solver.longestSubstring(s, k) == ref

    # Scale test: 5,000 characters
    big = "a" * 2500 + "b" * 2500
    t0 = time.perf_counter()
    res = solver.longestSubstring(big, 500)
    t1 = time.perf_counter()
    assert res == 5000
    print(f"✓ Longest Substring with At Least K Repeating: fixed, 30 random, and N=5k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
