import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'random-pick-with-weight.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    sol = scope['Solution']([1, 3])

    picks = [sol.pickIndex() for _ in range(100)]
    assert all(p in (0, 1) for p in picks)
    assert 1 in picks
    print("✓ random-pick-with-weight passed")

if __name__ == '__main__':
    main()
