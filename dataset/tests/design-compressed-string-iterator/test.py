import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-compressed-string-iterator.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    it = scope['StringIterator']("L1e2t1C1o1d1e1")

    assert it.next() == 'L'
    assert it.next() == 'e'
    assert it.next() == 'e'
    assert it.next() == 't'
    assert it.next() == 'C'
    assert it.next() == 'o'
    assert it.next() == 'd'
    assert it.hasNext() == True
    assert it.next() == 'e'
    assert it.hasNext() == False
    assert it.next() == ' '
    print("✓ design-compressed-string-iterator passed")

if __name__ == '__main__':
    main()
