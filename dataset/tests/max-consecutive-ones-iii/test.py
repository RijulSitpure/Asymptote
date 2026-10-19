import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'max-consecutive-ones-iii.json')
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

    scope = {'List': list, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2, 6),
        ([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3, 10),
        ([0, 0, 0, 0], 0, 0),
        ([1, 1, 1, 1], 2, 4),
        ([0], 1, 1)
    ]
    for nums, k, exp in fixed:
        assert solver.longestOnes(nums, k) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        nums = [rng.choice([0, 1]) for _ in range(sz)]
        k = rng.randint(0, sz)
        # reference
        ref = 0
        for i in range(sz):
            zeros = 0
            for j in range(i, sz):
                if nums[j] == 0: zeros += 1
                if zeros <= k:
                    ref = max(ref, j - i + 1)
                else: break
        assert solver.longestOnes(nums, k) == ref

    # Scale test: 50,000 items
    big = [1 if i % 4 != 0 else 0 for i in range(50000)]
    t0 = time.perf_counter()
    res = solver.longestOnes(big, 20)
    t1 = time.perf_counter()
    assert res > 0
    print(f"✓ Max Consecutive Ones III: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
