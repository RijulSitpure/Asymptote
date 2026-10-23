import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'string-compression.json')
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

    sol = scope['Solution']()
    c1 = ["a","a","b","b","c","c","c"]
    len1 = sol.compress(c1)
    assert len1 == 6
    assert c1[:6] == ["a","2","b","2","c","3"]
    c2 = ["a"]
    len2 = sol.compress(c2)
    assert len2 == 1
    assert c2[:1] == ["a"]
    print("✓ string-compression passed")

if __name__ == '__main__':
    main()
