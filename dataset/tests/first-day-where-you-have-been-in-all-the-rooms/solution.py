class Solution:
    def firstDayBeenInAllRooms(self, nextVisit: list[int]) -> int:
        MOD = 10**9 + 7
        n = len(nextVisit)
        dp = [0] * n
        for i in range(n - 1):
            dp[i + 1] = (2 * dp[i] - dp[nextVisit[i]] + 2) % MOD
        return dp[n - 1]
