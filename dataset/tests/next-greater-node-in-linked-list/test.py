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

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'next-greater-node-in-linked-list.json')
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

    scope = {'ListNode': ListNode, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item}), 'List': list}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([2, 1, 5], [5, 5, 0]),
        ([2, 7, 4, 3, 5], [7, 0, 5, 5, 0]),
        ([1, 7, 5, 1, 9, 2, 5, 1], [7, 9, 9, 9, 0, 5, 0, 0]),
        ([5], [0])
    ]
    for arr, exp in fixed:
        res = solver.nextLargerNodes(arr_to_list(arr))
        assert res == exp, f"Failed on {arr}: expected {exp}, got {res}"

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 30)
        arr = [rng.randint(1, 100) for _ in range(sz)]
        exp = []
        for i in range(sz):
            ans = 0
            for j in range(i + 1, sz):
                if arr[j] > arr[i]:
                    ans = arr[j]
                    break
            exp.append(ans)
        assert solver.nextLargerNodes(arr_to_list(arr)) == exp

    # Scale test
    big_arr = list(range(20000))
    t0 = time.perf_counter()
    res = solver.nextLargerNodes(arr_to_list(big_arr))
    t1 = time.perf_counter()
    assert len(res) == 20000
    print(f"Scale test passed in {(t1 - t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
