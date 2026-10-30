class Solution:
    def findColumnWidth(self, grid: list[list[int]]) -> list[int]:
        m, n = len(grid), len(grid[0])
        ans = []
        for c in range(n):
            max_w = max(len(str(grid[r][c])) for r in range(m))
            ans.append(max_w)
        return ans
