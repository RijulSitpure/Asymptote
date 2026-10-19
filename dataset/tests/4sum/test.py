import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', '4sum.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\n(.*?)\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_four_sum(nums, target):
    nums = sorted(nums)
    res = set()
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                for l in range(k + 1, n):
                    if nums[i] + nums[j] + nums[k] + nums[l] == target:
                        res.add((nums[i], nums[j], nums[k], nums[l]))
    return sorted([list(t) for t in res])

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 0, -1, 0, -2, 2], 0, [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]),
        ([2, 2, 2, 2, 2], 8, [[2, 2, 2, 2]]),
        ([0, 0, 0, 0], 0, [[0, 0, 0, 0]]),
        ([1, 2, 3], 6, [])
    ]
    for nums, target, exp in fixed:
        ans = solver.fourSum(nums, target)
        norm_ans = sorted([sorted(q) for q in ans])
        norm_exp = sorted([sorted(q) for q in exp])
        assert norm_ans == norm_exp

    rng = random.Random(42)
    for _ in range(25):
        sz = rng.randint(4, 18)
        nums = [rng.randint(-20, 20) for _ in range(sz)]
        target = rng.randint(-30, 30)
        exp = ref_four_sum(nums, target)
        ans = solver.fourSum(nums, target)
        norm_ans = sorted([sorted(q) for q in ans])
        norm_exp = sorted([sorted(q) for q in exp])
        assert norm_ans == norm_exp

    # Scale test: 200 elements
    big = [rng.randint(-50, 50) for _ in range(200)]
    t0 = time.perf_counter()
    ans = solver.fourSum(big, 0)
    t1 = time.perf_counter()
    print(f"✓ 4Sum: fixed, 25 random, and N=200 passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
