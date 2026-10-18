#!/usr/bin/env python3
import json, os, re, random, time
from collections import Counter

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'minimum-window-substring.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_min_window(s, t):
    if not s or not t: return ""
    need = Counter(t)
    best = ""
    min_len = float('inf')
    n = len(s)
    for i in range(n):
        cur = Counter()
        for j in range(i, n):
            cur[s[j]] += 1
            if all(cur[c] >= need[c] for c in need):
                if (j - i + 1) < min_len:
                    min_len = j - i + 1
                    best = s[i:j+1]
                break
    return best

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("ADOBECODEBANC", "ABC", "BANC"),
        ("a", "a", "a"),
        ("a", "aa", ""),
        ("ab", "b", "b"),
        ("aa", "aa", "aa")
    ]
    for s, t, exp in fixed:
        ans = solver.minWindow(s, t)
        assert ans == exp, f"Failed on fixed {s}, {t}: expected '{exp}', got '{ans}'"

    rng = random.Random(42)
    letters = 'ABCDE'
    for _ in range(40):
        s_len = rng.randint(1, 25)
        t_len = rng.randint(1, 5)
        s = ''.join(rng.choice(letters) for _ in range(s_len))
        t = ''.join(rng.choice(letters) for _ in range(t_len))
        ans = solver.minWindow(s, t)
        ref = ref_min_window(s, t)
        assert len(ans) == len(ref)
        if ref:
            # check ans contains all characters in t
            cur = Counter(ans)
            for c, cnt in Counter(t).items():
                assert cur[c] >= cnt

    # Max-size test: |s| = 100,000, |t| = 3
    big_s = "A" * 50000 + "B" + "C" + "A" * 50000
    t0 = time.perf_counter()
    ans = solver.minWindow(big_s, "ABC")
    t1 = time.perf_counter()
    assert ans == "BCA" or ans == "ABC"
    print(f"✓ Minimum Window Substring: fixed and 40 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
