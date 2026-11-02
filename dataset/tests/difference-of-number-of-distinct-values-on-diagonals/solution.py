class Solution:
    def differenceOfDistinctValues(self, grid: list[list[int]]) -> list[list[int]]:
        m, n = len(grid), len(grid[0])
        ans = [[0] * n for _ in range(m)]
        for r in range(m):
            for c in range(n):
                top_left = set()
                cr, cc = r - 1, c - 1
                while cr >= 0 and cc >= 0:
                    top_left.add(grid[cr][cc])
                    cr -= 1
                    cc -= 1
                bottom_right = set()
                cr, cc = r + 1, c + 1
                while cr < m and cc < n:
                    bottom_right.add(grid[cr][cc])
                    cr += 1
                    cc += 1
                ans[r][c] = abs(len(top_left) - len(bottom_right))
        return ans
