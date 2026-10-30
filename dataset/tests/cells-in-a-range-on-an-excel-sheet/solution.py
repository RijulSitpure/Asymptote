from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def cellsInRange(self, s: str) -> list[str]:
        c1, r1, _, c2, r2 = s
        res = []
        for c in range(ord(c1), ord(c2) + 1):
            for r in range(int(r1), int(r2) + 1):
                res.append(chr(c) + str(r))
        return res
