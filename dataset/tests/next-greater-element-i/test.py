import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'next-greater-element-i.json')
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
        ([4, 1, 2], [1, 3, 4, 2], [-1, 3, -1]),
        ([2, 4], [1, 2, 3, 4], [3, -1]),
        ([1, 3], [1, 3], [3, -1]),
        ([7], [7], [-1])
    ]
    for nums1, nums2, exp in fixed:
        res = solver.nextGreaterElement(nums1, nums2)
        assert res == exp, f"Failed on {nums1}, {nums2}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 30)
        nums2 = list(range(sz))
        rng.shuffle(nums2)
        nums1 = rng.sample(nums2, rng.randint(1, sz))
        # brute force
        exp = []
        for x in nums1:
            idx = nums2.index(x)
            nxt = -1
            for j in range(idx + 1, sz):
                if nums2[j] > x:
                    nxt = nums2[j]
                    break
            exp.append(nxt)
        assert solver.nextGreaterElement(nums1, nums2) == exp

    # Scale test
    big_nums2 = list(range(20000))
    big_nums1 = big_nums2[:5000]
    t0 = time.perf_counter()
    res = solver.nextGreaterElement(big_nums1, big_nums2)
    t1 = time.perf_counter()
    assert len(res) == 5000
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
