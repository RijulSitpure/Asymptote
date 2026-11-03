class Solution:
    def placedCoins(self, edges: list[list[int]], cost: list[int]) -> list[int]:
        from collections import defaultdict
        n = len(cost)
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        ans = [0] * n
        def dfs(u: int, p: int) -> list[int]:
            cur = [cost[u]]
            for v in adj[u]:
                if v != p:
                    cur.extend(dfs(v, u))
            cur.sort()
            if len(cur) >= 3:
                prod1 = cur[-1] * cur[-2] * cur[-3]
                prod2 = cur[0] * cur[1] * cur[-1]
                ans[u] = max(0, prod1, prod2)
            else:
                ans[u] = 1
            if len(cur) > 5:
                cur = cur[:2] + cur[-3:]
            return cur
        dfs(0, -1)
        return ans
