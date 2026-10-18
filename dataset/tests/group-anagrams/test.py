#!/usr/bin/env python3
import json, os, re, random, time
from collections import defaultdict

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'group-anagrams.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        groups[''.join(sorted(s))].append(s)
    return list(groups.values())

def normalize(groups):
    return sorted([sorted(g) for g in groups])

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ["eat", "tea", "tan", "ate", "nat", "bat"],
        [""],
        ["a"],
        ["bdddddddddd", "bbbbbbbbbbc"],
        ["cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc"]
    ]
    for strs in fixed:
        assert normalize(solver.groupAnagrams(strs)) == normalize(ref_group_anagrams(strs))

    rng = random.Random(42)
    letters = 'abcd'
    for _ in range(40):
        n = rng.randint(1, 20)
        strs = [''.join(rng.choice(letters) for _ in range(rng.randint(0, 6))) for _ in range(n)]
        assert normalize(solver.groupAnagrams(strs)) == normalize(ref_group_anagrams(strs))

    # Max-size test: 10,000 strings
    big_strs = ["abc" if i % 2 == 0 else "bca" for i in range(10000)]
    t0 = time.perf_counter()
    res = solver.groupAnagrams(big_strs)
    t1 = time.perf_counter()
    assert len(res) == 1 and len(res[0]) == 10000
    print(f"✓ Group Anagrams: fixed and 40 random cases passed. Max size N=10k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
