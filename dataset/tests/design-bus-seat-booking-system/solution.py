import heapq

class BusBookingSystem:
    def __init__(self, rows: int, seats_per_row: int):
        self.rows = rows
        self.seats_per_row = seats_per_row
        self.available = [i for i in range(1, rows * seats_per_row + 1)]
        heapq.heapify(self.available)
        self.booked = set()

    def book(self) -> int:
        if not self.available:
            return -1
        seat = heapq.heappop(self.available)
        self.booked.add(seat)
        return seat

    def cancel(self, seat_id: int) -> bool:
        if seat_id in self.booked:
            self.booked.remove(seat_id)
            heapq.heappush(self.available, seat_id)
            return True
        return False

    def is_available(self, seat_id: int) -> bool:
        return 1 <= seat_id <= self.rows * self.seats_per_row and seat_id not in self.booked