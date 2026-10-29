import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-circular-queue.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    cq = scope['MyCircularQueue'](3)

    assert cq.enQueue(1) == True
    assert cq.enQueue(2) == True
    assert cq.enQueue(3) == True
    assert cq.enQueue(4) == False
    assert cq.Rear() == 3
    assert cq.isFull() == True
    assert cq.deQueue() == True
    assert cq.enQueue(4) == True
    assert cq.Rear() == 4
    print("✓ design-circular-queue passed")

if __name__ == '__main__':
    main()
