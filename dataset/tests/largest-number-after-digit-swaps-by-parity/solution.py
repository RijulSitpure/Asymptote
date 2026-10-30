from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def largestInteger(self, num: int) -> int:
        s = str(num)
        evens = sorted([c for c in s if int(c) % 2 == 0], reverse=True)
        odds = sorted([c for c in s if int(c) % 2 == 1], reverse=True)
        ei, oi = 0, 0
        res = []
        for c in s:
            if int(c) % 2 == 0:
                res.append(evens[ei])
                ei += 1
            else:
                res.append(odds[oi])
                oi += 1
        return int("".join(res))
