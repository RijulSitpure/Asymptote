from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def maximumSumOfHeights(self, maxHeights: List[int]) -> int:
        n = len(maxHeights)
        left = [0] * n
        stack = [-1]
        curr = 0
        for i, h in enumerate(maxHeights):
            while len(stack) > 1 and maxHeights[stack[-1]] > h:
                idx = stack.pop()
                curr -= maxHeights[idx] * (idx - stack[-1])
            curr += h * (i - stack[-1])
            stack.append(i)
            left[i] = curr
        right = [0] * n
        stack = [n]
        curr = 0
        for i in range(n - 1, -1, -1):
            h = maxHeights[i]
            while len(stack) > 1 and maxHeights[stack[-1]] > h:
                idx = stack.pop()
                curr -= maxHeights[idx] * (stack[-1] - idx)
            curr += h * (stack[-1] - i)
            stack.append(i)
            right[i] = curr
        return max(left[i] + right[i] - maxHeights[i] for i in range(n))
