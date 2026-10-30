class Solution:
    def minSpaceWastedKResizing(self, nums: list[int], k: int) -> int:
        n = len(nums)
        cost = [[0] * n for _ in range(n)]
        for i in range(n):
            mx = 0
            total = 0
            for j in range(i, n):
                mx = max(mx, nums[j])
                total += nums[j]
                cost[i][j] = mx * (j - i + 1) - total
                
        dp = [cost[0][i] for i in range(n)]
        
        for _ in range(k):
            new_dp = dp[:]
            for i in range(n):
                for j in range(i):
                    new_dp[i] = min(new_dp[i], dp[j] + cost[j + 1][i])
            dp = new_dp
            
        return dp[-1]

def test_min_space_wasted():
    sol = Solution()
    assert sol.minSpaceWastedKResizing([10, 20], 0) == 10
    assert sol.minSpaceWastedKResizing([10, 20, 30], 1) == 10
    assert sol.minSpaceWastedKResizing([10, 20, 15, 30, 20], 2) == 15

