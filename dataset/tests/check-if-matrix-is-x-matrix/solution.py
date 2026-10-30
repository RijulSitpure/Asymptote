class Solution:
    def checkXMatrix(self, grid: list[list[int]]) -> bool:
        n = len(grid)
        for r in range(n):
            for c in range(n):
                is_diag = (r == c or r + c == n - 1)
                if is_diag and grid[r][c] == 0:
                    return False
                if not is_diag and grid[r][c] != 0:
                    return False
        return True
