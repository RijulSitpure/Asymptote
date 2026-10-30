from collections import deque

class Solution:
    def minScore(self, n: int, roads: list[list[int]]) -> int:
        adj = [[] for _ in range(n + 1)]
        for u, v, w in roads:
            adj[u].append((v, w))
            adj[v].append((u, w))
        visited = set([1])
        q = deque([1])
        min_weight = float('inf')
        while q:
            u = q.popleft()
            for v, w in adj[u]:
                min_weight = min(min_weight, w)
                if v not in visited:
                    visited.add(v)
                    q.append(v)
        return min_weight
