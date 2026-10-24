class Solution:
    def findDerangement(self, n: int) -> int:
        MOD = 10**9 + 7
        if n == 1:
            return 0
        if n == 2:
            return 1
        prev2 = 0
        prev1 = 1
        for i in range(3, n + 1):
            curr = (i - 1) * (prev1 + prev2) % MOD
            prev2, prev1 = prev1, curr
        return prev1

def test():
    sol = Solution()
    assert sol.findDerangement(3) == 2, "test 1 failed"
    assert sol.findDerangement(2) == 1, "test 2 failed"
    assert sol.findDerangement(1) == 0, "test 3 failed"
    print("✓ find-the-derangement-of-an-array passed")

if __name__ == "__main__":
    test()
