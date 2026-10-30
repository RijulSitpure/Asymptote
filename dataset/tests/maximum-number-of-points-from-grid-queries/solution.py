import heapq

class Solution:
    def maxPoints(self, grid: list[list[int]], queries: list[int]) -> list[int]:
        m, n = len(grid), len(grid[0])
        sorted_q = sorted((q, idx) for idx, q in enumerate(queries))
        ans = [0] * len(queries)
        pq = [(grid[0][0], 0, 0)]
        visited = [[False] * n for _ in range(m)]
        visited[0][0] = True
        count = 0
        for q_val, q_idx in sorted_q:
            while pq and pq[0][0] < q_val:
                val, r, c = heapq.heappop(pq)
                count += 1
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
                        visited[nr][nc] = True
                        heapq.heappush(pq, (grid[nr][nc], nr, nc))
            ans[q_idx] = count
        return ans
