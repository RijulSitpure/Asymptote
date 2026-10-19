import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'sum-of-subarray-minimums.json')
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
        ([3, 1, 2, 4], 17),
        ([11, 81, 94, 43, 3], 444),
        ([71, 55, 82, 55], 593),
        ([1], 1),
        ([2, 2, 2], 12)
    ]
    for arr, exp in fixed:
        res = solver.sumSubarrayMins(arr)
        assert res == exp, f"Failed on {arr}: expected {exp}, got {res}"

    def brute(arr):
        n = len(arr)
        tot = 0
        for i in range(n):
            cur_min = arr[i]
            for j in range(i, n):
                cur_min = min(cur_min, arr[j])
                tot = (tot + cur_min) % (10**9 + 7)
        return tot

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 30)
        arr = [rng.randint(1, 100) for _ in range(sz)]
        assert solver.sumSubarrayMins(arr) == brute(arr)

    # Scale test
    big_arr = [1] * 20000
    t0 = time.perf_counter()
    res = solver.sumSubarrayMins(big_arr)
    t1 = time.perf_counter()
    exp = (20000 * 20001 // 2) % (10**9 + 7)
    assert res == exp
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
