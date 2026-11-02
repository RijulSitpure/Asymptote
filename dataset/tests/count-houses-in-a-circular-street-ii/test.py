class Street:
    def __init__(self, doors):
        self.doors = list(doors)
        self.pos = 0
    def closeDoor(self):
        self.doors[self.pos] = 0
    def isDoorOpen(self):
        return self.doors[self.pos] == 1
    def moveRight(self):
        self.pos = (self.pos + 1) % len(self.doors)

from solution import Solution
s = Solution()
assert s.houseCount(Street([1, 0, 1, 1, 0]), 10) == 5
assert s.houseCount(Street([0, 0, 1]), 10) == 3
print("All tests passed for count-houses-in-a-circular-street-ii")
