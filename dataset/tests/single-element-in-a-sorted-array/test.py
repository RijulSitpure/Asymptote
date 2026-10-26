import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'single-element-in-a-sorted-array.json')
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

    scope = {'List': list, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 1, 2, 3, 3, 4, 4, 8, 8], 2),
        ([3, 3, 7, 7, 10, 11, 11], 10),
        ([1], 1),
        ([1, 1, 2], 2),
        ([2, 3, 3], 2)
    ]
    for nums, exp in fixed:
        assert solver.singleNonDuplicate(nums) == exp

    rng = random.Random(42)
    for _ in range(35):
        pairs_cnt = rng.randint(0, 30)
        vals = sorted(rng.sample(range(1, 200), pairs_cnt + 1))
        single = vals[rng.randint(0, pairs_cnt)]
        nums = []
        for v in vals:
            if v == single: nums.append(v)
            else:
                nums.append(v)
                nums.append(v)
        nums.sort()
        assert solver.singleNonDuplicate(nums) == single

    # Scale test: 50,001 elements
    big = []
    for i in range(25000):
        big.append(i)
        big.append(i)
    big.append(999999)
    big.sort()
    t0 = time.perf_counter()
    res = solver.singleNonDuplicate(big)
    t1 = time.perf_counter()
    assert res == 999999
    print(f"✓ Single Element in a Sorted Array: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
