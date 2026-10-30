from solution import Solution

s = Solution()
assert s.pivotArray([9,12,5,10,14,3,10], 10) == [9,5,3,10,10,12,14]
assert s.pivotArray([-3,4,3,2], 2) == [-3,2,4,3]
print("All tests passed for partition-array-according-to-given-pivot!")
