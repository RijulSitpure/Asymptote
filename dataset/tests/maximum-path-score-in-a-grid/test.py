class Solution:
    def maxPathScore(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dp = [[0] * n for _ in range(m)]
        dp[0][0] = grid[0][0]
        for c in range(1, n):
            dp[0][c] = dp[0][c - 1] + grid[0][c]
        for r in range(1, m):
            dp[r][0] = dp[r - 1][0] + grid[r][0]
        for r in range(1, m):
            for c in range(1, n):
                dp[r][c] = grid[r][c] + max(dp[r - 1][c], dp[r][c - 1])
        return dp[m - 1][n - 1]

def run_tests():
    sol = Solution()
    grid = [
        [1, 3, 1],
        [1, 5, 1],
        [4, 2, 1]
    ]
    # Path 1 -> 3 -> 5 -> 2 -> 1 gives 12
    assert sol.maxPathScore(grid) == 12
    assert sol.maxPathScore([[5]]) == 5
    print("All tests passed for 3742.")

if __name__ == "__main__":
    run_tests()