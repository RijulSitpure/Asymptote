from collections import deque

class Solution:
    def maxHammingDistances(self, nums: list[int], m: int) -> list[int]:
        dist = [-1] * (1 << m)
        q = deque()
        for x in nums:
            if dist[x] == -1:
                dist[x] = 0
                q.append(x)

        while q:
            u = q.popleft()
            d = dist[u]
            for b in range(m):
                v = u ^ (1 << b)
                if dist[v] == -1:
                    dist[v] = d + 1
                    q.append(v)

        mask = (1 << m) - 1
        return [m - dist[x ^ mask] for x in nums]
