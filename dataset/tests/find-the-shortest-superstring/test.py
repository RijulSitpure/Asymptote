import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'find-the-shortest-superstring.json')
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

    w1 = ["alex","loves","leetcode"]
    res1 = solver.shortestSuperstring(w1)
    for w in w1:
        assert w in res1
    w2 = ["catg","ctaagt","gcta","ttca","atgcatc"]
    res2 = solver.shortestSuperstring(w2)
    for w in w2:
        assert w in res2
    print("✓ find-the-shortest-superstring passed")

if __name__ == '__main__':
    main()
