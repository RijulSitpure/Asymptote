from collections import deque

class Solution:
    def minimumDiameterAfterMerge(self, edges1: list[list[int]], edges2: list[list[int]]) -> int:
        def get_diameter(edges):
            n = len(edges) + 1
            if n <= 1:
                return 0
            adj = [[] for _ in range(n)]
            for u, v in edges:
                adj[u].append(v)
                adj[v].append(u)
                
            def bfs(start):
                dist = [-1] * n
                dist[start] = 0
                q = deque([start])
                farthest = start
                while q:
                    u = q.popleft()
                    for v in adj[u]:
                        if dist[v] == -1:
                            dist[v] = dist[u] + 1
                            q.append(v)
                            if dist[v] > dist[farthest]:
                                farthest = v
                return farthest, dist[farthest]
                
            u, _ = bfs(0)
            _, diam = bfs(u)
            return diam
            
        d1 = get_diameter(edges1)
        d2 = get_diameter(edges2)
        r1 = (d1 + 1) // 2
        r2 = (d2 + 1) // 2
        return max(d1, d2, r1 + r2 + 1)