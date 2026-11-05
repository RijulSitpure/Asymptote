class Solution:
    def zigzagTraversal(self, grid: list[list[int]]) -> list[int]:
        m, n = len(grid), len(grid[0])
        result = []
        take = True
        for r in range(m):
            cols = range(n) if r % 2 == 0 else range(n - 1, -1, -1)
            for c in cols:
                if take:
                    result.append(grid[r][c])
                take = not take
        return result
