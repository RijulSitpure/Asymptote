class Solution:
    def shortestDistanceAfterQueries(self, n: int, queries: list[list[int]]) -> list[int]:
        from collections import deque
        adj = [[] for _ in range(n)]
        for i in range(n - 1):
            adj[i].append(i + 1)
            
        ans = []
        for u, v in queries:
            adj[u].append(v)
            # Run BFS from 0 to n - 1
            dist = [-1] * n
            dist[0] = 0
            q = deque([0])
            while q:
                curr = q.popleft()
                if curr == n - 1:
                    break
                for nxt in adj[curr]:
                    if dist[nxt] == -1:
                        dist[nxt] = dist[curr] + 1
                        q.append(nxt)
            ans.append(dist[n - 1])
        return ans
