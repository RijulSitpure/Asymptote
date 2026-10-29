import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'logical-or-of-two-binary-grids-represented-as-quad-trees.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Node:
    def __init__(self, val, isLeaf, topLeft=None, topRight=None, bottomLeft=None, bottomRight=None):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Node': Node}
    exec(sol_code, scope)
    sol = scope['Solution']()

    t1 = Node(1, True)
    t2 = Node(0, True)
    res = sol.intersect(t1, t2)
    assert res.isLeaf and res.val == 1
    print("✓ logical-or-of-two-binary-grids-represented-as-quad-trees passed")

if __name__ == '__main__':
    main()
