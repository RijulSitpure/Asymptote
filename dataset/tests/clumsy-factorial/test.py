class Solution:
    def clumsy(self, n: int) -> int:
        stack = [n]
        op = 0
        for i in range(n - 1, 0, -1):
            if op == 0:
                stack.append(stack.pop() * i)
            elif op == 1:
                top = stack.pop()
                stack.append(int(top / i))
            elif op == 2:
                stack.append(i)
            else:
                stack.append(-i)
            op = (op + 1) % 4
        return sum(stack)

def test():
    sol = Solution()
    assert sol.clumsy(4) == 7, "test 1 failed"
    assert sol.clumsy(10) == 12, "test 2 failed"
    print("✓ clumsy-factorial passed")

if __name__ == "__main__":
    test()
