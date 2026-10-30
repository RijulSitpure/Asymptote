from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def maximumCost(self, n: int, highways: list[list[int]], k: int) -> int:
        if k >= n:
            return -1
        adj = [[] for _ in range(n)]
        for u, v, w in highways:
            adj[u].append((v, w))
            adj[v].append((u, w))
        memo = {}

        def dfs(mask, u, hops):
            if hops == 0:
                return 0
            state = (mask, u, hops)
            if state in memo:
                return memo[state]
            res = -float("inf")
            for v, w in adj[u]:
                if not ((mask >> v) & 1):
                    res = max(res, w + dfs(mask | (1 << v), v, hops - 1))
            memo[state] = res
            return res

        ans = -1
        for start in range(n):
            val = dfs(1 << start, start, k)
            if val > ans:
                ans = val
        return ans
