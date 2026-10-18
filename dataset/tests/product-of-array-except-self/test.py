#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'product-of-array-except-self.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_product_except_self(nums):
    n = len(nums)
    res = [1] * n
    for i in range(n):
        p = 1
        for j in range(n):
            if i != j:
                p *= nums[j]
        res[i] = p
    return res

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [1, 2, 3, 4],
        [-1, 1, 0, -3, 3],
        [0, 0],
        [1, 0],
        [2, 3]
    ]
    for nums in fixed:
        assert solver.productExceptSelf(nums) == ref_product_except_self(nums)

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(2, 20)
        nums = [rng.randint(-10, 10) for _ in range(sz)]
        assert solver.productExceptSelf(nums) == ref_product_except_self(nums)

    # Max-size test: N = 100,000
    big_nums = [1] * 100000
    big_nums[5000] = 2
    t0 = time.perf_counter()
    ans = solver.productExceptSelf(big_nums)
    t1 = time.perf_counter()
    assert ans[0] == 2 and ans[5000] == 1
    print(f"✓ Product of Array Except Self: fixed and 40 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
