#!/usr/bin/env python3
import json, os, re, random, time
from collections import Counter

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'top-k-frequent-elements.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_top_k(nums, k):
    return [item[0] for item in Counter(nums).most_common(k)]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 1, 1, 2, 2, 3], 2),
        ([1], 1),
        ([4, 1, -1, 2, -1, 2, 3], 2),
        ([1, 2], 2)
    ]
    for nums, k in fixed:
        ans = solver.topKFrequent(nums, k)
        ref = ref_top_k(nums, k)
        assert set(ans) == set(ref) and len(ans) == k

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(10, 100)
        nums = [rng.randint(-50, 50) for _ in range(sz)]
        uniq = len(set(nums))
        k = rng.randint(1, uniq)
        ans = solver.topKFrequent(nums, k)
        counts = Counter(nums)
        # All elements in ans must have frequency >= any element not in ans
        ans_min_freq = min(counts[x] for x in ans)
        rest = [counts[x] for x in counts if x not in ans]
        rest_max_freq = max(rest) if rest else -1
        assert len(ans) == k and ans_min_freq >= rest_max_freq

    # Max-size test: N = 100,000, k = 10
    big_nums = [i % 500 for i in range(100000)]
    t0 = time.perf_counter()
    ans = solver.topKFrequent(big_nums, 10)
    t1 = time.perf_counter()
    assert len(ans) == 10
    print(f"✓ Top K Frequent Elements: fixed and 50 random cases passed. Max size N=100k: {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
