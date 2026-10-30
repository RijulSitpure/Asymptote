from collections import defaultdict
import bisect

class RangeFreqQuery:
    def __init__(self, arr: list[int]):
        self.pos = defaultdict(list)
        for i, v in enumerate(arr):
            self.pos[v].append(i)

    def query(self, left: int, right: int, value: int) -> int:
        if value not in self.pos:
            return 0
        idx_list = self.pos[value]
        l = bisect.bisect_left(idx_list, left)
        r = bisect.bisect_right(idx_list, right)
        return r - l
