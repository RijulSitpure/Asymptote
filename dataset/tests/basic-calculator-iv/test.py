import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'basic-calculator-iv.json')

import collections

class Poly(collections.Counter):
    def __add__(self, other):
        ans = Poly(self)
        for k, v in other.items():
            ans[k] += v
        return ans

    def __sub__(self, other):
        ans = Poly(self)
        for k, v in other.items():
            ans[k] -= v
        return ans

    def __mul__(self, other):
        ans = Poly()
        for k1, v1 in self.items():
            for k2, v2 in other.items():
                ans[tuple(sorted(k1 + k2))] += v1 * v2
        return ans

class Solution:
    def basicCalculatorIV(self, expression: str, evalvars: list[str], evalints: list[int]) -> list[str]:
        eval_map = dict(zip(evalvars, evalints))

        def parse(token):
            if token in eval_map:
                token = str(eval_map[token])
            if token.lstrip('-').isdigit():
                c = int(token)
                return Poly({(): c})
            return Poly({(token,): 1})

        def tokenize(s):
            tokens = []
            i = 0
            while i < len(s):
                if s[i] == ' ':
                    i += 1
                elif s[i] in '+-*()':
                    tokens.append(s[i])
                    i += 1
                else:
                    j = i
                    while j < len(s) and s[j] not in ' +-*()':
                        j += 1
                    tokens.append(s[i:j])
                    i = j
            return tokens

        tokens = tokenize(expression)
        def evaluate_tokens(toks):
            def compute(ops, vals):
                op = ops.pop()
                v2 = vals.pop()
                v1 = vals.pop()
                if op == '+': vals.append(v1 + v2)
                elif op == '-': vals.append(v1 - v2)
                elif op == '*': vals.append(v1 * v2)

            ops = []
            vals = []
            prec = {'+': 1, '-': 1, '*': 2}
            for tok in toks:
                if tok == '(':
                    ops.append(tok)
                elif tok == ')':
                    while ops and ops[-1] != '(':
                        compute(ops, vals)
                    ops.pop()
                elif tok in prec:
                    while ops and ops[-1] != '(' and prec[ops[-1]] >= prec[tok]:
                        compute(ops, vals)
                    ops.append(tok)
                else:
                    vals.append(parse(tok))
            while ops:
                compute(ops, vals)
            return vals[0]

        poly = evaluate_tokens(tokens)
        sorted_terms = sorted(poly.keys(), key=lambda t: (-len(t), t))
        ans = []
        for t in sorted_terms:
            c = poly[t]
            if c != 0:
                term_str = '*'.join(t)
                ans.append(f"{c}*{term_str}" if term_str else str(c))
        return ans

sol = Solution()
res = sol.basicCalculatorIV("e + 8 - a + 5", ["e"], [1])
assert res == ["-1*a", "14"]
print("✓ basic-calculator-iv passed")
