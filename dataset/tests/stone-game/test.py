from typing import List

class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        n = len(piles)
        dp = [[0] * n for _ in range(n)]
        for i in range(n):
            dp[i][i] = piles[i]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i][j] = max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1])
        return dp[0][n - 1] > 0

def test():
    sol = Solution()
    assert sol.stoneGame([5, 3, 4, 5]) is True, "test 1 failed"
    assert sol.stoneGame([3, 7, 2, 3]) is True, "test 2 failed"
    print("✓ stone-game passed")

if __name__ == "__main__":
    test()
