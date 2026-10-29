import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'max-stack.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    stk = scope['MaxStack']()

    stk.push(5)
    stk.push(1)
    stk.push(5)
    assert stk.top() == 5
    assert stk.popMax() == 5
    assert stk.top() == 1
    assert stk.peekMax() == 5
    assert stk.pop() == 1
    assert stk.top() == 5
    print("✓ max-stack passed")

if __name__ == '__main__':
    main()
