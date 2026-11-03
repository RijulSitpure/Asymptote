from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def maximizeSquareHoleArea(self, n: int, m: int, hBars: List[int], vBars: List[int]) -> int:
        def get_max_consecutive(bars):
            bars.sort()
            best = 1
            curr = 1
            for i in range(1, len(bars)):
                if bars[i] == bars[i - 1] + 1:
                    curr += 1
                else:
                    curr = 1
                if curr > best:
                    best = curr
            return best
            
        side = min(get_max_consecutive(hBars) + 1, get_max_consecutive(vBars) + 1)
        return side * side
