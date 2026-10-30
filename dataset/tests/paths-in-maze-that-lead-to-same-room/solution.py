class Solution:
    def numberOfPaths(self, n: int, corridors: list[list[int]]) -> int:
        adj = [set() for _ in range(n + 1)]
        for u, v in corridors:
            if u > v:
                u, v = v, u
            adj[u].add(v)

        count = 0
        for u in range(1, n + 1):
            for v in adj[u]:
                common = adj[u] & adj[v]
                count += len(common)

        return count
