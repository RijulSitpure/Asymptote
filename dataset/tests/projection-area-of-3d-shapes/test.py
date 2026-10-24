from typing import List

class Solution:
    def projectionArea(self, grid: List[List[int]]) -> int:
        n = len(grid)
        xy = sum(grid[r][c] > 0 for r in range(n) for c in range(n))
        yz = sum(max(grid[r][c] for r in range(n)) for c in range(n))
        zx = sum(max(grid[r]) for r in range(n))
        return xy + yz + zx

def test():
    sol = Solution()
    assert sol.projectionArea([[1, 2], [3, 4]]) == 17, "test 1 failed"
    assert sol.projectionArea([[2]]) == 5, "test 2 failed"
    assert sol.projectionArea([[1, 0], [0, 2]]) == 8, "test 3 failed"
    print("✓ projection-area-of-3d-shapes passed")

if __name__ == "__main__":
    test()
