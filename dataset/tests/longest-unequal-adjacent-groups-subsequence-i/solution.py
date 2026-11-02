from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def getLongestSubsequence(self, words: List[str], groups: List[int]) -> List[str]:
        ans = []
        last_group = -1
        for w, g in zip(words, groups):
            if g != last_group:
                ans.append(w)
                last_group = g
        return ans
