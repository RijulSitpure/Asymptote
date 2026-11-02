from solution import Solution
s = Solution()
assert s.longestAlternatingSubarray([3,2,5,4], 5) == 3
assert s.longestAlternatingSubarray([1,2], 2) == 1
assert s.longestAlternatingSubarray([2,3,4,5], 4) == 3
print("All tests passed for longest-even-odd-subarray-with-threshold")
