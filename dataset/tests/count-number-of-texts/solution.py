class Solution:
    def countTexts(self, pressedKeys: str) -> int:
        MOD = 1_000_000_007
        n = len(pressedKeys)
        dp = [0] * (n + 1)
        dp[0] = 1
        for i in range(1, n + 1):
            max_k = 4 if pressedKeys[i - 1] in "79" else 3
            for k in range(1, max_k + 1):
                if i - k >= 0 and pressedKeys[i - k] == pressedKeys[i - 1]:
                    dp[i] = (dp[i] + dp[i - k]) % MOD
                else:
                    break
        return dp[n]
