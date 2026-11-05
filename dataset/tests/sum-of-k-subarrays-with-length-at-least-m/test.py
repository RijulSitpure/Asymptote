class Solution:
    def maxSum(self, nums: list[int], k: int, m: int) -> int:
        n = len(nums)
        dp = [[-float('inf')] * (k + 1) for _ in range(n + 1)]
        for i in range(n + 1):
            dp[i][0] = 0
            
        prefix_sum = [0] * (n + 1)
        for i in range(n):
            prefix_sum[i + 1] = prefix_sum[i] + nums[i]
            
        for j in range(1, k + 1):
            max_val = -float('inf')
            for i in range(1, n + 1):
                if i >= m:
                    max_val = max(max_val, dp[i - m][j - 1] - prefix_sum[i - m])
                dp[i][j] = dp[i - 1][j]
                if max_val != -float('inf'):
                    dp[i][j] = max(dp[i][j], max_val + prefix_sum[i])
                    
        return dp[n][k]

def test_sum_of_k_subarrays_with_length_at_least_m():
    sol = Solution()
    assert sol.maxSum([1, 2, -1, 3, 3, 4], 2, 2) == 13
    assert sol.maxSum([-2, -1, -3, -4, -5], 1, 1) == -1

if __name__ == '__main__':
    test_sum_of_k_subarrays_with_length_at_least_m()
    print('All tests passed.')
