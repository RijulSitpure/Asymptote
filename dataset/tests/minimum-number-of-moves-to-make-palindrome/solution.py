from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def minMovesToMakePalindrome(self, s: str) -> int:
        s = list(s)
        ans = 0
        l, r = 0, len(s) - 1
        while l < r:
            k = r
            while k > l and s[k] != s[l]:
                k -= 1
            if k == l:
                ans += len(s) // 2 - l
                l += 1
            else:
                while k < r:
                    s[k], s[k + 1] = s[k + 1], s[k]
                    ans += 1
                    k += 1
                l += 1
                r -= 1
        return ans
