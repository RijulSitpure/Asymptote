from solution import Solution
s = Solution()
assert s.maxIncreasingCells([[3,1],[3,4]]) == 2
assert s.maxIncreasingCells([[1,1],[1,1]]) == 1
assert s.maxIncreasingCells([[3,1,6],[-9,5,7]]) == 4
print("All tests passed for maximum-strictly-increasing-cells-in-a-matrix")
