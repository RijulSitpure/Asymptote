from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def convertTime(self, current: str, correct: str) -> int:
        def to_min(s):
            h, m = map(int, s.split(":"))
            return h * 60 + m

        diff = to_min(correct) - to_min(current)
        ans = 0
        for step in [60, 15, 5, 1]:
            ans += diff // step
            diff %= step
        return ans
