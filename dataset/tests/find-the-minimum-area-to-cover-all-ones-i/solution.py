class Solution:
    def minimumArea(self, grid: list[list[int]]) -> int:
        min_r, max_r = float('inf'), float('-inf')
        min_c, max_c = float('inf'), float('-inf')
        for r, row in enumerate(grid):
            for c, val in enumerate(row):
                if val == 1:
                    min_r = min(min_r, r)
                    max_r = max(max_r, r)
                    min_c = min(min_c, c)
                    max_c = max(max_c, c)
        return (max_r - min_r + 1) * (max_c - min_c + 1)