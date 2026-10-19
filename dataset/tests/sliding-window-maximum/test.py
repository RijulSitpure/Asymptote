import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'sliding-window-maximum.json')
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
        ([1,3,-1,-3,5,3,6,7], 3, [3,3,5,5,6,7]),
        ([1], 1, [1]),
        ([1, -1], 1, [1, -1]),
        ([9, 11], 2, [11]),
        ([4, -2], 2, [4])
    ]
    for nums, k, exp in fixed:
        res = solver.maxSlidingWindow(nums, k)
        assert res == exp, f"Failed on {nums}, {k}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        n = rng.randint(1, 50)
        k = rng.randint(1, n)
        nums = [rng.randint(-100, 100) for _ in range(n)]
        exp = [max(nums[i:i + k]) for i in range(n - k + 1)]
        assert solver.maxSlidingWindow(nums, k) == exp

    # Scale test
    big_nums = list(range(50000))
    t0 = time.perf_counter()
    res = solver.maxSlidingWindow(big_nums, 1000)
    t1 = time.perf_counter()
    assert len(res) == 50000 - 1000 + 1
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
