from typing import List, Optional
class Solution:
    def canMakeSubsequence(self, str1: str, str2: str) -> bool:
        i, j = 0, 0
        n, m = len(str1), len(str2)
        while i < n and j < m:
            c1 = str1[i]
            c2 = str2[j]
            nxt = chr((ord(c1) - ord('a') + 1) % 26 + ord('a'))
            if c1 == c2 or nxt == c2:
                j += 1
            i += 1
        return j == m
