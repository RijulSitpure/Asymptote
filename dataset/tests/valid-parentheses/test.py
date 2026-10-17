#!/usr/bin/env python3
import json
import os
import re
import sys
import time
import random

def load_problem():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base_dir, '..', '..', 'problems', 'valid-parentheses.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    hint4 = prob['hints'][3]['text']
    m = re.search(r'```python\n(.*?)\n```', hint4, re.DOTALL)
    if not m:
        raise ValueError("Could not extract Python code block from Hint 4")
    return m.group(1)

def reference_is_valid(s: str) -> bool:
    if len(s) % 2 != 0:
        return False
    curr = s
    prev_len = -1
    while len(curr) != prev_len:
        prev_len = len(curr)
        curr = curr.replace('()', '').replace('[]', '').replace('{}', '')
    return len(curr) == 0

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)

    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code exactly"

    scope = {}
    exec(sol_code, scope)
    SolutionClass = scope['Solution']
    solver = SolutionClass()

    # Fixed edge cases
    fixed_cases = [
        ("()", True),
        ("()[]{}", True),
        ("(]", False),
        ("([)]", False),
        ("{[]}", True),
        ("", True),
        ("(", False),
        (")", False),
        ("(((", False),
        (")))", False),
        ("(([]){})", True),
        ("((([])))", True),
        ("((([]))))", False),
        ("(((((((((())))))))))", True),
        ("()[]{}" * 200, True)
    ]

    for s, expected in fixed_cases:
        actual = solver.isValid(s)
        ref = reference_is_valid(s)
        assert actual == expected, f"Failed on '{s[:20]}': expected {expected}, got {actual}"
        assert ref == expected, f"Reference mismatch on '{s[:20]}': expected {expected}, got {ref}"

    # Seeded random tests
    rng = random.Random(42)
    random_cases_passed = 0

    def generate_valid_brackets(pairs: int) -> str:
        res = []
        pairs_list = [('(', ')'), ('[', ']'), ('{', '}')]
        for _ in range(pairs):
            op, cl = rng.choice(pairs_list)
            insert_pos = rng.randint(0, len(res))
            res.insert(insert_pos, op)
            res.insert(insert_pos + 1, cl)
        return "".join(res)

    for _ in range(60):
        if rng.random() < 0.5:
            # Valid case
            s = generate_valid_brackets(rng.randint(1, 25))
        else:
            # Random characters (mostly invalid)
            length = rng.randint(1, 50)
            chars = ['(', ')', '[', ']', '{', '}']
            s = "".join(rng.choice(chars) for _ in range(length))

        expected = reference_is_valid(s)
        actual = solver.isValid(s)
        assert actual == expected, f"Random test failed on '{s}': expected {expected}, got {actual}"
        random_cases_passed += 1

    # Timing benchmark
    sizes = [100, 1000, 10000]
    timings = []
    for s_size in sizes:
        test_s = "()[]{}" * (s_size // 6)
        t0 = time.perf_counter()
        _ = solver.isValid(test_s)
        t1 = time.perf_counter()
        timings.append((s_size, (t1 - t0) * 1000))

    timing_str = ", ".join([f"N={s}: {ms:.3f}ms" for s, ms in timings])
    print(f"✓ Valid Parentheses: {len(fixed_cases)} fixed cases, {random_cases_passed} random cases passed. Hint 4 code verified.")
    print(f"  Timing growth: {timing_str} (linear O(N))")

if __name__ == '__main__':
    main()
