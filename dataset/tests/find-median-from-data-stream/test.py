#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'find-median-from-data-stream.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_median(arr):
    s = sorted(arr)
    n = len(s)
    if n % 2 == 1:
        return float(s[n // 2])
    return (s[n // 2 - 1] + s[n // 2]) / 2.0

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    MedianFinder = scope['MedianFinder']

    # Test 1: Standard sequence
    mf = MedianFinder()
    mf.addNum(1)
    assert mf.findMedian() == 1.0
    mf.addNum(2)
    assert mf.findMedian() == 1.5
    mf.addNum(3)
    assert mf.findMedian() == 2.0

    # Test 2: Negative numbers
    mf2 = MedianFinder()
    mf2.addNum(-1)
    assert mf2.findMedian() == -1.0
    mf2.addNum(-2)
    assert mf2.findMedian() == -1.5
    mf2.addNum(-3)
    assert mf2.findMedian() == -2.0

    # Test 3: Duplicates
    mf3 = MedianFinder()
    for _ in range(5): mf3.addNum(7)
    assert mf3.findMedian() == 7.0

    # Test 4: Randomized stream
    rng = random.Random(42)
    mf4 = MedianFinder()
    ref = []
    for _ in range(100):
        val = rng.randint(-100, 100)
        mf4.addNum(val)
        ref.append(val)
        exp = ref_median(ref)
        ans = mf4.findMedian()
        assert abs(ans - exp) < 1e-6, f"Expected {exp}, got {ans}"

    # Scale test: 5,000 insertions
    mf_scale = MedianFinder()
    t0 = time.perf_counter()
    for _ in range(5000):
        mf_scale.addNum(rng.randint(-10000, 10000))
    _ = mf_scale.findMedian()
    t1 = time.perf_counter()
    print(f"✓ Find Median from Data Stream: fixed and 100 stream ops passed. Scale (5k nums): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
