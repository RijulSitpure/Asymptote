import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'combination-sum-ii.json')
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

    res1 = solver.combinationSum2([10,1,2,7,6,1,5], 8)
    expected1 = sorted([[1,1,6],[1,2,5],[1,7],[2,6]])
    assert sorted([sorted(x) for x in res1]) == expected1
    res2 = solver.combinationSum2([2,5,2,1,2], 5)
    expected2 = sorted([[1,2,2],[5]])
    assert sorted([sorted(x) for x in res2]) == expected2
    print("✓ combination-sum-ii passed")

if __name__ == '__main__':
    main()
