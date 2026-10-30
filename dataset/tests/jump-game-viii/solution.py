class Solution:
    def minCost(self, nums: list[int], costs: list[int]) -> int:
        n = len(nums)
        dp = [float("inf")] * n
        dp[0] = 0
        
        stk_ge = []
        stk_lt = []
        
        for i in range(n):
            while stk_ge and nums[i] >= nums[stk_ge[-1]]:
                prev = stk_ge.pop()
                dp[i] = min(dp[i], dp[prev] + costs[i])
            stk_ge.append(i)
            
            while stk_lt and nums[i] < nums[stk_lt[-1]]:
                prev = stk_lt.pop()
                dp[i] = min(dp[i], dp[prev] + costs[i])
            stk_lt.append(i)
            
        return dp[n - 1]
