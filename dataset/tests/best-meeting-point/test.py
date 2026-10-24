import sys
from typing import List

class Solution:
    def minTotalDistance(self, grid: List[List[int]]) -> int:
        rows = [r for r in range(len(grid)) for c in range(len(grid[0])) if grid[r][c] == 1]
        cols = sorted(c for r in range(len(grid)) for c in range(len(grid[0])) if grid[r][c] == 1)
        def get_dist(coords: List[int]) -> int:
            d = 0
            i, j = 0, len(coords) - 1
            while i < j:
                d += coords[j] - coords[i]
                i += 1
                j -= 1
            return d
        return get_dist(rows) + get_dist(cols)

def test():
    sol = Solution()
    grid = [[1, 0, 0, 0, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]]
    assert sol.minTotalDistance(grid) == 6, "test 1 failed"
    grid2 = [[1, 1]]
    assert sol.minTotalDistance(grid2) == 1, "test 2 failed"
    print("✓ best-meeting-point passed")

if __name__ == "__main__":
    test()
