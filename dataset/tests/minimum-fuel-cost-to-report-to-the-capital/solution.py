import math

class Solution:
    def minimumFuelCost(self, roads: list[list[int]], seats: int) -> int:
        n = len(roads) + 1
        adj = [[] for _ in range(n)]
        for u, v in roads:
            adj[u].append(v)
            adj[v].append(u)
        fuel = 0
        def dfs(u, p):
            nonlocal fuel
            people = 1
            for v in adj[u]:
                if v != p:
                    people += dfs(v, u)
            if u != 0:
                fuel += math.ceil(people / seats)
            return people
        dfs(0, -1)
        return fuel
