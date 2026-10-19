import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arr_to_list(arr):
    if not arr: return None
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
    prob_path = os.path.join(base, '..', '..', 'problems', 'add-two-numbers.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
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
        ([2, 4, 3], [5, 6, 4], [7, 0, 8]),
        ([0], [0], [0]),
        ([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9], [8, 9, 9, 9, 0, 0, 0, 1]),
        ([1, 8], [0], [1, 8]),
        ([5], [5], [0, 1])
    ]
    for a1, a2, exp in fixed:
        res = solver.addTwoNumbers(arr_to_list(a1), arr_to_list(a2))
        assert list_to_arr(res) == exp, f"Expected {exp}, got {list_to_arr(res)}"

    rng = random.Random(42)
    for _ in range(35):
        l1_len = rng.randint(1, 20)
        l2_len = rng.randint(1, 20)
        a1 = [rng.randint(0, 9) for _ in range(l1_len - 1)] + ([rng.randint(1, 9)] if l1_len > 1 else [rng.randint(0, 9)])
        a2 = [rng.randint(0, 9) for _ in range(l2_len - 1)] + ([rng.randint(1, 9)] if l2_len > 1 else [rng.randint(0, 9)])
        n1 = int(''.join(map(str, reversed(a1))))
        n2 = int(''.join(map(str, reversed(a2))))
        exp_sum = n1 + n2
        exp = [int(d) for d in reversed(str(exp_sum))]
        res = solver.addTwoNumbers(arr_to_list(a1), arr_to_list(a2))
        assert list_to_arr(res) == exp

    # Scale test: 5,000 digits each
    big1 = [9] * 5000
    big2 = [1]
    t0 = time.perf_counter()
    res = solver.addTwoNumbers(arr_to_list(big1), arr_to_list(big2))
    t1 = time.perf_counter()
    out = list_to_arr(res)
    assert len(out) == 5001 and out[0] == 0 and out[-1] == 1
    print(f"✓ Add Two Numbers: fixed, 35 random, and N=5k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
