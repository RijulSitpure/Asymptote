from collections import defaultdict
from typing import List

class Solution:
    def maxIntersectionCount(self, y: List[int]) -> int:
        n = len(y)
        events = defaultdict(int)
        for i in range(1, n):
            start = 2 * y[i - 1]
            end = 2 * y[i]
            if i < n - 1:
                if y[i] > y[i - 1]:
                    end -= 1
                else:
                    end += 1
            events[min(start, end)] += 1
            events[max(start, end) + 1] -= 1
        curr = 0
        ans = 0
        for k in sorted(events.keys()):
            curr += events[k]
            ans = max(ans, curr)
        return ans
