class Solution:
    def minimumVisitedCells(self, grid: list[list[int]]) -> int:
        import heapq
        m, n = len(grid), len(grid[0])
        if m == 1 and n == 1:
            return 1
        row_heaps = [[] for _ in range(m)]
        col_heaps = [[] for _ in range(n)]
        dist = [[float('inf')] * n for _ in range(m)]
        dist[0][0] = 1
        heapq.heappush(row_heaps[0], (1, grid[0][0]))
        heapq.heappush(col_heaps[0], (1, grid[0][0]))
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    continue
                while row_heaps[i] and row_heaps[i][0][1] < j:
                    heapq.heappop(row_heaps[i])
                while col_heaps[j] and col_heaps[j][0][1] < i:
                    heapq.heappop(col_heaps[j])
                d = float('inf')
                if row_heaps[i]:
                    d = min(d, row_heaps[i][0][0] + 1)
                if col_heaps[j]:
                    d = min(d, col_heaps[j][0][0] + 1)
                if d != float('inf'):
                    dist[i][j] = d
                    if grid[i][j] > 0:
                        heapq.heappush(row_heaps[i], (d, j + grid[i][j]))
                        heapq.heappush(col_heaps[j], (d, i + grid[i][j]))
        return dist[m - 1][n - 1] if dist[m - 1][n - 1] != float('inf') else -1
