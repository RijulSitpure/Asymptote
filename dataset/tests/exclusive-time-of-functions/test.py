import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'exclusive-time-of-functions.json')
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

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (2, ["0:start:0","1:start:2","1:end:5","0:end:6"], [3, 4]),
        (1, ["0:start:0","0:start:2","0:end:5","0:start:6","0:end:6","0:end:7"], [8]),
        (2, ["0:start:0","0:start:2","0:end:5","1:start:6","1:end:6","0:end:7"], [7, 1])
    ]
    for n, logs, exp in fixed:
        assert solver.exclusiveTime(n, logs) == exp

    rng = random.Random(42)
    for _ in range(35):
        # Generate valid call log sequence
        logs = []
        curr_t = 0
        st = []
        n = 3
        prev_t = 0
        exp = [0] * n
        for fid in range(n):
            logs.append(f"{fid}:start:{curr_t}")
            if st:
                exp[st[-1]] += curr_t - prev_t
            st.append(fid)
            prev_t = curr_t
            curr_t += rng.randint(1, 3)
        while st:
            fid = st.pop()
            logs.append(f"{fid}:end:{curr_t}")
            exp[fid] += curr_t - prev_t + 1
            prev_t = curr_t + 1
            curr_t += rng.randint(1, 3)
        res = solver.exclusiveTime(n, logs)
        assert res == exp

    # Scale test: 10,000 logs
    scale_logs = []
    t = 0
    for i in range(5000):
        scale_logs.append(f"0:start:{t}")
        t += 2
        scale_logs.append(f"0:end:{t-1}")
    t0 = time.perf_counter()
    res = solver.exclusiveTime(1, scale_logs)
    t1 = time.perf_counter()
    assert res == [10000]
    print(f"✓ Exclusive Time of Functions: fixed, 35 random, and L=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
