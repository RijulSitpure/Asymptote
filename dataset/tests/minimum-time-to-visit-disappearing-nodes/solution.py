import heapq

class Solution:
    def minimumTime(self, n: int, edges: list[list[int]], disappear: list[int]) -> list[int]:
        adj = [[] for _ in range(n)]
        for u, v, length in edges:
            adj[u].append((v, length))
            adj[v].append((u, length))

        dist = [float('inf')] * n
        dist[0] = 0
        pq = [(0, 0)]

        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]:
                continue
            for v, length in adj[u]:
                nxt_d = d + length
                if nxt_d < disappear[v] and nxt_d < dist[v]:
                    dist[v] = nxt_d
                    heapq.heappush(pq, (nxt_d, v))

        return [d if d != float('inf') else -1 for d in dist]
