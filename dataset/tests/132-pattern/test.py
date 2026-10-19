import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', '132-pattern.json')
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
        ([1, 2, 3, 4], False),
        ([3, 1, 4, 2], True),
        ([-1, 3, 2, 0], True),
        ([1, 0, 1, -4, -3], False),
        ([3, 5, 0, 3, 4], True)
    ]
    for nums, exp in fixed:
        res = solver.find132pattern(nums)
        assert res == exp, f"Failed on {nums}: expected {exp}, got {res}"

    def brute(nums):
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                for k in range(j + 1, n):
                    if nums[i] < nums[k] < nums[j]:
                        return True
        return False

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(3, 20)
        nums = [rng.randint(-20, 20) for _ in range(sz)]
        assert solver.find132pattern(nums) == brute(nums)

    # Scale test
    big_nums = list(range(50000))
    t0 = time.perf_counter()
    res = solver.find132pattern(big_nums)
    t1 = time.perf_counter()
    assert res is False
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
