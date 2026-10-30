from collections import deque

class Solution:
    def networkBecomesIdle(self, edges: list[list[int]], patience: list[int]) -> int:
        n = len(patience)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        dist = [-1] * n
        dist[0] = 0
        q = deque([0])
        while q:
            curr = q.popleft()
            for nxt in adj[curr]:
                if dist[nxt] == -1:
                    dist[nxt] = dist[curr] + 1
                    q.append(nxt)

        max_time = 0
        for i in range(1, n):
            round_trip = 2 * dist[i]
            p = patience[i]
            last_sent = ((round_trip - 1) // p) * p
            last_received = last_sent + round_trip
            if last_received > max_time:
                max_time = last_received
        return max_time + 1
