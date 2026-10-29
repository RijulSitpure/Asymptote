import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-linked-list.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    ll = scope['MyLinkedList']()

    ll.addAtHead(1)
    ll.addAtTail(3)
    ll.addAtIndex(1, 2)
    assert ll.get(1) == 2
    ll.deleteAtIndex(1)
    assert ll.get(1) == 3
    print("✓ design-linked-list passed")

if __name__ == '__main__':
    main()
