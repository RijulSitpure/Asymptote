import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'diagonal-traverse.json')
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

    scope = {'List': list, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()

    m1 = [[1,2,3],[4,5,6],[7,8,9]]
    assert solver.findDiagonalOrder(m1) == [1,2,4,7,5,3,6,8,9]
    m2 = [[1,2],[3,4]]
    assert solver.findDiagonalOrder(m2) == [1,2,3,4]
    print("✓ diagonal-traverse passed")

if __name__ == '__main__':
    main()
