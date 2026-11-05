class Solution:
    def lastMarkedNodes(self, edges: list[list[int]]) -> list[int]:
        from collections import deque
        n = len(edges) + 1
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        def bfs_farthest(start: int):
            dist = [-1] * n
            dist[start] = 0
            q = deque([start])
            farthest = start
            while q:
                u = q.popleft()
                if dist[u] > dist[farthest]:
                    farthest = u
                for v in adj[u]:
                    if dist[v] == -1:
                        dist[v] = dist[u] + 1
                        q.append(v)
            return farthest, dist
            
        # Diameter endpoint 1
        u, _ = bfs_farthest(0)
        # Diameter endpoint 2 and distances from u
        v, dist_u = bfs_farthest(u)
        # Distances from v
        _, dist_v = bfs_farthest(v)
        
        ans = [0] * n
        for i in range(n):
            if dist_u[i] >= dist_v[i]:
                ans[i] = u
            else:
                ans[i] = v
        return ans
