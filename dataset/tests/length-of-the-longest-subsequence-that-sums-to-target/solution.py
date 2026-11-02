from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def lengthOfLongestSubsequence(self, nums: List[int], target: int) -> int:
        dp = [-1] * (target + 1)
        dp[0] = 0
        for x in nums:
            for t in range(target, x - 1, -1):
                if dp[t - x] != -1:
                    if dp[t - x] + 1 > dp[t]:
                        dp[t] = dp[t - x] + 1
        return dp[target]
