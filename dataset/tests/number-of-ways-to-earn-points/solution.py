class Solution:
    def waysToReachTarget(self, target: int, types: list[list[int]]) -> int:
        MOD = 10**9 + 7
        dp = [0] * (target + 1)
        dp[0] = 1
        for count, marks in types:
            for s in range(target, -1, -1):
                for c in range(1, count + 1):
                    if s - c * marks >= 0:
                        dp[s] = (dp[s] + dp[s - c * marks]) % MOD
                    else:
                        break
        return dp[target]
