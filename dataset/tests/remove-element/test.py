import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'remove-element.json')
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
        ([3, 2, 2, 3], 3, [2, 2]),
        ([0, 1, 2, 2, 3, 0, 4, 2], 2, [0, 1, 3, 0, 4]),
        ([1], 1, []),
        ([1], 2, [1]),
        ([], 5, [])
    ]
    for orig, val, exp in fixed:
        nums = copy.deepcopy(orig)
        k = solver.removeElement(nums, val)
        assert k == len(exp)
        assert sorted(nums[:k]) == sorted(exp)

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(0, 50)
        nums = [rng.randint(0, 10) for _ in range(sz)]
        val = rng.randint(0, 10)
        exp = [x for x in nums if x != val]
        nums_copy = copy.deepcopy(nums)
        k = solver.removeElement(nums_copy, val)
        assert k == len(exp)
        assert sorted(nums_copy[:k]) == sorted(exp)

    # Scale test: 20,000 elements
    big = [1 if i % 2 == 0 else 2 for i in range(20000)]
    t0 = time.perf_counter()
    k = solver.removeElement(big, 1)
    t1 = time.perf_counter()
    assert k == 10000
    print(f"✓ Remove Element: fixed, 35 random, and N=20k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
