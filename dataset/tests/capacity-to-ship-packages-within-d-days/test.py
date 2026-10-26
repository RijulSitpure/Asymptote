import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'capacity-to-ship-packages-within-d-days.json')
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

    scope = {'List': list, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 15),
        ([3, 2, 2, 4, 1, 4], 3, 6),
        ([1, 2, 3, 1, 1], 4, 3),
        ([10], 1, 10),
        ([5, 5, 5, 5], 2, 10)
    ]
    for w, d, exp in fixed:
        assert solver.shipWithinDays(w, d) == exp

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 40)
        w = [rng.randint(1, 25) for _ in range(sz)]
        d = rng.randint(1, sz)
        # reference via linear search starting from max(w)
        cap = max(w)
        while True:
            cur_d, cur_sum = 1, 0
            for item in w:
                if cur_sum + item > cap:
                    cur_d += 1
                    cur_sum = 0
                cur_sum += item
            if cur_d <= d:
                break
            cap += 1
        assert solver.shipWithinDays(w, d) == cap

    # Scale test: 20,000 items
    big = [i % 50 + 1 for i in range(20000)]
    t0 = time.perf_counter()
    res = solver.shipWithinDays(big, 100)
    t1 = time.perf_counter()
    assert res > 0
    print(f"✓ Capacity To Ship Packages: fixed, 30 random, and N=20k passed in {(t1-t0)*1000:.2f}ms")


if __name__ == '__main__':
    main()
