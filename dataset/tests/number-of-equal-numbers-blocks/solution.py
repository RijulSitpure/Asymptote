from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class BigArray:
    def __init__(self, arr):
        self.arr = arr
    def at(self, index: int) -> int:
        return self.arr[index]
    def size(self) -> int:
        return len(self.arr)

class Solution:
    def countBlocks(self, nums: 'BigArray') -> int:
        n = nums.size()
        i = 0
        blocks = 0
        while i < n:
            blocks += 1
            target = nums.at(i)
            lo, hi = i, n
            while lo < hi:
                mid = (lo + hi) // 2
                if nums.at(mid) == target:
                    lo = mid + 1
                else:
                    hi = mid
            i = lo
        return blocks
