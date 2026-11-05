class Solution:
    def countSubmatrices(self, grid: list[list[int]], k: int) -> int:
        R, C = len(grid), len(grid[0])
        pref = [[0] * (C + 1) for _ in range(R + 1)]
        ans = 0
        for r in range(R):
            for c in range(C):
                pref[r + 1][c + 1] = grid[r][c] + pref[r][c + 1] + pref[r + 1][c] - pref[r][c]
                if pref[r + 1][c + 1] <= k:
                    ans += 1
        return ans
