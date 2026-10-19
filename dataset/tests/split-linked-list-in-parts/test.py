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
    prob_path = os.path.join(base, '..', '..', 'problems', 'split-linked-list-in-parts.json')
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
        ([1, 2, 3], 5, [[1], [2], [3], [], []]),
        ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]]),
        ([], 3, [[], [], []]),
        ([1], 1, [[1]]),
        ([1, 2], 2, [[1], [2]])
    ]
    for arr, k, exp in fixed:
        res = solver.splitListToParts(arr_to_list(arr), k)
        res_arrs = [list_to_arr(h) for h in res]
        assert res_arrs == exp, f"Expected {exp}, got {res_arrs}"

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(0, 40)
        k = rng.randint(1, 10)
        arr = list(range(1, sz + 1))
        base_sz = sz // k
        extra = sz % k
        exp = []
        idx = 0
        for i in range(k):
            p_len = base_sz + (1 if i < extra else 0)
            exp.append(arr[idx:idx+p_len])
            idx += p_len
        res = solver.splitListToParts(arr_to_list(arr), k)
        res_arrs = [list_to_arr(h) for h in res]
        assert res_arrs == exp

    # Scale test: 10,000 nodes, k = 50
    big = list(range(10000))
    t0 = time.perf_counter()
    res = solver.splitListToParts(arr_to_list(big), 50)
    t1 = time.perf_counter()
    assert len(res) == 50 and len(list_to_arr(res[0])) == 200
    print(f"✓ Split Linked List in Parts: fixed, 35 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
