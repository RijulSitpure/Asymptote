from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def minSum(self, nums1: List[int], nums2: List[int]) -> int:
        s1 = sum(nums1) + nums1.count(0)
        s2 = sum(nums2) + nums2.count(0)
        z1 = nums1.count(0)
        z2 = nums2.count(0)
        if z1 == 0 and s1 < s2:
            return -1
        if z2 == 0 and s2 < s1:
            return -1
        return max(s1, s2)
