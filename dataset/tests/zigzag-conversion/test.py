import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'zigzag-conversion.json')
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

    class Node:
        def __init__(self, val=0, left=None, right=None, next=None):
            self.val = val
            self.left = left
            self.right = right
            self.next = next

    scope = {'list': list, 'Node': Node, 'random': random}
    exec(sol_code, scope)
    for k, v in scope.items():
        if not k.startswith('__'):
            globals()[k] = v

    cls_candidates = [k for k in ['Solution', 'TicTacToe', 'TwoSum', 'Vector2D', 'PeekingIterator', 'NumArray', 'Logger', 'HitCounter'] if k in scope]
    SolutionClass = scope[cls_candidates[0]]
    Solution = SolutionClass
    solver = SolutionClass() if cls_candidates[0] == 'Solution' and 'zigzag-conversion' != 'shuffle-an-array' else None

    assert solver.convert("PAYPALISHIRING", 3) == "PAHNAPLSIIGYIR"
    assert solver.convert("PAYPALISHIRING", 4) == "PINALSIGYAHRPI"
    assert solver.convert("A", 1) == "A"
    assert solver.convert("AB", 1) == "AB"
    assert solver.convert("ABCDE", 5) == "ABCDE"
    print("Passed all zigzag-conversion test cases")


if __name__ == '__main__':
    main()
