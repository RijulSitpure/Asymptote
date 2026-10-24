from typing import List

class Solution:
    def numEnclaves(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])

        def dfs(r: int, c: int):
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == 0:
                return
            grid[r][c] = 0
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for i in range(m):
            if grid[i][0] == 1:
                dfs(i, 0)
            if grid[i][n - 1] == 1:
                dfs(i, n - 1)
        for j in range(n):
            if grid[0][j] == 1:
                dfs(0, j)
            if grid[m - 1][j] == 1:
                dfs(m - 1, j)

        return sum(row.count(1) for row in grid)

def test():
    sol = Solution()
    g1 = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
    assert sol.numEnclaves(g1) == 3, "test 1 failed"
    g2 = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
    assert sol.numEnclaves(g2) == 0, "test 2 failed"
    print("✓ number-of-enclaves passed")

if __name__ == "__main__":
    test()
