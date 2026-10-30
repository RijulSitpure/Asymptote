from collections import deque

class Solution:
    def closestNode(self, n: int, edges: list[list[int]], query: list[list[int]]) -> list[int]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def get_dist(src: int) -> list[int]:
            dist = [-1] * n
            dist[src] = 0
            q = deque([src])
            while q:
                curr = q.popleft()
                for nxt in adj[curr]:
                    if dist[nxt] == -1:
                        dist[nxt] = dist[curr] + 1
                        q.append(nxt)
            return dist

        all_dist = [get_dist(i) for i in range(n)]
        ans = []
        for u, v, target in query:
            best_node = u
            min_d = all_dist[target][u]
            for x in range(n):
                if all_dist[u][x] + all_dist[x][v] == all_dist[u][v]:
                    if all_dist[target][x] < min_d:
                        min_d = all_dist[target][x]
                        best_node = x
            ans.append(best_node)
        return ans
