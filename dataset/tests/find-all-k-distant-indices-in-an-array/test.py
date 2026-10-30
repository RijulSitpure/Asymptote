from solution import Solution
s = Solution()
assert s.findKDistantIndices([3,4,9,1,3,9,5], 9, 1) == [1,2,3,4,5,6]
assert s.findKDistantIndices([2,2,2,2,2], 2, 2) == [0,1,2,3,4]
print("All tests passed for find-all-k-distant-indices-in-an-array!")
