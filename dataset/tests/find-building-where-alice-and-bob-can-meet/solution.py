from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def leftmostBuildingQueries(self, heights: List[int], queries: List[List[int]]) -> List[int]:
        n = len(heights)
        ans = [-1] * len(queries)
        pending = [[] for _ in range(n)]
        for qi, (a, b) in enumerate(queries):
            if a > b:
                a, b = b, a
            if a == b or heights[a] < heights[b]:
                ans[qi] = b
            else:
                pending[b].append((heights[a], qi))
                
        pq = []
        for i, h in enumerate(heights):
            while pq and pq[0][0] < h:
                _, qi = heapq.heappop(pq)
                ans[qi] = i
            for req in pending[i]:
                heapq.heappush(pq, req)
        return ans
