#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'valid-anagram.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_is_anagram(s, t):
    return sorted(s) == sorted(t)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("anagram", "nagaram", True),
        ("rat", "car", False),
        ("a", "a", True),
        ("a", "b", False),
        ("", "", True),
        ("ab", "a", False),
        ("nl", "cx", False)
    ]
    for s, t, exp in fixed:
        assert solver.isAnagram(s, t) == exp, f"Failed on fixed {s}, {t}"

    rng = random.Random(42)
    letters = 'abcdefghijklmnopqrstuvwxyz'
    for _ in range(60):
        sz = rng.randint(1, 50)
        s = ''.join(rng.choice(letters) for _ in range(sz))
        if rng.random() < 0.5:
            lst = list(s)
            rng.shuffle(lst)
            t = ''.join(lst)
        else:
            t = ''.join(rng.choice(letters) for _ in range(rng.randint(sz - 1, sz + 1)))
        assert solver.isAnagram(s, t) == ref_is_anagram(s, t)

    # Max-size test: N = 50,000
    big_s = "a" * 25000 + "b" * 25000
    big_t = "b" * 25000 + "a" * 25000
    t0 = time.perf_counter()
    res = solver.isAnagram(big_s, big_t)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Valid Anagram: fixed and 60 random cases passed. Max size N=50k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
