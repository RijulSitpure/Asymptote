#!/usr/bin/env python3
import json, os, re, random, time, copy

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'non-overlapping-intervals.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_erase(intervals):
    if not intervals: return 0
    intervals = sorted([list(x) for x in intervals], key=lambda x: x[1])
    count = 0
    prev_end = intervals[0][1]
    for i in range(1, len(intervals)):
        if intervals[i][0] < prev_end:
            count += 1
        else:
            prev_end = intervals[i][1]
    return count

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([[1,2],[2,3],[3,4],[1,3]], 1),
        ([[1,2],[1,2],[1,2]], 2),
        ([[1,2],[2,3]], 0),
        ([[1,100],[11,22],[1,11],[2,12]], 2),
        ([], 0),
        ([[1,2]], 0)
    ]

    for intervals, exp in fixed:
        ans = solver.eraseOverlapIntervals(copy.deepcopy(intervals))
        assert ans == exp, f"Failed on {intervals}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(30):
        n = rng.randint(1, 20)
        intervals = []
        for _ in range(n):
            s = rng.randint(0, 50)
            e = s + rng.randint(1, 20)
            intervals.append([s, e])
        exp = ref_erase(intervals)
        ans = solver.eraseOverlapIntervals(copy.deepcopy(intervals))
        assert ans == exp, f"Failed on {intervals}: expected {exp}, got {ans}"

    # Scale test: 10,000 intervals
    big = []
    for _ in range(10000):
        s = rng.randint(0, 100000)
        big.append([s, s + rng.randint(1, 100)])
    t0 = time.perf_counter()
    ans = solver.eraseOverlapIntervals(copy.deepcopy(big))
    t1 = time.perf_counter()
    assert ans == ref_erase(big)
    print(f"✓ Non-overlapping Intervals: fixed and 30 random cases passed. Scale (10k intervals): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
