from solution import Solution
s = Solution()
assert s.matrixMedian([[1,1,2],[2,3,3],[1,3,4]]) == 2
assert s.matrixMedian([[1,1,3,3,4]]) == 3
print("All tests passed for median-of-a-row-wise-sorted-matrix!")
