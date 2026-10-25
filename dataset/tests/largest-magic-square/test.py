class Solution:
    def largestMagicSquare(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        row_pref = [[0] * (n + 1) for _ in range(m)]
        col_pref = [[0] * n for _ in range(m + 1)]

        for r in range(m):
            for c in range(n):
                row_pref[r][c + 1] = row_pref[r][c] + grid[r][c]
                col_pref[r + 1][c] = col_pref[r][c] + grid[r][c]

        for k in range(min(m, n), 1, -1):
            for r in range(m - k + 1):
                for c in range(n - k + 1):
                    target = row_pref[r][c + k] - row_pref[r][c]

                    valid = True
                    for i in range(1, k):
                        if row_pref[r + i][c + k] - row_pref[r + i][c] != target:
                            valid = False
                            break
                    if not valid:
                        continue

                    for j in range(k):
                        if col_pref[r + k][c + j] - col_pref[r][c + j] != target:
                            valid = False
                            break
                    if not valid:
                        continue

                    diag1 = sum(grid[r + i][c + i] for i in range(k))
                    diag2 = sum(grid[r + i][c + k - 1 - i] for i in range(k))
                    if diag1 == target and diag2 == target:
                        return k

        return 1

def test():
    sol = Solution()
    g1 = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
    assert sol.largestMagicSquare(g1) == 3
    g2 = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
    assert sol.largestMagicSquare(g2) == 2

if __name__ == '__main__':
    test()
