import heapq

class Solution:
    def minimumDistance(self, n: int, edges: list[list[int]], s: int, marked: list[int]) -> int:
        graph = [[] for _ in range(n)]
        for u, v, w in edges:
            graph[u].append((v, w))
        dist = [float('inf')] * n
        dist[s] = 0
        min_heap = [(0, s)]
        while min_heap:
            d, u = heapq.heappop(min_heap)
            if d > dist[u]:
                continue
            for v, w in graph[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    heapq.heappush(min_heap, (dist[v], v))
        ans = min((dist[u] for u in marked), default=float('inf'))
        return ans if ans != float('inf') else -1
