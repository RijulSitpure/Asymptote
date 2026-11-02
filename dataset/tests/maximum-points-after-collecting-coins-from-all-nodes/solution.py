from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maximumPoints(self, edges: List[List[int]], coins: List[int], k: int) -> int:
        n = len(coins)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        memo = {}
        
        def dfs(u, p, c):
            c = min(c, 14)
            state = (u, c)
            if state in memo:
                return memo[state]
            val = coins[u] >> c
            
            # Option 1: val - k
            res1 = val - k
            for v in adj[u]:
                if v != p:
                    res1 += dfs(v, u, c)
                    
            # Option 2: val // 2 with c + 1 for subtree
            res2 = val // 2
            for v in adj[u]:
                if v != p:
                    res2 += dfs(v, u, c + 1)
                    
            ans = max(res1, res2)
            memo[state] = ans
            return ans
            
        return dfs(0, -1, 0)
