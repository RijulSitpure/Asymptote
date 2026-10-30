from collections import defaultdict

class Solution:
    def maxScore(self, edges: list[list[int]]) -> int:
        adj = defaultdict(list)
        for i, (p, w) in enumerate(edges):
            if p != -1:
                adj[p].append((i, w))
        def dfs(u):
            base = 0
            diff = 0
            for v, w in adj[u]:
                v0, v1 = dfs(v)
                base += v1
                diff = max(diff, w + v0 - v1)
            return base, base + diff
        return dfs(0)[1]
