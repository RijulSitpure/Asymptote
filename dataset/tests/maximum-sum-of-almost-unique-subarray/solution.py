from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def maxSum(self, nums: List[int], m: int, k: int) -> int:
        counts = Counter()
        curr_sum = 0
        ans = 0
        for i in range(len(nums)):
            counts[nums[i]] += 1
            curr_sum += nums[i]
            if i >= k:
                out = nums[i - k]
                counts[out] -= 1
                if counts[out] == 0:
                    del counts[out]
                curr_sum -= out
            if i >= k - 1 and len(counts) >= m:
                if curr_sum > ans:
                    ans = curr_sum
        return ans
