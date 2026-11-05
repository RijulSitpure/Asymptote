class Solution:
    def maxMoves(self, kx: int, ky: int, positions: list[list[int]]) -> int:
        from collections import deque
        from functools import lru_cache
        
        pts = [(kx, ky)] + [(x, y) for x, y in positions]
        p = len(positions)
        
        # Precompute BFS knight shortest paths
        knight_moves = [(-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1)]
        dist = [[0] * (p + 1) for _ in range(p + 1)]
        
        for i in range(p + 1):
            sx, sy = pts[i]
            d_grid = [[-1] * 50 for _ in range(50)]
            d_grid[sx][sy] = 0
            q = deque([(sx, sy)])
            while q:
                x, y = q.popleft()
                for dx, dy in knight_moves:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < 50 and 0 <= ny < 50 and d_grid[nx][ny] == -1:
                        d_grid[nx][ny] = d_grid[x][y] + 1
                        q.append((nx, ny))
            for j in range(p + 1):
                tx, ty = pts[j]
                dist[i][j] = d_grid[tx][ty]
                
        # Game theory bitmask DP: Alice maximizes, Bob minimizes
        @lru_cache(None)
        def minimax(u: int, mask: int, is_alice: bool) -> int:
            if mask == (1 << p) - 1:
                return 0
            if is_alice:
                best = 0
                for nxt in range(p):
                    if not (mask & (1 << nxt)):
                        d = dist[u][nxt + 1]
                        best = max(best, d + minimax(nxt + 1, mask | (1 << nxt), False))
                return best
            else:
                best = float('inf')
                for nxt in range(p):
                    if not (mask & (1 << nxt)):
                        d = dist[u][nxt + 1]
                        best = min(best, d + minimax(nxt + 1, mask | (1 << nxt), True))
                return best
                
        return minimax(0, 0, True)
