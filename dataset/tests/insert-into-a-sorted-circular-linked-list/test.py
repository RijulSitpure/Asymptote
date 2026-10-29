import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'insert-into-a-sorted-circular-linked-list.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Node:
    def __init__(self, val=None, next=None):
        self.val = val
        self.next = next

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Node': Node, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    sol = scope['Solution']()

    n1 = Node(1)
    n3 = Node(3)
    n4 = Node(4)
    n3.next = n4
    n4.next = n1
    n1.next = n3

    res = sol.insert(n3, 2)
    assert res.val == 3
    assert n1.next.val == 2
    assert n1.next.next.val == 3

    sol_empty = sol.insert(None, 1)
    assert sol_empty.val == 1
    assert sol_empty.next == sol_empty
    print("✓ insert-into-a-sorted-circular-linked-list passed")

if __name__ == '__main__':
    main()
