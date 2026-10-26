import json, os, re, collections

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'jump-game-vi.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'List': list, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item}), 'collections': collections}
    exec(sol_code, scope)
    solver = scope['Solution']()

    assert solver.maxResult([1, -1, -2, 4, -7, 3], 2) == 7
    assert solver.maxResult([10, -5, -2, 4, 0, 3], 3) == 17
    assert solver.maxResult([1, -5, -20, 4, -1, 3, -6, -3], 2) == 0
    print("✓ jump-game-vi passed")

if __name__ == '__main__':
    main()
