#!/usr/bin/env python3
import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base, '..', '..', 'problems', 'evaluate-reverse-polish-notation.json'), 'r') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def ref_eval_rpn(tokens):
    stack = []
    for t in tokens:
        if t == '+':
            stack.append(stack.pop() + stack.pop())
        elif t == '-':
            b = stack.pop(); a = stack.pop()
            stack.append(a - b)
        elif t == '*':
            stack.append(stack.pop() * stack.pop())
        elif t == '/':
            b = stack.pop(); a = stack.pop()
            stack.append(int(a / b))
        else:
            stack.append(int(t))
    return stack[0]

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        (["2","1","+","3","*"], 9),
        (["4","13","5","/","+"], 6),
        (["10","6","9","3","+","-11","*","/","*","17","+","5","+"], 22),
        (["42"], 42),
        (["-3","-4","+"], -7),
        (["-6","132","/"], 0)
    ]
    for tokens, exp in fixed:
        assert solver.evalRPN(tokens) == exp

    # Random valid RPN generation
    rng = random.Random(42)
    for _ in range(50):
        depth = 1
        seq = [str(rng.randint(-50, 50))]
        for _ in range(rng.randint(2, 30)):
            if depth >= 2 and rng.random() < 0.4:
                seq.append(rng.choice(['+', '-', '*']))
                depth -= 1
            else:
                val = rng.randint(-50, 50)
                if val == 0: val = 1
                seq.append(str(val))
                depth += 1
        while depth > 1:
            seq.append(rng.choice(['+', '-', '*']))
            depth -= 1
        assert solver.evalRPN(seq) == ref_eval_rpn(seq)

    # Max-size test: N = 10,000
    big_tokens = ["1"] * 5001 + ["+"] * 5000
    t0 = time.perf_counter()
    ans = solver.evalRPN(big_tokens)
    t1 = time.perf_counter()
    assert ans == 5001
    print(f"✓ Evaluate Reverse Polish Notation: fixed, 50 random cases, and N=10k passed in {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
