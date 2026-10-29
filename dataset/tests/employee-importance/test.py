import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'employee-importance.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Employee:
    def __init__(self, id: int, importance: int, subordinates: list[int]):
        self.id = id
        self.importance = importance
        self.subordinates = subordinates

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Employee': Employee}
    exec(sol_code, scope)
    sol = scope['Solution']()

    e1 = Employee(1, 5, [2, 3])
    e2 = Employee(2, 3, [])
    e3 = Employee(3, 3, [])
    assert sol.getImportance([e1, e2, e3], 1) == 11
    assert sol.getImportance([e1, e2, e3], 2) == 3
    print("✓ employee-importance passed")

if __name__ == '__main__':
    main()
