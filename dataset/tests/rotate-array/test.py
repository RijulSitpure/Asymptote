import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'rotate-array.json')
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

    scope = {'List': list, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)

    sol = scope['Solution']()
    a1 = [1,2,3,4,5,6,7]
    sol.rotate(a1, 3)
    assert a1 == [5,6,7,1,2,3,4]
    a2 = [-1,-100,3,99]
    sol.rotate(a2, 2)
    assert a2 == [3,99,-1,-100]
    print("✓ rotate-array passed")

if __name__ == '__main__':
    main()
