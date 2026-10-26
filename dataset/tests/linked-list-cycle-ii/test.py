import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def arr_to_cycle(arr, pos):
    if not arr: return None
    nodes = [ListNode(x) for x in arr]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i+1]
    if pos >= 0 and pos < len(nodes):
        nodes[-1].next = nodes[pos]
    return nodes[0] if nodes else None

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'linked-list-cycle-ii.json')
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
        ([3, 2, 0, -4], 1),
        ([1, 2], 0),
        ([1], -1),
        ([], -1),
        ([1, 2, 3, 4, 5], 4)
    ]
    for arr, pos in fixed:
        h = arr_to_cycle(arr, pos)
        res = solver.detectCycle(h)
        if pos == -1:
            assert res is None
        else:
            assert res is not None and res.val == arr[pos]

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        arr = list(range(sz))
        has_c = rng.random() < 0.6
        pos = rng.randint(0, sz - 1) if has_c else -1
        h = arr_to_cycle(arr, pos)
        res = solver.detectCycle(h)
        if pos == -1:
            assert res is None
        else:
            assert res is not None and res.val == pos

    # Scale test: 30,000 nodes cycle at 15,000
    sz = 30000
    pos = 15000
    h = arr_to_cycle(list(range(sz)), pos)
    t0 = time.perf_counter()
    res = solver.detectCycle(h)
    t1 = time.perf_counter()
    assert res is not None and res.val == pos
    print(f"✓ Linked List Cycle II: fixed, 35 random, and N=30k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
