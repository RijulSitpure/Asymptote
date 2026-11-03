from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def minimumCoins(self, prices: List[int]) -> int:
        n = len(prices)
        dp = [0] * (n + 2)
        for i in range(n, 0, -1):
            reach = min(n + 1, 2 * i + 1)
            dp[i] = prices[i - 1] + min(dp[i + 1 : reach + 1])
        return dp[1]
