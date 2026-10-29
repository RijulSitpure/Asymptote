import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'implement-magic-dictionary.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    md = scope['MagicDictionary']()

    md.buildDict(["hello", "leetcode"])
    assert md.search("hello") == False
    assert md.search("hhllo") == True
    assert md.search("hell") == False
    assert md.search("leetcoded") == False
    print("✓ implement-magic-dictionary passed")

if __name__ == '__main__':
    main()
