class Solution:
    def countOfPairs(self, nums: list[int]) -> int:
        mod = 10**9 + 7
        n = len(nums)
        max_val = max(nums)
        # dp[v] = ways where arr1[i] = v
        dp = [1 if v <= nums[0] else 0 for v in range(max_val + 1)]
        
        for i in range(1, n):
            # compute prefix sums of dp
            pref = [0] * (max_val + 2)
            for v in range(max_val + 1):
                pref[v + 1] = (pref[v] + dp[v]) % mod
            
            next_dp = [0] * (max_val + 1)
            diff = max(0, nums[i] - nums[i - 1])
            for v in range(nums[i] + 1):
                # arr1[i-1] <= min(v, v - diff)
                limit = min(v, v - diff)
                if limit >= 0:
                    next_dp[v] = pref[limit + 1]
            dp = next_dp
            
        return sum(dp) % mod
