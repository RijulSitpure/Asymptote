import heapq

class Solution:
    def minCost(self, n: int, roads: list[list[int]], appleCost: list[int], k: int) -> list[int]:
        graph = [[] for _ in range(n + 1)]
        for u, v, w in roads:
            graph[u].append((v, w))
            graph[v].append((u, w))
        dist = [float('inf')] * (n + 1)
        pq = []
        for i in range(1, n + 1):
            dist[i] = appleCost[i - 1]
            heapq.heappush(pq, (appleCost[i - 1], i))
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]:
                continue
            for v, w in graph[u]:
                new_cost = d + (k + 1) * w
                if new_cost < dist[v]:
                    dist[v] = new_cost
                    heapq.heappush(pq, (new_cost, v))
        return dist[1:]
