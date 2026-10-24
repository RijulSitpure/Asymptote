class Solution:
    def numMovesStones(self, a: int, b: int, c: int) -> list[int]:
        x, y, z = sorted([a, b, c])
        if z - x == 2:
            min_moves = 0
        elif y - x <= 2 or z - y <= 2:
            min_moves = 1
        else:
            min_moves = 2
        max_moves = (z - y - 1) + (y - x - 1)
        return [min_moves, max_moves]

def test():
    sol = Solution()
    assert sol.numMovesStones(1, 2, 5) == [1, 2], "test 1 failed"
    assert sol.numMovesStones(4, 3, 2) == [0, 0], "test 2 failed"
    assert sol.numMovesStones(3, 5, 1) == [1, 2], "test 3 failed"
    print("✓ moving-stones-until-consecutive passed")

if __name__ == "__main__":
    test()
