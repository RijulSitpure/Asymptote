import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'map-sum-pairs.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    ms = scope['MapSum']()

    ms.insert("apple", 3)
    assert ms.sum("ap") == 3
    ms.insert("app", 2)
    assert ms.sum("ap") == 5
    ms.insert("apple", 2)
    assert ms.sum("ap") == 4
    print("✓ map-sum-pairs passed")

if __name__ == '__main__':
    main()
