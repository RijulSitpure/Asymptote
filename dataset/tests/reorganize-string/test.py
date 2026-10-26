import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'reorganize-string.json')
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

    def valid_reorg(orig, res):
        if res == "":
            from collections import Counter
            c = Counter(orig)
            return max(c.values()) > (len(orig) + 1) // 2
        if len(res) != len(orig) or sorted(res) != sorted(orig):
            return False
        for i in range(len(res) - 1):
            if res[i] == res[i + 1]: return False
        return True

    fixed = ["aab", "aaab", "vvvlo", "baaba", "a", "aa"]
    for s in fixed:
        ans = solver.reorganizeString(s)
        assert valid_reorg(s, ans)

    rng = random.Random(42)
    letters = "abcd"
    for _ in range(35):
        sz = rng.randint(1, 30)
        s = ''.join(rng.choice(letters) for _ in range(sz))
        ans = solver.reorganizeString(s)
        assert valid_reorg(s, ans)

    # Scale test: 500 characters
    s = "a" * 250 + "b" * 250
    t0 = time.perf_counter()
    res = solver.reorganizeString(s)
    t1 = time.perf_counter()
    assert valid_reorg(s, res)
    print(f"✓ Reorganize String: fixed, 35 random, and N=500 passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
