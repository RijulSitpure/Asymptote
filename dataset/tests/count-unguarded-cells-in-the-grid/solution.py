class Solution:
    def countUnguarded(self, m: int, n: int, guards: list[list[int]], walls: list[list[int]]) -> int:
        grid = [[0] * n for _ in range(m)]
        for r, c in guards:
            grid[r][c] = 1
        for r, c in walls:
            grid[r][c] = 2

        for r, c in guards:
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                while 0 <= nr < m and 0 <= nc < n and grid[nr][nc] != 1 and grid[nr][nc] != 2:
                    if grid[nr][nc] == 0:
                        grid[nr][nc] = 3
                    nr += dr
                    nc += dc

        return sum(row.count(0) for row in grid)
