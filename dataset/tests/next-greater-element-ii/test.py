import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'next-greater-element-ii.json')
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
        ([1, 2, 1], [2, -1, 2]),
        ([1, 2, 3, 4, 3], [2, 3, 4, -1, 4]),
        ([5, 4, 3, 2, 1], [-1, 5, 5, 5, 5]),
        ([1], [-1])
    ]
    for nums, exp in fixed:
        res = solver.nextGreaterElements(nums)
        assert res == exp, f"Failed on {nums}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 30)
        nums = [rng.randint(-50, 50) for _ in range(sz)]
        exp = []
        for i in range(sz):
            ans = -1
            for offset in range(1, sz):
                j = (i + offset) % sz
                if nums[j] > nums[i]:
                    ans = nums[j]
                    break
            exp.append(ans)
        assert solver.nextGreaterElements(nums) == exp

    # Scale test
    big_nums = list(range(25000))
    t0 = time.perf_counter()
    res = solver.nextGreaterElements(big_nums)
    t1 = time.perf_counter()
    assert len(res) == 25000
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
