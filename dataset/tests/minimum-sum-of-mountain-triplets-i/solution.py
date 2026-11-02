from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def minimumSum(self, nums: List[int]) -> int:
        n = len(nums)
        left = [0] * n
        left[0] = nums[0]
        for i in range(1, n):
            left[i] = min(left[i - 1], nums[i])
        right = [0] * n
        right[-1] = nums[-1]
        for i in range(n - 2, -1, -1):
            right[i] = min(right[i + 1], nums[i])
        ans = float('inf')
        for j in range(1, n - 1):
            if left[j - 1] < nums[j] and right[j + 1] < nums[j]:
                ans = min(ans, left[j - 1] + nums[j] + right[j + 1])
        return ans if ans != float('inf') else -1
