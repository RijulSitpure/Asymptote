import math

class Solution:
    def minimumIncrements(self, nums: list[int], target: list[int]) -> int:
        m = len(target)
        max_mask = 1 << m
        
        subset_lcm = {}
        for mask in range(1, max_mask):
            l = 1
            for i in range(m):
                if (mask >> i) & 1:
                    l = math.lcm(l, target[i])
            subset_lcm[mask] = l
            
        dp = [float("inf")] * max_mask
        dp[0] = 0
        
        for x in nums:
            next_dp = list(dp)
            for mask in range(max_mask):
                if dp[mask] == float("inf"):
                    continue
                for submask, lcm_val in subset_lcm.items():
                    rem = x % lcm_val
                    cost = 0 if rem == 0 else lcm_val - rem
                    new_mask = mask | submask
                    if dp[mask] + cost < next_dp[new_mask]:
                        next_dp[new_mask] = dp[mask] + cost
            dp = next_dp
            
        return dp[max_mask - 1]
