from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def minSizeSubarray(self, nums: List[int], target: int) -> int:
        total = sum(nums)
        n = len(nums)
        full = target // total
        rem = target % total
        if rem == 0:
            return full * n
        arr = nums + nums
        curr = 0
        left = 0
        min_len = float('inf')
        for right in range(len(arr)):
            curr += arr[right]
            while curr > rem and left <= right:
                curr -= arr[left]
                left += 1
            if curr == rem:
                length = right - left + 1
                if length < min_len:
                    min_len = length
        if min_len == float('inf'):
            return -1
        return full * n + min_len
