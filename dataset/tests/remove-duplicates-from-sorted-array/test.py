import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'remove-duplicates-from-sorted-array.json')
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
        ([1, 1, 2], [1, 2]),
        ([0, 0, 1, 1, 1, 2, 2, 3, 3, 4], [0, 1, 2, 3, 4]),
        ([1], [1]),
        ([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]),
        ([-3, -3, -2, -1, -1, 0, 0], [-3, -2, -1, 0])
    ]
    for orig, exp in fixed:
        nums = copy.deepcopy(orig)
        k = solver.removeDuplicates(nums)
        assert k == len(exp), f"Length mismatch: {k} != {len(exp)}"
        assert nums[:k] == exp, f"Prefix mismatch: {nums[:k]} != {exp}"

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        nums = sorted([rng.randint(-50, 50) for _ in range(sz)])
        exp = []
        for x in nums:
            if not exp or exp[-1] != x:
                exp.append(x)
        nums_copy = copy.deepcopy(nums)
        k = solver.removeDuplicates(nums_copy)
        assert k == len(exp)
        assert nums_copy[:k] == exp

    # Scale test: 30,000 elements
    big = sorted([i // 3 for i in range(30000)])
    t0 = time.perf_counter()
    k = solver.removeDuplicates(big)
    t1 = time.perf_counter()
    assert k == 10000
    print(f"✓ Remove Duplicates: fixed, 35 random, and N=30k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
