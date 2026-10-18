#!/usr/bin/env python3
import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arr_to_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def list_to_arr(head):
    res = []
    curr = head
    while curr:
        res.append(curr.val)
        curr = curr.next
    return res

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'merge-two-sorted-lists.json'), 'r') as f:
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

    scope = {'ListNode': ListNode, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([1, 2, 4], [1, 3, 4], [1, 1, 2, 3, 4, 4]),
        ([], [], []),
        ([], [0], [0]),
        ([5], [1, 2, 3], [1, 2, 3, 5]),
        ([-3, -1], [-2, 0], [-3, -2, -1, 0])
    ]
    for a1, a2, exp in fixed:
        l1, l2 = arr_to_list(a1), arr_to_list(a2)
        res = solver.mergeTwoLists(l1, l2)
        assert list_to_arr(res) == exp

    rng = random.Random(42)
    for _ in range(50):
        n1 = rng.randint(0, 30); n2 = rng.randint(0, 30)
        a1 = sorted([rng.randint(-100, 100) for _ in range(n1)])
        a2 = sorted([rng.randint(-100, 100) for _ in range(n2)])
        exp = sorted(a1 + a2)
        l1, l2 = arr_to_list(a1), arr_to_list(a2)
        res = solver.mergeTwoLists(l1, l2)
        assert list_to_arr(res) == exp

    # Stress test: N1 = 5,000, N2 = 5,000
    a1 = list(range(0, 10000, 2))
    a2 = list(range(1, 10000, 2))
    l1, l2 = arr_to_list(a1), arr_to_list(a2)
    t0 = time.perf_counter()
    res = solver.mergeTwoLists(l1, l2)
    t1 = time.perf_counter()
    assert list_to_arr(res) == list(range(10000))
    print(f"✓ Merge Two Sorted Lists: fixed, 50 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
