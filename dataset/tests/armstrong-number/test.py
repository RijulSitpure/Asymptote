class Solution:
    def isArmstrong(self, n: int) -> bool:
        s = str(n)
        k = len(s)
        return sum(int(c) ** k for c in s) == n

def test():
    sol = Solution()
    assert sol.isArmstrong(153) is True, "test 1 failed"
    assert sol.isArmstrong(123) is False, "test 2 failed"
    print("✓ armstrong-number passed")

if __name__ == "__main__":
    test()
