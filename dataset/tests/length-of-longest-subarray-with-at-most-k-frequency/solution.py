from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def maxSubarrayLength(self, nums: List[int], k: int) -> int:
        counts = defaultdict(int)
        l = 0
        ans = 0
        for r, x in enumerate(nums):
            counts[x] += 1
            while counts[x] > k:
                counts[nums[l]] -= 1
                l += 1
            ans = max(ans, r - l + 1)
        return ans
