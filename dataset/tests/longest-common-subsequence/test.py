#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'longest-common-subsequence.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("abcde", "ace", 3),
        ("abc", "abc", 3),
        ("abc", "def", 0),
        ("ezupkr", "ubmrapg", 2),
        ("oxcp", "qrsvwf", 0),
        ("a", "a", 1)
    ]

    for t1, t2, exp in fixed:
        ans = solver.longestCommonSubsequence(t1, t2)
        assert ans == exp, f"Failed on '{t1}', '{t2}': expected {exp}, got {ans}"

    rng = random.Random(42)
    letters = 'abcdef'
    for _ in range(25):
        s1 = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 20)))
        s2 = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 20)))
        exp = ref_lcs(s1, s2)
        ans = solver.longestCommonSubsequence(s1, s2)
        assert ans == exp, f"Failed on '{s1}', '{s2}': expected {exp}, got {ans}"

    # Scale test: 300x300
    big1 = ''.join(rng.choice(letters) for _ in range(300))
    big2 = ''.join(rng.choice(letters) for _ in range(300))
    t0 = time.perf_counter()
    ans = solver.longestCommonSubsequence(big1, big2)
    t1 = time.perf_counter()
    assert ans == ref_lcs(big1, big2)
    print(f"✓ Longest Common Subsequence: fixed and 25 random cases passed. Scale (300x300): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
