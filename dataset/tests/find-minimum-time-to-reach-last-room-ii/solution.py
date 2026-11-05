import heapq

class Solution:
    def minTimeToReach(self, moveTime: list[list[int]]) -> int:
        n = len(moveTime)
        m = len(moveTime[0])
        dist = [[[float('inf'), float('inf')] for _ in range(m)] for _ in range(n)]
        dist[0][0][0] = 0
        pq = [(0, 0, 0, 0)]
        
        while pq:
            t, r, c, p = heapq.heappop(pq)
            if r == n - 1 and c == m - 1:
                return t
            if t > dist[r][c][p]:
                continue
            cost = 1 if p == 0 else 2
            np = 1 - p
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < m:
                    nt = max(t, moveTime[nr][nc]) + cost
                    if nt < dist[nr][nc][np]:
                        dist[nr][nc][np] = nt
                        heapq.heappush(pq, (nt, nr, nc, np))
        return -1
