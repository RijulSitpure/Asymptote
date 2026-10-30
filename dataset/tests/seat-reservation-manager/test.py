import heapq

class SeatManager:
    def __init__(self, n: int):
        self.available = list(range(1, n + 1))
        heapq.heapify(self.available)

    def reserve(self) -> int:
        return heapq.heappop(self.available)

    def unreserve(self, seatNumber: int) -> None:
        heapq.heappush(self.available, seatNumber)

def test_seat_manager():
    sm = SeatManager(5)
    assert sm.reserve() == 1
    assert sm.reserve() == 2
    sm.unreserve(2)
    assert sm.reserve() == 2
    assert sm.reserve() == 3

