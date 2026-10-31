class Solution:
    def countCompleteComponents(self, n: int, edges: list[list[int]]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        visited = [False] * n
        ans = 0
        for i in range(n):
            if not visited[i]:
                nodes = []
                q = [i]
                visited[i] = True
                for u in q:
                    nodes.append(u)
                    for v in adj[u]:
                        if not visited[v]:
                            visited[v] = True
                            q.append(v)
                k = len(nodes)
                edge_count = sum(len(adj[u]) for u in nodes) // 2
                if edge_count == k * (k - 1) // 2:
                    ans += 1
        return ans
