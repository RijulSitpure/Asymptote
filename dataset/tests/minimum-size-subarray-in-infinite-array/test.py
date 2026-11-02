from solution import Solution
s = Solution()
assert s.minSizeSubarray([1, 2, 3], 5) == 2
assert s.minSizeSubarray([1, 1, 1, 2, 3], 4) == 2
assert s.minSizeSubarray([2, 4, 6, 8], 3) == -1
print("minimum-size-subarray-in-infinite-array passed")
