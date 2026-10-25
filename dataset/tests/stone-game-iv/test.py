class Solution:
    def winnerSquareGame(self, n: int) -> bool:
        dp = [False] * (n + 1)
        for i in range(1, n + 1):
            k = 1
            while k * k <= i:
                if not dp[i - k * k]:
                    dp[i] = True
                    break
                k += 1
        return dp[n]

def test():
    sol = Solution()
    assert sol.winnerSquareGame(1) == True, "test 1 failed"
    assert sol.winnerSquareGame(2) == False, "test 2 failed"
    assert sol.winnerSquareGame(4) == True, "test 3 failed"
    print("✓ stone-game-iv passed")

if __name__ == "__main__":
    test()
