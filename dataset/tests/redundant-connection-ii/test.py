import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'redundant-connection-ii.json')
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

    assert solver.findRedundantDirectedConnection([[1,2],[1,3],[2,3]]) == [2, 3]
    assert solver.findRedundantDirectedConnection([[1,2],[2,3],[3,4],[4,1],[1,5]]) == [4, 1]
    assert solver.findRedundantDirectedConnection([[2,1],[3,1],[4,2],[1,4]]) == [2, 1]
    print("✓ redundant-connection-ii passed")

if __name__ == '__main__':
    main()
