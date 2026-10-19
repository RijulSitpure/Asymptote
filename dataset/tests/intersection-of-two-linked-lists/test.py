import json, os, re, random, time

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build_intersected_lists(prefixA, prefixB, common):
    c_nodes = [ListNode(x) for x in common]
    for i in range(len(c_nodes) - 1):
        c_nodes[i].next = c_nodes[i+1]
    c_head = c_nodes[0] if c_nodes else None

    a_nodes = [ListNode(x) for x in prefixA]
    for i in range(len(a_nodes) - 1):
        a_nodes[i].next = a_nodes[i+1]
    if a_nodes:
        a_nodes[-1].next = c_head
        hA = a_nodes[0]
    else:
        hA = c_head

    b_nodes = [ListNode(x) for x in prefixB]
    for i in range(len(b_nodes) - 1):
        b_nodes[i].next = b_nodes[i+1]
    if b_nodes:
        b_nodes[-1].next = c_head
        hB = b_nodes[0]
    else:
        hB = c_head

    return hA, hB, c_head

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'intersection-of-two-linked-lists.json')
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
        ([4, 1], [5, 6, 1], [8, 4, 5]),
        ([1, 9, 1], [3], [2, 4]),
        ([2, 6, 4], [1, 5], []),
        ([], [], [1, 2]),
        ([1], [], [2])
    ]
    for pA, pB, c in fixed:
        hA, hB, expected = build_intersected_lists(pA, pB, c)
        res = solver.getIntersectionNode(hA, hB)
        assert res is expected

    rng = random.Random(42)
    for _ in range(35):
        pA = [rng.randint(0, 100) for _ in range(rng.randint(0, 20))]
        pB = [rng.randint(0, 100) for _ in range(rng.randint(0, 20))]
        has_intersect = rng.random() < 0.7
        c = [rng.randint(0, 100) for _ in range(rng.randint(1, 15))] if has_intersect else []
        hA, hB, expected = build_intersected_lists(pA, pB, c)
        res = solver.getIntersectionNode(hA, hB)
        assert res is expected

    # Scale test: 15,000 nodes each, common = 5,000
    pA = list(range(10000))
    pB = list(range(10000, 20000))
    c = list(range(20000, 25000))
    hA, hB, expected = build_intersected_lists(pA, pB, c)
    t0 = time.perf_counter()
    res = solver.getIntersectionNode(hA, hB)
    t1 = time.perf_counter()
    assert res is expected
    print(f"✓ Intersection of Two Linked Lists: fixed, 35 random, and N+M=25k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
