import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'h-index-ii.json')
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

    fixed = [
        ([0, 1, 3, 5, 6], 3),
        ([1, 2, 100], 2),
        ([0], 0),
        ([100], 1),
        ([0, 0, 0], 0)
    ]
    for citations, exp in fixed:
        assert solver.hIndex(citations) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        citations = sorted([rng.randint(0, 50) for _ in range(sz)])
        # reference
        n = len(citations)
        ref_h = 0
        for i, c in enumerate(citations):
            if c >= n - i:
                ref_h = max(ref_h, n - i)
        assert solver.hIndex(citations) == ref_h

    # Scale test: 50,000 papers
    big = sorted([i * 2 for i in range(50000)])
    t0 = time.perf_counter()
    res = solver.hIndex(big)
    t1 = time.perf_counter()
    assert res == 33333
    print(f"✓ H-Index II: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
