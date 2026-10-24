import sys

class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        res = 0
        num = 0
        sign = 1
        for ch in s:
            if ch.isdigit():
                num = num * 10 + int(ch)
            elif ch in "+-":
                res += sign * num
                num = 0
                sign = 1 if ch == "+" else -1
            elif ch == "(":
                stack.append(res)
                stack.append(sign)
                res = 0
                sign = 1
            elif ch == ")":
                res += sign * num
                num = 0
                res *= stack.pop()
                res += stack.pop()
        res += sign * num
        return res

def test():
    sol = Solution()
    assert sol.calculate("1 + 1") == 2, "test 1 failed"
    assert sol.calculate(" 2-1 + 2 ") == 3, "test 2 failed"
    assert sol.calculate("(1+(4+5+2)-3)+(6+8)") == 23, "test 3 failed"
    print("✓ basic-calculator passed")

if __name__ == "__main__":
    test()
