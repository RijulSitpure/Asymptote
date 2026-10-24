from typing import List

class Solution:
    def allCellsDistOrder(self, rows: int, cols: int, rCenter: int, cCenter: int) -> List[List[int]]:
        cells = [[r, c] for r in range(rows) for c in range(cols)]
        cells.sort(key=lambda p: abs(p[0] - rCenter) + abs(p[1] - cCenter))
        return cells

def test():
    sol = Solution()
    res1 = sol.allCellsDistOrder(1, 2, 0, 0)
    assert res1 == [[0, 0], [0, 1]], "test 1 failed"
    print("✓ matrix-cells-in-distance-order passed")

if __name__ == "__main__":
    test()
