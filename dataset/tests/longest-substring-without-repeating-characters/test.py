#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'longest-substring-without-repeating-characters.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_length_of_longest_substring(s):
    max_len = 0
    n = len(s)
    for i in range(n):
        seen = set()
        for j in range(i, n):
            if s[j] in seen: break
            seen.add(s[j])
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
        ("abcabcbb", 3),
        ("bbbbb", 1),
        ("pwwkew", 3),
        ("", 0),
        (" ", 1),
        ("au", 2),
        ("dvdf", 3)
    ]
    for s, exp in fixed:
        assert solver.lengthOfLongestSubstring(s) == exp, f"Failed on fixed: {s}"

    rng = random.Random(42)
    letters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for _ in range(50):
        sz = rng.randint(0, 40)
        s = ''.join(rng.choice(letters) for _ in range(sz))
        assert solver.lengthOfLongestSubstring(s) == ref_length_of_longest_substring(s)

    # Max-size test: N = 50,000
    big_s = "abcdefghijklmnopqrstuvwxyz" * 1923
    t0 = time.perf_counter()
    ans = solver.lengthOfLongestSubstring(big_s)
    t1 = time.perf_counter()
    assert ans == 26
    print(f"✓ Longest Substring Without Repeating: fixed and 50 random cases passed. Max size N=50k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
