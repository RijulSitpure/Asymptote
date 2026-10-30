class Solution:
    def findShortestCycle(self, n: int, edges: list[list[int]]) -> int:
        from collections import deque
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        ans = float('inf')
        for start in range(n):
            dist = [-1] * n
            parent = [-1] * n
            dist[start] = 0
            q = deque([start])
            while q:
                u = q.popleft()
                for v in adj[u]:
                    if dist[v] == -1:
                        dist[v] = dist[u] + 1
                        parent[v] = u
                        q.append(v)
                    elif parent[u] != v:
                        ans = min(ans, dist[u] + dist[v] + 1)
        return ans if ans != float('inf') else -1
