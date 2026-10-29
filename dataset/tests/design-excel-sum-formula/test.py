import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-excel-sum-formula.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    excel = scope['Excel'](3, "C")

    excel.set(1, "A", 2)
    assert excel.sum(3, "C", ["A1", "A1:B2"]) == 4
    excel.set(2, "B", 2)
    assert excel.get(3, "C") == 6
    print("✓ design-excel-sum-formula passed")

if __name__ == '__main__':
    main()
