import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'string-to-integer-atoi.json')
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
    assert sol.myAtoi("42") == 42
    assert sol.myAtoi("   -042") == -42
    assert sol.myAtoi("1337c0d3") == 1337
    assert sol.myAtoi("0-1") == 0
    assert sol.myAtoi("words and 987") == 0
    assert sol.myAtoi("-91283472332") == -2147483648
    print("✓ string-to-integer-atoi passed")

if __name__ == '__main__':
    main()
