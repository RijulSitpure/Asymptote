from typing import List, Optional
class Solution:
    def minimumOperations(self, nums: List[int]) -> int:
        dp = [0, 0, 0, 0]
        for x in nums:
            new_dp = [0, 0, 0, 0]
            new_dp[1] = dp[1] + (0 if x == 1 else 1)
            new_dp[2] = min(dp[1], dp[2]) + (0 if x == 2 else 1)
            new_dp[3] = min(dp[1], dp[2], dp[3]) + (0 if x == 3 else 1)
            dp = new_dp
        return min(dp[1], dp[2], dp[3])
