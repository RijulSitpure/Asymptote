class Solution:
    def rangeAddQueries(self, n: int, queries: list[list[int]]) -> list[list[int]]:
        diff = [[0] * (n + 1) for _ in range(n + 1)]
        for r1, c1, r2, c2 in queries:
            diff[r1][c1] += 1
            diff[r1][c2 + 1] -= 1
            diff[r2 + 1][c1] -= 1
            diff[r2 + 1][c2 + 1] += 1
        mat = [[0] * n for _ in range(n)]
        for r in range(n):
            for c in range(n):
                top = mat[r - 1][c] if r > 0 else 0
                left = mat[r][c - 1] if c > 0 else 0
                top_left = mat[r - 1][c - 1] if r > 0 and c > 0 else 0
                mat[r][c] = diff[r][c] + top + left - top_left
        return mat
