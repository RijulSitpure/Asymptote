from solution import Solution
s = Solution()
assert s.mostProfitablePath([[0,1],[1,2],[1,3],[3,4]], 3, [-2,4,2,-4,6]) == 6
assert s.mostProfitablePath([[0,1]], 1, [-7280,2350]) == -7280
print('All tests passed for most-profitable-path-in-a-tree!')
