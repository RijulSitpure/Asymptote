from typing import List

class Solution:
    def matrixScore(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        ans = m * (1 << (n - 1))
        for j in range(1, n):
            same_as_row0 = sum(grid[i][j] == grid[i][0] for i in range(m))
            count1 = max(same_as_row0, m - same_as_row0)
            ans += count1 * (1 << (n - 1 - j))
        return ans

def test():
    sol = Solution()
    assert sol.matrixScore([[0, 0, 1, 1], [1, 0, 1, 0], [1, 1, 0, 0]]) == 39, "test 1 failed"
    assert sol.matrixScore([[0]]) == 1, "test 2 failed"
    print("✓ score-after-flipping-matrix passed")

if __name__ == "__main__":
    test()
