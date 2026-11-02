from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def maxNumberOfAlloys(self, n: int, k: int, budget: int, composition: List[List[int]], stock: List[int], cost: List[int]) -> int:
        ans = 0
        for comp in composition:
            lo, hi = 0, 2 * 10**8
            best = 0
            while lo <= hi:
                mid = (lo + hi) // 2
                needed = 0
                for i in range(n):
                    req = comp[i] * mid - stock[i]
                    if req > 0:
                        needed += req * cost[i]
                if needed <= budget:
                    best = mid
                    lo = mid + 1
                else:
                    hi = mid - 1
            if best > ans:
                ans = best
        return ans
