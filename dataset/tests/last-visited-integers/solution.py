from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def lastVisitedIntegers(self, nums: List[int]) -> List[int]:
        seen = []
        ans = []
        k = 0
        for x in nums:
            if x > 0:
                seen.append(x)
                k = 0
            else:
                k += 1
                if k <= len(seen):
                    ans.append(seen[-k])
                else:
                    ans.append(-1)
        return ans
