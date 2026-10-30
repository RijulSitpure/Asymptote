class Solution:
    def gridGame(self, grid: list[list[int]]) -> int:
        top_sum = sum(grid[0])
        bottom_sum = 0
        ans = float('inf')
        for c in range(len(grid[0])):
            top_sum -= grid[0][c]
            ans = min(ans, max(top_sum, bottom_sum))
            bottom_sum += grid[1][c]
        return ans
