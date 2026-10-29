import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'random-pick-with-blacklist.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    sol = scope['Solution'](7, [2, 3, 5])

    picks = {sol.pick() for _ in range(50)}
    assert picks.issubset({0, 1, 4, 6})
    assert 2 not in picks and 3 not in picks and 5 not in picks
    print("✓ random-pick-with-blacklist passed")

if __name__ == '__main__':
    main()
