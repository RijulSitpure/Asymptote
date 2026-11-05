class Solution:
    def longestSubsequence(self, nums: list[int]) -> int:
        max_val = max(nums)
        dp = [[0] * (max_val + 1) for _ in range(max_val + 1)]
        ans = 1
        
        for x in nums:
            best_len = [1] * (max_val + 1)
            for prev_v in range(1, max_val + 1):
                d = abs(x - prev_v)
                best_len[d] = max(best_len[d], 1 + dp[prev_v][d])
                
            curr_max = 0
            for d in range(max_val, -1, -1):
                curr_max = max(curr_max, best_len[d])
                best_len[d] = curr_max
                
            for d in range(max_val + 1):
                dp[x][d] = max(dp[x][d], best_len[d])
                ans = max(ans, dp[x][d])
                
        return ans
