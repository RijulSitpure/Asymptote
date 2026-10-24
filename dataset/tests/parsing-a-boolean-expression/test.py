class Solution:
    def parseBoolExpr(self, expression: str) -> bool:
        stack = []
        for c in expression:
            if c == ',':
                continue
            if c != ')':
                stack.append(c)
            else:
                seen = []
                while stack and stack[-1] != '(':
                    seen.append(stack.pop())
                stack.pop()  # remove '('
                op = stack.pop()
                if op == '!':
                    res = 'f' if seen[0] == 't' else 't'
                elif op == '&':
                    res = 'f' if 'f' in seen else 't'
                elif op == '|':
                    res = 't' if 't' in seen else 'f'
                stack.append(res)
        return stack[-1] == 't'

def test():
    sol = Solution()
    assert sol.parseBoolExpr("&(|(f))") is False, "test 1 failed"
    assert sol.parseBoolExpr("|(f,f,f,t)") is True, "test 2 failed"
    assert sol.parseBoolExpr("!(&(f,t))") is True, "test 3 failed"
    print("✓ parsing-a-boolean-expression passed")

if __name__ == "__main__":
    test()
