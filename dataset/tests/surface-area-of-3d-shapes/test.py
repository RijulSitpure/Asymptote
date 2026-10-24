from typing import List

class Solution:
    def surfaceArea(self, grid: List[List[int]]) -> int:
        n = len(grid)
        ans = 0
        for i in range(n):
            for j in range(n):
                v = grid[i][j]
                if v > 0:
                    ans += 2 + 4 * v
                    if i > 0:
                        ans -= 2 * min(v, grid[i - 1][j])
                    if j > 0:
                        ans -= 2 * min(v, grid[i][j - 1])
        return ans

def test():
    sol = Solution()
    assert sol.surfaceArea([[1, 2], [3, 4]]) == 34, "test 1 failed"
    assert sol.surfaceArea([[1, 1, 1], [1, 0, 1], [1, 1, 1]]) == 32, "test 2 failed"
    assert sol.surfaceArea([[2, 2, 2], [2, 1, 2], [2, 2, 2]]) == 46, "test 3 failed"
    print("✓ surface-area-of-3d-shapes passed")

if __name__ == "__main__":
    test()
