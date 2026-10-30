from typing import List

class Solution:
    def getAncestors(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            
        res = [[] for _ in range(n)]
        for src in range(n):
            visited = [False] * n
            def dfs(node):
                for nxt in adj[node]:
                    if not visited[nxt]:
                        visited[nxt] = True
                        res[nxt].append(src)
                        dfs(nxt)
            dfs(src)
        return res
