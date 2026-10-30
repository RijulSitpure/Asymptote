class Solution:
    def minimumTime(self, grid: list[list[int]]) -> int:
        import heapq
        if grid[0][1] > 1 and grid[1][0] > 1:
            return -1
        m, n = len(grid), len(grid[0])
        dist = [[float('inf')] * n for _ in range(m)]
        dist[0][0] = 0
        pq = [(0, 0, 0)]
        while pq:
            t, r, c = heapq.heappop(pq)
            if r == m - 1 and c == n - 1:
                return t
            if t > dist[r][c]:
                continue
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    if t + 1 >= grid[nr][nc]:
                        nt = t + 1
                    else:
                        diff = grid[nr][nc] - t
                        nt = grid[nr][nc] if diff % 2 == 1 else grid[nr][nc] + 1
                    if nt < dist[nr][nc]:
                        dist[nr][nc] = nt
                        heapq.heappush(pq, (nt, nr, nc))
        return -1
