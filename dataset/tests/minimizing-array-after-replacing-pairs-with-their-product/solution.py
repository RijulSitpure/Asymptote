from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def minArrayLength(self, nums: List[int], k: int) -> int:
        ans = 1
        y = nums[0]
        for x in nums[1:]:
            if x == 0:
                return 1
            if x * y <= k:
                y *= x
            else:
                y = x
                ans += 1
        return ans
