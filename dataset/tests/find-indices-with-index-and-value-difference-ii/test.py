from solution import Solution
s = Solution()
assert s.findIndices([5, 1, 4, 1], 2, 4) == [0, 3]
assert s.findIndices([2, 1], 0, 0) == [0, 0]
assert s.findIndices([1, 2, 3], 2, 4) == [-1, -1]
print("find-indices-with-index-and-value-difference-ii passed")
