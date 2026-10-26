import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'find-first-and-last-position-of-element-in-sorted-array.json')
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
        ([5, 7, 7, 8, 8, 10], 8, [3, 4]),
        ([5, 7, 7, 8, 8, 10], 6, [-1, -1]),
        ([], 0, [-1, -1]),
        ([1], 1, [0, 0]),
        ([2, 2, 2, 2], 2, [0, 3])
    ]
    for nums, target, exp in fixed:
        assert solver.searchRange(nums, target) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(0, 50)
        nums = sorted([rng.randint(1, 15) for _ in range(sz)])
        target = rng.randint(1, 15)
        # reference
        if target not in nums:
            exp = [-1, -1]
        else:
            first = nums.index(target)
            last = len(nums) - 1 - nums[::-1].index(target)
            exp = [first, last]
        assert solver.searchRange(nums, target) == exp

    # Scale test: 50,000 identical elements
    big = [7] * 50000
    t0 = time.perf_counter()
    res = solver.searchRange(big, 7)
    t1 = time.perf_counter()
    assert res == [0, 49999]
    print(f"✓ Find First and Last Position: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
