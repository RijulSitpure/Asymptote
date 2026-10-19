import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'merge-sorted-array.json')
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
        ([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3, [1, 2, 2, 3, 5, 6]),
        ([1], 1, [], 0, [1]),
        ([0], 0, [1], 1, [1]),
        ([-5, -2, 0, 0, 0], 2, [-4, -1, 3], 3, [-5, -4, -2, -1, 3])
    ]
    for n1, m, n2, n, exp in fixed:
        nums1 = copy.deepcopy(n1)
        solver.merge(nums1, m, copy.deepcopy(n2), n)
        assert nums1 == exp

    rng = random.Random(42)
    for _ in range(40):
        m = rng.randint(0, 30)
        n = rng.randint(0, 30)
        sub1 = sorted([rng.randint(-100, 100) for _ in range(m)])
        sub2 = sorted([rng.randint(-100, 100) for _ in range(n)])
        nums1 = sub1 + [0] * n
        exp = sorted(sub1 + sub2)
        solver.merge(nums1, m, copy.deepcopy(sub2), n)
        assert nums1 == exp

    # Scale test: M=15k, N=15k
    m, n = 15000, 15000
    sub1 = [i * 2 for i in range(m)]
    sub2 = [i * 2 + 1 for i in range(n)]
    nums1 = sub1 + [0] * n
    t0 = time.perf_counter()
    solver.merge(nums1, m, sub2, n)
    t1 = time.perf_counter()
    assert nums1 == list(range(30000))
    print(f"✓ Merge Sorted Array: fixed, 40 random, and M+N=30k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
