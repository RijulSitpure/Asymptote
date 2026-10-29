import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'my-calendar-iii.json')

class MyCalendarThree:
    def __init__(self):
        self.delta = {}

    def book(self, startTime: int, endTime: int) -> int:
        self.delta[startTime] = self.delta.get(startTime, 0) + 1
        self.delta[endTime] = self.delta.get(endTime, 0) - 1
        active = 0
        ans = 0
        for t in sorted(self.delta.keys()):
            active += self.delta[t]
            ans = max(ans, active)
        return ans

c = MyCalendarThree()
assert c.book(10, 20) == 1
assert c.book(50, 60) == 1
assert c.book(10, 40) == 2
assert c.book(5, 15) == 3
assert c.book(5, 10) == 3
assert c.book(25, 55) == 3
print("✓ my-calendar-iii passed")
