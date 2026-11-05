import bisect
from collections import deque, defaultdict
import heapq

class StatisticsTracker:
    def __init__(self):
        self.q = deque()
        self.sorted_nums = []
        self.total_sum = 0
        self.freq = defaultdict(int)
        self.mode_heap = []

    def addNumber(self, number: int) -> None:
        self.q.append(number)
        bisect.insort(self.sorted_nums, number)
        self.total_sum += number
        self.freq[number] += 1
        heapq.heappush(self.mode_heap, (-self.freq[number], number))

    def removeFirstAddedNumber(self) -> None:
        x = self.q.popleft()
        idx = bisect.bisect_left(self.sorted_nums, x)
        self.sorted_nums.pop(idx)
        self.total_sum -= x
        self.freq[x] -= 1
        if self.freq[x] > 0:
            heapq.heappush(self.mode_heap, (-self.freq[x], x))

    def getMean(self) -> int:
        return self.total_sum // len(self.q)

    def getMedian(self) -> int:
        return self.sorted_nums[len(self.sorted_nums) // 2]

    def getMode(self) -> int:
        while self.mode_heap:
            neg_f, num = self.mode_heap[0]
            if -neg_f == self.freq[num]:
                return num
            heapq.heappop(self.mode_heap)
        return -1
