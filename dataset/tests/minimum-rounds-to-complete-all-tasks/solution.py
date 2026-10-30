from typing import List, Optional, Tuple, Dict, Set

from collections import Counter

class Solution:
    def minimumRounds(self, tasks: list[int]) -> int:
        cnt = Counter(tasks)
        ans = 0
        for c in cnt.values():
            if c == 1:
                return -1
            ans += (c + 2) // 3
        return ans
