import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold.json')
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
        ([2, 2, 2, 2, 5, 5, 5, 8], 3, 4, 3),
        ([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5, 6),
        ([1, 1, 1, 1], 1, 1, 4),
        ([1, 1, 1, 1], 2, 2, 0)
    ]
    for arr, k, t, exp in fixed:
        assert solver.numOfSubarrays(arr, k, t) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        arr = [rng.randint(0, 50) for _ in range(sz)]
        k = rng.randint(1, sz)
        t = rng.randint(0, 30)
        # reference
        ref = 0
        for i in range(sz - k + 1):
            if sum(arr[i:i + k]) >= k * t:
                ref += 1
        assert solver.numOfSubarrays(arr, k, t) == ref

    # Scale test: 50,000 items
    big = [10] * 50000
    t0 = time.perf_counter()
    res = solver.numOfSubarrays(big, 50, 10)
    t1 = time.perf_counter()
    assert res == 49951
    print(f"✓ Number of Sub-arrays of Size K: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
