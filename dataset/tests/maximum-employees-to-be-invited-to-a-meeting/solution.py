from collections import deque

class Solution:
    def maximumInvitations(self, favorite: list[int]) -> int:
        n = len(favorite)
        in_degree = [0] * n
        for f in favorite:
            in_degree[f] += 1

        queue = deque([i for i in range(n) if in_degree[i] == 0])
        max_depth = [1] * n

        while queue:
            curr = queue.popleft()
            nxt = favorite[curr]
            max_depth[nxt] = max(max_depth[nxt], max_depth[curr] + 1)
            in_degree[nxt] -= 1
            if in_degree[nxt] == 0:
                queue.append(nxt)

        max_cycle_ge_3 = 0
        sum_2_cycles = 0

        visited = [False] * n
        for i in range(n):
            if in_degree[i] > 0 and not visited[i]:
                cycle_len = 0
                curr = i
                while not visited[curr]:
                    visited[curr] = True
                    curr = favorite[curr]
                    cycle_len += 1

                if cycle_len == 2:
                    u = i
                    v = favorite[i]
                    sum_2_cycles += max_depth[u] + max_depth[v]
                else:
                    max_cycle_ge_3 = max(max_cycle_ge_3, cycle_len)

        return max(max_cycle_ge_3, sum_2_cycles)
