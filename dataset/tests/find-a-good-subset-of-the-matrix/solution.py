class Solution:
    def goodSubsetofBinaryMatrix(self, grid: list[list[int]]) -> list[int]:
        m, n = len(grid), len(grid[0])
        first_occ = {}
        for r in range(m):
            mask = sum(grid[r][c] << c for c in range(n))
            if mask == 0:
                return [r]
            if mask not in first_occ:
                first_occ[mask] = r
        for m1, r1 in first_occ.items():
            for m2, r2 in first_occ.items():
                if (m1 & m2) == 0:
                    return sorted([r1, r2])
        return []
