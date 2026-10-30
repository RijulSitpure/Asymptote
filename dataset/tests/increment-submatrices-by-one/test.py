from solution import Solution
s = Solution()
assert s.rangeAddQueries(3, [[1,1,2,2],[0,0,1,1]]) == [[1,1,0],[1,2,1],[0,1,1]]
assert s.rangeAddQueries(2, [[0,0,1,1]]) == [[1,1],[1,1]]
print('All tests passed for increment-submatrices-by-one!')
