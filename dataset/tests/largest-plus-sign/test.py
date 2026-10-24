from typing import List

class Solution:
    def orderOfLargestPlusSign(self, n: int, mines: List[List[int]]) -> int:
        banned = {(r, c) for r, c in mines}
        grid = [[0] * n for _ in range(n)]
        ans = 0

        for r in range(n):
            count = 0
            for c in range(n):
                count = 0 if (r, c) in banned else count + 1
                grid[r][c] = count

            count = 0
            for c in range(n - 1, -1, -1):
                count = 0 if (r, c) in banned else count + 1
                if count < grid[r][c]:
                    grid[r][c] = count

        for c in range(n):
            count = 0
            for r in range(n):
                count = 0 if (r, c) in banned else count + 1
                if count < grid[r][c]:
                    grid[r][c] = count

            count = 0
            for r in range(n - 1, -1, -1):
                count = 0 if (r, c) in banned else count + 1
                if count < grid[r][c]:
                    grid[r][c] = count
                if grid[r][c] > ans:
                    ans = grid[r][c]

        return ans

def test():
    sol = Solution()
    assert sol.orderOfLargestPlusSign(5, [[4, 2]]) == 2, "test 1 failed"
    assert sol.orderOfLargestPlusSign(1, [[0, 0]]) == 0, "test 2 failed"
    print("✓ largest-plus-sign passed")

if __name__ == "__main__":
    test()
