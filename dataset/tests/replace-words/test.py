import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'replace-words.json')
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

    d1 = ["cat","bat","rat"]
    s1 = "the cattle was rattled by the battery"
    assert solver.replaceWords(d1, s1) == "the cat was rat by the bat"
    d2 = ["a","b","c"]
    s2 = "aadsfasf absbs bbab cadsfafs"
    assert solver.replaceWords(d2, s2) == "a a b c"
    print("✓ replace-words passed")

if __name__ == '__main__':
    main()
