from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def numberOfWays(self, s: str) -> int:
        total0 = s.count("0")
        total1 = len(s) - total0
        c0 = 0
        c1 = 0
        ans = 0
        for ch in s:
            if ch == "0":
                ans += c1 * (total1 - c1)
                c0 += 1
            else:
                ans += c0 * (total0 - c0)
                c1 += 1
        return ans
