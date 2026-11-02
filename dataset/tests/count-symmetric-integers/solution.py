from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math

class Solution:
    def countSymmetricIntegers(self, low: int, high: int) -> int:
        ans = 0
        for num in range(low, high + 1):
            s = str(num)
            if len(s) % 2 == 0:
                half = len(s) // 2
                if sum(int(c) for c in s[:half]) == sum(int(c) for c in s[half:]):
                    ans += 1
        return ans
