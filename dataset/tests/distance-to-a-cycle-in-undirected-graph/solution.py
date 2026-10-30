from typing import List, Optional, Tuple, Dict, Set

from collections import deque

class Solution:
    def distanceToCycle(self, n: int, edges: list[list[int]]) -> list[int]:
        adj = [[] for _ in range(n)]
        deg = [0] * n
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            deg[u] += 1
            deg[v] += 1

        q = deque([i for i in range(n) if deg[i] == 1])
        in_cycle = [True] * n
        while q:
            u = q.popleft()
            in_cycle[u] = False
            for v in adj[u]:
                deg[v] -= 1
                if deg[v] == 1:
                    q.append(v)

        dist = [-1] * n
        bfs_q = deque()
        for i in range(n):
            if in_cycle[i]:
                dist[i] = 0
                bfs_q.append(i)

        while bfs_q:
            u = bfs_q.popleft()
            for v in adj[u]:
                if dist[v] == -1:
                    dist[v] = dist[u] + 1
                    bfs_q.append(v)

        return dist
