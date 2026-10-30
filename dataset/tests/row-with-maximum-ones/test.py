from solution import Solution
s = Solution()
assert s.rowAndMaximumOnes([[0,1],[1,0]]) == [0, 1]
assert s.rowAndMaximumOnes([[0,0,0],[0,1,1]]) == [1, 2]
assert s.rowAndMaximumOnes([[0,0],[1,1],[0,0]]) == [1, 2]
print('All tests passed for row-with-maximum-ones!')
