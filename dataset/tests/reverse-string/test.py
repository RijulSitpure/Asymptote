import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'reverse-string.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\n(.*?)\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
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
        (["h","e","l","l","o"], ["o","l","l","e","h"]),
        (["H","a","n","n","a","h"], ["h","a","n","n","a","H"]),
        (["a"], ["a"]),
        ([], [])
    ]
    for orig, exp in fixed:
        s = copy.deepcopy(orig)
        solver.reverseString(s)
        assert s == exp

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(0, 60)
        chars = [chr(rng.randint(97, 122)) for _ in range(sz)]
        exp = list(reversed(chars))
        s_copy = copy.deepcopy(chars)
        solver.reverseString(s_copy)
        assert s_copy == exp

    # Scale test: 100,000 characters
    big = [chr(97 + (i % 26)) for i in range(100000)]
    exp = list(reversed(big))
    t0 = time.perf_counter()
    solver.reverseString(big)
    t1 = time.perf_counter()
    assert big == exp
    print(f"✓ Reverse String: fixed, 40 random, and N=100k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
