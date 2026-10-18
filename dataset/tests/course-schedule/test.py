#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'course-schedule.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_can_finish(numCourses, prerequisites):
    adj = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses
    for c, p in prerequisites:
        adj[p].append(c)
        indegree[c] += 1
    q = [i for i in range(numCourses) if indegree[i] == 0]
    taken = 0
    while q:
        curr = q.pop()
        taken += 1
        for nxt in adj[curr]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)
    return taken == numCourses

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (2, [[1, 0]], True),
        (2, [[1, 0], [0, 1]], False),
        (1, [], True),
        (3, [[0, 1], [0, 2], [1, 2]], True),
        (3, [[0, 1], [1, 2], [2, 0]], False),
        (4, [[1, 0], [2, 0], [3, 1], [3, 2]], True)
    ]

    for num, prereqs, exp in fixed:
        ans = solver.canFinish(num, [list(p) for p in prereqs])
        assert ans == exp, f"Failed on num={num}, prereqs={prereqs}: expected {exp}, got {ans}"

    rng = random.Random(42)
    for _ in range(25):
        n = rng.randint(2, 15)
        # Random DAG or cyclic graph
        prereqs = []
        for i in range(n):
            for j in range(n):
                if i != j and rng.random() < 0.2:
                    prereqs.append([i, j])
        exp = ref_can_finish(n, prereqs)
        ans = solver.canFinish(n, [list(p) for p in prereqs])
        assert ans == exp, f"Failed on random graph: expected {exp}, got {ans}"

    # Scale test: 500 courses chain
    chain = [[i, i - 1] for i in range(1, 500)]
    t0 = time.perf_counter()
    ans = solver.canFinish(500, chain)
    t1 = time.perf_counter()
    assert ans is True
    print(f"✓ Course Schedule: fixed and 25 random graphs passed. Scale (500 courses): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
