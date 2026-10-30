from collections import Counter

class Solution:
    def visibleMountains(self, peaks: list[list[int]]) -> int:
        counts = Counter((x, y) for x, y in peaks)
        intervals = [(x - y, x + y, count) for (x, y), count in counts.items()]
        intervals.sort(key=lambda item: (item[0], -item[1]))
        ans = 0
        max_r = -float('inf')
        for l, r, count in intervals:
            if r > max_r:
                if count == 1:
                    ans += 1
                max_r = r
        return ans
