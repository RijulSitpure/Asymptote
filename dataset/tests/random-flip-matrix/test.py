import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'random-flip-matrix.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    sol = scope['Solution'](3, 1)

    f1 = sol.flip()
    f2 = sol.flip()
    f3 = sol.flip()
    res = {tuple(f1), tuple(f2), tuple(f3)}
    assert res == {(0, 0), (1, 0), (2, 0)}
    sol.reset()
    assert sol.total == 3
    print("✓ random-flip-matrix passed")

if __name__ == '__main__':
    main()
