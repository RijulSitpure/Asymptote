from typing import List

class Solution:
    def canPartitionGrid(self, grid: List[List[int]]) -> bool:
        s = sum(sum(row) for row in grid)
        if s % 2 != 0:
            return False
        half = s // 2
        pre = 0
        for row in grid[:-1]:
            pre += sum(row)
            if pre == half:
                return True
        m, n = len(grid), len(grid[0])
        pre = 0
        for j in range(n - 1):
            pre += sum(grid[i][j] for i in range(m))
            if pre == half:
                return True
        return False

def run_tests():
    s = Solution()
    res = s.canPartitionGrid([[1, 2], [2, 1]])
    assert res is True, f"Expected True, got {res}"
    print("3546 equal-sum-grid-partition-i PASSED")

if __name__ == "__main__":
    run_tests()
