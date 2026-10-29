import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-hashset.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    hs = scope['MyHashSet']()

    hs.add(1)
    hs.add(2)
    assert hs.contains(1) == True
    assert hs.contains(3) == False
    hs.add(2)
    assert hs.contains(2) == True
    hs.remove(2)
    assert hs.contains(2) == False
    print("✓ design-hashset passed")

if __name__ == '__main__':
    main()
