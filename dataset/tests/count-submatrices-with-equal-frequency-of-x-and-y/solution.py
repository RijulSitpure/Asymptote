class Solution:
    def numberOfSubmatrices(self, grid: list[list[str]]) -> int:
        m, n = len(grid), len(grid[0])
        pref_x = [[0] * (n + 1) for _ in range(m + 1)]
        pref_y = [[0] * (n + 1) for _ in range(m + 1)]
        ans = 0
        
        for r in range(m):
            for c in range(n):
                is_x = 1 if grid[r][c] == 'X' else 0
                is_y = 1 if grid[r][c] == 'Y' else 0
                pref_x[r + 1][c + 1] = pref_x[r][c + 1] + pref_x[r + 1][c] - pref_x[r][c] + is_x
                pref_y[r + 1][c + 1] = pref_y[r][c + 1] + pref_y[r + 1][c] - pref_y[r][c] + is_y
                if pref_x[r + 1][c + 1] == pref_y[r + 1][c + 1] and pref_x[r + 1][c + 1] > 0:
                    ans += 1
                    
        return ans