import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'employee-free-time.json')

class Interval:
    def __init__(self, start: int = None, end: int = None):
        self.start = start
        self.end = end

class Solution:
    def employeeFreeTime(self, schedule: 'list[list[Interval]]') -> 'list[Interval]':
        events = []
        for emp in schedule:
            for iv in emp:
                events.append((iv.start, iv.end))
        events.sort()
        ans = []
        prev_end = events[0][1]
        for s, e in events[1:]:
            if s > prev_end:
                ans.append(Interval(prev_end, s))
            prev_end = max(prev_end, e)
        return ans

sol = Solution()
sch = [[Interval(1, 2), Interval(5, 6)], [Interval(1, 3)], [Interval(4, 10)]]
res = sol.employeeFreeTime(sch)
assert len(res) == 1
assert res[0].start == 3 and res[0].end == 4
print("✓ employee-free-time passed")
