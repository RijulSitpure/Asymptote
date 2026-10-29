import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'my-calendar-i.json')

import bisect

class MyCalendar:
    def __init__(self):
        self.bookings = []

    def book(self, startTime: int, endTime: int) -> bool:
        idx = bisect.bisect_right(self.bookings, (startTime, endTime))
        if idx > 0 and self.bookings[idx - 1][1] > startTime:
            return False
        if idx < len(self.bookings) and self.bookings[idx][0] < endTime:
            return False
        self.bookings.insert(idx, (startTime, endTime))
        return True

c = MyCalendar()
assert c.book(10, 20) is True
assert c.book(15, 25) is False
assert c.book(20, 30) is True
print("✓ my-calendar-i passed")
