from collections import deque

class Solution:
    def minimumObstacles(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dist = [[float("inf")] * n for _ in range(m)]
        dist[0][0] = 0
        q = deque([(0, 0, 0)])
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        
        while q:
            d, r, c = q.popleft()
            if r == m - 1 and c == n - 1:
                return d
            if d > dist[r][c]:
                continue
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    w = grid[nr][nc]
                    if dist[r][c] + w < dist[nr][nc]:
                        dist[nr][nc] = dist[r][c] + w
                        if w == 0:
                            q.appendleft((dist[nr][nc], nr, nc))
                        else:
                            q.append((dist[nr][nc], nr, nc))
        return dist[m - 1][n - 1]
