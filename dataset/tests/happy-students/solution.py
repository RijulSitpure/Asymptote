from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def countWays(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)
        ans = 0
        if nums[0] > 0:
            ans += 1
        if nums[-1] < n:
            ans += 1
        for i in range(n - 1):
            k = i + 1
            if nums[i] < k and nums[i + 1] > k:
                ans += 1
        return ans
