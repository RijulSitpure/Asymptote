class Solution:
    def isPossibleToCutPath(self, grid: list[list[int]]) -> bool:
        m, n = len(grid), len(grid[0])
        def dfs(r: int, c: int) -> bool:
            if r == m - 1 and c == n - 1:
                return True
            grid[r][c] = 0
            for dr, dc in [(1, 0), (0, 1)]:
                nr, nc = r + dr, c + dc
                if nr < m and nc < n and grid[nr][nc] == 1:
                    if dfs(nr, nc):
                        return True
            return False

        if not dfs(0, 0):
            return True
        grid[0][0] = 1
        return not dfs(0, 0)
