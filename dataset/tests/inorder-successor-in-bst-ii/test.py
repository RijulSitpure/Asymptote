import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'inorder-successor-in-bst-ii.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Node:
    def __init__(self, val, left=None, right=None, parent=None):
        self.val = val
        self.left = left
        self.right = right
        self.parent = parent

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Node': Node, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    sol = scope['Solution']()

    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(3)
    n2.left = n1
    n2.right = n3
    n1.parent = n2
    n3.parent = n2

    assert sol.inorderSuccessor(n1) == n2
    assert sol.inorderSuccessor(n2) == n3
    assert sol.inorderSuccessor(n3) is None
    print("✓ inorder-successor-in-bst-ii passed")

if __name__ == '__main__':
    main()
