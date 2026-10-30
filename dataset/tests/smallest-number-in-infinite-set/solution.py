import heapq

class SmallestInfiniteSet:
    def __init__(self):
        self.cur = 1
        self.added = []
        self.added_set = set()

    def popSmallest(self) -> int:
        if self.added:
            val = heapq.heappop(self.added)
            self.added_set.remove(val)
            return val
        val = self.cur
        self.cur += 1
        return val

    def addBack(self, num: int) -> None:
        if num < self.cur and num not in self.added_set:
            heapq.heappush(self.added, num)
            self.added_set.add(num)
