class Solution:
    def evaluateExpression(self, s: str) -> int:
        # Standard arithmetic expression evaluation with +, -, *, and parentheses
        def apply_op(op, b, a):
            if op == '+': return a + b
            if op == '-': return a - b
            if op == '*': return a * b
            return 0
            
        def precedence(op):
            if op in ('+', '-'): return 1
            if op == '*': return 2
            return 0
            
        values = []
        ops = []
        i = 0
        n = len(s)
        while i < n:
            if s[i] == ' ':
                i += 1
                continue
            if s[i].isdigit():
                val = 0
                while i < n and s[i].isdigit():
                    val = val * 10 + int(s[i])
                    i += 1
                values.append(val)
                continue
            if s[i] == '(':
                ops.append('(')
            elif s[i] == ')':
                while ops and ops[-1] != '(':
                    values.append(apply_op(ops.pop(), values.pop(), values.pop()))
                ops.pop() # remove '('
            else: # operator +, -, *
                while ops and precedence(ops[-1]) >= precedence(s[i]):
                    values.append(apply_op(ops.pop(), values.pop(), values.pop()))
                ops.append(s[i])
            i += 1
            
        while ops:
            values.append(apply_op(ops.pop(), values.pop(), values.pop()))
        return values[-1]

def run_tests():
    sol = Solution()
    assert sol.evaluateExpression("1 + 2 * 3") == 7
    assert sol.evaluateExpression("(1 + 2) * 3") == 9
    assert sol.evaluateExpression("10 - 2 - 3") == 5
    print("All tests passed for 3749.")

if __name__ == "__main__":
    run_tests()