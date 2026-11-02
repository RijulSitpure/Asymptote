from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maxSum(self, nums: List[int], k: int) -> int:
        mod = 10**9 + 7
        cnt = [0] * 31
        for x in nums:
            for i in range(31):
                if (x >> i) & 1:
                    cnt[i] += 1
        ans = 0
        for _ in range(k):
            val = 0
            for i in range(31):
                if cnt[i] > 0:
                    val |= (1 << i)
                    cnt[i] -= 1
            ans = (ans + val * val) % mod
        return ans
