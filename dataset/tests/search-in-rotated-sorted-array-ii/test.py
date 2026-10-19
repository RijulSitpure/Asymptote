import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'search-in-rotated-sorted-array-ii.json')
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
        ([2, 5, 6, 0, 0, 1, 2], 0, True),
        ([2, 5, 6, 0, 0, 1, 2], 3, False),
        ([1, 0, 1, 1, 1], 0, True),
        ([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], 2, True),
        ([1], 1, True),
        ([1], 0, False)
    ]
    for nums, target, exp in fixed:
        assert solver.search(nums, target) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 35)
        base = sorted([rng.randint(-10, 10) for _ in range(sz)])
        rot = rng.randint(0, sz)
        nums = base[rot:] + base[:rot]
        target = rng.randint(-12, 12)
        assert solver.search(nums, target) == (target in nums)

    # Scale test: 5,000 duplicate items
    big = [1] * 5000
    big[2500] = 7
    t0 = time.perf_counter()
    res = solver.search(big, 7)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Search in Rotated Sorted Array II: fixed, 35 random, and N=5k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
