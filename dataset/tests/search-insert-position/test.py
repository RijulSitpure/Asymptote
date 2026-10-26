import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'search-insert-position.json')
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
        ([1, 3, 5, 6], 5, 2),
        ([1, 3, 5, 6], 2, 1),
        ([1, 3, 5, 6], 7, 4),
        ([1, 3, 5, 6], 0, 0),
        ([1], 0, 0),
        ([1], 1, 0),
        ([1], 2, 1)
    ]
    for nums, target, exp in fixed:
        assert solver.searchInsert(nums, target) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        nums = sorted(list(set(rng.randint(-100, 100) for _ in range(sz))))
        target = rng.randint(-120, 120)
        # reference via bisect
        import bisect
        exp = bisect.bisect_left(nums, target)
        assert solver.searchInsert(nums, target) == exp

    # Scale test: 10^5 elements
    big = list(range(0, 200000, 2))
    t0 = time.perf_counter()
    res = solver.searchInsert(big, 99999)
    t1 = time.perf_counter()
    assert res == 50000
    print(f"✓ Search Insert Position: fixed, 35 random, and N=100k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
