import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'my-calendar-ii.json')

class MyCalendarTwo:
    def __init__(self):
        self.bookings = []
        self.overlaps = []

    def book(self, startTime: int, endTime: int) -> bool:
        for s, e in self.overlaps:
            if max(startTime, s) < min(endTime, e):
                return False
        for s, e in self.bookings:
            if max(startTime, s) < min(endTime, e):
                self.overlaps.append((max(startTime, s), min(endTime, e)))
        self.bookings.append((startTime, endTime))
        return True

c = MyCalendarTwo()
assert c.book(10, 20) is True
assert c.book(50, 60) is True
assert c.book(10, 40) is True
assert c.book(5, 15) is False
assert c.book(5, 10) is True
assert c.book(25, 55) is True
print("✓ my-calendar-ii passed")
