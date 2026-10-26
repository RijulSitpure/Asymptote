import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'maximum-xor-of-two-numbers-in-an-array.json')
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
    solver = scope['Solution']()

    assert solver.findMaximumXOR([3, 10, 5, 25, 2, 8]) == 28
    assert solver.findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]) == 127
    print("✓ maximum-xor-of-two-numbers-in-an-array passed")

if __name__ == '__main__':
    main()
