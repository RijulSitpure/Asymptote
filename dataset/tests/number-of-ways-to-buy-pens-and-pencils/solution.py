from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def waysToBuyPensPencils(self, total: int, cost1: int, cost2: int) -> int:
        ans = 0
        for pens in range(total // cost1 + 1):
            rem = total - pens * cost1
            ans += rem // cost2 + 1
        return ans
