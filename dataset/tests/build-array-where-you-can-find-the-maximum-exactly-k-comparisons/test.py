class Solution:
    def numOfArrays(self, n: int, m: int, k: int) -> int:
        if k == 0 or k > m:
            return 0
        MOD = 10**9 + 7
        dp = [[0] * (m + 1) for _ in range(k + 1)]
        for j in range(1, m + 1):
            dp[1][j] = 1

        for _ in range(2, n + 1):
            new_dp = [[0] * (m + 1) for _ in range(k + 1)]
            for c in range(1, k + 1):
                pref = 0
                for j in range(1, m + 1):
                    new_dp[c][j] = (dp[c][j] * j + pref) % MOD
                    pref = (pref + dp[c - 1][j]) % MOD
            dp = new_dp

        return sum(dp[k][j] for j in range(1, m + 1)) % MOD

sol = Solution()
assert sol.numOfArrays(2, 3, 1) == 6
assert sol.numOfArrays(5, 2, 3) == 0
assert sol.numOfArrays(9, 1, 1) == 1
print("All tests passed successfully.")
