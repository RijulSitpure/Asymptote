from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def numberOfSets(self, n: int, maxDistance: int, roads: List[List[int]]) -> int:
        ans = 0
        for mask in range(1 << n):
            dist = [[float('inf')] * n for _ in range(n)]
            for i in range(n):
                dist[i][i] = 0
            for u, v, w in roads:
                if ((mask >> u) & 1) and ((mask >> v) & 1):
                    dist[u][v] = min(dist[u][v], w)
                    dist[v][u] = min(dist[v][u], w)
                    
            for k in range(n):
                if not ((mask >> k) & 1): continue
                for i in range(n):
                    if not ((mask >> i) & 1): continue
                    for j in range(n):
                        if not ((mask >> j) & 1): continue
                        if dist[i][k] + dist[k][j] < dist[i][j]:
                            dist[i][j] = dist[i][k] + dist[k][j]
                            
            valid = True
            for i in range(n):
                if not ((mask >> i) & 1): continue
                for j in range(i + 1, n):
                    if not ((mask >> j) & 1): continue
                    if dist[i][j] > maxDistance:
                        valid = False
                        break
                if not valid: break
            if valid: ans += 1
        return ans
