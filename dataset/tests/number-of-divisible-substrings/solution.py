from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def countDivisibleSubstrings(self, word: str) -> int:
        mapping = [1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9]
        n = len(word)
        ans = 0
        for i in range(n):
            total = 0
            for j in range(i, n):
                total += mapping[ord(word[j]) - ord('a')]
                length = j - i + 1
                if total % length == 0:
                    ans += 1
        return ans
