#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'valid-palindrome.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_is_palindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        "A man, a plan, a canal: Panama",
        "race a car",
        " ",
        ".,",
        "0P",
        "a."
    ]
    for s in fixed:
        assert solver.isPalindrome(s) == ref_is_palindrome(s), f"Failed on fixed: '{s}'"

    rng = random.Random(42)
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ,.!?'
    for _ in range(50):
        sz = rng.randint(0, 100)
        s = ''.join(rng.choice(chars) for _ in range(sz))
        assert solver.isPalindrome(s) == ref_is_palindrome(s)

    # Max-size test: N = 200,000
    big_s = "a" * 100000 + "b" * 100000
    t0 = time.perf_counter()
    ans = solver.isPalindrome(big_s)
    t1 = time.perf_counter()
    assert ans is False
    print(f"✓ Valid Palindrome: fixed and 50 random cases passed. Max size N=200k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
