import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'minimum-size-subarray-sum.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\n(.*?)\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_min_sub(target, nums):
    ans = float('inf')
    n = len(nums)
    for i in range(n):
        s = 0
        for j in range(i, n):
            s += nums[j]
            if s >= target:
                ans = min(ans, j - i + 1)
                break
    return 0 if ans == float('inf') else ans

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (7, [2, 3, 1, 2, 4, 3], 2),
        (4, [1, 4, 4], 1),
        (11, [1, 1, 1, 1, 1, 1, 1, 1], 0),
        (15, [1, 2, 3, 4, 5], 5),
        (100, [5, 10, 20], 0)
    ]
    for target, nums, exp in fixed:
        ans = solver.minSubArrayLen(target, nums)
        assert ans == exp

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(1, 50)
        nums = [rng.randint(1, 20) for _ in range(sz)]
        target = rng.randint(1, sum(nums) + 10)
        exp = ref_min_sub(target, nums)
        ans = solver.minSubArrayLen(target, nums)
        assert ans == exp

    # Scale test: 50,000 elements
    big = [1] * 50000
    t0 = time.perf_counter()
    ans = solver.minSubArrayLen(25000, big)
    t1 = time.perf_counter()
    assert ans == 25000
    print(f"✓ Minimum Size Subarray Sum: fixed, 40 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
