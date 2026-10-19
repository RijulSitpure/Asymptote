import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'search-a-2d-matrix-ii.json')
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

    mat = [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]
    ]
    assert solver.searchMatrix(mat, 5) is True
    assert solver.searchMatrix(mat, 20) is False
    assert solver.searchMatrix([[1]], 1) is True
    assert solver.searchMatrix([[1]], 2) is False

    rng = random.Random(42)
    for _ in range(35):
        m, n = rng.randint(1, 15), rng.randint(1, 15)
        # build sorted matrix
        test_mat = [[i * 20 + j * 3 for j in range(n)] for i in range(m)]
        target = rng.randint(0, m * 20 + n * 3 + 5)
        expected = any(target in row for row in test_mat)
        assert solver.searchMatrix(test_mat, target) == expected

    # Scale test: 300 x 300 matrix
    big_mat = [[i + j for j in range(300)] for i in range(300)]
    t0 = time.perf_counter()
    res = solver.searchMatrix(big_mat, 598)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Search a 2D Matrix II: fixed, 35 random, and 300x300 passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
