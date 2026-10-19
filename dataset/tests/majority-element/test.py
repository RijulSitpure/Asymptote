import json, os, re, random, time, collections

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'majority-element.json')
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
        ([3, 2, 3], 3),
        ([2, 2, 1, 1, 1, 2, 2], 2),
        ([1], 1),
        ([6, 5, 5], 5),
        ([-1, -1, 2, -1], -1)
    ]
    for nums, exp in fixed:
        ans = solver.majorityElement(nums)
        assert ans == exp

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(1, 51)
        maj_count = sz // 2 + 1
        maj_val = rng.randint(-1000, 1000)
        other_vals = [rng.randint(-1000, 1000) for _ in range(sz - maj_count)]
        nums = [maj_val] * maj_count + other_vals
        rng.shuffle(nums)
        ans = solver.majorityElement(nums)
        assert ans == maj_val

    # Scale test: 50,000 elements
    big = [999] * 26000 + list(range(24000))
    rng.shuffle(big)
    t0 = time.perf_counter()
    ans = solver.majorityElement(big)
    t1 = time.perf_counter()
    assert ans == 999
    print(f"✓ Majority Element: fixed, 40 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
