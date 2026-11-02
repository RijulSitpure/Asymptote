from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maxProfit(self, prices: List[int], profits: List[int]) -> int:
        n = len(prices)
        m = max(prices) + 1
        bit_left = [0] * (m + 2)
        
        def update_left(idx, val):
            while idx < len(bit_left):
                if val > bit_left[idx]:
                    bit_left[idx] = val
                idx += idx & (-idx)
                
        def query_left(idx):
            res = 0
            while idx > 0:
                if bit_left[idx] > res:
                    res = bit_left[idx]
                idx -= idx & (-idx)
            return res
            
        left_max = [0] * n
        for i in range(n):
            best = query_left(prices[i] - 1)
            left_max[i] = best
            update_left(prices[i], profits[i])
            
        bit_right = [0] * (m + 2)
        
        def update_right(idx, val):
            while idx > 0:
                if val > bit_right[idx]:
                    bit_right[idx] = val
                idx -= idx & (-idx)
                
        def query_right(idx):
            res = 0
            while idx < len(bit_right):
                if bit_right[idx] > res:
                    res = bit_right[idx]
                idx += idx & (-idx)
            return res
            
        right_max = [0] * n
        for i in range(n - 1, -1, -1):
            best = query_right(prices[i] + 1)
            right_max[i] = best
            update_right(prices[i], profits[i])
            
        ans = -1
        for j in range(n):
            if left_max[j] > 0 and right_max[j] > 0:
                total = left_max[j] + profits[j] + right_max[j]
                if total > ans:
                    ans = total
        return ans
