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
    prob_path = os.path.join(base, '..', '..', 'problems', 'sort-list.json')
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

    scope = {'ListNode': ListNode, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        ([4, 2, 1, 3], [1, 2, 3, 4]),
        ([-1, 5, 3, 4, 0], [-1, 0, 3, 4, 5]),
        ([], []),
        ([1], [1]),
        ([2, 1], [1, 2])
    ]
    for arr, exp in fixed:
        res = solver.sortList(arr_to_list(arr))
        assert list_to_arr(res) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(0, 40)
        arr = [rng.randint(-100, 100) for _ in range(sz)]
        exp = sorted(arr)
        res = solver.sortList(arr_to_list(arr))
        assert list_to_arr(res) == exp

    # Scale test: 30,000 nodes
    big = [rng.randint(-1000, 1000) for _ in range(30000)]
    exp = sorted(big)
    t0 = time.perf_counter()
    res = solver.sortList(arr_to_list(big))
    t1 = time.perf_counter()
    assert list_to_arr(res) == exp
    print(f"✓ Sort List: fixed, 35 random, and N=30k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
