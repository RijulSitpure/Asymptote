#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'implement-trie-prefix-tree.json'), 'r') as f:
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
    Trie = scope['Trie']

    # Test 1: Standard LeetCode example
    trie = Trie()
    trie.insert("apple")
    assert trie.search("apple") is True
    assert trie.search("app") is False
    assert trie.startsWith("app") is True
    trie.insert("app")
    assert trie.search("app") is True

    # Test 2: Overlapping prefixes
    trie2 = Trie()
    words = ["banana", "band", "bandana", "bee", "be"]
    for w in words: trie2.insert(w)
    for w in words: assert trie2.search(w) is True
    assert trie2.search("ban") is False
    assert trie2.startsWith("ban") is True
    assert trie2.search("beer") is False
    assert trie2.startsWith("beer") is False

    # Test 3: Randomized against set of words
    rng = random.Random(42)
    letters = "abcdef"
    ref_words = set()
    trie3 = Trie()
    for _ in range(200):
        w = ''.join(rng.choice(letters) for _ in range(rng.randint(1, 8)))
        op = rng.choice(["insert", "search", "startsWith"])
        if op == "insert":
            ref_words.add(w)
            trie3.insert(w)
        elif op == "search":
            assert trie3.search(w) == (w in ref_words)
        elif op == "startsWith":
            exp = any(x.startswith(w) for x in ref_words)
            assert trie3.startsWith(w) == exp

    # Scale test: 2,000 insertions
    trie_scale = Trie()
    t0 = time.perf_counter()
    for i in range(2000):
        trie_scale.insert(f"word{i}")
    for i in range(2000):
        assert trie_scale.search(f"word{i}") is True
    t1 = time.perf_counter()
    print(f"✓ Implement Trie: standard, prefix, and 200 random ops passed. Scale (2k words): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
