from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def findMaximumLength(self, nums: List[int]) -> int:
        n = len(nums)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + nums[i]
            
        dp = [0] * (n + 1)
        last = [0] * (n + 1)
        dq = deque([0])
        
        for i in range(1, n + 1):
            while len(dq) > 1 and pref[dq[1]] + last[dq[1]] <= pref[i]:
                dq.popleft()
            j = dq[0]
            dp[i] = dp[j] + 1
            last[i] = pref[i] - pref[j]
            while dq and pref[dq[-1]] + last[dq[-1]] >= pref[i] + last[i]:
                dq.pop()
            dq.append(i)
        return dp[n]
