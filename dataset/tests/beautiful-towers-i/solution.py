from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maximumSumOfHeights(self, maxHeights: List[int]) -> int:
        n = len(maxHeights)
        ans = 0
        for i in range(n):
            curr = maxHeights[i]
            h = curr
            for j in range(i - 1, -1, -1):
                h = min(h, maxHeights[j])
                curr += h
            h = maxHeights[i]
            for j in range(i + 1, n):
                h = min(h, maxHeights[j])
                curr += h
            if curr > ans:
                ans = curr
        return ans
