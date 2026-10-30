from typing import List, Optional, Tuple, Dict, Set

import bisect

class Solution:
    def countRectangles(self, rectangles: list[list[int]], points: list[list[int]]) -> list[int]:
        by_h = [[] for _ in range(101)]
        for l, h in rectangles:
            by_h[h].append(l)
        for h in range(101):
            by_h[h].sort()
        ans = []
        for px, py in points:
            cnt = 0
            for h in range(py, 101):
                bucket = by_h[h]
                idx = bisect.bisect_left(bucket, px)
                cnt += len(bucket) - idx
            ans.append(cnt)
        return ans
