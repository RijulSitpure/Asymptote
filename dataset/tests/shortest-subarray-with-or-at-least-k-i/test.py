from solution import Solution

s = Solution()
assert s.minimumSubarrayLength([1, 2, 3], 2) == 1
assert s.minimumSubarrayLength([2, 1, 8], 10) == 3
assert s.minimumSubarrayLength([1, 2], 0) == 1
print("All tests passed successfully.")
