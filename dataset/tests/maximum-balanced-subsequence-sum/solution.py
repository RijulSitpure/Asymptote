from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maxBalancedSubsequenceSum(self, nums: List[int]) -> int:
        n = len(nums)
        keys = [nums[i] - i for i in range(n)]
        sorted_keys = sorted(set(keys))
        rank = {val: i + 1 for i, val in enumerate(sorted_keys)}
        m = len(sorted_keys)
        bit = [-float('inf')] * (m + 1)
        
        def update(idx, val):
            while idx <= m:
                if val > bit[idx]:
                    bit[idx] = val
                idx += idx & (-idx)
                
        def query(idx):
            res = -float('inf')
            while idx > 0:
                if bit[idx] > res:
                    res = bit[idx]
                idx -= idx & (-idx)
            return res
            
        ans = -float('inf')
        for i in range(n):
            r = rank[keys[i]]
            prev_best = query(r)
            curr = max(nums[i], prev_best + nums[i])
            if curr > ans:
                ans = curr
            update(r, curr)
        return ans
