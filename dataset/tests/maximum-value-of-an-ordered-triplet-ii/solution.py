from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maximumTripletValue(self, nums: List[int]) -> int:
        ans = 0
        max_i = 0
        max_diff = 0
        for x in nums:
            if max_diff * x > ans:
                ans = max_diff * x
            if max_i - x > max_diff:
                max_diff = max_i - x
            if x > max_i:
                max_i = x
        return ans
