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
    with open(os.path.join(base, '..', '..', 'problems', 'reverse-linked-list.json'), 'r') as f:
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
        ([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]),
        ([1, 2], [2, 1]),
        ([], []),
        ([42], [42]),
        ([1, 1, 1], [1, 1, 1])
    ]
    for arr, exp in fixed:
        head = arr_to_list(arr)
        rev = solver.reverseList(head)
        assert list_to_arr(rev) == exp

    rng = random.Random(42)
    for _ in range(50):
        sz = rng.randint(0, 40)
        arr = [rng.randint(-200, 200) for _ in range(sz)]
        head = arr_to_list(arr)
        rev = solver.reverseList(head)
        assert list_to_arr(rev) == list(reversed(arr))

    # Stress test: N = 10,000
    big = list(range(10000))
    head = arr_to_list(big)
    t0 = time.perf_counter()
    rev = solver.reverseList(head)
    t1 = time.perf_counter()
    assert list_to_arr(rev) == list(reversed(big))
    print(f"✓ Reverse Linked List: fixed, 50 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
