class Solution:
    def mctFromLeafValues(self, arr: list[int]) -> int:
        res = 0
        stack = [float('inf')]
        for x in arr:
            while stack[-1] <= x:
                mid = stack.pop()
                res += mid * min(stack[-1], x)
            stack.append(x)
        while len(stack) > 2:
            res += stack.pop() * stack[-1]
        return res

def test():
    sol = Solution()
    assert sol.mctFromLeafValues([6, 2, 4]) == 32, "test 1 failed"
    assert sol.mctFromLeafValues([4, 11]) == 44, "test 2 failed"
    print("✓ minimum-cost-tree-from-leaf-values passed")

if __name__ == "__main__":
    test()
