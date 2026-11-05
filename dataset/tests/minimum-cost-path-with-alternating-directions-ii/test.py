from typing import List

class Solution:
    def minCost(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        # dp[r][c][dir]: dir 0 is came vertically (can move horizontally), dir 1 is came horizontally (can move vertically)
        INF = float('inf')
        dp = [[[INF, INF] for _ in range(n)] for _ in range(m)]
        dp[0][0][0] = grid[0][0]
        dp[0][0][1] = grid[0][0]
        
        for r in range(m):
            for c in range(n):
                # Move right from (r, c - 1): arrives horizontally (dir 1), must have come vertically (dir 0)
                if c > 0 and dp[r][c - 1][0] != INF:
                    dp[r][c][1] = min(dp[r][c][1], dp[r][c - 1][0] + grid[r][c])
                # Move down from (r - 1, c): arrives vertically (dir 0), must have come horizontally (dir 1)
                if r > 0 and dp[r - 1][c][1] != INF:
                    dp[r][c][0] = min(dp[r][c][0], dp[r - 1][c][1] + grid[r][c])
                    
        ans = min(dp[m - 1][n - 1][0], dp[m - 1][n - 1][1])
        return ans if ans != INF else -1

def run_tests():
    s = Solution()
    res1 = s.minCost([[1, 2], [3, 4]])
    assert res1 == 7, f"Expected 7, got {res1}" # down then right: 1 + 3 + 4 = 8, right then down: 1 + 2 + 4 = 7
    res2 = s.minCost([[5]])
    assert res2 == 5, f"Expected 5, got {res2}"
    print("3603 minimum-cost-path-with-alternating-directions-ii PASSED")

if __name__ == "__main__":
    run_tests()
