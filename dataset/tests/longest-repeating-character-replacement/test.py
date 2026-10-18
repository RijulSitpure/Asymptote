#!/usr/bin/env python3
import json, os, re, random, time
from collections import Counter

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'longest-repeating-character-replacement.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_character_replacement(s, k):
    max_len = 0
    n = len(s)
    for i in range(n):
        counts = Counter()
        for j in range(i, n):
            counts[s[j]] += 1
            max_f = max(counts.values())
            if (j - i + 1) - max_f <= k:
                max_len = max(max_len, j - i + 1)
    return max_len

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("ABAB", 2, 4),
        ("AABABBA", 1, 4),
        ("AAAA", 0, 4),
        ("ABCDE", 1, 2),
        ("ABBB", 2, 4)
    ]
    for s, k, exp in fixed:
        assert solver.characterReplacement(s, k) == exp

    rng = random.Random(42)
    letters = 'ABCDE'
    for _ in range(40):
        sz = rng.randint(1, 30)
        s = ''.join(rng.choice(letters) for _ in range(sz))
        k = rng.randint(0, sz)
        assert solver.characterReplacement(s, k) == ref_character_replacement(s, k)

    # Max-size test: N = 100,000
    big_s = "A" * 50000 + "B" * 50000
    t0 = time.perf_counter()
    ans = solver.characterReplacement(big_s, 100)
    t1 = time.perf_counter()
    assert ans == 50100
    print(f"✓ Longest Repeating Character Replacement: fixed and 40 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
