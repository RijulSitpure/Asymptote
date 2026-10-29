import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'copy-list-with-random-pointer.json')
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
        def __init__(self, val=0, next=None, random=None, prev=None, child=None, left=None, right=None):
            self.val = val
            self.next = next
            self.random = random
            self.prev = prev
            self.child = child
            self.left = left
            self.right = right

    class TreeNode:
        def __init__(self, val=0, left=None, right=None):
            self.val = val
            self.left = left
            self.right = right

    scope = {'list': list, 'Optional': None, 'Node': Node, 'TreeNode': TreeNode}
    exec(sol_code, scope)
    # The class name is either Solution, Codec, WordDictionary, MyStack, MyQueue, NumArray, NumMatrix, NestedIterator, MovingAverage, Twitter, RandomizedSet
    cls_candidates = [k for k in ['Solution', 'Codec', 'WordDictionary', 'MyStack', 'MyQueue', 'NumArray', 'NumMatrix', 'NestedIterator', 'MovingAverage', 'Twitter', 'RandomizedSet'] if k in scope]
    SolutionClass = scope[cls_candidates[0]]
    Solution = SolutionClass
    solver = SolutionClass() if cls_candidates[0] == 'Solution' else None

    class Node:
        def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
            self.val = int(x)
            self.next = next
            self.random = random

    n1 = Node(7); n2 = Node(13); n3 = Node(11)
    n1.next = n2; n2.next = n3
    n2.random = n1; n3.random = n1
    cp = solver.copyRandomList(n1)
    assert cp.val == 7 and cp.next.val == 13 and cp.next.next.val == 11
    assert cp.next.random == cp and cp.next.next.random == cp
    assert cp != n1 and cp.next != n2


if __name__ == '__main__':
    main()
