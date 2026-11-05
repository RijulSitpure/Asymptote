class Solution:
    def numberOfRightTriangles(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        row_cnt = [sum(row) for row in grid]
        col_cnt = [sum(grid[r][c] for r in range(m)) for c in range(n)]

        ans = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    ans += (row_cnt[r] - 1) * (col_cnt[c] - 1)
        return ans
