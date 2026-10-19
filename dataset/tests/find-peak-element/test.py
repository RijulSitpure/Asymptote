import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'find-peak-element.json')
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

    def is_peak(nums, idx):
        left_ok = (idx == 0) or (nums[idx] > nums[idx - 1])
        right_ok = (idx == len(nums) - 1) or (nums[idx] > nums[idx + 1])
        return left_ok and right_ok

    fixed = [
        [1, 2, 3, 1],
        [1, 2, 1, 3, 5, 6, 4],
        [1],
        [1, 2],
        [2, 1]
    ]
    for nums in fixed:
        idx = solver.findPeakElement(nums)
        assert is_peak(nums, idx)

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        nums = [rng.randint(-500, 500)]
        for _ in range(sz - 1):
            val = rng.randint(-500, 500)
            while val == nums[-1]: val = rng.randint(-500, 500)
            nums.append(val)
        idx = solver.findPeakElement(nums)
        assert is_peak(nums, idx)

    # Scale test: 10,000 elements
    big = list(range(5000)) + list(range(4998, -1, -1))
    t0 = time.perf_counter()
    res = solver.findPeakElement(big)
    t1 = time.perf_counter()
    assert is_peak(big, res)
    print(f"✓ Find Peak Element: fixed, 35 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
