class Solution:
    def removeOnes(self, grid: list[list[int]]) -> bool:
        row0 = grid[0]
        inv_row0 = [1 - x for x in row0]

        for r in range(1, len(grid)):
            if grid[r] != row0 and grid[r] != inv_row0:
                return False

        return True
