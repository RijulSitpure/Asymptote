import heapq

class Solution:
    def shortestPathWithHops(self, n: int, edges: list[list[int]], s: int, d: int, k: int) -> int:
        graph = [[] for _ in range(n)]
        for u, v, w in edges:
            graph[u].append((v, w))
            graph[v].append((u, w))
        dist = [[float('inf')] * (k + 1) for _ in range(n)]
        dist[s][k] = 0
        min_heap = [(0, s, k)]
        while min_heap:
            cost, u, hops = heapq.heappop(min_heap)
            if u == d:
                return cost
            if cost > dist[u][hops]:
                continue
            for v, w in graph[u]:
                if cost + w < dist[v][hops]:
                    dist[v][hops] = cost + w
                    heapq.heappush(min_heap, (dist[v][hops], v, hops))
                if hops > 0 and cost < dist[v][hops - 1]:
                    dist[v][hops - 1] = cost
                    heapq.heappush(min_heap, (dist[v][hops - 1], v, hops - 1))
        return -1
