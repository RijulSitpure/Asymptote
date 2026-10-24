class Solution:
    def calculate(self, s: str) -> int:
        def helper(it):
            stack = []
            num = 0
            sign = '+'

            while True:
                ch = next(it, None)
                if ch is None or ch == ')':
                    if sign == '+':
                        stack.append(num)
                    elif sign == '-':
                        stack.append(-num)
                    elif sign == '*':
                        stack.append(stack.pop() * num)
                    elif sign == '/':
                        stack.append(int(stack.pop() / num))
                    break

                if ch == ' ':
                    continue

                if ch.isdigit():
                    num = num * 10 + int(ch)
                elif ch == '(':
                    num = helper(it)
                else:
                    if sign == '+':
                        stack.append(num)
                    elif sign == '-':
                        stack.append(-num)
                    elif sign == '*':
                        stack.append(stack.pop() * num)
                    elif sign == '/':
                        stack.append(int(stack.pop() / num))
                    num = 0
                    sign = ch

            return sum(stack)

        return helper(iter(s))

def test():
    sol = Solution()
    assert sol.calculate("1+1") == 2, "test 1 failed"
    assert sol.calculate("6-4/2") == 4, "test 2 failed"
    assert sol.calculate("2*(5+5*2)/3+(6/2+8)") == 21, "test 3 failed"
    print("✓ basic-calculator-iii passed")

if __name__ == "__main__":
    test()
