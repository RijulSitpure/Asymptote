class Solution:
    def modifiedMatrix(self, matrix: list[list[int]]) -> list[list[int]]:
        m, n = len(matrix), len(matrix[0])
        col_max = [max(matrix[r][c] for r in range(m)) for c in range(n)]
        ans = [row[:] for row in matrix]
        for r in range(m):
            for c in range(n):
                if ans[r][c] == -1:
                    ans[r][c] = col_max[c]
        return ans
