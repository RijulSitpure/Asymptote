import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'n-ary-tree-postorder-traversal.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Node': Node}
    exec(sol_code, scope)
    sol = scope['Solution']()

    n3 = Node(3, [Node(5), Node(6)])
    root = Node(1, [n3, Node(2), Node(4)])
    assert sol.postorder(root) == [5, 6, 3, 2, 4, 1]
    assert sol.postorder(None) == []
    print("✓ n-ary-tree-postorder-traversal passed")

if __name__ == '__main__':
    main()
