from typing import List

class Solution:
    def maxIncreaseKeepingSkyline(self, grid: List[List[int]]) -> int:
        n = len(grid)
        row_max = [max(row) for row in grid]
        col_max = [max(grid[r][c] for r in range(n)) for c in range(n)]
        ans = 0
        for r in range(n):
            for c in range(n):
                ans += min(row_max[r], col_max[c]) - grid[r][c]
        return ans

def test():
    sol = Solution()
    g = [
        [3, 0, 8, 4],
        [2, 4, 5, 7],
        [9, 2, 6, 3],
        [0, 3, 1, 0]
    ]
    assert sol.maxIncreaseKeepingSkyline(g) == 35, "test 1 failed"
    assert sol.maxIncreaseKeepingSkyline([[0, 0], [0, 0]]) == 0, "test 2 failed"
    print("✓ max-increase-to-keep-city-skyline passed")

if __name__ == "__main__":
    test()
