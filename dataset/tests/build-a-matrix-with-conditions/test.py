from solution import Solution
s = Solution()
res1 = s.buildMatrix(3, [[1,2],[3,2]], [[2,1],[3,2]])
assert len(res1) == 3
# verify cycle returns []
res2 = s.buildMatrix(3, [[1,2],[2,3],[3,1],[2,3]], [[2,1]])
assert res2 == []
print("All tests passed for build-a-matrix-with-conditions!")
