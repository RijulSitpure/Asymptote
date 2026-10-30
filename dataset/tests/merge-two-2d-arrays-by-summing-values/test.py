from solution import Solution
s = Solution()
assert s.mergeArrays([[1, 2], [2, 3], [4, 5]], [[1, 4], [3, 2], [4, 1]]) == [[1, 6], [2, 3], [3, 2], [4, 6]]
assert s.mergeArrays([[2, 4], [3, 6], [5, 5]], [[1, 3], [4, 3]]) == [[1, 3], [2, 4], [3, 6], [4, 3], [5, 5]]
print('All tests passed for merge-two-2d-arrays-by-summing-values!')
