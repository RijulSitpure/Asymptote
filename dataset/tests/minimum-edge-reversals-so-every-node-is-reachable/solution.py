from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def minEdgeReversals(self, n: int, edges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append((v, 0))
            adj[v].append((u, 1))
        ans = [0] * n
        sys.setrecursionlimit(200000)
        def dfs1(u, p):
            cost = 0
            for v, w in adj[u]:
                if v != p:
                    cost += w + dfs1(v, u)
            return cost
        ans[0] = dfs1(0, -1)
        def dfs2(u, p):
            for v, w in adj[u]:
                if v != p:
                    ans[v] = ans[u] + (1 if w == 0 else -1)
                    dfs2(v, u)
        dfs2(0, -1)
        return ans
