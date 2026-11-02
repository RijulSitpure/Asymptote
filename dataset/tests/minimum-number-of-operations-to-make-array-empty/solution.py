from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def minOperations(self, nums: List[int]) -> int:
        counts = Counter(nums)
        ans = 0
        for c in counts.values():
            if c == 1:
                return -1
            ans += (c + 2) // 3
        return ans
