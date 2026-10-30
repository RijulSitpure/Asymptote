class Solution:
    def maxPoints(self, points: list[list[int]]) -> int:
        m, n = len(points), len(points[0])
        dp = points[0][:]
        
        for r in range(1, m):
            left = [0] * n
            left[0] = dp[0]
            for c in range(1, n):
                left[c] = max(left[c - 1] - 1, dp[c])
                
            right = [0] * n
            right[-1] = dp[-1]
            for c in range(n - 2, -1, -1):
                right[c] = max(right[c + 1] - 1, dp[c])
                
            new_dp = [0] * n
            for c in range(n):
                new_dp[c] = points[r][c] + max(left[c], right[c])
            dp = new_dp
            
        return max(dp)

def test_max_points():
    sol = Solution()
    assert sol.maxPoints([[1,2,3],[1,5,1],[3,1,1]]) == 9
    assert sol.maxPoints([[1,5],[2,3],[4,2]]) == 11

