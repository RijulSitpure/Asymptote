import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'word-break-ii.json')
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

    r1 = solver.wordBreak("catsanddog", ["cat","cats","and","sand","dog"])
    assert sorted(r1) == sorted(["cats and dog", "cat sand dog"])
    r2 = solver.wordBreak("pineapplepenapple", ["apple","pen","applepen","pine","pineapple"])
    assert "pine apple pen apple" in r2
    assert solver.wordBreak("catsandog", ["cats","dog","sand","and","cat"]) == []
    print("✓ word-break-ii passed")

if __name__ == '__main__':
    main()
