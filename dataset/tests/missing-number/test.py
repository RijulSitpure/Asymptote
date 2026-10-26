import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'missing-number.json')
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
        ([3, 0, 1], 2),
        ([0, 1], 2),
        ([9, 6, 4, 2, 3, 5, 7, 0, 1], 8),
        ([0], 1),
        ([1], 0)
    ]
    for nums, exp in fixed:
        assert solver.missingNumber(nums) == exp

    rng = random.Random(42)
    for _ in range(35):
        n = rng.randint(1, 50)
        missing = rng.randint(0, n)
        nums = [i for i in range(n + 1) if i != missing]
        rng.shuffle(nums)
        assert solver.missingNumber(nums) == missing

    # Scale test: 50,000 elements
    big = list(range(50001))
    big.remove(23456)
    t0 = time.perf_counter()
    res = solver.missingNumber(big)
    t1 = time.perf_counter()
    assert res == 23456
    print(f"✓ Missing Number: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
