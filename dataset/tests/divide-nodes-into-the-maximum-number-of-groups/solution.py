from collections import deque

class Solution:
    def magnificentSets(self, n: int, edges: list[list[int]]) -> int:
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        color = [0] * (n + 1)
        components = []
        for i in range(1, n + 1):
            if color[i] != 0:
                continue
            comp = []
            q = deque([i])
            color[i] = 1
            while q:
                u = q.popleft()
                comp.append(u)
                for v in adj[u]:
                    if color[v] == 0:
                        color[v] = -color[u]
                        q.append(v)
                    elif color[v] == color[u]:
                        return -1
            components.append(comp)
        def bfs_depth(start):
            dist = {start: 1}
            q = deque([start])
            max_d = 1
            while q:
                u = q.popleft()
                d = dist[u]
                max_d = max(max_d, d)
                for v in adj[u]:
                    if v not in dist:
                        dist[v] = d + 1
                        q.append(v)
            return max_d
        total_groups = 0
        for comp in components:
            total_groups += max(bfs_depth(node) for node in comp)
        return total_groups
