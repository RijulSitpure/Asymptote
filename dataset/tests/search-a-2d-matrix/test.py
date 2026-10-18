#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'search-a-2d-matrix.json'), 'r') as f:
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

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3, True),
        ([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13, False),
        ([[1]], 1, True),
        ([[1]], 0, False),
        ([], 1, False),
        ([[]], 1, False)
    ]
    for mat, target, exp in fixed:
        assert solver.searchMatrix(mat, target) == exp

    rng = random.Random(42)
    for _ in range(50):
        m = rng.randint(1, 10)
        n = rng.randint(1, 10)
        vals = sorted(list(set(rng.randint(-100, 100) for _ in range(m * n))))
        while len(vals) < m * n: vals.append(vals[-1] + 1)
        mat = [vals[i * n : (i + 1) * n] for i in range(m)]
        target = rng.choice(vals) if rng.random() < 0.5 else rng.randint(-120, 120)
        exp = any(target in row for row in mat)
        assert solver.searchMatrix(mat, target) == exp

    # Large 100x100 matrix
    vals = list(range(10000))
    mat = [vals[i * 100 : (i + 1) * 100] for i in range(100)]
    t0 = time.perf_counter()
    assert solver.searchMatrix(mat, 9999) is True
    assert solver.searchMatrix(mat, 10001) is False
    t1 = time.perf_counter()
    print(f"✓ Search a 2D Matrix: fixed, 50 random, and 100x100 matrix passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
