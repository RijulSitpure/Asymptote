from typing import List, Optional
from collections import Counter, defaultdict, deque
from bisect import bisect_left, bisect_right
import math
import sys

class Solution:
    def getWordsInLongestSubsequence(self, words: List[str], groups: List[int]) -> List[str]:
        n = len(words)
        dp = [1] * n
        prev = [-1] * n
        best_idx = 0
        for i in range(n):
            for j in range(i):
                if groups[i] != groups[j] and len(words[i]) == len(words[j]):
                    diff = sum(c1 != c2 for c1, c2 in zip(words[i], words[j]))
                    if diff == 1 and dp[j] + 1 > dp[i]:
                        dp[i] = dp[j] + 1
                        prev[i] = j
            if dp[i] > dp[best_idx]:
                best_idx = i
        ans = []
        curr = best_idx
        while curr != -1:
            ans.append(words[curr])
            curr = prev[curr]
        ans.reverse()
        return ans
