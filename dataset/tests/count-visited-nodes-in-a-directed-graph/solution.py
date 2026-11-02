from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def countVisitedNodes(self, edges: List[int]) -> List[int]:
        n = len(edges)
        in_degree = [0] * n
        for v in edges:
            in_degree[v] += 1
        q = [i for i in range(n) if in_degree[i] == 0]
        topo_order = []
        head = 0
        while head < len(q):
            u = q[head]
            head += 1
            topo_order.append(u)
            v = edges[u]
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
        ans = [0] * n
        for i in range(n):
            if in_degree[i] > 0 and ans[i] == 0:
                cycle = []
                curr = i
                while True:
                    cycle.append(curr)
                    curr = edges[curr]
                    if curr == i:
                        break
                sz = len(cycle)
                for node in cycle:
                    ans[node] = sz
        for u in reversed(topo_order):
            ans[u] = ans[edges[u]] + 1
        return ans
