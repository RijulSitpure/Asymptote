from typing import List, Optional, Tuple, Dict, Set

import bisect

class Solution:
    def fullBloomFlowers(self, flowers: list[list[int]], people: list[int]) -> list[int]:
        starts = sorted([s for s, e in flowers])
        ends = sorted([e for s, e in flowers])
        ans = []
        for t in people:
            started = bisect.bisect_right(starts, t)
            finished = bisect.bisect_left(ends, t)
            ans.append(started - finished)
        return ans
