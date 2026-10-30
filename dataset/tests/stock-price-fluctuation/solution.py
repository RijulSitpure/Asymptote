import heapq

class StockPrice:
    def __init__(self):
        self.time_price = {}
        self.max_time = 0
        self.max_heap = []
        self.min_heap = []

    def update(self, timestamp: int, price: int) -> None:
        self.time_price[timestamp] = price
        if timestamp > self.max_time:
            self.max_time = timestamp
        heapq.heappush(self.max_heap, (-price, timestamp))
        heapq.heappush(self.min_heap, (price, timestamp))

    def current(self) -> int:
        return self.time_price[self.max_time]

    def maximum(self) -> int:
        while self.max_heap:
            neg_price, t = self.max_heap[0]
            if self.time_price[t] == -neg_price:
                return -neg_price
            heapq.heappop(self.max_heap)
        return 0

    def minimum(self) -> int:
        while self.min_heap:
            price, t = self.min_heap[0]
            if self.time_price[t] == price:
                return price
            heapq.heappop(self.min_heap)
        return 0
