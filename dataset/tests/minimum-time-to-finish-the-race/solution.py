from typing import List

class Solution:
    def minimumFinishTime(self, tires: List[List[int]], changeTime: int, numLaps: int) -> int:
        min_tire = [float('inf')] * 18
        for f, r in tires:
            cur = f
            total = f
            lap = 1
            while lap <= 17 and cur < changeTime + f:
                min_tire[lap] = min(min_tire[lap], total)
                cur *= r
                total += cur
                lap += 1
                
        dp = [float('inf')] * (numLaps + 1)
        dp[0] = -changeTime
        for i in range(1, numLaps + 1):
            for j in range(1, min(i, 17) + 1):
                dp[i] = min(dp[i], dp[i - j] + changeTime + min_tire[j])
        return dp[numLaps]
