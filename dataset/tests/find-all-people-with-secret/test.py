import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'find-all-people-with-secret.json')
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

    assert sorted(solver.findAllPeople(6, [[1,2,5],[2,3,8],[1,5,10]], 1)) == [0, 1, 2, 3, 5]
    assert sorted(solver.findAllPeople(4, [[3,1,3],[1,2,2],[0,3,3]], 3)) == [0, 1, 3]
    assert sorted(solver.findAllPeople(5, [[3,4,2],[1,2,1],[2,3,1]], 1)) == [0, 1, 2, 3, 4]
    print("✓ find-all-people-with-secret passed")

if __name__ == '__main__':
    main()
