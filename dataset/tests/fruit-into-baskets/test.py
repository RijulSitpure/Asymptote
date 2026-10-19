import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'fruit-into-baskets.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\n(.*?)\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_total_fruit(fruits):
    ans = 0
    n = len(fruits)
    for i in range(n):
        seen = set()
        for j in range(i, n):
            seen.add(fruits[j])
            if len(seen) <= 2:
                ans = max(ans, j - i + 1)
            else:
                break
    return ans

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 1], 3),
        ([0, 1, 2, 2], 3),
        ([1, 2, 3, 2, 2], 4),
        ([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4], 5),
        ([1], 1),
        ([1, 1, 1, 1], 4)
    ]
    for fruits, exp in fixed:
        ans = solver.totalFruit(fruits)
        assert ans == exp

    rng = random.Random(42)
    for _ in range(40):
        sz = rng.randint(1, 40)
        fruits = [rng.randint(0, 5) for _ in range(sz)]
        exp = ref_total_fruit(fruits)
        ans = solver.totalFruit(fruits)
        assert ans == exp

    # Scale test: 50,000 elements
    big = [i % 2 for i in range(50000)]
    t0 = time.perf_counter()
    ans = solver.totalFruit(big)
    t1 = time.perf_counter()
    assert ans == 50000
    print(f"✓ Fruit Into Baskets: fixed, 40 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
