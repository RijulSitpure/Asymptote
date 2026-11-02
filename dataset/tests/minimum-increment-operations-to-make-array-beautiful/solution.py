from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def minIncrementOperations(self, nums: List[int], k: int) -> int:
        dp = [0, 0, 0]
        for x in nums:
            cost = max(0, k - x)
            dp = [dp[1], dp[2], min(dp) + cost]
        return min(dp)
