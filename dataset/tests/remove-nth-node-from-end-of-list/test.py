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

def ref_remove_nth(arr, n):
    idx = len(arr) - n
    return arr[:idx] + arr[idx + 1:]

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'remove-nth-node-from-end-of-list.json'), 'r') as f:
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
        ([1, 2, 3, 4, 5], 2, [1, 2, 3, 5]),
        ([1], 1, []),
        ([1, 2], 1, [1]),
        ([1, 2], 2, [2])
    ]
    for arr, n, exp in fixed:
        head = arr_to_list(arr)
        res = solver.removeNthFromEnd(head, n)
        assert list_to_arr(res) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(1, 30)
        n = rng.randint(1, sz)
        arr = [rng.randint(-50, 50) for _ in range(sz)]
        head = arr_to_list(arr)
        res = solver.removeNthFromEnd(head, n)
        assert list_to_arr(res) == ref_remove_nth(arr, n)

    # Stress test: N = 5,000
    big = list(range(5000))
    head = arr_to_list(big)
    t0 = time.perf_counter()
    res = solver.removeNthFromEnd(head, 2500)
    t1 = time.perf_counter()
    assert list_to_arr(res) == ref_remove_nth(big, 2500)
    print(f"✓ Remove Nth Node From End of List: fixed, 50 random, and N=5k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
