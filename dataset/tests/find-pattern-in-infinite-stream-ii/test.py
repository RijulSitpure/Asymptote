import sys
from solution import Solution
class MockStream:
    def __init__(self, arr):
        self.arr = arr
        self.idx = 0
    def next(self):
        v = self.arr[self.idx]
        self.idx += 1
        return v
sol = Solution()

res = sol.findPattern(stream = MockStream([1, 1, 1, 0, 1, 1, 1]), pattern = [0, 1])
assert res == 3, f"Expected { 3 }, got {res}"
res = sol.findPattern(stream = MockStream([0, 0, 0]), pattern = [0])
assert res == 0, f"Expected { 0 }, got {res}"
print('All tests passed!')
