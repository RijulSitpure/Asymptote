import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'parse-lisp-expression.json')

class Solution:
    def evaluate(self, expression: str) -> int:
        scope = [{}]

        def get_val(token):
            for sc in reversed(scope):
                if token in sc:
                    return sc[token]
            return int(token)

        def parse_tokens(s):
            tokens = []
            curr = []
            bal = 0
            for ch in s:
                if ch == '(':
                    bal += 1
                elif ch == ')':
                    bal -= 1
                if ch == ' ' and bal == 0:
                    tokens.append(''.join(curr))
                    curr = []
                else:
                    curr.append(ch)
            if curr:
                tokens.append(''.join(curr))
            return tokens

        def eval_expr(expr):
            if not expr.startswith('('):
                return get_val(expr)
            inner = expr[1:-1]
            tokens = parse_tokens(inner)
            op = tokens[0]
            if op == 'add':
                return eval_expr(tokens[1]) + eval_expr(tokens[2])
            elif op == 'mult':
                return eval_expr(tokens[1]) * eval_expr(tokens[2])
            else:
                scope.append({})
                for i in range(1, len(tokens) - 1, 2):
                    var = tokens[i]
                    val = eval_expr(tokens[i + 1])
                    scope[-1][var] = val
                res = eval_expr(tokens[-1])
                scope.pop()
                return res

        return eval_expr(expression)

sol = Solution()
assert sol.evaluate("(let x 2 (mult x (let x 3 y 4 (add x y))))") == 14
assert sol.evaluate("(let x 3 x 2 x)") == 2
assert sol.evaluate("(let x 1 y 2 x (add x y) (add x y))") == 5
print("✓ parse-lisp-expression passed")
