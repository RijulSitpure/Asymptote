import heapq

class Solution:
    def minimumCost(self, n: int, highways: list[list[int]], discounts: int) -> int:
        adj = [[] for _ in range(n)]
        for u, v, toll in highways:
            adj[u].append((v, toll))
            adj[v].append((u, toll))

        dist = [[float('inf')] * (discounts + 1) for _ in range(n)]
        dist[0][0] = 0
        heap = [(0, 0, 0)]

        while heap:
            cost, u, d = heapq.heappop(heap)

            if cost > dist[u][d]:
                continue
            if u == n - 1:
                return cost

            for v, toll in adj[u]:
                if cost + toll < dist[v][d]:
                    dist[v][d] = cost + toll
                    heapq.heappush(heap, (dist[v][d], v, d))

                if d < discounts and cost + toll // 2 < dist[v][d + 1]:
                    dist[v][d + 1] = cost + toll // 2
                    heapq.heappush(heap, (dist[v][d + 1], v, d + 1))

        return -1
