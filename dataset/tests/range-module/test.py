import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'range-module.json')

import bisect

class RangeModule:
    def __init__(self):
        self.intervals = []

    def addRange(self, left: int, right: int) -> None:
        new_intervals = []
        inserted = False
        for l, r in self.intervals:
            if r < left:
                new_intervals.append((l, r))
            elif l > right:
                if not inserted:
                    new_intervals.append((left, right))
                    inserted = True
                new_intervals.append((l, r))
            else:
                left = min(left, l)
                right = max(right, r)
        if not inserted:
            new_intervals.append((left, right))
        self.intervals = new_intervals

    def queryRange(self, left: int, right: int) -> bool:
        idx = bisect.bisect_right(self.intervals, (left, float('inf'))) - 1
        if idx >= 0 and self.intervals[idx][0] <= left and self.intervals[idx][1] >= right:
            return True
        return False

    def removeRange(self, left: int, right: int) -> None:
        new_intervals = []
        for l, r in self.intervals:
            if r <= left or l >= right:
                new_intervals.append((l, r))
            else:
                if l < left:
                    new_intervals.append((l, left))
                if r > right:
                    new_intervals.append((right, r))
        self.intervals = new_intervals

rm = RangeModule()
rm.addRange(10, 20)
rm.removeRange(14, 16)
assert rm.queryRange(10, 14) is True
assert rm.queryRange(13, 15) is False
assert rm.queryRange(16, 17) is True
print("✓ range-module passed")
