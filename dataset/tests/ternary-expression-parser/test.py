import sys

class Solution:
    def parseTernary(self, expression: str) -> str:
        stack = []
        for c in reversed(expression):
            if stack and stack[-1] == "?":
                stack.pop()
                true_val = stack.pop()
                stack.pop()
                false_val = stack.pop()
                stack.append(true_val if c == "T" else false_val)
            else:
                stack.append(c)
        return stack[0]

def test():
    sol = Solution()
    assert sol.parseTernary("T?2:3") == "2", "test 1 failed"
    assert sol.parseTernary("F?1:T?4:5") == "4", "test 2 failed"
    assert sol.parseTernary("T?T?F:5:3") == "F", "test 3 failed"
    print("✓ ternary-expression-parser passed")

if __name__ == "__main__":
    test()
