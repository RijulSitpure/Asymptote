class Solution:
    def stoneGameIII(self, stoneValue: list[int]) -> str:
        n = len(stoneValue)
        dp = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            dp[i] = float("-inf")
            take = 0
            for k in range(1, 4):
                if i + k <= n:
                    take += stoneValue[i + k - 1]
                    dp[i] = max(dp[i], take - dp[i + k])
        if dp[0] > 0:
            return "Alice"
        elif dp[0] < 0:
            return "Bob"
        return "Tie"

def test():
    sol = Solution()
    assert sol.stoneGameIII([1,2,3,7]) == "Bob", "test 1 failed"
    assert sol.stoneGameIII([1,2,3,-9]) == "Alice", "test 2 failed"
    assert sol.stoneGameIII([1,2,3,6]) == "Tie", "test 3 failed"
    print("✓ stone-game-iii passed")

if __name__ == "__main__":
    test()
