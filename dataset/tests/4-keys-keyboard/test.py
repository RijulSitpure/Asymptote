import sys

class Solution:
    def maxA(self, n: int) -> int:
        dp = list(range(n + 1))
        for i in range(1, n + 1):
            for j in range(3, i):
                dp[i] = max(dp[i], dp[i - j] * (j - 1))
        return dp[n]

def test():
    sol = Solution()
    assert sol.maxA(3) == 3, "test 1 failed"
    assert sol.maxA(7) == 9, "test 2 failed"
    print("✓ 4-keys-keyboard passed")

if __name__ == "__main__":
    test()
