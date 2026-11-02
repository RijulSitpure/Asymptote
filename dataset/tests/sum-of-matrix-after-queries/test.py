from solution import Solution
s = Solution()
assert s.matrixSumQueries(3, [[0,0,1],[1,2,2],[0,2,3],[1,0,4]]) == 23
assert s.matrixSumQueries(3, [[0,0,4],[0,1,2],[1,0,1],[0,2,3],[1,2,1]]) == 17
print("All tests passed for sum-of-matrix-after-queries")
