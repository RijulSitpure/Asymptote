import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'wiggle-sort-ii.json')
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

    c1 = [1, 5, 1, 1, 6, 4]
    solver.wiggleSort(c1)
    for i in range(len(c1) - 1):
        if i % 2 == 0: assert c1[i] < c1[i + 1]
        else: assert c1[i] > c1[i + 1]
    c2 = [1, 3, 2, 2, 3, 1]
    solver.wiggleSort(c2)
    for i in range(len(c2) - 1):
        if i % 2 == 0: assert c2[i] < c2[i + 1]
        else: assert c2[i] > c2[i + 1]
    print("✓ wiggle-sort-ii passed")

if __name__ == '__main__':
    main()
