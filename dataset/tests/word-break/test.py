#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'word-break.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_word_break(s, wordDict):
    words = set(wordDict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[n]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("leetcode", ["leet", "code"], True),
        ("applepenapple", ["apple", "pen"], True),
        ("catsandog", ["cats", "dog", "sand", "and", "cat"], False),
        ("a", ["a"], True),
        ("a", ["b"], False),
        ("aaaaaaa", ["aaaa", "aaa"], True)
    ]

    for s, w_dict, exp in fixed:
        ans = solver.wordBreak(s, list(w_dict))
        assert ans == exp, f"Failed on s={s}, words={w_dict}: expected {exp}, got {ans}"

    rng = random.Random(42)
    letters = 'abcd'
    for _ in range(25):
        w_dict = list(set(''.join(rng.choice(letters) for _ in range(rng.randint(1, 4))) for _ in range(8)))
        s_len = rng.randint(1, 15)
        s = ''.join(rng.choice(letters) for _ in range(s_len))
        exp = ref_word_break(s, w_dict)
        ans = solver.wordBreak(s, list(w_dict))
        assert ans == exp, f"Failed on random s={s}: expected {exp}, got {ans}"

    # Scale test
    s_scale = "a" * 299 + "b"
    words_scale = ["a", "aa", "aaa", "aaaa"]
    t0 = time.perf_counter()
    ans = solver.wordBreak(s_scale, words_scale)
    t1 = time.perf_counter()
    assert ans is False
    print(f"✓ Word Break: fixed and 25 random cases passed. Scale (N=300): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
