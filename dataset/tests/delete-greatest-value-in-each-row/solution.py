class Solution:
    def deleteGreatestValue(self, grid: list[list[int]]) -> int:
        for row in grid:
            row.sort()
        ans = 0
        for col in range(len(grid[0])):
            col_max = max(grid[row][col] for row in range(len(grid)))
            ans += col_max
        return ans
