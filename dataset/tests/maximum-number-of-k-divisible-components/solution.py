from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maxKDivisibleComponents(self, n: int, edges: List[List[int]], values: List[int], k: int) -> int:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        ans = 0
        def dfs(u, p):
            nonlocal ans
            total = values[u]
            for v in adj[u]:
                if v != p:
                    total += dfs(v, u)
            if total % k == 0:
                ans += 1
                return 0
            return total % k
        sys.setrecursionlimit(100000)
        dfs(0, -1)
        return ans
