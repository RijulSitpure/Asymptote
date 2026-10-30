from solution import Solution
s = Solution()
assert s.partitionArray([3,6,1,2,5], 2) == 2
assert s.partitionArray([1,2,3], 1) == 2
assert s.partitionArray([2,2,4,5], 0) == 3
print("All tests passed for partition-array-such-that-maximum-difference-is-k!")
