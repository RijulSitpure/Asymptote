class Solution:
    def minFallingPathSum(self, grid: list[list[int]]) -> int:
        n = len(grid)
        first_min, first_col = 0, -1
        second_min = 0
        for row in grid:
            cur_first_min, cur_first_col = float("inf"), -1
            cur_second_min = float("inf")
            for c in range(n):
                prev = second_min if c == first_col else first_min
                val = row[c] + prev
                if val < cur_first_min:
                    cur_second_min = cur_first_min
                    cur_first_min = val
                    cur_first_col = c
                elif val < cur_second_min:
                    cur_second_min = val
            first_min, first_col = cur_first_min, cur_first_col
            second_min = cur_second_min
        return first_min

def test():
    sol = Solution()
    assert sol.minFallingPathSum([[1,2,3],[4,5,6],[7,8,9]]) == 13, "test 1 failed"
    assert sol.minFallingPathSum([[7]]) == 7, "test 2 failed"
    print("✓ minimum-falling-path-sum-ii passed")

if __name__ == "__main__":
    test()
