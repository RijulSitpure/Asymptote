from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def kthPalindrome(self, queries: list[int], intLength: int) -> list[int]:
        L = (intLength + 1) // 2
        start = 10 ** (L - 1)
        limit = 10 ** L
        ans = []
        for q in queries:
            val = start + q - 1
            if val >= limit:
                ans.append(-1)
            else:
                s = str(val)
                pal = s + (s[-2::-1] if intLength % 2 == 1 else s[::-1])
                ans.append(int(pal))
        return ans
