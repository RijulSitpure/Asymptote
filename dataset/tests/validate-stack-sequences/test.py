import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'validate-stack-sequences.json')
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
        ([1, 2, 3, 4, 5], [4, 5, 3, 2, 1], True),
        ([1, 2, 3, 4, 5], [4, 3, 5, 1, 2], False),
        ([1, 0], [1, 0], True),
        ([1, 0], [0, 1], True),
        ([2, 1, 0], [1, 2, 0], True)
    ]
    for pushed, popped, exp in fixed:
        res = solver.validateStackSequences(pushed, popped)
        assert res == exp, f"Failed on {pushed}, {popped}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        n = rng.randint(1, 40)
        pushed = list(range(1, n + 1))
        # generate valid pop sequence by random push/pop simulation
        st = []
        popped = []
        pi = 0
        while pi < n or st:
            if pi < n and (not st or rng.random() < 0.5):
                st.append(pushed[pi])
                pi += 1
            else:
                popped.append(st.pop())
        assert solver.validateStackSequences(pushed, popped) is True

    # Scale test
    n = 50000
    pushed = list(range(n))
    popped = list(reversed(pushed))
    t0 = time.perf_counter()
    res = solver.validateStackSequences(pushed, popped)
    t1 = time.perf_counter()
    assert res is True
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
