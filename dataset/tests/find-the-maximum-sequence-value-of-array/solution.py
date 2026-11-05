class Solution:
    def maxValue(self, nums: list[int], k: int) -> int:
        n = len(nums)
        MAX_V = 128
        
        # left_dp[i][c] = set of reachable OR values choosing c elements from nums[:i]
        # We can represent sets as boolean arrays or bitsets
        left_dp = [[[False] * MAX_V for _ in range(k + 1)] for _ in range(n + 1)]
        left_dp[0][0][0] = True
        
        for i in range(n):
            val = nums[i]
            for c in range(k + 1):
                for v in range(MAX_V):
                    if left_dp[i][c][v]:
                        left_dp[i + 1][c][v] = True
                        if c + 1 <= k:
                            left_dp[i + 1][c + 1][v | val] = True
                            
        # right_dp[i][c] = set of reachable OR values choosing c elements from nums[i:]
        right_dp = [[[False] * MAX_V for _ in range(k + 1)] for _ in range(n + 1)]
        right_dp[n][0][0] = True
        
        for i in range(n - 1, -1, -1):
            val = nums[i]
            for c in range(k + 1):
                for v in range(MAX_V):
                    if right_dp[i + 1][c][v]:
                        right_dp[i][c][v] = True
                        if c + 1 <= k:
                            right_dp[i][c + 1][v | val] = True
                            
        ans = 0
        for i in range(k, n - k + 1):
            left_vals = [v for v in range(MAX_V) if left_dp[i][k][v]]
            right_vals = [v for v in range(MAX_V) if right_dp[i][k][v]]
            for lv in left_vals:
                for rv in right_vals:
                    ans = max(ans, lv ^ rv)
                    
        return ans
