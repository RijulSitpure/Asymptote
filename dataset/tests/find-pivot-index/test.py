import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'find-pivot-index.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\n(.*?)\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_pivot(nums):
    n = len(nums)
    for i in range(n):
        if sum(nums[:i]) == sum(nums[i+1:]):
            return i
    return -1

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 7, 3, 6, 5, 6], 3),
        ([1, 2, 3], -1),
        ([2, 1, -1], 0),
        ([0], 0),
        ([-1, -1, -1, -1, -1, 0], 2)
    ]
    for nums, exp in fixed:
        ans = solver.pivotIndex(nums)
        assert ans == exp

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(1, 40)
        nums = [rng.randint(-30, 30) for _ in range(sz)]
        exp = ref_pivot(nums)
        ans = solver.pivotIndex(nums)
        assert ans == exp

    # Scale test: 40,000 elements
    big = [0] * 40000
    t0 = time.perf_counter()
    ans = solver.pivotIndex(big)
    t1 = time.perf_counter()
    assert ans == 0
    print(f"✓ Find Pivot Index: fixed, 40 random, and N=40k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
