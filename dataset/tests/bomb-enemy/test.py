import sys
from typing import List

class Solution:
    def maxKilledEnemies(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0
        m, n = len(grid), len(grid[0])
        max_enemies = 0
        row_hits = 0
        col_hits = [0] * n
        for r in range(m):
            for c in range(n):
                if c == 0 or grid[r][c - 1] == "W":
                    row_hits = 0
                    k = c
                    while k < n and grid[r][k] != "W":
                        if grid[r][k] == "E":
                            row_hits += 1
                        k += 1
                if r == 0 or grid[r - 1][c] == "W":
                    col_hits[c] = 0
                    k = r
                    while k < m and grid[k][c] != "W":
                        if grid[k][c] == "E":
                            col_hits[c] += 1
                        k += 1
                if grid[r][c] == "0":
                    max_enemies = max(max_enemies, row_hits + col_hits[c])
        return max_enemies

def test():
    sol = Solution()
    grid = [["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]
    assert sol.maxKilledEnemies(grid) == 3, "test 1 failed"
    grid2 = [["W","W","W"],["0","0","0"],["E","E","E"]]
    assert sol.maxKilledEnemies(grid2) == 1, "test 2 failed"
    print("✓ bomb-enemy passed")

if __name__ == "__main__":
    test()
