import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'maximum-sum-of-distinct-subarrays-with-length-k.json')
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
        ([1, 5, 4, 2, 9, 9, 9], 3, 15),
        ([4, 4, 4], 3, 0),
        ([1, 1, 1, 7, 8, 9], 3, 24),
        ([1, 2, 3, 4, 5], 5, 15)
    ]
    for nums, k, exp in fixed:
        assert solver.maximumSubarraySum(nums, k) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 35)
        nums = [rng.randint(1, 12) for _ in range(sz)]
        k = rng.randint(1, sz)
        # reference
        ref = 0
        for i in range(sz - k + 1):
            sub = nums[i:i + k]
            if len(set(sub)) == k:
                ref = max(ref, sum(sub))
        assert solver.maximumSubarraySum(nums, k) == ref

    # Scale test: 50,000 distinct items
    big = list(range(50000))
    t0 = time.perf_counter()
    res = solver.maximumSubarraySum(big, 500)
    t1 = time.perf_counter()
    assert res > 0
    print(f"✓ Maximum Sum of Distinct Subarrays: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
