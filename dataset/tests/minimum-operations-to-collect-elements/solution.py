from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        seen = set()
        n = len(nums)
        for i in range(n - 1, -1, -1):
            if nums[i] <= k:
                seen.add(nums[i])
            if len(seen) == k:
                return n - i
        return n
