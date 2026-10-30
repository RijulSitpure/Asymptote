from typing import List, Optional, Tuple, Dict, Set

import heapq

class Solution:
    def minimumWeight(self, n: int, edges: list[list[int]], src1: int, src2: int, dest: int) -> int:
        adj = [[] for _ in range(n)]
        radj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            radj[v].append((u, w))

        def dijkstra(start, graph):
            dist = [float("inf")] * n
            dist[start] = 0
            pq = [(0, start)]
            while pq:
                d, u = heapq.heappop(pq)
                if d > dist[u]:
                    continue
                for v, w in graph[u]:
                    if dist[u] + w < dist[v]:
                        dist[v] = dist[u] + w
                        heapq.heappush(pq, (dist[v], v))
            return dist

        d1 = dijkstra(src1, adj)
        d2 = dijkstra(src2, adj)
        d3 = dijkstra(dest, radj)
        ans = float("inf")
        for i in range(n):
            ans = min(ans, d1[i] + d2[i] + d3[i])
        return ans if ans < float("inf") else -1
