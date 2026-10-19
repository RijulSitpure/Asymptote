import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'maximum-width-ramp.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'List': list}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([6, 0, 8, 2, 1, 5], 4),
        ([9, 8, 1, 0, 1, 9, 4, 0, 4, 1], 7),
        ([1, 1], 1),
        ([2, 1], 0),
        ([1, 2, 3, 4, 5], 4)
    ]
    for nums, exp in fixed:
        res = solver.maxWidthRamp(nums)
        assert res == exp, f"Failed on {nums}: expected {exp}, got {res}"

    def brute(nums):
        n = len(nums)
        ans = 0
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] <= nums[j]:
                    ans = max(ans, j - i)
        return ans

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(2, 30)
        nums = [rng.randint(0, 50) for _ in range(sz)]
        assert solver.maxWidthRamp(nums) == brute(nums)

    # Scale test
    big_nums = list(range(40000))
    t0 = time.perf_counter()
    res = solver.maxWidthRamp(big_nums)
    t1 = time.perf_counter()
    assert res == 39999
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
