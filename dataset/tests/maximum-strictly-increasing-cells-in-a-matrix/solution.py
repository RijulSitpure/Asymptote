from collections import defaultdict

class Solution:
    def maxIncreasingCells(self, mat: list[list[int]]) -> int:
        m, n = len(mat), len(mat[0])
        val_to_cells = defaultdict(list)
        for r in range(m):
            for c in range(n):
                val_to_cells[mat[r][c]].append((r, c))
        row_max = [0] * m
        col_max = [0] * n
        for val in sorted(val_to_cells.keys()):
            updates = []
            for r, c in val_to_cells[val]:
                best = 1 + max(row_max[r], col_max[c])
                updates.append((r, c, best))
            for r, c, best in updates:
                row_max[r] = max(row_max[r], best)
                col_max[c] = max(col_max[c], best)
        return max(max(row_max), max(col_max))
