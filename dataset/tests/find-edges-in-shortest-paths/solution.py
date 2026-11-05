import heapq

class Solution:
    def findAnswer(self, n: int, edges: list[list[int]]) -> list[bool]:
        adj = [[] for _ in range(n)]
        for i, (u, v, w) in enumerate(edges):
            adj[u].append((v, w, i))
            adj[v].append((u, w, i))

        def dijkstra(start):
            dist = [float('inf')] * n
            dist[start] = 0
            pq = [(0, start)]
            while pq:
                d, u = heapq.heappop(pq)
                if d > dist[u]:
                    continue
                for v, w, _ in adj[u]:
                    if d + w < dist[v]:
                        dist[v] = d + w
                        heapq.heappush(pq, (d + w, v))
            return dist

        dist0 = dijkstra(0)
        distN = dijkstra(n - 1)
        total = dist0[n - 1]

        if total == float('inf'):
            return [False] * len(edges)

        ans = []
        for u, v, w in edges:
            on_path = (dist0[u] + w + distN[v] == total) or (dist0[v] + w + distN[u] == total)
            ans.append(on_path)
        return ans
