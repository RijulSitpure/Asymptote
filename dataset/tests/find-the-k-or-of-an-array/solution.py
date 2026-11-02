from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def findKOr(self, nums: List[int], k: int) -> int:
        ans = 0
        for b in range(31):
            cnt = sum((x >> b) & 1 for x in nums)
            if cnt >= k:
                ans |= (1 << b)
        return ans
