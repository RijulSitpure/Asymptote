import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'loud-and-rich.json')
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
    richer = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]]
    quiet = [3,2,5,4,6,1,7,0]
    assert sol.loudAndRich(richer, quiet) == [5,5,2,5,4,5,6,7]
    print("✓ loud-and-rich passed")

if __name__ == '__main__':
    main()
