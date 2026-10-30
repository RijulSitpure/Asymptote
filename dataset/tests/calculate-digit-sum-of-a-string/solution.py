from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def digitSum(self, s: str, k: int) -> str:
        while len(s) > k:
            nxt = []
            for i in range(0, len(s), k):
                chunk = s[i:i + k]
                nxt.append(str(sum(int(c) for c in chunk)))
            s = "".join(nxt)
        return s
