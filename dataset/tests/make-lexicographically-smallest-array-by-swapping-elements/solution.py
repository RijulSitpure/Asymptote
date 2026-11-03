from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def lexicographicallySmallestArray(self, nums: List[int], limit: int) -> List[int]:
        n = len(nums)
        pairs = sorted((nums[i], i) for i in range(n))
        ans = [0] * n
        i = 0
        while i < n:
            j = i + 1
            while j < n and pairs[j][0] - pairs[j - 1][0] <= limit:
                j += 1
            indices = sorted(pairs[k][1] for k in range(i, j))
            for k, idx in enumerate(indices):
                ans[idx] = pairs[i + k][0]
            i = j
        return ans
