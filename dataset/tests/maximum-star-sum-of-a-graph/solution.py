class Solution:
    def maxStarSum(self, vals: list[int], edges: list[list[int]], k: int) -> int:
        n = len(vals)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            if vals[v] > 0:
                adj[u].append(vals[v])
            if vals[u] > 0:
                adj[v].append(vals[u])
        ans = max(vals)
        for i in range(n):
            adj[i].sort(reverse=True)
            current = vals[i] + sum(adj[i][:k])
            if current > ans:
                ans = current
        return ans
