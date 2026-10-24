import sys
from typing import List

class Solution:
    def numMagicSquaresInside(self, grid: List[List[int]]) -> int:
        R, C = len(grid), len(grid[0])
        if R < 3 or C < 3:
            return 0

        def isMagic(r: int, c: int) -> bool:
            if grid[r + 1][c + 1] != 5:
                return False
            vals = [grid[r + i][c + j] for i in range(3) for j in range(3)]
            if sorted(vals) != list(range(1, 10)):
                return False
            for i in range(3):
                if sum(grid[r + i][c + j] for j in range(3)) != 15:
                    return False
            for j in range(3):
                if sum(grid[r + i][c + j] for i in range(3)) != 15:
                    return False
            if grid[r][c] + grid[r + 1][c + 1] + grid[r + 2][c + 2] != 15:
                return False
            if grid[r][c + 2] + grid[r + 1][c + 1] + grid[r + 2][c] != 15:
                return False
            return True

        count = 0
        for r in range(R - 2):
            for c in range(C - 2):
                if isMagic(r, c):
                    count += 1
        return count

def test():
    sol = Solution()
    assert sol.numMagicSquaresInside([[4,3,8,4],[9,5,1,9],[2,7,6,2]]) == 1, "test 1 failed"
    assert sol.numMagicSquaresInside([[8]]) == 0, "test 2 failed"
    assert sol.numMagicSquaresInside([[5,5,5],[5,5,5],[5,5,5]]) == 0, "test 3 failed"
    print("✓ magic-squares-in-grid passed")

if __name__ == "__main__":
    test()
