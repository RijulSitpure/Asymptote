from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def maximumSubsequenceCount(self, text: str, pattern: str) -> int:
        p0, p1 = pattern[0], pattern[1]
        base = 0
        c0 = 0
        c1 = 0
        for ch in text:
            if ch == p1:
                base += c0
                c1 += 1
            if ch == p0:
                c0 += 1
        return base + max(c0, c1)
