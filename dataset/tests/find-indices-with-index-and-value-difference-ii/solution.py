from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def findIndices(self, nums: List[int], indexDifference: int, valueDifference: int) -> List[int]:
        min_i = 0
        max_i = 0
        for j in range(indexDifference, len(nums)):
            i = j - indexDifference
            if nums[i] < nums[min_i]:
                min_i = i
            if nums[i] > nums[max_i]:
                max_i = i
            if abs(nums[j] - nums[min_i]) >= valueDifference:
                return [min_i, j]
            if abs(nums[j] - nums[max_i]) >= valueDifference:
                return [max_i, j]
        return [-1, -1]
