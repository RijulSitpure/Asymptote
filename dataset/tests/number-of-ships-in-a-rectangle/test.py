class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Sea:
    def __init__(self, ships):
        self.ships = set(ships)
    def hasShips(self, topRight: Point, bottomLeft: Point) -> bool:
        for x, y in self.ships:
            if bottomLeft.x <= x <= topRight.x and bottomLeft.y <= y <= topRight.y:
                return True
        return False

class Solution:
    def countShips(self, sea: Sea, topRight: Point, bottomLeft: Point) -> int:
        if topRight.x < bottomLeft.x or topRight.y < bottomLeft.y:
            return 0
        if not sea.hasShips(topRight, bottomLeft):
            return 0
        if topRight.x == bottomLeft.x and topRight.y == bottomLeft.y:
            return 1
        mid_x = (topRight.x + bottomLeft.x) // 2
        mid_y = (topRight.y + bottomLeft.y) // 2
        return (
            self.countShips(sea, Point(mid_x, mid_y), bottomLeft) +
            self.countShips(sea, Point(topRight.x, mid_y), Point(mid_x + 1, bottomLeft.y)) +
            self.countShips(sea, Point(mid_x, topRight.y), Point(bottomLeft.x, mid_y + 1)) +
            self.countShips(sea, topRight, Point(mid_x + 1, mid_y + 1))
        )

sol = Solution()
sea = Sea([(1, 1), (2, 2), (3, 3)])
res = sol.countShips(sea, Point(4, 4), Point(0, 0))
assert res == 3
print("All tests passed successfully.")
