from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def shortestBeautifulSubstring(self, s: str, k: int) -> str:
        ones = [i for i, c in enumerate(s) if c == '1']
        if len(ones) < k:
            return ''
        ans = ''
        min_len = float('inf')
        for i in range(len(ones) - k + 1):
            sub = s[ones[i] : ones[i + k - 1] + 1]
            if len(sub) < min_len:
                min_len = len(sub)
                ans = sub
            elif len(sub) == min_len and (ans == '' or sub < ans):
                ans = sub
        return ans
