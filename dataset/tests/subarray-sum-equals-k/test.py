import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'subarray-sum-equals-k.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\n(.*?)\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_sub_sum(nums, k):
    count = 0
    n = len(nums)
    for i in range(n):
        s = 0
        for j in range(i, n):
            s += nums[j]
            if s == k:
                count += 1
    return count

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 1, 1], 2, 2),
        ([1, 2, 3], 3, 2),
        ([1, -1, 0], 0, 3),
        ([-1, -1, 1], 0, 1),
        ([3], 3, 1),
        ([3], 2, 0)
    ]
    for nums, k, exp in fixed:
        ans = solver.subarraySum(nums, k)
        assert ans == exp

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(1, 40)
        nums = [rng.randint(-15, 15) for _ in range(sz)]
        k = rng.randint(-20, 20)
        exp = ref_sub_sum(nums, k)
        ans = solver.subarraySum(nums, k)
        assert ans == exp

    # Scale test: 20,000 elements
    big = [1 if i % 2 == 0 else -1 for i in range(20000)]
    t0 = time.perf_counter()
    ans = solver.subarraySum(big, 0)
    t1 = time.perf_counter()
    print(f"✓ Subarray Sum Equals K: fixed, 40 random, and N=20k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
