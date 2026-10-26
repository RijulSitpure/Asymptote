#!/usr/bin/env python3
import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def create_linked_list_with_cycle(arr, pos):
    if not arr: return None
    nodes = [ListNode(x) for x in arr]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0 and pos < len(nodes):
        nodes[-1].next = nodes[pos]
    return nodes[0]

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'linked-list-cycle.json'), 'r') as f:
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

    scope = {'ListNode': ListNode, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([3, 2, 0, -4], 1, True),
        ([1, 2], 0, True),
        ([1], -1, False),
        ([], -1, False),
        ([1, 2, 3, 4], -1, False),
        ([1, 2, 3, 4], 3, True)
    ]
    for arr, pos, exp in fixed:
        head = create_linked_list_with_cycle(arr, pos)
        assert solver.hasCycle(head) == exp

    rng = random.Random(42)
    for _ in range(50):
        n = rng.randint(1, 40)
        arr = [rng.randint(-100, 100) for _ in range(n)]
        has_c = rng.random() < 0.5
        pos = rng.randint(0, n - 1) if has_c else -1
        head = create_linked_list_with_cycle(arr, pos)
        assert solver.hasCycle(head) == has_c

    # Stress test: N = 10,000
    big = list(range(10000))
    head = create_linked_list_with_cycle(big, 5000)
    t0 = time.perf_counter()
    assert solver.hasCycle(head) is True
    t1 = time.perf_counter()

    head_no_cycle = create_linked_list_with_cycle(big, -1)
    assert solver.hasCycle(head_no_cycle) is False
    print(f"✓ Linked List Cycle: fixed, 50 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
