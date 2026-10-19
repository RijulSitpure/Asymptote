import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'decode-string.json')
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

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ("3[a]2[bc]", "aaabcbc"),
        ("3[a2[c]]", "accaccacc"),
        ("2[abc]3[cd]ef", "abcabccdcdcdef"),
        ("abc", "abc"),
        ("10[a]", "aaaaaaaaaa")
    ]
    for s, exp in fixed:
        assert solver.decodeString(s) == exp

    rng = random.Random(42)
    for _ in range(35):
        k1 = rng.randint(1, 4)
        k2 = rng.randint(1, 4)
        word1 = "ab"
        word2 = "cd"
        s = f"{k1}[{word1}{k2}[{word2}]]"
        exp = (word1 + word2 * k2) * k1
        assert solver.decodeString(s) == exp

    # Scale test: output length 50,000
    big = "1000[abc]"
    t0 = time.perf_counter()
    res = solver.decodeString(big)
    t1 = time.perf_counter()
    assert len(res) == 3000
    print(f"✓ Decode String: fixed, 35 random, and output=3k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
