from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maxSubarrays(self, nums: List[int]) -> int:
        mask = (1 << 30) - 1
        total = mask
        for x in nums:
            total &= x
        if total > 0:
            return 1
        ans = 0
        curr = mask
        for x in nums:
            curr &= x
            if curr == 0:
                ans += 1
                curr = mask
        return ans
