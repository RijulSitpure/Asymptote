from collections import deque

class Solution:
    def secondMinimum(self, n: int, edges: list[list[int]], time: int, change: int) -> int:
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        dist1 = [-1] * (n + 1)
        dist2 = [-1] * (n + 1)
        dist1[1] = 0

        q = deque([(1, 0)])

        while q:
            node, curr_time = q.popleft()
            signal_period = curr_time // change
            if signal_period % 2 == 1:
                curr_time = (signal_period + 1) * change

            next_time = curr_time + time

            for nxt in adj[node]:
                if dist1[nxt] == -1:
                    dist1[nxt] = next_time
                    q.append((nxt, next_time))
                elif dist2[nxt] == -1 and dist1[nxt] < next_time:
                    dist2[nxt] = next_time
                    if nxt == n:
                        return next_time
                    q.append((nxt, next_time))
        return dist2[n]
