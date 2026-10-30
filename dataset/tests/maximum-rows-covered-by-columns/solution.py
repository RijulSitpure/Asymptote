from itertools import combinations

class Solution:
    def maximumRows(self, matrix: list[list[int]], numSelect: int) -> int:
        m, n = len(matrix), len(matrix[0])
        row_masks = []
        for row in matrix:
            mask = 0
            for j, val in enumerate(row):
                if val == 1:
                    mask |= (1 << j)
            row_masks.append(mask)
        
        max_covered = 0
        for cols in combinations(range(n), numSelect):
            col_mask = 0
            for c in cols:
                col_mask |= (1 << c)
            covered = sum(1 for rmask in row_masks if (rmask & ~col_mask) == 0)
            if covered > max_covered:
                max_covered = covered
        return max_covered
