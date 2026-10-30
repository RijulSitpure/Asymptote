import bisect

class CountIntervals:
    def __init__(self):
        self.intervals = []
        self.total = 0

    def add(self, left: int, right: int) -> None:
        new_left, new_right = left, right
        idx = bisect.bisect_left(self.intervals, (left, -1))
        if idx > 0 and self.intervals[idx - 1][1] >= left:
            idx -= 1
        
        delete_count = 0
        i = idx
        while i < len(self.intervals) and self.intervals[i][0] <= right:
            new_left = min(new_left, self.intervals[i][0])
            new_right = max(new_right, self.intervals[i][1])
            self.total -= (self.intervals[i][1] - self.intervals[i][0] + 1)
            delete_count += 1
            i += 1
        
        self.intervals[idx:idx + delete_count] = [(new_left, new_right)]
        self.total += (new_right - new_left + 1)

    def count(self) -> int:
        return self.total
