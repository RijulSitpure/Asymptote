import bisect
from collections import Counter

class Solution:
    def maximumTotalDamage(self, power: list[int]) -> int:
        cnt = Counter(power)
        vals = sorted(cnt.keys())
        m = len(vals)
        dp = [0] * (m + 1)
        
        for i in range(m):
            v = vals[i]
            gain = v * cnt[v]
            idx = bisect.bisect_left(vals, v - 2)
            dp[i + 1] = max(dp[i], dp[idx] + gain)
            
        return dp[m]