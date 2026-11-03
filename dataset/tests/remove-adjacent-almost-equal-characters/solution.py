from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def removeAlmostEqualCharacters(self, word: str) -> int:
        ans = 0
        i = 1
        n = len(word)
        while i < n:
            if abs(ord(word[i]) - ord(word[i - 1])) <= 1:
                ans += 1
                i += 2
            else:
                i += 1
        return ans
