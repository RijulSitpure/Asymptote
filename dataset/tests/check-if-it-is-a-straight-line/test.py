class Solution:
    def checkStraightLine(self, coordinates: list[list[int]]) -> bool:
        x0, y0 = coordinates[0]
        x1, y1 = coordinates[1]
        dx = x1 - x0
        dy = y1 - y0
        for x, y in coordinates[2:]:
            if dy * (x - x0) != dx * (y - y0):
                return False
        return True

def test():
    sol = Solution()
    assert sol.checkStraightLine([[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]) is True, "test 1 failed"
    assert sol.checkStraightLine([[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]) is False, "test 2 failed"
    print("✓ check-if-it-is-a-straight-line passed")

if __name__ == "__main__":
    test()
