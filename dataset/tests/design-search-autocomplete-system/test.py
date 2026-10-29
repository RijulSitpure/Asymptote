import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-search-autocomplete-system.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    sentences = ["i love you", "island", "iroman", "i love leetcode"]
    times = [5, 3, 2, 2]
    ac = scope['AutocompleteSystem'](sentences, times)

    assert ac.input('i') == ["i love you", "island", "i love leetcode"]
    assert ac.input(' ') == ["i love you", "i love leetcode"]
    assert ac.input('a') == []
    assert ac.input('#') == []
    print("✓ design-search-autocomplete-system passed")

if __name__ == '__main__':
    main()
