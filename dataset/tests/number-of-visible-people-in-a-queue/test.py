import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'number-of-visible-people-in-a-queue.json')
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
        ([10, 6, 8, 5, 11, 9], [3, 1, 2, 1, 1, 0]),
        ([5, 1, 2, 3, 10], [4, 1, 1, 1, 0]),
        ([1, 2, 3], [1, 1, 0]),
        ([3, 2, 1], [1, 1, 0]),
        ([10], [0])
    ]
    for heights, exp in fixed:
        res = solver.canSeePersonsCount(heights)
        assert res == exp, f"Failed on {heights}: expected {exp}, got {res}"

    def brute(heights):
        n = len(heights)
        ans = [0] * n
        for i in range(n):
            max_mid = 0
            for j in range(i + 1, n):
                if heights[j] > max_mid:
                    ans[i] += 1
                    max_mid = heights[j]
                if heights[j] >= heights[i]:
                    break
        return ans

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 30)
        heights = rng.sample(range(1, 1000), sz)
        assert solver.canSeePersonsCount(heights) == brute(heights)

    # Scale test
    big_heights = list(range(30000, 0, -1))
    t0 = time.perf_counter()
    res = solver.canSeePersonsCount(big_heights)
    t1 = time.perf_counter()
    assert res[-1] == 0
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
