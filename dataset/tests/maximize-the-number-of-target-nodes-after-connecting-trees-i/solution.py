from collections import deque

class Solution:
    def maxTargetNodes(self, edges1: list[list[int]], edges2: list[list[int]], k: int) -> list[int]:
        n, m = len(edges1) + 1, len(edges2) + 1
        
        def build_adj(edges, size):
            adj = [[] for _ in range(size)]
            for u, v in edges:
                adj[u].append(v)
                adj[v].append(u)
            return adj
            
        adj1 = build_adj(edges1, n)
        adj2 = build_adj(edges2, m)
        
        def count_within_dist(adj, start, limit):
            if limit < 0:
                return 0
            visited = [False] * len(adj)
            q = deque([(start, 0)])
            visited[start] = True
            cnt = 0
            while q:
                u, d = q.popleft()
                cnt += 1
                if d < limit:
                    for v in adj[u]:
                        if not visited[v]:
                            visited[v] = True
                            q.append((v, d + 1))
            return cnt
            
        max_t2 = 0
        if k > 0:
            for j in range(m):
                max_t2 = max(max_t2, count_within_dist(adj2, j, k - 1))
                
        return [count_within_dist(adj1, i, k) + max_t2 for i in range(n)]
