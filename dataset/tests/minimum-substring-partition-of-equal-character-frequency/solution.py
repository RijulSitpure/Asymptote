class Solution:
    def minimumSubstringsInPartition(self, s: str) -> int:
        n = len(s)
        dp = [float('inf')] * (n + 1)
        dp[0] = 0

        for i in range(1, n + 1):
            counts = {}
            for j in range(i, 0, -1):
                ch = s[j - 1]
                counts[ch] = counts.get(ch, 0) + 1
                vals = counts.values()
                target_f = next(iter(vals))
                if all(v == target_f for v in vals):
                    dp[i] = min(dp[i], dp[j - 1] + 1)

        return dp[n]
