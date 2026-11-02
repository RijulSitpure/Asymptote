from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maximumScoreAfterOperations(self, edges: List[List[int]], values: List[int]) -> int:
        n = len(values)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        def dfs(u, p):
            is_leaf = True
            child_loss = 0
            for v in adj[u]:
                if v != p:
                    is_leaf = False
                    child_loss += dfs(v, u)
            if is_leaf:
                return values[u]
            return min(values[u], child_loss)
            
        return sum(values) - dfs(0, -1)
