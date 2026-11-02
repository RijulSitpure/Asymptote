from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def minOperations(self, nums: List[int], target: int) -> int:
        if sum(nums) < target:
            return -1
        count = [0] * 32
        for x in nums:
            count[x.bit_length() - 1] += 1
        ops = 0
        i = 0
        while i < 31:
            if (target >> i) & 1:
                if count[i] > 0:
                    count[i] -= 1
                else:
                    j = i
                    while j < 31 and count[j] == 0:
                        j += 1
                    while j > i:
                        count[j] -= 1
                        count[j - 1] += 2
                        ops += 1
                        j -= 1
                    count[i] -= 1
            count[i + 1] += count[i] // 2
            i += 1
        return ops
