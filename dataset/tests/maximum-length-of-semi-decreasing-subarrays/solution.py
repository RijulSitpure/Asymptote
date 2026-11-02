from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def maxSubarrayLength(self, nums: List[int]) -> int:
        d = defaultdict(list)
        for i, x in enumerate(nums):
            d[x].append(i)
        ans, k = 0, float('inf')
        for x in sorted(d, reverse=True):
            ans = max(ans, d[x][-1] - k + 1)
            k = min(k, d[x][0])
        return ans
