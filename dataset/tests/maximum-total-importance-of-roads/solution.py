class Solution:
    def maximumImportance(self, n: int, roads: list[list[int]]) -> int:
        deg = [0] * n
        for u, v in roads:
            deg[u] += 1
            deg[v] += 1
        deg.sort()
        return sum((i + 1) * d for i, d in enumerate(deg))
