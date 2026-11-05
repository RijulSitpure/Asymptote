from solution import Solution

s = Solution()
assert s.longestMonotonicSubarray([1, 4, 3, 3, 2]) == 2
assert s.longestMonotonicSubarray([3, 3, 3, 3]) == 1
assert s.longestMonotonicSubarray([3, 2, 1]) == 3
print("All tests passed successfully.")
