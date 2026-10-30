import heapq

class NumberContainers:
    def __init__(self):
        self.idx_to_num = {}
        self.num_to_heap = {}

    def change(self, index: int, number: int) -> None:
        self.idx_to_num[index] = number
        if number not in self.num_to_heap:
            self.num_to_heap[number] = []
        heapq.heappush(self.num_to_heap[number], index)

    def find(self, number: int) -> int:
        if number not in self.num_to_heap:
            return -1
        h = self.num_to_heap[number]
        while h:
            idx = h[0]
            if self.idx_to_num.get(idx) == number:
                return idx
            heapq.heappop(h)
        return -1
