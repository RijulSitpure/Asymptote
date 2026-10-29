import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-circular-deque.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    deque = scope['MyCircularDeque'](3)

    assert deque.insertLast(1) == True
    assert deque.insertLast(2) == True
    assert deque.insertFront(3) == True
    assert deque.insertFront(4) == False
    assert deque.getRear() == 2
    assert deque.isFull() == True
    assert deque.deleteLast() == True
    assert deque.insertFront(4) == True
    assert deque.getFront() == 4
    print("✓ design-circular-deque passed")

if __name__ == '__main__':
    main()
