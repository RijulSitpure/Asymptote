from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def countInterestingSubarrays(self, nums: List[int], modulo: int, k: int) -> int:
        counts = Counter({0: 1})
        curr = 0
        ans = 0
        for x in nums:
            if x % modulo == k:
                curr = (curr + 1) % modulo
            target = (curr - k + modulo) % modulo
            ans += counts[target]
            counts[curr] += 1
        return ans
