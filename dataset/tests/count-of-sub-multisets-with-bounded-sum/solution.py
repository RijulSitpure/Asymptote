from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def countSubMultisets(self, nums: List[int], l: int, r: int) -> int:
        mod = 10**9 + 7
        cnt = Counter(nums)
        dp = [0] * (r + 1)
        dp[0] = 1
        for x, c in cnt.items():
            if x == 0:
                continue
            new_dp = [0] * (r + 1)
            for rem in range(x):
                window_sum = 0
                for j in range(rem, r + 1, x):
                    window_sum = (window_sum + dp[j]) % mod
                    if j - (c + 1) * x >= 0:
                        window_sum = (window_sum - dp[j - (c + 1) * x] + mod) % mod
                    new_dp[j] = window_sum
            dp = new_dp
        ans = sum(dp[l:r + 1]) % mod
        ans = (ans * (cnt[0] + 1)) % mod
        return ans
