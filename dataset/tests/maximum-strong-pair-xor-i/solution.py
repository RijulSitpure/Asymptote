from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def maximumStrongPairXor(self, nums: List[int]) -> int:
        ans = 0
        for x in nums:
            for y in nums:
                if abs(x - y) <= min(x, y):
                    ans = max(ans, x ^ y)
        return ans
