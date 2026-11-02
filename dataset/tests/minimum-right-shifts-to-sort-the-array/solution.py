from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import itertools
import sys

class Solution:
    def minimumRightShifts(self, nums: List[int]) -> int:
        n = len(nums)
        drop = -1
        for i in range(n - 1):
            if nums[i] > nums[i + 1]:
                if drop != -1:
                    return -1
                drop = i
        if drop == -1:
            return 0
        if nums[-1] > nums[0]:
            return -1
        return n - 1 - drop
