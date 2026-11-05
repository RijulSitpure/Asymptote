from solution import Solution

s = Solution()
assert s.maximumSumSubsequence([3, 5, 9], [[1, -2], [0, -3]]) == 21
assert s.maximumSumSubsequence([0, -1], [[0, -5]]) == 0
print('All tests passed successfully.')