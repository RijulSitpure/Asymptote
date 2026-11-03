from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys
import heapq

class Solution:
    def countCompleteSubstrings(self, word: str, k: int) -> int:
        def solve(sub):
            res = 0
            for c in range(1, 27):
                w_len = c * k
                if w_len > len(sub):
                    break
                freq = [0] * 26
                for i in range(w_len):
                    freq[ord(sub[i]) - ord('a')] += 1
                if all(cnt == 0 or cnt == k for cnt in freq):
                    res += 1
                for i in range(w_len, len(sub)):
                    freq[ord(sub[i]) - ord('a')] += 1
                    freq[ord(sub[i - w_len]) - ord('a')] -= 1
                    if all(cnt == 0 or cnt == k for cnt in freq):
                        res += 1
            return res
            
        ans = 0
        start = 0
        n = len(word)
        for i in range(1, n + 1):
            if i == n or abs(ord(word[i]) - ord(word[i - 1])) > 2:
                ans += solve(word[start:i])
                start = i
        return ans
