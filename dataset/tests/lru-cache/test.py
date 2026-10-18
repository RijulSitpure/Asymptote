#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'lru-cache.json'), 'r') as f:
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
    LRUCache = scope['LRUCache']

    # Test 1: standard sequence from description
    cache = LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    assert cache.get(1) == 1
    cache.put(3, 3) # evicts key 2
    assert cache.get(2) == -1
    cache.put(4, 4) # evicts key 1
    assert cache.get(1) == -1
    assert cache.get(3) == 3
    assert cache.get(4) == 4

    # Test 2: updating existing key does not evict incorrectly
    c2 = LRUCache(2)
    c2.put(2, 1)
    c2.put(2, 2)
    assert c2.get(2) == 2
    c2.put(1, 1)
    c2.put(4, 1) # evicts key 2 (key 2 was least recently used since put(1,1) came after get(2))
    assert c2.get(2) == -1

    # Test 3: stress / randomized
    rng = random.Random(42)
    cap = 50
    c3 = LRUCache(cap)
    model = {} # key -> val
    usage = [] # order of keys
    t0 = time.perf_counter()
    for _ in range(5000):
        if rng.random() < 0.6:
            k = rng.randint(1, 100)
            v = rng.randint(1, 1000)
            c3.put(k, v)
            model[k] = v
            if k in usage: usage.remove(k)
            usage.append(k)
            if len(usage) > cap:
                lru = usage.pop(0)
                del model[lru]
        else:
            k = rng.randint(1, 100)
            res = c3.get(k)
            if k in model:
                assert res == model[k]
                usage.remove(k)
                usage.append(k)
            else:
                assert res == -1
    t1 = time.perf_counter()

    print(f"✓ LRU Cache: standard, update, and 5,000 randomized operations passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
