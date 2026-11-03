from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def maximumStrongPairXor(self, nums: List[int]) -> int:
        nums.sort()
        trie = {}
        
        def insert(val):
            curr = trie
            for i in range(20, -1, -1):
                b = (val >> i) & 1
                if b not in curr:
                    curr[b] = {'cnt': 0}
                curr = curr[b]
                curr['cnt'] += 1
                
        def remove(val):
            curr = trie
            for i in range(20, -1, -1):
                b = (val >> i) & 1
                curr = curr[b]
                curr['cnt'] -= 1
                
        def query(val):
            curr = trie
            res = 0
            for i in range(20, -1, -1):
                b = (val >> i) & 1
                want = 1 - b
                if want in curr and curr[want]['cnt'] > 0:
                    res |= (1 << i)
                    curr = curr[want]
                else:
                    curr = curr.get(b, {'cnt': 0})
            return res
            
        l = 0
        ans = 0
        for r in range(len(nums)):
            insert(nums[r])
            while nums[r] > 2 * nums[l]:
                remove(nums[l])
                l += 1
            ans = max(ans, query(nums[r]))
        return ans
