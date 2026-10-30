from solution import Solution
s = Solution()
assert s.findAllGoodIndices([2,1,1,1,3,4,1], 2) == [2,3]
assert s.findAllGoodIndices([2,1,1,2], 2) == []
print("All tests passed for find-all-good-indices!")
