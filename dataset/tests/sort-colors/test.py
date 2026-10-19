import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'sort-colors.json')
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
        [2, 0, 2, 1, 1, 0],
        [2, 0, 1],
        [0],
        [1],
        [2, 2, 2],
        [0, 1, 2],
        [1, 0]
    ]
    for orig in fixed:
        nums = copy.deepcopy(orig)
        solver.sortColors(nums)
        assert nums == sorted(orig)

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(1, 50)
        nums = [rng.choice([0, 1, 2]) for _ in range(sz)]
        nums_copy = copy.deepcopy(nums)
        solver.sortColors(nums_copy)
        assert nums_copy == sorted(nums)

    # Scale test: 30,000 elements
    big = [rng.choice([0, 1, 2]) for _ in range(30000)]
    t0 = time.perf_counter()
    solver.sortColors(big)
    t1 = time.perf_counter()
    assert big == sorted(big)
    print(f"✓ Sort Colors: fixed, 40 random, and N=30k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
