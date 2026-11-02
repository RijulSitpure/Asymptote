from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maxProfit(self, prices: List[int], profits: List[int]) -> int:
        n = len(prices)
        ans = -1
        for j in range(n):
            left_max = -1
            for i in range(j):
                if prices[i] < prices[j]:
                    if profits[i] > left_max:
                        left_max = profits[i]
            right_max = -1
            for k in range(j + 1, n):
                if prices[k] > prices[j]:
                    if profits[k] > right_max:
                        right_max = profits[k]
            if left_max != -1 and right_max != -1:
                curr = left_max + profits[j] + right_max
                if curr > ans:
                    ans = curr
        return ans
