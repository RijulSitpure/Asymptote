class Solution:
    def maxOutput(self, n: int, edges: list[list[int]], price: list[int]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        ans = 0
        def dfs(u: int, p: int):
            nonlocal ans
            max_with = price[u]
            max_without = 0
            for v in adj[u]:
                if v == p:
                    continue
                cw, cwo = dfs(v, u)
                ans = max(ans, max_with + cwo, max_without + cw)
                max_with = max(max_with, price[u] + cw)
                max_without = max(max_without, price[u] + cwo)
            return max_with, max_without

        dfs(0, -1)
        return ans
