#!/usr/bin/env python3
import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'merge-intervals.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_merge(intervals):
    if not intervals: return []
    intervals = sorted([list(x) for x in intervals], key=lambda x: x[0])
    merged = [intervals[0]]
    for curr in intervals[1:]:
        prev = merged[-1]
        if curr[0] <= prev[1]:
            prev[1] = max(prev[1], curr[1])
        else:
            merged.append(curr)
    return merged

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([[1,3],[2,6],[8,10],[15,18]], [[1,6],[8,10],[15,18]]),
        ([[1,4],[4,5]], [[1,5]]),
        ([[1,4],[2,3]], [[1,4]]),
        ([[1,4]], [[1,4]]),
        ([], []),
        ([[1,4],[0,4]], [[0,4]]),
        ([[1,4],[0,0]], [[0,0],[1,4]])
    ]

    for intervals, exp in fixed:
        ans = solver.merge(copy.deepcopy(intervals))
        assert ans == exp, f"Failed on {intervals}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        n = rng.randint(1, 20)
        intervals = []
        for _ in range(n):
            s = rng.randint(0, 50)
            e = s + rng.randint(0, 20)
            intervals.append([s, e])
        exp = ref_merge(intervals)
        ans = solver.merge(copy.deepcopy(intervals))
        assert ans == exp, f"Failed on {intervals}: expected {exp}, got {ans}"

    # Scale test: 10,000 intervals
    big = []
    for _ in range(10000):
        s = rng.randint(0, 100000)
        big.append([s, s + rng.randint(0, 100)])
    t0 = time.perf_counter()
    ans = solver.merge(copy.deepcopy(big))
    t1 = time.perf_counter()
    assert len(ans) <= len(big)
    print(f"✓ Merge Intervals: fixed and 30 random cases passed. Scale (10k intervals): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
