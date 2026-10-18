#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'min-stack.json'), 'r') as f:
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
    MinStack = scope['MinStack']

    # Test 1: standard sequence
    ms = MinStack()
    ms.push(-2)
    ms.push(0)
    ms.push(-3)
    assert ms.getMin() == -3
    ms.pop()
    assert ms.top() == 0
    assert ms.getMin() == -2

    # Test 2: duplicate minimums
    ms2 = MinStack()
    ms2.push(5)
    ms2.push(2)
    ms2.push(2)
    assert ms2.getMin() == 2
    ms2.pop()
    assert ms2.getMin() == 2
    ms2.pop()
    assert ms2.getMin() == 5

    # Test 3: stress / randomized
    rng = random.Random(42)
    ms3 = MinStack()
    ref = []
    t0 = time.perf_counter()
    for _ in range(10000):
        op = rng.choice(['push', 'pop', 'top', 'getMin']) if ref else 'push'
        if op == 'push':
            v = rng.randint(-1000, 1000)
            ref.append(v)
            ms3.push(v)
        elif op == 'pop':
            ref.pop()
            ms3.pop()
        elif op == 'top':
            assert ms3.top() == ref[-1]
        elif op == 'getMin':
            assert ms3.getMin() == min(ref)
    t1 = time.perf_counter()

    print(f"✓ Min Stack: standard, duplicate, and 10,000 randomized operations passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
