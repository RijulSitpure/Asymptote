import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'populating-next-right-pointers-in-each-node-ii.json')
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

    class Node:
        def __init__(self, val=0, left=None, right=None, next=None):
            self.val = val
            self.left = left
            self.right = right
            self.next = next

    scope = {'list': list, 'Node': Node, 'random': random}
    exec(sol_code, scope)
    for k, v in scope.items():
        if not k.startswith('__'):
            globals()[k] = v

    cls_candidates = [k for k in ['Solution', 'TicTacToe', 'TwoSum', 'Vector2D', 'PeekingIterator', 'NumArray', 'Logger', 'HitCounter'] if k in scope]
    SolutionClass = scope[cls_candidates[0]]
    Solution = SolutionClass
    solver = SolutionClass() if cls_candidates[0] == 'Solution' and 'populating-next-right-pointers-in-each-node-ii' != 'shuffle-an-array' else None

    # Test on a 3-level tree
    n4 = Node(4)
    n5 = Node(5)
    n7 = Node(7)
    n2 = Node(2, left=n4, right=n5)
    n3 = Node(3, right=n7)
    root = Node(1, left=n2, right=n3)
    res = solver.connect(root)
    assert res.next is None
    assert n2.next == n3
    assert n3.next is None
    assert n4.next == n5
    assert n5.next == n7
    assert n7.next is None
    assert solver.connect(None) is None
    print("Passed all populating-next-right-pointers-in-each-node-ii test cases")


if __name__ == '__main__':
    main()
