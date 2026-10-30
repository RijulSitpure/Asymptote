from collections import deque

class Solution:
    def minimumTime(self, n: int, relations: list[list[int]], time: list[int]) -> int:
        adj = [[] for _ in range(n + 1)]
        in_degree = [0] * (n + 1)
        for prev_c, next_c in relations:
            adj[prev_c].append(next_c)
            in_degree[next_c] += 1

        dist = [0] * (n + 1)
        q = deque()
        for i in range(1, n + 1):
            if in_degree[i] == 0:
                dist[i] = time[i - 1]
                q.append(i)

        while q:
            curr = q.popleft()
            for nxt in adj[curr]:
                if dist[curr] + time[nxt - 1] > dist[nxt]:
                    dist[nxt] = dist[curr] + time[nxt - 1]
                in_degree[nxt] -= 1
                if in_degree[nxt] == 0:
                    q.append(nxt)

        return max(dist)
