class Solution:
    def countNegatives(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        r, c = 0, n - 1
        count = 0
        while r < m and c >= 0:
            if grid[r][c] < 0:
                count += m - r
                c -= 1
            else:
                r += 1
        return count

def test():
    sol = Solution()
    assert sol.countNegatives([[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]) == 8, "test 1 failed"
    assert sol.countNegatives([[3,2],[1,0]]) == 0, "test 2 failed"
    print("✓ count-negative-numbers-in-a-sorted-matrix passed")

if __name__ == "__main__":
    test()
