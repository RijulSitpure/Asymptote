import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-in-memory-file-system.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    fs = scope['FileSystem']()

    assert fs.ls('/') == []
    fs.mkdir('/a/b/c')
    fs.addContentToFile('/a/b/c/d', 'hello')
    assert fs.ls('/') == ['a']
    assert fs.readContentFromFile('/a/b/c/d') == 'hello'
    print("✓ design-in-memory-file-system passed")

if __name__ == '__main__':
    main()
