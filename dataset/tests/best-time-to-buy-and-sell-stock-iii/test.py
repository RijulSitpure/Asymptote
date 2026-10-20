import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'best-time-to-buy-and-sell-stock-iii.json')
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

    assert solver.maxProfit([3,3,5,0,0,3,1,4]) == 6
    assert solver.maxProfit([1,2,3,4,5]) == 4
    assert solver.maxProfit([7,6,4,3,1]) == 0
    print("✓ best-time-to-buy-and-sell-stock-iii passed")

if __name__ == '__main__':
    main()
