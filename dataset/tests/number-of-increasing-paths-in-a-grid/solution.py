class Solution:
    def countPaths(self, grid: list[list[int]]) -> int:
        MOD = 10**9 + 7
        m, n = len(grid), len(grid[0])
        memo = {}
        def dfs(r, c):
            if (r, c) in memo:
                return memo[(r, c)]
            res = 1
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] > grid[r][c]:
                    res = (res + dfs(nr, nc)) % MOD
            memo[(r, c)] = res
            return res
        return sum(dfs(r, c) for r in range(m) for c in range(n)) % MOD
