import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'squares-of-a-sorted-array.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\n(.*?)\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([-4, -1, 0, 3, 10], [0, 1, 9, 16, 100]),
        ([-7, -3, 2, 3, 11], [4, 9, 9, 49, 121]),
        ([-5], [25]),
        ([0], [0]),
        ([1, 2, 3], [1, 4, 9]),
        ([-3, -2, -1], [1, 4, 9])
    ]
    for nums, exp in fixed:
        ans = solver.sortedSquares(nums)
        assert ans == exp

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(1, 60)
        nums = sorted([rng.randint(-200, 200) for _ in range(sz)])
        exp = sorted([x * x for x in nums])
        ans = solver.sortedSquares(nums)
        assert ans == exp

    # Scale test: 30,000 elements
    big = list(range(-15000, 15000))
    t0 = time.perf_counter()
    ans = solver.sortedSquares(big)
    t1 = time.perf_counter()
    assert ans[0] == 0 and len(ans) == 30000 and ans[-1] == 15000**2
    print(f"✓ Squares of a Sorted Array: fixed, 40 random, and N=30k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
