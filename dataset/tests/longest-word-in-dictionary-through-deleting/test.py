import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'longest-word-in-dictionary-through-deleting.json')
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

    sol = scope['Solution']()
    assert sol.findLongestWord("abpcplea", ["ale", "apple", "monkey", "plea"]) == "apple"
    assert sol.findLongestWord("abpcplea", ["a", "b", "c"]) == "a"
    print("✓ longest-word-in-dictionary-through-deleting passed")

if __name__ == '__main__':
    main()
