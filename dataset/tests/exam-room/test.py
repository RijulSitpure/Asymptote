import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'exam-room.json')

import bisect

class ExamRoom:
    def __init__(self, n: int):
        self.n = n
        self.seats = []

    def seat(self) -> int:
        if not self.seats:
            self.seats.append(0)
            return 0
        max_dist = self.seats[0]
        best_seat = 0
        for i in range(len(self.seats) - 1):
            prev = self.seats[i]
            nxt = self.seats[i + 1]
            dist = (nxt - prev) // 2
            if dist > max_dist:
                max_dist = dist
                best_seat = prev + dist
        if self.n - 1 - self.seats[-1] > max_dist:
            best_seat = self.n - 1
        bisect.insort(self.seats, best_seat)
        return best_seat

    def leave(self, p: int) -> None:
        self.seats.remove(p)

er = ExamRoom(10)
assert er.seat() == 0
assert er.seat() == 9
assert er.seat() == 4
assert er.seat() == 2
er.leave(4)
assert er.seat() == 5
print("✓ exam-room passed")
