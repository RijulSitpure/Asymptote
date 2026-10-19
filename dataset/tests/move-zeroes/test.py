import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'move-zeroes.json')
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
        ([0, 1, 0, 3, 12], [1, 3, 12, 0, 0]),
        ([0], [0]),
        ([1, 2, 3], [1, 2, 3]),
        ([0, 0, 0, 1], [1, 0, 0, 0]),
        ([-1, 0, -2, 0, 5], [-1, -2, 5, 0, 0])
    ]
    for orig, exp in fixed:
        nums = copy.deepcopy(orig)
        solver.moveZeroes(nums)
        assert nums == exp

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(1, 50)
        nums = [0 if rng.random() < 0.4 else rng.randint(-100, 100) for _ in range(sz)]
        exp = [x for x in nums if x != 0] + [0] * nums.count(0)
        nums_copy = copy.deepcopy(nums)
        solver.moveZeroes(nums_copy)
        assert nums_copy == exp

    # Scale test: 30,000 elements
    big = [0 if i % 3 == 0 else i for i in range(30000)]
    t0 = time.perf_counter()
    solver.moveZeroes(big)
    t1 = time.perf_counter()
    assert big.count(0) == 10000
    assert all(x != 0 for x in big[:20000])
    print(f"✓ Move Zeroes: fixed, 40 random, and N=30k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
