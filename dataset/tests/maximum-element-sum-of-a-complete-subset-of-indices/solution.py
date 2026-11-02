from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def maximumSum(self, nums: List[int]) -> int:
        n = len(nums)
        ans = 0
        for c in range(1, n + 1):
            curr = 0
            d = 1
            while c * d * d <= n:
                curr += nums[c * d * d - 1]
                d += 1
            if curr > ans:
                ans = curr
        return ans
