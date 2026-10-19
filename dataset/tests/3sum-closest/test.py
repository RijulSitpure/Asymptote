import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', '3sum-closest.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\n(.*?)\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_closest(nums, target):
    closest = nums[0] + nums[1] + nums[2]
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                s = nums[i] + nums[j] + nums[k]
                if abs(s - target) < abs(closest - target):
                    closest = s
    return closest

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([-1, 2, 1, -4], 1, 2),
        ([0, 0, 0], 1, 0),
        ([1, 1, 1, 0], -100, 2),
        ([1, 1, 1, 0], 100, 3),
        ([-3, -2, -5, 3, -4], -1, -2)
    ]
    for nums, target, exp in fixed:
        ans = solver.threeSumClosest(nums, target)
        assert ans == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(3, 25)
        nums = [rng.randint(-50, 50) for _ in range(sz)]
        target = rng.randint(-100, 100)
        exp = ref_closest(nums, target)
        ans = solver.threeSumClosest(nums, target)
        assert abs(ans - target) == abs(exp - target)

    # Scale test: 500 elements
    big = [rng.randint(-1000, 1000) for _ in range(500)]
    t0 = time.perf_counter()
    ans = solver.threeSumClosest(big, 350)
    t1 = time.perf_counter()
    print(f"✓ 3Sum Closest: fixed, 35 random, and N=500 passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
