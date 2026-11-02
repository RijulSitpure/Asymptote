from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def minLengthAfterRemovals(self, nums: List[int]) -> int:
        n = len(nums)
        mid = nums[n // 2]
        left = bisect_left(nums, mid)
        right = bisect_right(nums, mid)
        max_freq = right - left
        if max_freq > n // 2:
            return 2 * max_freq - n
        return n % 2
